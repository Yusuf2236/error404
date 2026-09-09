import 'package:flutter/material.dart';
import '../theme.dart';

class ServicesScreen extends StatelessWidget {
  const ServicesScreen({super.key});

  static const _services = [
    (Icons.spa_outlined, 'Royal Spa & Hammam', 'Traditional Uzbek hammam rituals and signature treatments.'),
    (Icons.restaurant_outlined, 'Fine Dining', 'Authentic plov to international haute cuisine, 24/7.'),
    (Icons.pool_outlined, 'Infinity Pool', 'Rooftop pool overlooking the Tashkent skyline.'),
    (Icons.celebration_outlined, 'Events & Weddings', 'Grand ballrooms for unforgettable celebrations.'),
    (Icons.directions_car_filled_outlined, 'Chauffeur Service', 'Luxury fleet with professional drivers.'),
    (Icons.support_agent_outlined, '24/7 Concierge', 'Your every wish, anticipated and arranged.'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('SERVICES')),
      body: GridView.count(
        padding: const EdgeInsets.all(20),
        crossAxisCount: 2,
        mainAxisSpacing: 14,
        crossAxisSpacing: 14,
        childAspectRatio: 0.82,
        children: _services
            .map((s) => Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.navy.withValues(alpha: 0.06),
                        blurRadius: 14, offset: const Offset(0, 6)),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.cream,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(s.$1, color: AppColors.goldDeep, size: 28),
                      ),
                      const Spacer(),
                      Text(s.$2,
                          style: const TextStyle(
                              color: AppColors.navy, fontWeight: FontWeight.w700, fontSize: 15)),
                      const SizedBox(height: 6),
                      Text(s.$3,
                          style: const TextStyle(color: AppColors.slate, fontSize: 12, height: 1.4)),
                    ],
                  ),
                ))
            .toList(),
      ),
    );
  }
}
