import 'package:flutter/material.dart';
import 'app_state.dart';
import 'screens/booking_screen.dart';
import 'screens/home_screen.dart';
import 'screens/more_screen.dart';
import 'screens/rooms_screen.dart';
import 'theme.dart';

void main() => runApp(const VipUzbeApp());

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
      child: MaterialApp(
        title: 'VIP UZBE',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light,
        home: const RootShell(),
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

  @override
  Widget build(BuildContext context) {
    // Subscribe to AppState so the shell rebuilds on language/availability change.
    AppScope.of(context);

    final titles = ['VIP UZBE', 'ROOMS & SUITES', 'BOOK', 'MORE'];
    final pages = [
      HomeScreen(onNavigateTab: _goToTab),
      const RoomsScreen(),
      const BookingScreen(embedded: true),
      const MoreScreen(),
    ];

    return Scaffold(
      appBar: AppBar(title: Text(titles[_tab])),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 200),
        child: KeyedSubtree(key: ValueKey(_tab), child: pages[_tab]),
      ),
      bottomNavigationBar: NavigationBarTheme(
        data: NavigationBarThemeData(
          backgroundColor: Colors.white,
          indicatorColor: AppColors.gold.withValues(alpha: 0.18),
          labelTextStyle: WidgetStateProperty.all(
            const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.navy),
          ),
        ),
        child: NavigationBar(
          selectedIndex: _tab,
          onDestinationSelected: _goToTab,
          height: 66,
          destinations: const [
            NavigationDestination(
                icon: Icon(Icons.home_outlined, color: AppColors.slate),
                selectedIcon: Icon(Icons.home, color: AppColors.goldDeep),
                label: 'Home'),
            NavigationDestination(
                icon: Icon(Icons.hotel_outlined, color: AppColors.slate),
                selectedIcon: Icon(Icons.hotel, color: AppColors.goldDeep),
                label: 'Rooms'),
            NavigationDestination(
                icon: Icon(Icons.event_available_outlined, color: AppColors.slate),
                selectedIcon: Icon(Icons.event_available, color: AppColors.goldDeep),
                label: 'Book'),
            NavigationDestination(
                icon: Icon(Icons.menu, color: AppColors.slate),
                selectedIcon: Icon(Icons.menu_open, color: AppColors.goldDeep),
                label: 'More'),
          ],
        ),
      ),
    );
  }
}
