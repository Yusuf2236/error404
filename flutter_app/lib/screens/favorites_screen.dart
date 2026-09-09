import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../data/rooms.dart';
import '../theme.dart';
import '../widgets/page_transition.dart';
import '../widgets/room_card.dart';
import 'room_detail_screen.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final rooms = kRooms.where((r) => state.favorites.contains(r.id)).toList();

    return Scaffold(
      appBar: AppBar(title: Text(tr('fav.title', state.lang))),
      body: rooms.isEmpty
          ? const _Empty()
          : ListView(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
              children: [
                for (final (i, room) in rooms.indexed)
                  RoomCard(
                    room: room,
                    occupied: state.occupied.contains(room.id),
                    lang: state.lang,
                    onTap: () => Navigator.push(
                      context,
                      luxeRoute(RoomDetailScreen(room: room)),
                    ),
                  ).animate().fadeIn(delay: (i * 70).ms).moveY(begin: 16, end: 0),
              ],
            ),
    );
  }
}

class _Empty extends StatelessWidget {
  const _Empty();
  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.favorite_border, size: 80, color: AppColors.slate)
                .animate()
                .scale(curve: Curves.easeOutBack),
            const SizedBox(height: 16),
            Text(tr('fav.empty', lang),
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            Text(tr('fav.emptySub', lang),
                textAlign: TextAlign.center,
                style: TextStyle(color: context.secondaryText, height: 1.5)),
          ],
        ),
      ),
    );
  }
}
