import 'package:flutter/material.dart';
import '../theme.dart';

class ContactScreen extends StatelessWidget {
  const ContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('CONTACT')),
      body: ListView(
        padding: const EdgeInsets.all(22),
        children: [
          Text('Get in touch', style: Theme.of(context).textTheme.displaySmall),
          const SizedBox(height: 8),
          const Text('Our concierge is available around the clock.',
              style: TextStyle(color: AppColors.slate, fontSize: 15)),
          const SizedBox(height: 24),
          _tile(Icons.location_on_outlined, 'Address',
              'Tashkent City, Islam Karimov St, Tashkent, Uzbekistan'),
          _tile(Icons.phone_outlined, 'Phone', '+998 71 200 00 00'),
          _tile(Icons.email_outlined, 'Email', 'info@jofosh.uz'),
          _tile(Icons.access_time, 'Reception', 'Open 24 / 7'),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.navy,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Royal Concierge',
                    style: TextStyle(
                        color: AppColors.gold, fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                const Text(
                  'Need a private tour, a dinner reservation, or airport pickup? '
                  'Message us and consider it arranged.',
                  style: TextStyle(color: Colors.white70, height: 1.6),
                ),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.chat_bubble_outline, size: 18),
                  label: const Text('START A CHAT'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _tile(IconData icon, String title, String value) => Container(
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppColors.cream,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: AppColors.goldDeep),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: const TextStyle(
                          color: AppColors.slate, fontSize: 12, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 3),
                  Text(value,
                      style: const TextStyle(
                          color: AppColors.navy, fontWeight: FontWeight.w600, height: 1.3)),
                ],
              ),
            ),
          ],
        ),
      );
}
