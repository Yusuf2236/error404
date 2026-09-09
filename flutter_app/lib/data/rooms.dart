import '../models/room.dart';

/// Ported from the web app's src/lib/rooms.ts. Ids match the backend so
/// availability + bookings line up across web, admin and this app.
const List<Room> kRooms = [
  Room(
    id: 'platinum',
    type: 'suite',
    name: {
      'en': 'Platinum Panorama Suite',
      'uz': 'Platina Panorama Lyuksi',
      'ru': 'Платиновый Панорамный Люкс',
    },
    description: {
      'en': 'Located on the 15th floor with a 270-degree view of Tashkent City.',
      'uz': "15-qavatda joylashgan, Tashkent City-ga 270 darajali ko'rinish.",
      'ru': 'Расположен на 15-м этаже с 270-градусным видом на Tashkent City.',
    },
    price: 550,
    imageUrl:
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'imperial-silk-room',
    type: 'room',
    name: {
      'en': 'Imperial Silk Room',
      'uz': 'Imperial Shoyi Xonasi',
      'ru': 'Императорский Шелковый Номер',
    },
    description: {
      'en': 'Decorated with authentic Margilan silk and hand-carved walnut furniture.',
      'uz': "Haqiqiy Marg'ilon shoyisi va yong'oq daraxtidan ishlangan mebellar bilan bezatilgan.",
      'ru': 'Декорирован подлинным маргиланским шелком и мебелью из грецкого ореха ручной работы.',
    },
    price: 450,
    imageUrl:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'samarkand-royal',
    type: 'suite',
    name: {
      'en': 'Amir Temur Heritage Suite',
      'uz': 'Amir Temur Merosi Lyuksi',
      'ru': 'Люкс Наследие Амира Темура',
    },
    description: {
      'en': "A grand space featuring replicas of Samarkand's architectural wonders.",
      'uz': "Samarqand me'moriy mo'jizalarining nusxalari bilan bezatilgan keng xona.",
      'ru': 'Роскошное пространство с репликами архитектурных чудес Самарканда.',
    },
    price: 2500,
    imageUrl:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'chorsu',
    type: 'room',
    name: {
      'en': 'Chorsu View Deluxe',
      'uz': "Chorsu Ko'rinishidagi Deluks",
      'ru': 'Делюкс Вид на Чорсу',
    },
    description: {
      'en': 'Overlooking the vibrant Chorsu Bazaar. Soundproof windows ensure privacy.',
      'uz': "Gavjum Chorsu bozoriga qaragan xona. Ovoz o'tkazmaydigan derazalar tinchlikni ta'minlaydi.",
      'ru': 'С видом на оживленный базар Чорсу. Звукоизолированные окна гарантируют покой.',
    },
    price: 380,
    imageUrl:
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'deluxe-suite',
    type: 'suite',
    name: {
      'en': 'Tashkent City Executive',
      'uz': 'Tashkent City Ekzekyutiv',
      'ru': 'Ташкент Сити Эксклюзив',
    },
    description: {
      'en': 'Modern executive suite with floor-to-ceiling windows in the business district.',
      'uz': 'Zamonaviy biznes-lyuks panaramali derazalar bilan biznes-tumanda.',
      'ru': 'Современный представительский люкс с панорамными окнами в деловом районе.',
    },
    price: 350,
    imageUrl:
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'broadway-garden',
    type: 'room',
    name: {
      'en': 'Broadway Garden Studio',
      'uz': "Broadway Bog' Studiyasi",
      'ru': 'Студия Сад Бродвея',
    },
    description: {
      'en': 'Located near the famous Broadway street. Features a private green pointer.',
      'uz': "Mashhur Broadway ko'chasi yaqinida joyhazigan. Shaxsiy yashil hovliga ega.",
      'ru': 'Находится рядом со знаменитым Бродвеем. Включает частный зеленый дворик.',
    },
    price: 320,
    imageUrl:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'mountain-breeze',
    type: 'room',
    name: {
      'en': 'Mountain Breeze Room',
      'uz': "Tog' Shabadasi Xonasi",
      'ru': 'Номер Горный Бриз',
    },
    description: {
      'en': 'North-facing room with views of the Tien Shan mountains in the distance.',
      'uz': "Shimolga qaragan xona, uzoqdan Tyanshan tog'lari ko'rinib turadi.",
      'ru': 'Номер на северной стороне с видом на Тянь-Шаньские горы вдали.',
    },
    price: 410,
    imageUrl:
        'https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
  Room(
    id: 'oriental-elite',
    type: 'suite',
    name: {
      'en': 'Oriental Elite Suite',
      'uz': 'Sharqona Elita Lyuksi',
      'ru': 'Люкс Восточная Элита',
    },
    description: {
      'en': 'A masterpiece of Islamic design with hand-painted ceilings and a marble hammam.',
      'uz': "Islomiy dizayn durdonasi, shiftlari qo'lda naqshlangan va marmar hammomli.",
      'ru': 'Шедевр исламского дизайна с расписными потолками и мраморным хаммамом.',
    },
    price: 1200,
    imageUrl:
        'https://images.unsplash.com/photo-1578683010236-d716f9759678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    locationUrl: 'https://maps.app.goo.gl/VzK8N9P2m3Q4R5S6A',
  ),
];
