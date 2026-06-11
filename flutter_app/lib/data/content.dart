// Faithful port of the web site's copy + imagery (src/app/dictionaries/en.json,
// constants/images.ts and page.module.css) so the Flutter app mirrors the site.

class SiteImages {
  // Backgrounds (from page.module.css)
  static const heroBg =
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  static const servicesBg =
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  static const darkBg =
      'https://images.unsplash.com/photo-1578991624414-276ef23a534f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  // Spa (constants/images.ts → SPA_IMAGES)
  static const spaGoldRitual =
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const spaHammam =
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const spaStoneMassage =
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  // Vehicles (VEHICLE_IMAGES)
  static const rollsRoyce =
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const maybach =
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const rangeRover =
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  // Dining (FOOD_IMAGES)
  static const plov =
      'https://images.unsplash.com/photo-1603333388123-8858448d9071?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const lambRack =
      'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
  static const shashlik =
      'https://images.unsplash.com/photo-1529193591184-b1d58fb3534b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';

  // Landmarks (LANDMARK_IMAGES) — Local Explorer
  static const amirTemur =
      'https://images.unsplash.com/photo-1633519391054-6e691238992f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg';
  static const chorsu =
      'https://images.unsplash.com/photo-1590408542045-81640a3f8510?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg';
  static const tvTower =
      'https://images.unsplash.com/photo-1574786198875-49f5d09ec7d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg';
  static const hastImam =
      'https://images.unsplash.com/photo-1596484552934-2e2167fc7f54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60&fm=jpg';
}

/// (emoji, title, description) — the 4 home amenities (servicesHome in en.json).
const List<(String, String, String)> kHomeServices = [
  ('🍽️', 'Uzbek Fine Dining',
      'Experience the legendary flavors of Uzbekistan by Michelin-star chefs.'),
  ('🧖‍♀️', 'Royal Spa & Hammam',
      'Relax in authentic marble rituals from ancient Bukhara.'),
  ('🏊‍♂️', 'Infinity Sky Pool',
      'Swim across the skyline in our heated rooftop infinity pool.'),
  ('🚗', 'VIP Chauffeur',
      'Private luxury fleet available for your city explorations.'),
];

/// (name, location, text) — testimonials (en.json).
const List<(String, String, String)> kTestimonials = [
  ('James Richardson', 'London, UK',
      'Exceptional service and stunning accommodations. The attention to detail is remarkable. VIP UZBE truly lives up to its name.'),
  ('Maria Gonzalez', 'Madrid, Spain',
      'The perfect blend of traditional Uzbek hospitality and modern luxury. The staff went above and beyond to make our stay memorable.'),
  ('David Chen', 'Singapore',
      'Outstanding business facilities and the concierge service is world-class. Highly recommended for both business and leisure travelers.'),
];

/// (question, answer) — FAQ (en.json).
const List<(String, String)> kFaq = [
  ('What are the check-in and check-out times?',
      'Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are available upon request, subject to availability.'),
  ('Do you offer airport transfer services?',
      'Yes, we provide complimentary airport transfers for all suite bookings. Standard room guests can arrange transfers at a nominal fee through our concierge.'),
  ('Is breakfast included in the room rate?',
      'A gourmet breakfast buffet is included with all bookings. We offer international and traditional Uzbek cuisine options.'),
  ('What payment methods do you accept?',
      'We accept all major credit cards (Visa, Mastercard, American Express), cash in UZS and USD, and bank transfers.'),
  ('Do you have facilities for business meetings?',
      'Yes, we have state-of-the-art conference rooms and event spaces with full AV equipment, catering services, and dedicated support staff.'),
  ('Is Wi-Fi available throughout the hotel?',
      'High-speed Wi-Fi is complimentary throughout the entire property, including all rooms, public areas, and event spaces.'),
];

/// (image, name, tagline) — Local Explorer landmarks.
const List<(String, String, String)> kLandmarks = [
  (SiteImages.amirTemur, 'Amir Temur Square', 'The historic heart of Tashkent'),
  (SiteImages.chorsu, 'Chorsu Bazaar', 'Centuries of trade under a turquoise dome'),
  (SiteImages.tvTower, 'Tashkent TV Tower', 'Panoramic views from 375 metres'),
  (SiteImages.hastImam, 'Hazrati Imam Complex', "Home to the world's oldest Quran"),
];
