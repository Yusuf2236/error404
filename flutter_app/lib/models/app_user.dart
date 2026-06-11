import 'dart:convert';

/// A registered guest. Mirrors the web app's demo `User` (AuthService.ts) —
/// accounts are stored locally on the device, no backend auth required.
class AppUser {
  final String id;
  final String name;
  final String email;
  final String provider; // 'email' | 'google' | 'apple'
  final String createdAt;

  const AppUser({
    required this.id,
    required this.name,
    required this.email,
    required this.provider,
    required this.createdAt,
  });

  /// Up to two initials for the avatar circle.
  String get initials {
    final parts = name.trim().split(RegExp(r'\s+')).where((p) => p.isNotEmpty).toList();
    if (parts.isEmpty) return '?';
    if (parts.length == 1) return parts.first.substring(0, 1).toUpperCase();
    return (parts.first.substring(0, 1) + parts[1].substring(0, 1)).toUpperCase();
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'provider': provider,
        'createdAt': createdAt,
      };

  factory AppUser.fromJson(Map<String, dynamic> j) => AppUser(
        id: j['id'] as String,
        name: j['name'] as String,
        email: j['email'] as String,
        provider: j['provider'] as String? ?? 'email',
        createdAt: j['createdAt'] as String? ?? '',
      );

  String encode() => jsonEncode(toJson());
  static AppUser decode(String s) => AppUser.fromJson(jsonDecode(s) as Map<String, dynamic>);
}
