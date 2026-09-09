import 'package:flutter/material.dart';
import '../app_state.dart';
import '../data/rooms.dart';
import '../theme.dart';
import '../widgets/room_card.dart';
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
              _Chip('All', 'all', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip('Rooms', 'room', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip('Suites', 'suite', _filter, (v) => setState(() => _filter = v)),
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
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
              children: rooms
                  .map((room) => RoomCard(
                        room: room,
                        occupied: state.occupied.contains(room.id),
                        lang: state.lang,
                        onTap: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => RoomDetailScreen(room: room),
                          ),
                        ),
                      ))
                  .toList(),
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
          color: active ? AppColors.navy : Colors.white,
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: active ? AppColors.navy : const Color(0xFFE2E8F0)),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: active ? AppColors.gold : AppColors.slate,
            fontWeight: FontWeight.w600,
            fontSize: 13,
          ),
        ),
      ),
    );
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
