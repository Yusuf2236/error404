import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import '../models/room.dart';
import '../theme.dart';

class RoomCard extends StatelessWidget {
  final Room room;
  final bool occupied;
  final String lang;
  final VoidCallback onTap;

  const RoomCard({
    super.key,
    required this.room,
    required this.occupied,
    required this.lang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final fav = state.isFavorite(room.id);
    return Card(
      clipBehavior: Clip.antiAlias,
      margin: const EdgeInsets.only(bottom: 20),
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                Hero(
                  tag: 'room-${room.id}',
                  child: CachedNetworkImage(
                    imageUrl: room.imageUrl,
                    height: 200,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    placeholder: (c, _) => Container(
                      height: 200,
                      color: const Color(0xFFEDE8E1),
                      child: const Center(
                        child: CircularProgressIndicator(color: AppColors.gold),
                      ),
                    ),
                    errorWidget: (c, _, _) => Container(
                      height: 200,
                      color: const Color(0xFFEDE8E1),
                      child: const Icon(Icons.hotel, color: AppColors.slate, size: 48),
                    ),
                  ),
                ),
                Positioned(
                  top: 12,
                  left: 12,
                  child: _Badge(
                    label: room.type == 'suite' ? 'SUITE' : 'ROOM',
                    color: AppColors.navy,
                    textColor: AppColors.gold,
                  ),
                ),
                if (occupied)
                  Positioned(
                    bottom: 12,
                    left: 12,
                    child: _Badge(
                      label: 'BOOKED',
                      color: Colors.red.shade700,
                      textColor: Colors.white,
                    ),
                  ),
                Positioned(
                  top: 8,
                  right: 8,
                  child: Material(
                    color: Colors.black.withValues(alpha: 0.35),
                    shape: const CircleBorder(),
                    child: InkWell(
                      customBorder: const CircleBorder(),
                      onTap: () => state.toggleFavorite(room.id),
                      child: Padding(
                        padding: const EdgeInsets.all(8),
                        child: Icon(
                          fav ? Icons.favorite : Icons.favorite_border,
                          color: fav ? Colors.redAccent : Colors.white,
                          size: 20,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(room.localizedName(lang),
                      style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 8),
                  Text(
                    room.localizedDescription(lang),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: AppColors.slate, height: 1.4),
                  ),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      RichText(
                        text: TextSpan(
                          children: [
                            TextSpan(
                              text: '\$${room.price}',
                              style: const TextStyle(
                                color: AppColors.goldDeep,
                                fontSize: 22,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                            const TextSpan(
                              text: ' / night',
                              style: TextStyle(color: AppColors.slate, fontSize: 13),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          Text('Details',
                              style: TextStyle(
                                  color: context.primaryText,
                                  fontWeight: FontWeight.w600)),
                          Icon(Icons.arrow_forward, size: 16, color: context.primaryText),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Badge extends StatelessWidget {
  final String label;
  final Color color;
  final Color textColor;
  const _Badge({required this.label, required this.color, required this.textColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: textColor,
          fontSize: 11,
          fontWeight: FontWeight.w700,
          letterSpacing: 1,
        ),
      ),
    );
  }
}
