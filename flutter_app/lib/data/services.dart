import 'package:flutter/material.dart';

class HotelService {
  final String id;
  final String emoji;
  final IconData icon;
  final String title;
  final String tagline;
  final String description;
  final String hero;
  final List<String> gallery;
  final List<(IconData, String)> features;

  const HotelService({
    required this.id,
    required this.emoji,
    required this.icon,
    required this.title,
    required this.tagline,
    required this.description,
    required this.hero,
    required this.gallery,
    required this.features,
  });
}

// Ids already include the "photo-" prefix, so wrap them directly.
String _u(String id) =>
    'https://images.unsplash.com/$id?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

const List<HotelService> kServices = [
  HotelService(
    id: 'dining',
    emoji: '🍽️',
    icon: Icons.restaurant_outlined,
    title: 'Uzbek Fine Dining',
    tagline: 'Michelin-star flavours, 24/7',
    description:
        'Our chefs reimagine the legendary flavours of Uzbekistan — golden Bukhara plov, '
        'slow-roasted lamb, hand-folded manti and shashlik kissed by open flame. Each dish '
        'pairs centuries-old recipes with modern plating.\n\nDine in our grand hall, on the '
        'terrace overlooking Tashkent City, or privately in your suite — at any hour.',
    hero: 'photo-1414235077428-338989a2e8c0',
    gallery: [
      'photo-1603333388123-8858448d9071',
      'photo-1544025162-d76694265947',
      'photo-1529193591184-b1d58fb3534b',
      'photo-1517248135467-4c7edcad34c4',
    ],
    features: [
      (Icons.local_dining, 'À la carte & tasting menus'),
      (Icons.room_service_outlined, '24/7 in-suite dining'),
      (Icons.local_bar_outlined, 'Sommelier wine pairing'),
      (Icons.restaurant_menu, 'Halal & vegetarian options'),
    ],
  ),
  HotelService(
    id: 'spa',
    emoji: '🧖‍♀️',
    icon: Icons.spa_outlined,
    title: 'Royal Spa & Hammam',
    tagline: 'Ancient Bukhara rituals',
    description:
        'Step into a marble sanctuary inspired by the bathhouses of ancient Bukhara. Our '
        'signature gold facial, herbal wraps and hot-stone therapy melt away the city.\n\n'
        'A private hammam, steam rooms and a tea lounge complete the journey — guided by '
        'master therapists.',
    hero: 'photo-1600334089648-b0d9d3028eb2',
    gallery: [
      'photo-1544161515-4ab6ce6db874',
      'photo-1600334089648-b0d9d3028eb2',
      'photo-1515377905703-c4788e51af15',
    ],
    features: [
      (Icons.spa, 'Signature gold facial'),
      (Icons.hot_tub_outlined, 'Private marble hammam'),
      (Icons.self_improvement, 'Hot-stone & herbal therapy'),
      (Icons.emoji_food_beverage_outlined, 'Tea lounge'),
    ],
  ),
  HotelService(
    id: 'pool',
    emoji: '🏊‍♂️',
    icon: Icons.pool_outlined,
    title: 'Infinity Sky Pool',
    tagline: 'Swim above the skyline',
    description:
        'Glide across our heated rooftop infinity pool as the Tashkent skyline stretches '
        'beneath you. By day, sun loungers and cabanas; by night, a glowing edge-lit oasis '
        'with cocktail service.',
    hero: 'photo-1571896349842-33c89424de2d',
    gallery: [
      'photo-1571896349842-33c89424de2d',
      'photo-1540541338287-41700207dee6',
      'photo-1551632436-cbf8dd35adfa',
    ],
    features: [
      (Icons.waves, 'Heated infinity pool'),
      (Icons.beach_access_outlined, 'Private cabanas'),
      (Icons.local_bar_outlined, 'Poolside cocktail service'),
      (Icons.wb_sunny_outlined, 'Sky deck & loungers'),
    ],
  ),
  HotelService(
    id: 'chauffeur',
    emoji: '🚗',
    icon: Icons.directions_car_filled_outlined,
    title: 'VIP Chauffeur',
    tagline: 'A private luxury fleet',
    description:
        'Travel the city in a Rolls-Royce, Maybach or Range Rover, each with a discreet, '
        'professional chauffeur. Airport transfers, business meetings or moonlit tours of '
        'Tashkent — arranged in moments.',
    hero: 'photo-1503376780353-7e6692767b70',
    gallery: [
      'photo-1503376780353-7e6692767b70',
      'photo-1618843479313-40f8afb4b4d8',
      'photo-1549317661-bd32c8ce0db2',
    ],
    features: [
      (Icons.flight_takeoff, 'Complimentary airport transfer'),
      (Icons.directions_car, 'Rolls-Royce · Maybach · Range Rover'),
      (Icons.workspace_premium, 'Professional chauffeurs'),
      (Icons.schedule, 'On call 24/7'),
    ],
  ),
  HotelService(
    id: 'events',
    emoji: '🎉',
    icon: Icons.celebration_outlined,
    title: 'Events & Weddings',
    tagline: 'Unforgettable celebrations',
    description:
        'From grand weddings to executive summits, our ballrooms and terraces host up to 500 '
        'guests. A dedicated events team handles décor, catering and entertainment so every '
        'moment is flawless.',
    hero: 'photo-1519167758481-83f550bb49b3',
    gallery: [
      'photo-1519167758481-83f550bb49b3',
      'photo-1566073771259-6a8506099945',
    ],
    features: [
      (Icons.groups_outlined, 'Up to 500 guests'),
      (Icons.event_seat_outlined, 'Grand ballrooms & terraces'),
      (Icons.cake_outlined, 'Bespoke catering & décor'),
      (Icons.support_agent_outlined, 'Dedicated events team'),
    ],
  ),
  HotelService(
    id: 'concierge',
    emoji: '🛎️',
    icon: Icons.support_agent_outlined,
    title: '24/7 Royal Concierge',
    tagline: 'Your every wish, arranged',
    description:
        'Private tours, last-minute reservations, theatre tickets, personal shopping — our '
        'concierge anticipates and arranges it all, day or night. Consider it done.',
    hero: 'photo-1566073771259-6a8506099945',
    gallery: [
      'photo-1566073771259-6a8506099945',
      'photo-1582719478250-c89cae4dc85b',
    ],
    features: [
      (Icons.tour_outlined, 'Private city tours'),
      (Icons.confirmation_number_outlined, 'Tickets & reservations'),
      (Icons.shopping_bag_outlined, 'Personal shopping'),
      (Icons.translate, 'Multilingual team'),
    ],
  ),
];

/// Full image URL for a stored Unsplash id.
String serviceImage(String id) => _u(id);
