import 'package:flutter/material.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';
import 'concierge_chat_screen.dart';

class ContactScreen extends StatelessWidget {
  const ContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    final tiles = [
      (Icons.location_on_outlined, tr('ct.address', lang), 'Tashkent City, Islam Karimov St, Tashkent, Uzbekistan'),
      (Icons.phone_outlined, tr('ct.phone', lang), '+998 71 200 00 00'),
      (Icons.email_outlined, tr('ct.email', lang), 'info@jofosh.uz'),
      (Icons.access_time, tr('ct.reception', lang), tr('ct.open247', lang)),
    ];
    return Scaffold(
      appBar: AppBar(title: Text(tr('ct.title', lang))),
      body: ListView(
        padding: const EdgeInsets.all(22),
        children: [
          Text(tr('ct.getInTouch', lang), style: Theme.of(context).textTheme.displaySmall),
          const SizedBox(height: 8),
          Text(tr('ct.sub', lang),
              style: TextStyle(color: context.secondaryText, fontSize: 15)),
          const SizedBox(height: 24),
          for (final t in tiles) _tile(context, t.$1, t.$2, t.$3),
          const SizedBox(height: 8),
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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(tr('ct.conciergeTitle', lang),
                    style: const TextStyle(
                        color: AppColors.gold, fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text(
                  tr('ct.conciergeBody', lang),
                  style: const TextStyle(color: Colors.white70, height: 1.6),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  onPressed: () => Navigator.push(
                      context, MaterialPageRoute(builder: (_) => const ConciergeChatScreen())),
                  icon: const Icon(Icons.chat_bubble_outline, size: 18),
                  label: Text(tr('ct.startChat', lang)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _tile(BuildContext context, IconData icon, String title, String value) => Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: context.cardSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: context.cardBorder),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: AppColors.gold.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppColors.goldDeep),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: TextStyle(
                          color: context.secondaryText, fontSize: 12, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 3),
                  Text(value,
                      style: TextStyle(
                          color: context.primaryText, fontWeight: FontWeight.w600, height: 1.3)),
                ],
              ),
            ),
          ],
        ),
      );
}
