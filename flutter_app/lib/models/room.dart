/// A hotel room/suite. Mirrors the `Room` interface in the web app's
/// src/lib/rooms.ts so the Flutter client and the Next.js backend agree on ids.
class Room {
  final String id;
  final String type; // 'room' | 'suite'
  final Map<String, String> name; // en/uz/ru
  final Map<String, String> description;
  final int price; // USD per night
  final String imageUrl;
  final String locationUrl;

  const Room({
    required this.id,
    required this.type,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    required this.locationUrl,
  });

  String localizedName(String lang) => name[lang] ?? name['en']!;
  String localizedDescription(String lang) =>
      description[lang] ?? description['en']!;
}
