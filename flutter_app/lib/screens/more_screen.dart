import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';
import 'about_screen.dart';
import 'account_screen.dart';
import 'concierge_chat_screen.dart';
import 'contact_screen.dart';
import 'favorites_screen.dart';
import 'gallery_screen.dart';
import 'services_screen.dart';

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final lang = state.lang;
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 110),
      children: [
        // Account banner
        GestureDetector(
          onTap: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const AccountScreen())),
          child: Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppColors.navy, Color(0xFF1B2438)],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.gold.withValues(alpha: 0.25)),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: AppColors.gold,
                  child: state.isLoggedIn
                      ? Text(state.user!.initials,
                          style: const TextStyle(
                              color: AppColors.navy, fontWeight: FontWeight.w800, fontSize: 18))
                      : const Icon(Icons.person_outline, color: AppColors.navy),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(state.isLoggedIn ? state.user!.name : tr('mr.guest', lang),
                          style: const TextStyle(
                              color: Colors.white, fontSize: 17, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 2),
                      Text(
                          state.isLoggedIn
                              ? tr('mr.eliteMember', lang)
                              : tr('mr.signInSave', lang),
                          style: const TextStyle(color: AppColors.gold, fontSize: 12)),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right, color: AppColors.gold),
              ],
            ),
          ),
        ).animate().fadeIn().moveY(begin: 14, end: 0),
        const SizedBox(height: 26),
        Text(tr('mr.explore', lang), style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 14),
        ...[
          (Icons.support_agent_outlined, tr('ac.concierge', lang), tr('mr.svcConcierge', lang), const ConciergeChatScreen()),
          (Icons.favorite_border, tr('ac.favourites', lang), tr('ac.favouritesSub', lang), const FavoritesScreen()),
          (Icons.room_service_outlined, tr('mr.navServices', lang), tr('mr.svcServices', lang), const ServicesScreen()),
          (Icons.photo_library_outlined, tr('mr.navGallery', lang), tr('mr.svcGallery', lang), const GalleryScreen()),
          (Icons.info_outline, tr('mr.navAbout', lang), tr('mr.svcAbout', lang), const AboutScreen()),
          (Icons.mail_outline, tr('mr.navContact', lang), tr('mr.svcContact', lang), const ContactScreen()),
        ].indexed.map((e) => _MenuItem(
              icon: e.$2.$1,
              title: e.$2.$2,
              subtitle: e.$2.$3,
              screen: e.$2.$4,
              index: e.$1,
            )),
        const SizedBox(height: 24),
        Text(tr('mr.language', lang),
            style: const TextStyle(
                color: AppColors.slate, fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
        const SizedBox(height: 12),
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
        const SizedBox(height: 34),
        Center(
          child: Column(
            children: [
              const Icon(Icons.workspace_premium, color: AppColors.gold, size: 22),
              const SizedBox(height: 6),
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
}

class _MenuItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Widget screen;
  final int index;
  const _MenuItem({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.screen,
    required this.index,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
              color: AppColors.navy.withValues(alpha: 0.06),
              blurRadius: 14,
              offset: const Offset(0, 6)),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => screen)),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Row(
              children: [
                Container(
                  width: 46,
                  height: 46,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: [
                      AppColors.gold.withValues(alpha: 0.18),
                      AppColors.goldDeep.withValues(alpha: 0.10),
                    ]),
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
                          style: const TextStyle(
                              color: AppColors.navy, fontWeight: FontWeight.w700, fontSize: 15)),
                      const SizedBox(height: 2),
                      Text(subtitle,
                          style: const TextStyle(color: AppColors.slate, fontSize: 12)),
                    ],
                  ),
                ),
                const Icon(Icons.chevron_right, color: AppColors.slate),
              ],
            ),
          ),
        ),
      ),
    ).animate().fadeIn(delay: (index * 80).ms).moveX(begin: 16, end: 0);
  }
}
