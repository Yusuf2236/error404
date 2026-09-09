import 'package:device_preview/device_preview.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'app_state.dart';
import 'data/i18n.dart';
import 'screens/account_screen.dart';
import 'screens/booking_screen.dart';
import 'screens/concierge_chat_screen.dart';
import 'screens/home_screen.dart';
import 'screens/more_screen.dart';
import 'screens/rooms_screen.dart';
import 'theme.dart';
import 'widgets/glass.dart';

// Show the iPhone/Android device frame preview only on desktop/web (where it's
// useful). On a real phone/emulator the app runs full-screen.
final bool _previewEnabled = kIsWeb ||
    defaultTargetPlatform == TargetPlatform.linux ||
    defaultTargetPlatform == TargetPlatform.macOS ||
    defaultTargetPlatform == TargetPlatform.windows;

void main() => runApp(
      DevicePreview(
        enabled: _previewEnabled,
        builder: (context) => const VipUzbeApp(),
      ),
    );

class VipUzbeApp extends StatefulWidget {
  const VipUzbeApp({super.key});

  @override
  State<VipUzbeApp> createState() => _VipUzbeAppState();
}

class _VipUzbeAppState extends State<VipUzbeApp> {
  late final AppState _state = AppState();

  @override
  void dispose() {
    _state.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AppScope(
      state: _state,
      child: ListenableBuilder(
        listenable: _state,
        builder: (context, _) => MaterialApp(
          title: 'VIP UZBE',
          debugShowCheckedModeBanner: false,
          // Wire device_preview so the selected frame/locale drive the app.
          locale: _previewEnabled ? DevicePreview.locale(context) : null,
          builder: _previewEnabled ? DevicePreview.appBuilder : null,
          theme: AppTheme.light,
          darkTheme: AppTheme.dark,
          themeMode: _state.themeMode,
          home: const RootShell(),
        ),
      ),
    );
  }
}

class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<RootShell> {
  int _tab = 0;

  void _goToTab(int i) => setState(() => _tab = i);

  Widget _buildActions(BuildContext context, AppState state, bool immersive) {
    final row = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          tooltip: state.isDark ? 'Light mode' : 'Dark mode',
          onPressed: state.toggleTheme,
          icon: Icon(state.isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              color: AppColors.gold),
        ),
        IconButton(
          tooltip: 'My account',
          onPressed: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => const AccountScreen())),
          icon: state.isLoggedIn
              ? CircleAvatar(
                  radius: 14,
                  backgroundColor: AppColors.gold,
                  child: Text(state.user!.initials,
                      style: const TextStyle(
                          color: AppColors.navy, fontSize: 12, fontWeight: FontWeight.w800)),
                )
              : const Icon(Icons.person_outline, color: AppColors.gold),
        ),
      ],
    );
    if (!immersive) return row;
    // Floating glass pill over the hero (iOS-26 style).
    return Padding(
      padding: const EdgeInsets.only(right: 8, top: 6, bottom: 6),
      child: Glass(
        borderRadius: BorderRadius.circular(30),
        tint: Colors.black.withValues(alpha: 0.22),
        child: row,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Subscribe to AppState so the shell rebuilds on language/availability/auth change.
    final state = AppScope.of(context);

    final lang = state.lang;
    final titles = [
      tr('title.home', lang),
      tr('title.rooms', lang),
      tr('title.book', lang),
      tr('title.more', lang),
    ];
    final pages = [
      HomeScreen(onNavigateTab: _goToTab),
      const RoomsScreen(),
      const BookingScreen(embedded: true),
      const MoreScreen(),
    ];

    final immersive = _tab == 0; // home hero fills the top edge-to-edge
    return Scaffold(
      extendBody: true, // content flows under the frosted glass nav bar
      extendBodyBehindAppBar: immersive,
      appBar: AppBar(
        backgroundColor: immersive ? Colors.transparent : null,
        elevation: 0,
        scrolledUnderElevation: immersive ? 0 : null,
        title: immersive ? const SizedBox.shrink() : Text(titles[_tab]),
        actions: [_buildActions(context, state, immersive)],
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 200),
        child: KeyedSubtree(key: ValueKey(_tab), child: pages[_tab]),
      ),
      floatingActionButton: FloatingActionButton(
        heroTag: 'concierge',
        backgroundColor: AppColors.gold,
        foregroundColor: AppColors.navy,
        onPressed: () => Navigator.push(
            context, MaterialPageRoute(builder: (_) => const ConciergeChatScreen())),
        child: const Icon(Icons.chat_bubble_outline),
      ),
      bottomNavigationBar: Padding(
        padding: EdgeInsets.fromLTRB(
            14, 0, 14, 10 + MediaQuery.of(context).padding.bottom * 0.4),
        child: Glass(
            borderRadius: BorderRadius.circular(28),
            blurred: false, // persistent chrome — solid for high fps
            child: SizedBox(
              height: 64,
              child: Row(
                children: [
                  _NavItem(
                      icon: Icons.home_outlined, activeIcon: Icons.home,
                      label: tr('nav.home', lang), selected: _tab == 0,
                      onTap: () => _goToTab(0)),
                  _NavItem(
                      icon: Icons.hotel_outlined, activeIcon: Icons.hotel,
                      label: tr('nav.rooms', lang), selected: _tab == 1,
                      onTap: () => _goToTab(1)),
                  _NavItem(
                      icon: Icons.event_available_outlined, activeIcon: Icons.event_available,
                      label: tr('nav.book', lang), selected: _tab == 2,
                      onTap: () => _goToTab(2)),
                  _NavItem(
                      icon: Icons.menu, activeIcon: Icons.menu_open,
                      label: tr('nav.more', lang), selected: _tab == 3,
                      onTap: () => _goToTab(3)),
                ],
              ),
            ),
          ),
        ),
    );
  }
}

/// A vertically-centred nav item with a gold pill + bounce-scale tap animation.
class _NavItem extends StatelessWidget {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final activeColor = AppColors.goldDeep;
    final idleColor = AppColors.slate;
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 280),
              curve: Curves.easeOutBack,
              padding: EdgeInsets.symmetric(horizontal: selected ? 18 : 8, vertical: 5),
              decoration: BoxDecoration(
                color: selected ? AppColors.gold.withValues(alpha: 0.22) : Colors.transparent,
                borderRadius: BorderRadius.circular(20),
              ),
              child: AnimatedScale(
                scale: selected ? 1.12 : 1.0,
                duration: const Duration(milliseconds: 280),
                curve: Curves.easeOutBack,
                child: Icon(selected ? activeIcon : icon,
                    color: selected ? activeColor : idleColor, size: 22),
              ),
            ),
            const SizedBox(height: 3),
            AnimatedDefaultTextStyle(
              duration: const Duration(milliseconds: 200),
              style: TextStyle(
                fontSize: 11,
                fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
                color: selected ? context.primaryText : idleColor,
              ),
              child: Text(label),
            ),
          ],
        ),
      ),
    );
  }
}
