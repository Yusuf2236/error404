import 'dart:async';
import 'package:flutter/material.dart';
import 'services/api_service.dart';

/// App-wide state: selected language + live room availability.
/// Availability is refreshed on demand AND pushed live via the backend's SSE
/// stream — exactly like the web site's real-time "Booked" badges.
class AppState extends ChangeNotifier {
  final ApiService api = ApiService();

  String lang = 'en';
  Set<String> occupied = {};
  bool loadingAvailability = false;
  bool backendOnline = true;

  StreamSubscription<void>? _sseSub;

  AppState() {
    refreshAvailability();
    _listenForUpdates();
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
