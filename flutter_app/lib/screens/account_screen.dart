import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';
import 'concierge_chat_screen.dart';
import 'favorites_screen.dart';
import 'login_screen.dart';
import 'my_bookings_screen.dart';
import 'signup_screen.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    return Scaffold(
      appBar: AppBar(title: Text(tr('ac.title', state.lang))),
      body: state.isLoggedIn ? _Profile(state) : const _Guest(),
    );
  }
}

class _Guest extends StatelessWidget {
  const _Guest();

  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    final perks = [
      (Icons.percent, tr('ac.perk.discount', lang), tr('ac.perk.discountSub', lang)),
      (Icons.support_agent_outlined, tr('ac.perk.concierge', lang), tr('ac.perk.conciergeSub', lang)),
      (Icons.favorite_border, tr('ac.perk.fav', lang), tr('ac.perk.favSub', lang)),
      (Icons.card_giftcard_outlined, tr('ac.perk.rewards', lang), tr('ac.perk.rewardsSub', lang)),
    ];
    return ListView(
      padding: const EdgeInsets.fromLTRB(24, 28, 24, 28),
      children: [
        // Crown emblem
        Center(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.gold.withValues(alpha: 0.12),
              border: Border.all(color: AppColors.gold.withValues(alpha: 0.5)),
            ),
            child: const Icon(Icons.workspace_premium, color: AppColors.gold, size: 40),
          ),
        ).animate().fadeIn().scale(curve: Curves.easeOutBack),
        const SizedBox(height: 18),
        Text(tr('ac.join', lang),
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 8),
        Text(
          tr('ac.joinSub', lang),
          textAlign: TextAlign.center,
          style: TextStyle(color: context.secondaryText, height: 1.5),
        ),
        const SizedBox(height: 22),
        // Glowing 20% card
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [AppColors.gold, AppColors.goldDeep]),
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                  color: AppColors.gold.withValues(alpha: 0.35), blurRadius: 20, offset: const Offset(0, 8)),
            ],
          ),
          child: Row(
            children: [
              const Text('20%', style: TextStyle(color: AppColors.navy, fontSize: 38, fontWeight: FontWeight.w900)),
              const SizedBox(width: 14),
              Expanded(
                child: Text(tr('ac.welcome20', lang),
                    style: const TextStyle(color: AppColors.navy, fontWeight: FontWeight.w600, height: 1.4)),
              ),
            ],
          ),
        )
            .animate(onPlay: (c) => c.repeat())
            .shimmer(delay: 1400.ms, duration: 1800.ms, color: Colors.white.withValues(alpha: 0.5)),
        const SizedBox(height: 22),
        // Perks list
        for (final (i, p) in perks.indexed)
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: context.cardSurface,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: context.cardBorder),
            ),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: AppColors.gold.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(p.$1, color: AppColors.goldDeep, size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p.$2,
                          style: TextStyle(
                              color: context.primaryText, fontWeight: FontWeight.w700, fontSize: 14)),
                      Text(p.$3, style: TextStyle(color: context.secondaryText, fontSize: 12)),
                    ],
                  ),
                ),
                const Icon(Icons.check_circle, color: AppColors.gold, size: 18),
              ],
            ),
          ).animate().fadeIn(delay: (300 + i * 90).ms).moveX(begin: 16, end: 0),
        const SizedBox(height: 14),
        ElevatedButton(
          onPressed: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const SignupScreen())),
          style: ElevatedButton.styleFrom(
            minimumSize: const Size.fromHeight(52),
          ),
          child: Text(tr('ac.create20', lang)),
        ),
        const SizedBox(height: 12),
        OutlinedButton(
          onPressed: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const LoginScreen())),
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.gold,
            side: BorderSide(color: AppColors.gold.withValues(alpha: 0.6)),
            minimumSize: const Size.fromHeight(50),
          ),
          child: Text(tr('ac.haveAccount', lang)),
        ),
      ],
    );
  }
}

class _Profile extends StatelessWidget {
  final AppState state;
  const _Profile(this.state);

  @override
  Widget build(BuildContext context) {
    final u = state.user!;
    final lang = state.lang;
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        // Header card
        Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            color: AppColors.navy,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            children: [
              CircleAvatar(
                radius: 32,
                backgroundColor: AppColors.gold,
                child: Text(u.initials,
                    style: const TextStyle(
                        color: AppColors.navy, fontWeight: FontWeight.w800, fontSize: 22)),
              ).animate().scale(curve: Curves.easeOutBack),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(u.name,
                        style: const TextStyle(
                            color: Colors.white, fontSize: 19, fontWeight: FontWeight.w700)),
                    const SizedBox(height: 2),
                    Text(u.email, style: const TextStyle(color: Colors.white70, fontSize: 13)),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                      decoration: BoxDecoration(
                        color: AppColors.gold.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.workspace_premium, color: AppColors.gold, size: 14),
                          const SizedBox(width: 4),
                          Text('${tr('ac.eliteMember', lang)} ${u.provider}',
                              style: const TextStyle(
                                  color: AppColors.gold, fontSize: 10, fontWeight: FontWeight.w700)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ).animate().fadeIn().moveY(begin: 14, end: 0),
        const SizedBox(height: 16),
        // Discount card
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [AppColors.gold, AppColors.goldDeep]),
            borderRadius: BorderRadius.circular(18),
          ),
          child: Row(
            children: [
              const Text('20%',
                  style: TextStyle(color: AppColors.navy, fontSize: 40, fontWeight: FontWeight.w900)),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(tr('ac.discountActive', lang),
                        style: const TextStyle(color: AppColors.navy, fontWeight: FontWeight.w800, fontSize: 15)),
                    const SizedBox(height: 4),
                    Text(tr('ac.discountActiveSub', lang),
                        style: const TextStyle(color: AppColors.navy, fontSize: 12, height: 1.3)),
                  ],
                ),
              ),
            ],
          ),
        )
            .animate(onPlay: (c) => c.repeat())
            .shimmer(delay: 1200.ms, duration: 1800.ms, color: Colors.white.withValues(alpha: 0.5)),
        const SizedBox(height: 16),
        _row(Icons.event_available_outlined, tr('ac.myBookings', lang), tr('ac.myBookingsSub', lang),
            onTap: () => Navigator.push(
                context, MaterialPageRoute(builder: (_) => const MyBookingsScreen()))),
        _row(Icons.favorite_border, tr('ac.favourites', lang), tr('ac.favouritesSub', lang),
            onTap: () => Navigator.push(
                context, MaterialPageRoute(builder: (_) => const FavoritesScreen()))),
        _row(Icons.support_agent_outlined, tr('ac.concierge', lang), tr('ac.conciergeSub', lang),
            onTap: () => Navigator.push(
                context, MaterialPageRoute(builder: (_) => const ConciergeChatScreen()))),
        const SizedBox(height: 20),
        OutlinedButton.icon(
          onPressed: () => state.logout(),
          icon: const Icon(Icons.logout, size: 18),
          style: OutlinedButton.styleFrom(
            foregroundColor: Colors.red.shade600,
            side: BorderSide(color: Colors.red.shade200),
            padding: const EdgeInsets.symmetric(vertical: 14),
          ),
          label: Text(tr('c.signOut', lang)),
        ),
      ],
    );
  }

  Widget _row(IconData icon, String title, String sub, {VoidCallback? onTap}) => Builder(
      builder: (context) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          color: context.cardSurface,
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
            onTap: onTap,
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
                        style: TextStyle(
                            color: context.primaryText, fontWeight: FontWeight.w700, fontSize: 15)),
                    const SizedBox(height: 2),
                    Text(sub, style: TextStyle(color: context.secondaryText, fontSize: 12)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: AppColors.slate),
            ],
          ),
            ),
          ),
        ),
      ),
    );
}
