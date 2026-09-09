import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../data/rooms.dart';
import '../theme.dart';
import '../widgets/page_transition.dart';
import '../widgets/room_card.dart';
import 'account_screen.dart';
import 'room_detail_screen.dart';

class RoomsScreen extends StatefulWidget {
  const RoomsScreen({super.key});

  @override
  State<RoomsScreen> createState() => _RoomsScreenState();
}

class _RoomsScreenState extends State<RoomsScreen> {
  String _filter = 'all'; // all | room | suite

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final rooms = kRooms
        .where((r) => _filter == 'all' || r.type == _filter)
        .toList();

    return Column(
      children: [
        if (!state.backendOnline) const _OfflineBanner(),
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
          child: Row(
            children: [
              _Chip(tr('chip.all', state.lang), 'all', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip(tr('chip.rooms', state.lang), 'room', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip(tr('chip.suites', state.lang), 'suite', _filter, (v) => setState(() => _filter = v)),
              const Spacer(),
              if (state.loadingAvailability)
                const SizedBox(
                  width: 16, height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.gold),
                ),
            ],
          ),
        ),
        Expanded(
          child: RefreshIndicator(
            color: AppColors.gold,
            onRefresh: state.refreshAvailability,
            child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 110),
              children: [
                if (!state.isLoggedIn) const _MemberBanner(),
                for (final (i, room) in rooms.indexed)
                  RoomCard(
                    room: room,
                    occupied: state.occupied.contains(room.id),
                    lang: state.lang,
                    onTap: () => Navigator.push(
                      context,
                      luxeRoute(RoomDetailScreen(room: room)),
                    ),
                  ).animate().fadeIn(delay: (i * 70).ms).moveY(begin: 18, end: 0),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _Chip extends StatelessWidget {
  final String label;
  final String value;
  final String selected;
  final void Function(String) onTap;
  const _Chip(this.label, this.value, this.selected, this.onTap);

  @override
  Widget build(BuildContext context) {
    final active = selected == value;
    return GestureDetector(
      onTap: () => onTap(value),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 9),
        decoration: BoxDecoration(
          color: active ? AppColors.gold : context.cardSurface,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: active ? AppColors.gold : context.cardBorder),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? AppColors.navy : context.secondaryText,
            fontWeight: FontWeight.w600,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}

class _MemberBanner extends StatelessWidget {
  const _MemberBanner();
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => Navigator.push(
          context, MaterialPageRoute(builder: (_) => const AccountScreen())),
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: [AppColors.gold, AppColors.goldDeep]),
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          children: [
            const Icon(Icons.workspace_premium, color: AppColors.navy),
            const SizedBox(width: 12),
            Expanded(
              child: Text(tr('banner.member', AppScope.of(context).lang),
                  style: const TextStyle(color: AppColors.navy, fontWeight: FontWeight.w700)),
            ),
            const Icon(Icons.arrow_forward, color: AppColors.navy, size: 18),
          ],
        ),
      ),
    ).animate(onPlay: (c) => c.repeat(reverse: true)).shimmer(
        delay: 800.ms, duration: 1600.ms, color: Colors.white.withValues(alpha: 0.4));
  }
}

class _OfflineBanner extends StatelessWidget {
  const _OfflineBanner();
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.orange.shade100,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Icon(Icons.cloud_off, size: 16, color: Colors.orange.shade900),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              'Live availability unavailable — start the server (npm run dev).',
              style: TextStyle(color: Colors.orange.shade900, fontSize: 12),
            ),
          ),
        ],
      ),
    );
  }
}
