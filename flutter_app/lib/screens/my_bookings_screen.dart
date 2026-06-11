import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../data/rooms.dart';
import '../theme.dart';

class MyBookingsScreen extends StatefulWidget {
  const MyBookingsScreen({super.key});

  @override
  State<MyBookingsScreen> createState() => _MyBookingsScreenState();
}

class _MyBookingsScreenState extends State<MyBookingsScreen> {
  List<Map<String, dynamic>>? _bookings;
  String? _error;
  AppState? _state;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final s = AppScope.of(context);
    if (_state != s) {
      _state?.removeListener(_load);
      _state = s;
      // Re-pull when the backend pushes an SSE update (live status changes).
      _state!.addListener(_load);
      _load();
    }
  }

  @override
  void dispose() {
    _state?.removeListener(_load);
    super.dispose();
  }

  Future<void> _load() async {
    final state = _state!;
    if (!state.isLoggedIn) return;
    try {
      final data = await state.api.fetchMyBookings(state.user!.email);
      if (!mounted) return;
      setState(() {
        _bookings = data;
        _error = null;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = '$e');
    }
  }

  static const _statusColors = {
    'pending': Color(0xFFD9A300),
    'confirmed': Color(0xFF2E7D32),
    'paid': Color(0xFF2E7D32),
    'cancelled': Color(0xFFC62828),
  };

  String _roomName(String id) {
    final r = kRooms.where((r) => r.id == id);
    return r.isEmpty ? id : r.first.localizedName(_state!.lang);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(tr('mb.title', _state?.lang ?? 'en'))),
      body: RefreshIndicator(
        color: AppColors.gold,
        onRefresh: _load,
        child: _body(context),
      ),
    );
  }

  Widget _body(BuildContext context) {
    final lang = _state?.lang ?? 'en';
    if (_error != null && _bookings == null) {
      return ListView(children: [
        const SizedBox(height: 120),
        Center(child: Text(tr('mb.error', lang),
            textAlign: TextAlign.center, style: TextStyle(color: context.secondaryText))),
      ]);
    }
    if (_bookings == null) {
      return const Center(child: CircularProgressIndicator(color: AppColors.gold));
    }
    if (_bookings!.isEmpty) {
      return ListView(children: [
        const SizedBox(height: 100),
        const Icon(Icons.event_busy_outlined, size: 80, color: AppColors.slate)
            .animate().scale(curve: Curves.easeOutBack),
        const SizedBox(height: 16),
        Center(child: Text(tr('mb.empty', lang), style: Theme.of(context).textTheme.titleLarge)),
        const SizedBox(height: 8),
        Center(
          child: Text(tr('mb.emptySub', lang),
              style: TextStyle(color: context.secondaryText)),
        ),
      ]);
    }
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        for (final (i, b) in _bookings!.indexed) _card(context, b).animate()
            .fadeIn(delay: (i * 70).ms).moveY(begin: 16, end: 0),
      ],
    );
  }

  Widget _card(BuildContext context, Map<String, dynamic> b) {
    final status = (b['status'] ?? 'pending').toString();
    final color = _statusColors[status] ?? AppColors.slate;
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: context.cardSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: context.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(_roomName(b['roomType']?.toString() ?? ''),
                    style: TextStyle(
                        color: context.primaryText, fontWeight: FontWeight.w700, fontSize: 16)),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(status.toUpperCase(),
                    style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w700)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          _row(context, Icons.confirmation_number_outlined, b['id']?.toString() ?? '—'),
          _row(context, Icons.calendar_today_outlined,
              '${b['checkIn']} → ${b['checkOut']}  ·  ${b['guests']} ${tr('c.guests', _state?.lang ?? 'en')}'),
          _row(context, Icons.payments_outlined,
              '\$${b['totalPrice'] ?? '—'}  ·  ${(b['paymentMethod'] ?? '').toString().toUpperCase()}'),
        ],
      ),
    );
  }

  Widget _row(BuildContext context, IconData icon, String text) => Padding(
        padding: const EdgeInsets.only(top: 6),
        child: Row(
          children: [
            Icon(icon, size: 15, color: AppColors.goldDeep),
            const SizedBox(width: 8),
            Expanded(child: Text(text, style: TextStyle(color: context.secondaryText, fontSize: 13))),
          ],
        ),
      );
}
