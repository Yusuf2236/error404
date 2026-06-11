import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

/// Talks to the existing Next.js backend (the same one the web site + admin use).
///
/// [baseUrl] defaults to this machine's LAN IP so a physical phone on the same
/// Wi-Fi works out of the box. When running the Flutter app on the same machine
/// (Linux/web) that IP also resolves. Override via --dart-define=API_BASE=... :
///   flutter run --dart-define=API_BASE=http://localhost:3000
class ApiService {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE',
    defaultValue: 'http://192.168.20.158:3000',
  );

  final http.Client _client = http.Client();

  /// Live USD → UZS exchange rate from a free public FX API (no key needed).
  /// Returns 0 only if every source fails — callers fall back to a sane default.
  Future<double> fetchUsdToUzs() async {
    const sources = [
      'https://open.er-api.com/v6/latest/USD',
      'https://api.exchangerate-api.com/v4/latest/USD',
    ];
    for (final url in sources) {
      try {
        final res = await _client.get(Uri.parse(url)).timeout(const Duration(seconds: 8));
        if (res.statusCode == 200) {
          final data = jsonDecode(res.body) as Map<String, dynamic>;
          final rates = data['rates'] as Map<String, dynamic>?;
          final uzs = rates?['UZS'];
          if (uzs is num && uzs > 0) return uzs.toDouble();
        }
      } catch (_) {
        // try the next source
      }
    }
    return 0;
  }

  /// Room ids that are occupied today (status confirmed/paid covering today).
  Future<List<String>> fetchOccupiedRooms() async {
    final res = await _client
        .get(Uri.parse('$baseUrl/api/rooms/availability'))
        .timeout(const Duration(seconds: 10));
    if (res.statusCode == 200) {
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      return (data['occupied'] as List?)?.cast<String>() ?? [];
    }
    throw Exception('Availability failed: ${res.statusCode}');
  }

  /// The signed-in guest's own bookings (by email).
  Future<List<Map<String, dynamic>>> fetchMyBookings(String email) async {
    final res = await _client
        .get(Uri.parse('$baseUrl/api/bookings/mine?email=${Uri.encodeQueryComponent(email)}'))
        .timeout(const Duration(seconds: 10));
    if (res.statusCode == 200) {
      return (jsonDecode(res.body) as List).cast<Map<String, dynamic>>();
    }
    throw Exception('My bookings failed: ${res.statusCode}');
  }

  /// Creates a booking. Returns the created record (incl. id + totalPrice).
  /// Mirrors the fields the Next.js POST /api/bookings handler expects.
  Future<Map<String, dynamic>> createBooking({
    required String name,
    required String email,
    required String phone,
    required String checkIn, // yyyy-MM-dd
    required String checkOut,
    required int guests,
    required String roomType,
    required String paymentMethod,
  }) async {
    final res = await _client
        .post(
          Uri.parse('$baseUrl/api/bookings'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode({
            'name': name,
            'email': email,
            'phone': phone,
            'checkIn': checkIn,
            'checkOut': checkOut,
            'guests': guests,
            'roomType': roomType,
            'paymentMethod': paymentMethod,
          }),
        )
        .timeout(const Duration(seconds: 15));
    if (res.statusCode == 201) {
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    final msg = res.body.isNotEmpty ? res.body : 'status ${res.statusCode}';
    throw Exception('Booking failed: $msg');
  }

  /// Subscribes to the backend's Server-Sent Events stream. Emits an event each
  /// time bookings change (so callers can re-fetch availability live). The
  /// returned stream auto-reconnects via the caller re-subscribing on error.
  Stream<void> watchUpdates() async* {
    final request = http.Request('GET', Uri.parse('$baseUrl/api/events'));
    request.headers['Accept'] = 'text/event-stream';
    final response = await _client.send(request);
    final lines = response.stream
        .transform(utf8.decoder)
        .transform(const LineSplitter());
    await for (final line in lines) {
      if (line.startsWith('event: update')) {
        yield null;
      }
    }
  }

  void dispose() => _client.close();
}
