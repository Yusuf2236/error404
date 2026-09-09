import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../theme.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ABOUT')),
      body: ListView(
        children: [
          CachedNetworkImage(
            imageUrl:
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            height: 220,
            width: double.infinity,
            fit: BoxFit.cover,
            placeholder: (c, _) => Container(height: 220, color: AppColors.navy),
            errorWidget: (c, _, _) => Container(height: 220, color: AppColors.navy),
          ),
          Padding(
            padding: const EdgeInsets.all(22),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('The VIP UZBE Standard',
                    style: Theme.of(context).textTheme.displaySmall),
                const SizedBox(height: 14),
                const Text(
                  'VIP UZBE is the pinnacle of Tashkent luxury — a sanctuary where ancient '
                  'Uzbek hospitality meets contemporary elegance. Every suite tells a story, '
                  'every detail is intentional, and every guest is treated as royalty.',
                  style: TextStyle(color: AppColors.slate, height: 1.7, fontSize: 15),
                ),
                const SizedBox(height: 24),
                Row(
                  children: const [
                    _Stat('15+', 'Years of\nExcellence'),
                    _Stat('8', 'Signature\nSuites'),
                    _Stat('24/7', 'Concierge\nService'),
                  ],
                ),
                const SizedBox(height: 24),
                const Text(
                  'Located in the heart of Tashkent, moments from Tashkent City, Chorsu Bazaar '
                  'and the Broadway, VIP UZBE places the soul of Uzbekistan at your doorstep.',
                  style: TextStyle(color: AppColors.slate, height: 1.7, fontSize: 15),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  final String value;
  final String label;
  const _Stat(this.value, this.label);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Text(value,
              style: const TextStyle(
                  color: AppColors.goldDeep, fontSize: 28, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text(label,
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppColors.navy, fontSize: 12, height: 1.3)),
        ],
      ),
    );
  }
}
