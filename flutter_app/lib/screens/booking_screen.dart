import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../data/rooms.dart';
import '../theme.dart';

class BookingScreen extends StatefulWidget {
  final String? preselectedRoomId;

  /// When true the screen is shown inside the bottom-nav shell (no own AppBar).
  /// When false it's a pushed route and provides its own Scaffold + back button.
  final bool embedded;

  const BookingScreen({super.key, this.preselectedRoomId, this.embedded = false});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();

  late String _roomId;
  int _guests = 2;
  String _payment = 'click';
  DateTime? _checkIn;
  DateTime? _checkOut;
  bool _submitting = false;

  final _fmt = DateFormat('yyyy-MM-dd');

  bool _prefilled = false;

  @override
  void initState() {
    super.initState();
    _roomId = widget.preselectedRoomId ?? kRooms.first.id;
    final now = DateTime.now();
    _checkIn = DateTime(now.year, now.month, now.day + 1);
    _checkOut = DateTime(now.year, now.month, now.day + 3);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Prefill from the signed-in guest once, so the booking links to their
    // account and shows up under "My Bookings".
    if (!_prefilled) {
      final u = AppScope.of(context).user;
      if (u != null) {
        _name.text = u.name;
        _email.text = u.email;
      }
      _prefilled = true;
    }
  }

  int get _nights =>
      (_checkIn != null && _checkOut != null) ? _checkOut!.difference(_checkIn!).inDays : 0;

  int get _total {
    final room = kRooms.firstWhere((r) => r.id == _roomId);
    return room.price * (_nights > 0 ? _nights : 1);
  }

  Future<void> _pickDate({required bool checkIn}) async {
    final base = checkIn ? _checkIn! : _checkOut!;
    final first = checkIn ? DateTime.now() : _checkIn!.add(const Duration(days: 1));
    final picked = await showDatePicker(
      context: context,
      initialDate: base.isBefore(first) ? first : base,
      firstDate: first,
      lastDate: DateTime.now().add(const Duration(days: 720)),
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(
          colorScheme: const ColorScheme.light(primary: AppColors.gold, onPrimary: AppColors.navy),
        ),
        child: child!,
      ),
    );
    if (picked != null) {
      setState(() {
        if (checkIn) {
          _checkIn = picked;
          if (_checkOut!.isBefore(picked.add(const Duration(days: 1)))) {
            _checkOut = picked.add(const Duration(days: 1));
          }
        } else {
          _checkOut = picked;
        }
      });
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _submitting = true);
    final state = AppScope.of(context);
    try {
      final booking = await state.api.createBooking(
        name: _name.text.trim(),
        email: _email.text.trim(),
        phone: _phone.text.trim(),
        checkIn: _fmt.format(_checkIn!),
        checkOut: _fmt.format(_checkOut!),
        guests: _guests,
        roomType: _roomId,
        paymentMethod: _payment,
      );
      if (!mounted) return;
      await state.refreshAvailability();
      if (!mounted) return;
      _showSuccess(booking);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.red.shade700,
          content: Text('Booking failed. Is the server running?\n$e',
              maxLines: 3, overflow: TextOverflow.ellipsis),
        ),
      );
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  void _showSuccess(Map<String, dynamic> booking) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        title: Row(
          children: [
            const Icon(Icons.check_circle, color: AppColors.gold),
            const SizedBox(width: 10),
            Text('Reserved!', style: Theme.of(context).textTheme.titleLarge),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Confirmation: ${booking['id'] ?? '—'}',
                style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 6),
            Text('Total: \$${booking['totalPrice'] ?? _total}'),
            const SizedBox(height: 6),
            const Text('Status: pending — our concierge will confirm shortly.',
                style: TextStyle(color: AppColors.slate, fontSize: 13)),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context); // dialog
              Navigator.maybePop(context); // back
            },
            child: const Text('DONE'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final lang = state.lang;
    final member = state.isLoggedIn;
    final payable = member ? state.priceFor(_total) : _total;

    final form = Form(
        key: _formKey,
        child: ListView(
          padding: EdgeInsets.fromLTRB(20, 20, 20, widget.embedded ? 110 : 20),
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [AppColors.navy, Color(0xFF1B2438)],
                ),
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppColors.gold.withValues(alpha: 0.2)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.event_available, color: AppColors.gold, size: 30),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(tr('bk.reserveTitle', lang),
                            style: Theme.of(context)
                                .textTheme
                                .titleLarge
                                ?.copyWith(color: Colors.white)),
                        const SizedBox(height: 2),
                        Text(
                          member ? tr('bk.memberNote', lang) : tr('bk.guestNote', lang),
                          style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.4),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ).animate().fadeIn().moveY(begin: 12, end: 0),
            const SizedBox(height: 8),
            _label(tr('bk.fullName', lang)),
            TextFormField(
              controller: _name,
              decoration: const InputDecoration(hintText: 'e.g. Aziz Karimov'),
              validator: (v) => (v == null || v.trim().isEmpty) ? 'Required' : null,
            ),
            _label(tr('bk.email', lang)),
            TextFormField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(hintText: 'you@example.com'),
              validator: (v) =>
                  (v == null || !v.contains('@')) ? 'Valid email required' : null,
            ),
            _label(tr('bk.phone', lang)),
            TextFormField(
              controller: _phone,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(hintText: '+998 ...'),
              validator: (v) => (v == null || v.trim().length < 7) ? 'Required' : null,
            ),
            _label(tr('bk.room', lang)),
            DropdownButtonFormField<String>(
              initialValue: _roomId,
              items: kRooms
                  .map((r) => DropdownMenuItem(
                        value: r.id,
                        child: Text('${r.localizedName('en')} — ${state.money(r.price)}',
                            overflow: TextOverflow.ellipsis),
                      ))
                  .toList(),
              onChanged: (v) => setState(() => _roomId = v!),
            ),
            Row(
              children: [
                Expanded(child: _dateField(tr('bk.checkIn', lang), _checkIn!, () => _pickDate(checkIn: true))),
                const SizedBox(width: 12),
                Expanded(child: _dateField(tr('bk.checkOut', lang), _checkOut!, () => _pickDate(checkIn: false))),
              ],
            ),
            _label(tr('bk.guests', lang)),
            Row(
              children: [
                _stepBtn(Icons.remove, () {
                  if (_guests > 1) setState(() => _guests--);
                }),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text('$_guests',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                ),
                _stepBtn(Icons.add, () {
                  if (_guests < 10) setState(() => _guests++);
                }),
              ],
            ),
            _label(tr('bk.payment', lang)),
            Wrap(
              spacing: 8,
              children: ['click', 'payme', 'visa', 'cash']
                  .map((m) => ChoiceChip(
                        label: Text(m.toUpperCase()),
                        selected: _payment == m,
                        selectedColor: AppColors.navy,
                        labelStyle: TextStyle(
                          color: _payment == m ? AppColors.gold : AppColors.slate,
                          fontWeight: FontWeight.w600,
                        ),
                        onSelected: (_) => setState(() => _payment = m),
                      ))
                  .toList(),
            ),
            _label(tr('bk.currency', lang)),
            Wrap(
              spacing: 8,
              children: const ['USD', 'UZS', 'EUR']
                  .map((c) => ChoiceChip(
                        label: Text(c),
                        selected: state.currency == c,
                        selectedColor: AppColors.navy,
                        labelStyle: TextStyle(
                          color: state.currency == c ? AppColors.gold : AppColors.slate,
                          fontWeight: FontWeight.w600,
                        ),
                        onSelected: (_) => state.setCurrency(c),
                      ))
                  .toList(),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.navy,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('$_nights ${tr('bk.nights', lang)}',
                      style: const TextStyle(color: Colors.white70, fontSize: 13)),
                  const SizedBox(height: 4),
                  if (member)
                    Text(state.money(_total),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            color: Colors.white54,
                            fontSize: 15,
                            decoration: TextDecoration.lineThrough)),
                  // Scale the big total down to fit the card width — UZS amounts
                  // can be very long, so a fixed font size would overflow.
                  FittedBox(
                    fit: BoxFit.scaleDown,
                    alignment: Alignment.centerLeft,
                    child: Text(state.money(payable),
                        maxLines: 1,
                        style: const TextStyle(
                            color: AppColors.gold,
                            fontSize: 26,
                            fontWeight: FontWeight.w800)),
                  ),
                  if (member)
                    Padding(
                      padding: const EdgeInsets.only(top: 2),
                      child: Text(tr('bk.discountApplied', lang),
                          style: const TextStyle(color: AppColors.gold, fontSize: 11)),
                    ),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _submitting ? null : _submit,
                      child: _submitting
                          ? const SizedBox(
                              width: 20, height: 20,
                              child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.navy))
                          : Text(tr('bk.confirm', lang)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      );

    if (widget.embedded) return form;
    return Scaffold(
      appBar: AppBar(title: Text(tr('title.book', lang))),
      body: form,
    );
  }

  Widget _label(String t) => Builder(
        builder: (context) => Padding(
          padding: const EdgeInsets.fromLTRB(2, 18, 0, 8),
          child: Text(t,
              style: TextStyle(fontWeight: FontWeight.w600, color: context.primaryText)),
        ),
      );

  Widget _dateField(String label, DateTime value, VoidCallback onTap) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(label),
        InkWell(
          onTap: onTap,
          child: InputDecorator(
            decoration: const InputDecoration(),
            child: Row(
              children: [
                const Icon(Icons.calendar_today, size: 16, color: AppColors.goldDeep),
                const SizedBox(width: 10),
                Text(_fmt.format(value)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _stepBtn(IconData icon, VoidCallback onTap) => Material(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(10),
          child: Padding(padding: const EdgeInsets.all(12), child: Icon(icon, color: AppColors.navy)),
        ),
      );
}
