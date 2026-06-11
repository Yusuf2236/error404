import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'models/app_user.dart';
import 'services/api_service.dart';
import 'services/auth_service.dart';

/// App-wide state: language, live availability, and the signed-in guest.
/// Availability is pushed live via the backend's SSE stream — like the web
/// site's real-time "Booked" badges. Registered guests unlock [memberDiscount].
class AppState extends ChangeNotifier {
  final ApiService api = ApiService();
  final AuthService auth = AuthService();

  /// 20% off for registered members.
  static const double memberDiscount = 0.20;

  String lang = 'en';
  Set<String> occupied = {};
  bool loadingAvailability = false;
  bool backendOnline = true;

  /// Live USD→UZS rate. Falls back to a sane default until the first fetch lands.
  double usdToUzs = 12850;
  bool fxLoading = false;

  /// EUR per 1 USD (relatively stable; the FX API only gives UZS, so this is a
  /// sane fixed cross-rate used for the converter).
  static const double usdToEur = 0.92;

  /// Display currency the guest has chosen. Room prices are stored in USD.
  String currency = 'USD';

  /// Convert a USD price into the chosen [currency].
  double convert(int usdPrice) {
    switch (currency) {
      case 'UZS':
        return usdPrice * usdToUzs;
      case 'EUR':
        return usdPrice * usdToEur;
      default:
        return usdPrice.toDouble();
    }
  }

  /// Format a USD price in the chosen currency, e.g. "$320", "4 112 000 so'm",
  /// "€294".
  String money(int usdPrice) {
    final v = convert(usdPrice);
    switch (currency) {
      case 'UZS':
        final s = v.round().toString().replaceAllMapped(
            RegExp(r'(\d)(?=(\d{3})+$)'), (m) => '${m[1]} ');
        return "$s so'm";
      case 'EUR':
        return '€${v.round()}';
      default:
        return '\$${v.round()}';
    }
  }

  Future<void> setCurrency(String c) async {
    currency = c;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('vip_currency', c);
  }

  ThemeMode themeMode = ThemeMode.light;

  /// Saved room ids (wishlist), persisted on the device.
  Set<String> favorites = {};

  StreamSubscription<void>? _sseSub;

  AppState() {
    _restoreSession();
    refreshAvailability();
    refreshRate();
    _listenForUpdates();
  }

  // --- Theme ---
  bool get isDark => themeMode == ThemeMode.dark;

  Future<void> toggleTheme() async {
    themeMode = isDark ? ThemeMode.light : ThemeMode.dark;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('vip_dark', isDark);
  }

  // --- Currency ---
  Future<void> refreshRate() async {
    fxLoading = true;
    notifyListeners();
    try {
      final r = await api.fetchUsdToUzs();
      if (r > 0) usdToUzs = r; // keep last good rate if the API returns 0
    } catch (_) {
      // keep fallback
    } finally {
      fxLoading = false;
      notifyListeners();
    }
  }

  // --- Auth ---
  AppUser? get user => auth.user;
  bool get isLoggedIn => auth.isLoggedIn;

  Future<void> _restoreSession() async {
    await auth.load();
    final prefs = await SharedPreferences.getInstance();
    if (prefs.getBool('vip_dark') ?? false) themeMode = ThemeMode.dark;
    currency = prefs.getString('vip_currency') ?? 'USD';
    favorites = (prefs.getStringList('vip_favorites') ?? []).toSet();
    notifyListeners();
  }

  // --- Wishlist ---
  bool isFavorite(String id) => favorites.contains(id);

  Future<void> toggleFavorite(String id) async {
    if (!favorites.add(id)) favorites.remove(id);
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList('vip_favorites', favorites.toList());
  }

  /// Discounted price for members, otherwise the full price.
  int priceFor(int basePrice) =>
      isLoggedIn ? (basePrice * (1 - memberDiscount)).round() : basePrice;

  void onAuthChanged() => notifyListeners();

  Future<void> logout() async {
    await auth.logout();
    notifyListeners();
  }

  void setLang(String l) {
    lang = l;
    notifyListeners();
  }

  Future<void> refreshAvailability() async {
    loadingAvailability = true;
    notifyListeners();
    try {
      occupied = (await api.fetchOccupiedRooms()).toSet();
      backendOnline = true;
    } catch (_) {
      backendOnline = false;
    } finally {
      loadingAvailability = false;
      notifyListeners();
    }
  }

  /// Keep an SSE connection open; on any booking change, re-pull availability.
  /// Reconnects with a short backoff if the stream drops.
  void _listenForUpdates() {
    _sseSub?.cancel();
    _sseSub = api.watchUpdates().listen(
      (_) => refreshAvailability(),
      onError: (_) => _scheduleReconnect(),
      onDone: _scheduleReconnect,
      cancelOnError: true,
    );
  }

  void _scheduleReconnect() {
    Future.delayed(const Duration(seconds: 5), _listenForUpdates);
  }

  @override
  void dispose() {
    _sseSub?.cancel();
    api.dispose();
    super.dispose();
  }
}

/// Exposes [AppState] to the widget tree and rebuilds dependents on change.
class AppScope extends InheritedNotifier<AppState> {
  const AppScope({super.key, required AppState state, required super.child})
      : super(notifier: state);

  static AppState of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<AppScope>();
    assert(scope?.notifier != null, 'AppScope not found in widget tree');
    return scope!.notifier!;
  }
}
