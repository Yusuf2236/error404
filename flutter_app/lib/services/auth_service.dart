import 'package:shared_preferences/shared_preferences.dart';
import '../models/app_user.dart';

/// Local, demo authentication — mirrors the web app's AuthService (accounts live
/// on the device). Registered guests unlock the member discount.
class AuthService {
  static const _key = 'vip_uzbe_user';

  AppUser? _user;
  AppUser? get user => _user;
  bool get isLoggedIn => _user != null;

  /// Restore any saved session on app start.
  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_key);
    if (raw != null) {
      try {
        _user = AppUser.decode(raw);
      } catch (_) {
        _user = null;
      }
    }
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    if (_user != null) {
      await prefs.setString(_key, _user!.encode());
    } else {
      await prefs.remove(_key);
    }
  }

  String _stamp(int seed) =>
      DateTime.fromMillisecondsSinceEpoch(seed).toIso8601String();

  Future<AppUser> signUp({
    required String name,
    required String email,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600));
    final now = DateTime.now().millisecondsSinceEpoch;
    _user = AppUser(
      id: 'email_$now',
      name: name,
      email: email,
      provider: 'email',
      createdAt: _stamp(now),
    );
    await _persist();
    return _user!;
  }

  Future<AppUser> loginWithEmail(String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 600));
    final now = DateTime.now().millisecondsSinceEpoch;
    final name = email.split('@').first;
    _user = AppUser(
      id: 'email_$now',
      name: name.isEmpty ? 'VIP Guest' : name,
      email: email,
      provider: 'email',
      createdAt: _stamp(now),
    );
    await _persist();
    return _user!;
  }

  /// Simulated social sign-in (like the web demo's OAuth popup).
  Future<AppUser> loginWithProvider(String provider) async {
    await Future.delayed(const Duration(milliseconds: 1200));
    final now = DateTime.now().millisecondsSinceEpoch;
    final email = provider == 'google' ? 'guest@gmail.com' : 'guest@icloud.com';
    _user = AppUser(
      id: '${provider}_$now',
      name: 'VIP Guest',
      email: email,
      provider: provider,
      createdAt: _stamp(now),
    );
    await _persist();
    return _user!;
  }

  Future<void> logout() async {
    _user = null;
    await _persist();
  }
}
