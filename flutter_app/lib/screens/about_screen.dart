import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    return Scaffold(
      appBar: AppBar(title: Text(tr('ab.title', lang))),
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
                Text(tr('ab.heading', lang),
                    style: Theme.of(context).textTheme.displaySmall),
                const SizedBox(height: 14),
                Text(
                  tr('ab.p1', lang),
                  style: const TextStyle(color: AppColors.slate, height: 1.7, fontSize: 15),
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    _Stat('15+', tr('ab.stat1', lang)),
                    _Stat('8', tr('ab.stat2', lang)),
                    _Stat('24/7', tr('ab.stat3', lang)),
                  ],
                ),
                const SizedBox(height: 24),
                Text(
                  tr('ab.p2', lang),
                  style: const TextStyle(color: AppColors.slate, height: 1.7, fontSize: 15),
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
              style: TextStyle(color: context.primaryText, fontSize: 12, height: 1.3)),
        ],
      ),
    );
  }
}
