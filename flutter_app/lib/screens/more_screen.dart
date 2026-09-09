import 'package:flutter/material.dart';
import '../app_state.dart';
import '../theme.dart';
import 'about_screen.dart';
import 'contact_screen.dart';
import 'gallery_screen.dart';
import 'services_screen.dart';

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Text('Explore', style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 16),
        _item(context, Icons.room_service_outlined, 'Services', const ServicesScreen()),
        _item(context, Icons.photo_library_outlined, 'Gallery', const GalleryScreen()),
        _item(context, Icons.info_outline, 'About', const AboutScreen()),
        _item(context, Icons.contact_mail_outlined, 'Contact', const ContactScreen()),
        const SizedBox(height: 24),
        const Text('LANGUAGE',
            style: TextStyle(
                color: AppColors.slate, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
        const SizedBox(height: 10),
        Row(
          children: [
            for (final l in const [('en', 'English'), ('uz', "O'zbek"), ('ru', 'Русский')])
              Padding(
                padding: const EdgeInsets.only(right: 8),
                child: ChoiceChip(
                  label: Text(l.$2),
                  selected: state.lang == l.$1,
                  selectedColor: AppColors.navy,
                  labelStyle: TextStyle(
                    color: state.lang == l.$1 ? AppColors.gold : AppColors.slate,
                    fontWeight: FontWeight.w600,
                  ),
                  onSelected: (_) => state.setLang(l.$1),
                ),
              ),
          ],
        ),
        const SizedBox(height: 30),
        Center(
          child: Column(
            children: [
              const Text('VIP UZBE',
                  style: TextStyle(
                      color: AppColors.gold, letterSpacing: 4, fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text('Flutter client · powered by the Next.js backend',
                  style: TextStyle(color: AppColors.slate.withValues(alpha: 0.7), fontSize: 11)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _item(BuildContext context, IconData icon, String title, Widget screen) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: ListTile(
        leading: Icon(icon, color: AppColors.goldDeep),
        title: Text(title,
            style: const TextStyle(color: AppColors.navy, fontWeight: FontWeight.w600)),
        trailing: const Icon(Icons.chevron_right, color: AppColors.slate),
        onTap: () => Navigator.push(
            context, MaterialPageRoute(builder: (_) => screen)),
      ),
    );
  }
}
