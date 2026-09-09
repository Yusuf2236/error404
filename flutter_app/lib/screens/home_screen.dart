import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import '../data/rooms.dart';
import '../theme.dart';
import '../widgets/room_card.dart';
import 'room_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  final void Function(int tab) onNavigateTab;
  const HomeScreen({super.key, required this.onNavigateTab});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final featured = kRooms.where((r) => r.type == 'suite').take(3).toList();

    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _Hero(onBook: () => onNavigateTab(2)),
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 28, 20, 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const _SectionTitle('Why VIP UZBE'),
              const SizedBox(height: 16),
              Row(
                children: const [
                  Expanded(child: _Feature(Icons.workspace_premium, '24/7 VIP\nConcierge')),
                  SizedBox(width: 12),
                  Expanded(child: _Feature(Icons.diamond_outlined, 'Elite Themed\nSuites')),
                  SizedBox(width: 12),
                  Expanded(child: _Feature(Icons.local_florist_outlined, 'Royal Uzbek\nHospitality')),
                ],
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 28, 20, 4),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const _SectionTitle('Signature Suites'),
              TextButton(
                onPressed: () => onNavigateTab(1),
                child: const Text('View all',
                    style: TextStyle(color: AppColors.goldDeep, fontWeight: FontWeight.w600)),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: featured
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
        const SizedBox(height: 24),
      ],
    );
  }
}

class _Hero extends StatelessWidget {
  final VoidCallback onBook;
  const _Hero({required this.onBook});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        CachedNetworkImage(
          imageUrl:
              'https://images.unsplash.com/photo-1542314844-0731cc8d0959?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          height: 420,
          width: double.infinity,
          fit: BoxFit.cover,
          placeholder: (c, _) => Container(height: 420, color: AppColors.navy),
          errorWidget: (c, _, _) => Container(height: 420, color: AppColors.navy),
        ),
        Container(
          height: 420,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                AppColors.navy.withValues(alpha: 0.35),
                AppColors.navy.withValues(alpha: 0.85),
              ],
            ),
          ),
        ),
        Positioned(
          left: 24,
          right: 24,
          bottom: 36,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('VIP UZBE',
                  style: TextStyle(
                    color: AppColors.gold,
                    fontSize: 14,
                    letterSpacing: 6,
                    fontWeight: FontWeight.w600,
                  )),
              const SizedBox(height: 10),
              Text(
                'The Pinnacle of\nTashkent Luxury',
                style: Theme.of(context).textTheme.displayLarge?.copyWith(
                      color: Colors.white,
                      height: 1.1,
                    ),
              ),
              const SizedBox(height: 14),
              const Text(
                'Elite themed suites · 24/7 concierge · authentic royal hospitality',
                style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.5),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: onBook,
                child: const Text('BOOK YOUR STAY'),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String text;
  const _SectionTitle(this.text);
  @override
  Widget build(BuildContext context) =>
      Text(text, style: Theme.of(context).textTheme.displaySmall);
}

class _Feature extends StatelessWidget {
  final IconData icon;
  final String label;
  const _Feature(this.icon, this.label);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.navy.withValues(alpha: 0.06),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: AppColors.gold, size: 32),
          const SizedBox(height: 10),
          Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(
                color: AppColors.navy, fontWeight: FontWeight.w600, fontSize: 12, height: 1.3),
          ),
        ],
      ),
    );
  }
}
