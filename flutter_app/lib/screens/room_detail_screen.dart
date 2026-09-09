import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import '../models/room.dart';
import '../theme.dart';
import 'booking_screen.dart';

class RoomDetailScreen extends StatelessWidget {
  final Room room;
  const RoomDetailScreen({super.key, required this.room});

  static const _amenities = [
    ('King Bed', Icons.bed),
    ('Free Wi-Fi', Icons.wifi),
    ('City View', Icons.landscape_outlined),
    ('Mini Bar', Icons.local_bar_outlined),
    ('Smart TV', Icons.tv),
    ('Room Service', Icons.room_service_outlined),
  ];

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final occupied = state.occupied.contains(room.id);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: AppColors.navy,
            foregroundColor: AppColors.gold,
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  CachedNetworkImage(
                    imageUrl: room.imageUrl,
                    fit: BoxFit.cover,
                    placeholder: (c, _) => Container(color: AppColors.navy),
                    errorWidget: (c, _, _) => Container(color: AppColors.navy),
                  ),
                  const DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.center,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black54],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(22),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.navy,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          room.type == 'suite' ? 'SUITE' : 'ROOM',
                          style: const TextStyle(
                              color: AppColors.gold, fontSize: 11, letterSpacing: 1,
                              fontWeight: FontWeight.w700),
                        ),
                      ),
                      const Spacer(),
                      if (occupied)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.red.shade700,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text('BOOKED TODAY',
                              style: TextStyle(color: Colors.white, fontSize: 11,
                                  fontWeight: FontWeight.w700)),
                        ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Text(room.localizedName(state.lang),
                      style: Theme.of(context).textTheme.displaySmall),
                  const SizedBox(height: 12),
                  Text(
                    room.localizedDescription(state.lang),
                    style: const TextStyle(color: AppColors.slate, height: 1.6, fontSize: 15),
                  ),
                  const SizedBox(height: 24),
                  Text('Amenities', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 14),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: _amenities
                        .map((a) => Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(10),
                                border: Border.all(color: const Color(0xFFE2E8F0)),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(a.$2, size: 18, color: AppColors.goldDeep),
                                  const SizedBox(width: 8),
                                  Text(a.$1,
                                      style: const TextStyle(
                                          color: AppColors.navy, fontWeight: FontWeight.w500)),
                                ],
                              ),
                            ))
                        .toList(),
                  ),
                  const SizedBox(height: 90),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.fromLTRB(22, 14, 22, 22),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(color: AppColors.navy.withValues(alpha: 0.08), blurRadius: 16,
                offset: const Offset(0, -4)),
          ],
        ),
        child: SafeArea(
          top: false,
          child: Row(
            children: [
              RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: '\$${room.price}',
                    style: const TextStyle(
                        color: AppColors.goldDeep, fontSize: 26, fontWeight: FontWeight.w800),
                  ),
                  const TextSpan(
                    text: ' / night',
                    style: TextStyle(color: AppColors.slate, fontSize: 13),
                  ),
                ]),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => BookingScreen(preselectedRoomId: room.id),
                  ),
                ),
                child: const Text('BOOK NOW'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
