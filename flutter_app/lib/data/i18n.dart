// Full i18n — ported from src/app/dictionaries/{en,uz,ru}.json so the language
// switch translates the whole UI (not just room names).

const Map<String, Map<String, String>> _ui = {
  // bottom nav
  'nav.home': {'en': 'Home', 'uz': 'Bosh sahifa', 'ru': 'Главная'},
  'nav.rooms': {'en': 'Rooms', 'uz': 'Xonalar', 'ru': 'Номера'},
  'nav.book': {'en': 'Book', 'uz': 'Band qilish', 'ru': 'Бронь'},
  'nav.more': {'en': 'More', 'uz': 'Yana', 'ru': 'Ещё'},
  // app bar titles
  'title.home': {'en': 'VIP UZBE', 'uz': 'VIP UZBE', 'ru': 'VIP UZBE'},
  'title.rooms': {'en': 'ROOMS & SUITES', 'uz': 'XONALAR VA LYUKSLAR', 'ru': 'НОМЕРА И ЛЮКСЫ'},
  'title.book': {'en': 'BOOK', 'uz': 'BAND QILISH', 'ru': 'БРОНЬ'},
  'title.more': {'en': 'MORE', 'uz': 'YANA', 'ru': 'ЕЩЁ'},
  // hero
  'hero.title': {
    'en': 'Experience the\nEpitome of Luxury',
    'uz': 'Hashamatning\noliy ko’rinishi',
    'ru': 'Вершина\nроскоши',
  },
  'hero.subtitle': {
    'en': 'Discover a world of elegance and comfort in the heart of Uzbekistan. Your exclusive getaway awaits.',
    'uz': 'O’zbekiston markazida nafislik va qulaylik dunyosini kashf eting. Sizning eksklyuziv dam olishingiz kutmoqda.',
    'ru': 'Откройте мир элегантности и комфорта в сердце Узбекистана. Вас ждёт эксклюзивный отдых.',
  },
  'hero.viewRooms': {'en': 'VIEW ROOMS', 'uz': 'XONALARNI KO’RISH', 'ru': 'НОМЕРА'},
  'hero.contact': {'en': 'CONTACT US', 'uz': 'BOG’LANISH', 'ru': 'КОНТАКТ'},
  // sections
  'rooms.title': {'en': 'Our Accommodations', 'uz': 'Bizning turar joylarimiz', 'ru': 'Наши номера'},
  'rooms.subtitle': {
    'en': 'Find your perfect space from our curated collection of elite rooms and suites.',
    'uz': 'Bizning elita xonalar va lyukslar to’plamimizdan o’zingizga mosini toping.',
    'ru': 'Найдите идеальный номер из нашей коллекции элитных номеров и люксов.',
  },
  'rooms.all': {'en': 'ALL ROOMS', 'uz': 'BARCHA XONALAR', 'ru': 'ВСЕ НОМЕРА'},
  'amenities.title': {'en': "Tashkent's Finest Amenities", 'uz': 'Toshkentning eng sara xizmatlari', 'ru': 'Лучшие удобства Ташкента'},
  'amenities.subtitle': {
    'en': 'Traditional hospitality meets 21st-century luxury.',
    'uz': 'An’anaviy mehmondo’stlik va 21-asr hashamati uyg’unligi.',
    'ru': 'Традиционное гостеприимство и роскошь XXI века.',
  },
  'testi.title': {'en': 'Elite Guest Experiences', 'uz': 'Elita mehmonlarimizning tajribalari', 'ru': 'Отзывы элитных гостей'},
  'testi.subtitle': {
    'en': 'Voices from the pinnacle of Tashkent hospitality.',
    'uz': 'Toshkent mehmondo’stligining cho’qqisidan so’zlar.',
    'ru': 'Голоса с вершины ташкентского гостеприимства.',
  },
  'explore.title': {'en': 'Explore Tashkent', 'uz': 'Toshkentni kashf eting', 'ru': 'Откройте Ташкент'},
  'explore.subtitle': {
    'en': 'Iconic landmarks moments from your suite.',
    'uz': 'Lyuksingizdan bir necha qadam masofadagi mashhur joylar.',
    'ru': 'Культовые места в нескольких шагах от номера.',
  },
  'faq.title': {'en': 'Frequently Asked Questions', 'uz': 'Ko’p so’raladigan savollar', 'ru': 'Частые вопросы'},
  'faq.subtitle': {
    'en': 'Everything you need to know about your stay at VIP UZBE',
    'uz': 'VIP UZBE’da qolish haqida bilishingiz kerak bo’lgan hamma narsa',
    'ru': 'Всё, что нужно знать о пребывании в VIP UZBE',
  },
  'news.title': {'en': 'Join the Elite Circle', 'uz': 'Elita doirasiga qo’shiling', 'ru': 'Присоединяйтесь к элите'},
  'news.subtitle': {
    'en': 'Receive exclusive invitations to VIP events in Tashkent.',
    'uz': 'Toshkentdagi VIP tadbirlarga eksklyuziv taklifnomalarni qabul qiling.',
    'ru': 'Получайте эксклюзивные приглашения на VIP-мероприятия в Ташкенте.',
  },
  'news.subscribe': {'en': 'SUBSCRIBE', 'uz': 'OBUNA BO’LISH', 'ru': 'ПОДПИСАТЬСЯ'},
  // chips / common
  'chip.all': {'en': 'All', 'uz': 'Barchasi', 'ru': 'Все'},
  'chip.rooms': {'en': 'Rooms', 'uz': 'Xonalar', 'ru': 'Номера'},
  'chip.suites': {'en': 'Suites', 'uz': 'Lyukslar', 'ru': 'Люксы'},
  'common.details': {'en': 'Details', 'uz': 'Batafsil', 'ru': 'Подробнее'},
  'common.night': {'en': '/ night', 'uz': '/ tun', 'ru': '/ ночь'},
  'common.bookNow': {'en': 'BOOK NOW', 'uz': 'BAND QILISH', 'ru': 'ЗАБРОНИРОВАТЬ'},
  'badge.booked': {'en': 'BOOKED', 'uz': 'BAND', 'ru': 'ЗАНЯТО'},
  'banner.member': {
    'en': 'Sign in & save 20% on every booking',
    'uz': 'Kiring va har bir bronga 20% tejang',
    'ru': 'Войдите и экономьте 20% на каждом бронировании',
  },
  // currency converter
  'fx.title': {'en': 'Live Exchange Rate', 'uz': 'Jonli valyuta kursi', 'ru': 'Курс валют в реальном времени'},
  'fx.amount': {'en': 'Amount (USD)', 'uz': 'Miqdor (USD)', 'ru': 'Сумма (USD)'},
  'fx.estimated': {'en': 'Estimated (UZS)', 'uz': 'Taxminan (UZS)', 'ru': 'Оценка (UZS)'},

  // Common
  'c.bookNow': {'en': 'BOOK NOW', 'uz': 'BAND QILISH', 'ru': 'ЗАБРОНИРОВАТЬ'},
  'c.request': {'en': 'REQUEST', 'uz': 'SO‘RASH', 'ru': 'ЗАПРОС'},
  'c.gallery': {'en': 'Gallery', 'uz': 'Galereya', 'ru': 'Галерея'},
  'c.signOut': {'en': 'SIGN OUT', 'uz': 'CHIQISH', 'ru': 'ВЫЙТИ'},
  'c.guests': {'en': 'guests', 'uz': 'mehmon', 'ru': 'гостей'},
  'c.night': {'en': '/ night', 'uz': '/ tun', 'ru': '/ ночь'},

  // Room detail
  'rd.experience': {'en': 'The Experience', 'uz': 'Tajriba', 'ru': 'Впечатление'},
  'rd.amenities': {'en': 'Amenities', 'uz': 'Qulayliklar', 'ru': 'Удобства'},
  'rd.included': {'en': "What's Included", 'uz': 'Nimalar kiritilgan', 'ru': 'Что включено'},
  'rd.memberPrice': {'en': 'Member price · 20% off', 'uz': 'A’zo narxi · 20% chegirma', 'ru': 'Цена для участника · −20%'},
  'rd.king': {'en': 'King bed', 'uz': 'King karavot', 'ru': 'Кровать King'},
  'rd.kingSofa': {'en': 'King + Sofa', 'uz': 'King + Divan', 'ru': 'King + диван'},
  'rd.cityView': {'en': 'City view', 'uz': 'Shahar manzarasi', 'ru': 'Вид на город'},
  'rd.am.king': {'en': 'King Bed', 'uz': 'King karavot', 'ru': 'Кровать King'},
  'rd.am.wifi': {'en': 'Free Wi-Fi', 'uz': 'Bepul Wi-Fi', 'ru': 'Бесплатный Wi-Fi'},
  'rd.am.view': {'en': 'City View', 'uz': 'Shahar manzarasi', 'ru': 'Вид на город'},
  'rd.am.minibar': {'en': 'Mini Bar', 'uz': 'Mini bar', 'ru': 'Мини-бар'},
  'rd.am.tv': {'en': 'Smart TV', 'uz': 'Smart TV', 'ru': 'Smart TV'},
  'rd.am.service': {'en': 'Room Service', 'uz': 'Xona xizmati', 'ru': 'Обслуживание номеров'},
  'rd.am.ac': {'en': 'Air Conditioning', 'uz': 'Konditsioner', 'ru': 'Кондиционер'},
  'rd.am.bath': {'en': 'Marble Bath', 'uz': 'Marmar hammom', 'ru': 'Мраморная ванная'},
  'rd.inc.breakfast': {'en': 'Gourmet breakfast', 'uz': 'Gurme nonushta', 'ru': 'Завтрак для гурманов'},
  'rd.inc.breakfastSub': {'en': 'International & Uzbek buffet', 'uz': 'Xalqaro va o‘zbek bufeti', 'ru': 'Международный и узбекский буфет'},
  'rd.inc.transfer': {'en': 'Airport transfer', 'uz': 'Aeroport transferi', 'ru': 'Трансфер из аэропорта'},
  'rd.inc.transferSub': {'en': 'Complimentary for suites', 'uz': 'Lyukslar uchun bepul', 'ru': 'Бесплатно для люксов'},
  'rd.inc.concierge': {'en': '24/7 concierge', 'uz': '24/7 konsyerj', 'ru': 'Консьерж 24/7'},
  'rd.inc.conciergeSub': {'en': 'Anything, anytime', 'uz': 'Hamma narsa, istalgan vaqt', 'ru': 'Что угодно, когда угодно'},
  'rd.locTitle': {'en': 'Tashkent City, Uzbekistan', 'uz': 'Tashkent City, O‘zbekiston', 'ru': 'Tashkent City, Узбекистан'},
  'rd.locSub': {'en': 'Moments from Chorsu, Broadway & Amir Temur Square', 'uz': 'Chorsu, Broadway va Amir Temur maydoni yaqinida', 'ru': 'Рядом с Чорсу, Бродвеем и площадью Амира Темура'},

  // Services
  'sv.gallery': {'en': 'Gallery', 'uz': 'Galereya', 'ru': 'Галерея'},
  'sv.highlights': {'en': 'Highlights', 'uz': 'Asosiy jihatlar', 'ru': 'Особенности'},
  'sv.signature': {'en': 'SIGNATURE SERVICE', 'uz': 'MAXSUS XIZMAT', 'ru': 'ФИРМЕННАЯ УСЛУГА'},
  'sv.arrange': {'en': 'Arrange this with our concierge', 'uz': 'Buni konsyerj orqali tartibga soling', 'ru': 'Организуйте это через консьержа'},

  // Account
  'ac.title': {'en': 'MY ACCOUNT', 'uz': 'MENING HISOBIM', 'ru': 'МОЙ АККАУНТ'},
  'ac.join': {'en': 'Join the Elite Circle', 'uz': 'Elita doirasiga qo‘shiling', 'ru': 'Присоединяйтесь к элите'},
  'ac.joinSub': {'en': 'Create a free account and unlock member-only perks.', 'uz': 'Bepul hisob oching va faqat a’zolar uchun imtiyozlarni oching.', 'ru': 'Создайте бесплатный аккаунт и откройте привилегии участников.'},
  'ac.welcome20': {'en': 'Welcome discount unlocked the moment you register.', 'uz': 'Ro‘yxatdan o‘tishingiz bilan welcome chegirma ochiladi.', 'ru': 'Приветственная скидка открывается сразу после регистрации.'},
  'ac.create20': {'en': 'CREATE ACCOUNT & SAVE 20%', 'uz': 'HISOB OCHING VA 20% TEJANG', 'ru': 'СОЗДАТЬ АККАУНТ И СЭКОНОМИТЬ 20%'},
  'ac.haveAccount': {'en': 'I ALREADY HAVE AN ACCOUNT', 'uz': 'MENDA HISOB BOR', 'ru': 'У МЕНЯ УЖЕ ЕСТЬ АККАУНТ'},
  'ac.perk.discount': {'en': '20% member discount', 'uz': '20% a’zo chegirmasi', 'ru': 'Скидка участника 20%'},
  'ac.perk.discountSub': {'en': 'Auto-applied to every booking', 'uz': 'Har bronga avtomatik qo‘llanadi', 'ru': 'Применяется к каждому бронированию'},
  'ac.perk.concierge': {'en': 'Priority concierge', 'uz': 'Ustuvor konsyerj', 'ru': 'Приоритетный консьерж'},
  'ac.perk.conciergeSub': {'en': 'A dedicated 24/7 line', 'uz': 'Maxsus 24/7 liniya', 'ru': 'Выделенная линия 24/7'},
  'ac.perk.fav': {'en': 'Save favourites', 'uz': 'Sevimlilarni saqlash', 'ru': 'Сохранять избранное'},
  'ac.perk.favSub': {'en': 'Keep your dream suites', 'uz': 'Orzuyingizdagi lyukslarni saqlang', 'ru': 'Храните любимые люксы'},
  'ac.perk.rewards': {'en': 'Earn rewards', 'uz': 'Mukofotlar yig‘ish', 'ru': 'Получайте награды'},
  'ac.perk.rewardsSub': {'en': 'Points on every stay', 'uz': 'Har tashrifda ball', 'ru': 'Баллы за каждое проживание'},
  'ac.eliteMember': {'en': 'ELITE MEMBER · via', 'uz': 'ELITA A’ZO · ', 'ru': 'ЭЛИТНЫЙ УЧАСТНИК · через'},
  'ac.discountActive': {'en': 'Member discount active', 'uz': 'A’zo chegirmasi faol', 'ru': 'Скидка участника активна'},
  'ac.discountActiveSub': {'en': 'Automatically applied to every booking you make.', 'uz': 'Siz qilgan har bir bronga avtomatik qo‘llanadi.', 'ru': 'Применяется ко всем вашим бронированиям.'},
  'ac.myBookings': {'en': 'My Bookings', 'uz': 'Mening bronlarim', 'ru': 'Мои бронирования'},
  'ac.myBookingsSub': {'en': 'View your reservations', 'uz': 'Bronlaringizni ko‘ring', 'ru': 'Посмотреть бронирования'},
  'ac.favourites': {'en': 'Favourites', 'uz': 'Sevimlilar', 'ru': 'Избранное'},
  'ac.favouritesSub': {'en': 'Your saved rooms', 'uz': 'Saqlangan xonalaringiz', 'ru': 'Сохранённые номера'},
  'ac.concierge': {'en': 'Royal Concierge', 'uz': 'Qirollik Konsyerji', 'ru': 'Королевский консьерж'},
  'ac.conciergeSub': {'en': '24/7 dedicated line', 'uz': '24/7 maxsus liniya', 'ru': 'Выделенная линия 24/7'},

  // Auth
  'au.welcomeBack': {'en': 'Welcome back', 'uz': 'Xush kelibsiz', 'ru': 'С возвращением'},
  'au.signinSub': {'en': 'Sign in to unlock your 20% member discount.', 'uz': 'Kirib, 20% a’zo chegirmangizni oching.', 'ru': 'Войдите, чтобы открыть скидку 20%.'},
  'au.email': {'en': 'Email', 'uz': 'Email', 'ru': 'Эл. почта'},
  'au.password': {'en': 'Password', 'uz': 'Parol', 'ru': 'Пароль'},
  'au.fullName': {'en': 'Full name', 'uz': 'To‘liq ism', 'ru': 'Полное имя'},
  'au.signin': {'en': 'SIGN IN', 'uz': 'KIRISH', 'ru': 'ВОЙТИ'},
  'au.continueWith': {'en': 'or continue with', 'uz': 'yoki davom eting', 'ru': 'или продолжить через'},
  'au.signupWith': {'en': 'or sign up with', 'uz': 'yoki ro‘yxatdan o‘ting', 'ru': 'или зарегистрируйтесь через'},
  'au.newHere': {'en': 'New here?', 'uz': 'Yangimisiz?', 'ru': 'Впервые здесь?'},
  'au.createAccountLink': {'en': 'Create an account', 'uz': 'Hisob oching', 'ru': 'Создать аккаунт'},
  'au.alreadyMember': {'en': 'Already a member?', 'uz': 'Allaqachon a’zomisiz?', 'ru': 'Уже участник?'},
  'au.signinLink': {'en': 'Sign in', 'uz': 'Kiring', 'ru': 'Войти'},
  'au.create': {'en': 'Create your account', 'uz': 'Hisobingizni oching', 'ru': 'Создайте аккаунт'},
  'au.createSub': {'en': 'Join the Elite Circle and save on every stay.', 'uz': 'Elita doirasiga qo‘shiling va har tashrifda tejang.', 'ru': 'Присоединяйтесь к элите и экономьте на каждом визите.'},
  'au.welcomeBadge': {'en': '★  20% WELCOME DISCOUNT', 'uz': '★  20% WELCOME CHEGIRMA', 'ru': '★  20% ПРИВЕТСТВЕННАЯ СКИДКА'},
  'au.createSave': {'en': 'CREATE ACCOUNT & SAVE 20%', 'uz': 'HISOB OCHING VA 20% TEJANG', 'ru': 'СОЗДАТЬ И СЭКОНОМИТЬ 20%'},
  'au.unlocked': {'en': '20% UNLOCKED', 'uz': '20% OCHILDI', 'ru': '20% ОТКРЫТО'},
  'au.welcomeMsg': {'en': 'Welcome to the Elite Circle! Your 20% member discount is now active on every booking.', 'uz': 'Elita doirasiga xush kelibsiz! 20% a’zo chegirmangiz endi har bronga faol.', 'ru': 'Добро пожаловать в элиту! Ваша скидка 20% теперь действует на все бронирования.'},
  'au.startSaving': {'en': 'START SAVING', 'uz': 'TEJASHNI BOSHLANG', 'ru': 'НАЧАТЬ ЭКОНОМИТЬ'},

  // Booking
  'bk.reserveTitle': {'en': 'Reserve Your Stay', 'uz': 'Tashrifingizni band qiling', 'ru': 'Забронируйте проживание'},
  'bk.memberNote': {'en': 'Your 20% member discount is applied automatically.', 'uz': '20% a’zo chegirmangiz avtomatik qo‘llanadi.', 'ru': 'Ваша скидка 20% применяется автоматически.'},
  'bk.guestNote': {'en': 'A few details and our concierge confirms the rest.', 'uz': 'Bir nechta ma’lumot — qolganini konsyerj tasdiqlaydi.', 'ru': 'Несколько деталей — остальное подтвердит консьерж.'},
  'bk.fullName': {'en': 'Full name', 'uz': 'To‘liq ism', 'ru': 'Полное имя'},
  'bk.email': {'en': 'Email', 'uz': 'Email', 'ru': 'Эл. почта'},
  'bk.phone': {'en': 'Phone', 'uz': 'Telefon', 'ru': 'Телефон'},
  'bk.room': {'en': 'Room / Suite', 'uz': 'Xona / Lyuks', 'ru': 'Номер / Люкс'},
  'bk.checkIn': {'en': 'Check-in', 'uz': 'Kirish', 'ru': 'Заезд'},
  'bk.checkOut': {'en': 'Check-out', 'uz': 'Chiqish', 'ru': 'Выезд'},
  'bk.guests': {'en': 'Guests', 'uz': 'Mehmonlar', 'ru': 'Гости'},
  'bk.payment': {'en': 'Payment method', 'uz': 'To‘lov usuli', 'ru': 'Способ оплаты'},
  'bk.currency': {'en': 'Currency', 'uz': 'Valyuta', 'ru': 'Валюта'},
  'bk.confirm': {'en': 'CONFIRM', 'uz': 'TASDIQLASH', 'ru': 'ПОДТВЕРДИТЬ'},
  'bk.discountApplied': {'en': '20% member discount applied', 'uz': '20% a’zo chegirmasi qo‘llandi', 'ru': 'Скидка участника 20% применена'},
  'bk.nights': {'en': 'nights', 'uz': 'tun', 'ru': 'ночей'},
  'bk.reserved': {'en': 'Reserved!', 'uz': 'Band qilindi!', 'ru': 'Забронировано!'},
  'bk.confirmation': {'en': 'Confirmation', 'uz': 'Tasdiq', 'ru': 'Подтверждение'},
  'bk.total': {'en': 'Total', 'uz': 'Jami', 'ru': 'Итого'},
  'bk.statusPending': {'en': 'Status: pending — our concierge will confirm shortly.', 'uz': 'Holat: kutilmoqda — konsyerj tez orada tasdiqlaydi.', 'ru': 'Статус: ожидание — консьерж скоро подтвердит.'},
  'bk.done': {'en': 'DONE', 'uz': 'TAYYOR', 'ru': 'ГОТОВО'},
  'bk.failed': {'en': 'Booking failed. Is the server running?', 'uz': 'Bron amalga oshmadi. Server ishlayaptimi?', 'ru': 'Бронирование не удалось. Сервер запущен?'},

  // My bookings
  'mb.title': {'en': 'MY BOOKINGS', 'uz': 'MENING BRONLARIM', 'ru': 'МОИ БРОНИРОВАНИЯ'},
  'mb.empty': {'en': 'No bookings yet', 'uz': 'Hozircha bron yo‘q', 'ru': 'Пока нет бронирований'},
  'mb.emptySub': {'en': 'Your reservations will appear here.', 'uz': 'Bronlaringiz shu yerda ko‘rinadi.', 'ru': 'Ваши бронирования появятся здесь.'},
  'mb.error': {'en': 'Couldn’t load bookings.\nIs the server running?', 'uz': 'Bronlarni yuklab bo‘lmadi.\nServer ishlayaptimi?', 'ru': 'Не удалось загрузить.\nСервер запущен?'},

  // Favourites
  'fav.title': {'en': 'FAVOURITES', 'uz': 'SEVIMLILAR', 'ru': 'ИЗБРАННОЕ'},
  'fav.empty': {'en': 'No favourites yet', 'uz': 'Hozircha sevimlilar yo‘q', 'ru': 'Пока нет избранного'},
  'fav.emptySub': {'en': 'Tap the ♥ on any room to save it here for later.', 'uz': 'Istalgan xonadagi ♥ ni bosib shu yerga saqlang.', 'ru': 'Нажмите ♥ на номере, чтобы сохранить.'},

  // Contact
  'ct.title': {'en': 'CONTACT', 'uz': 'ALOQA', 'ru': 'КОНТАКТ'},
  'ct.getInTouch': {'en': 'Get in touch', 'uz': 'Bog‘laning', 'ru': 'Свяжитесь с нами'},
  'ct.sub': {'en': 'Our concierge is available around the clock.', 'uz': 'Konsyerjimiz kechayu kunduz xizmatda.', 'ru': 'Наш консьерж доступен круглосуточно.'},
  'ct.address': {'en': 'Address', 'uz': 'Manzil', 'ru': 'Адрес'},
  'ct.phone': {'en': 'Phone', 'uz': 'Telefon', 'ru': 'Телефон'},
  'ct.email': {'en': 'Email', 'uz': 'Email', 'ru': 'Эл. почта'},
  'ct.reception': {'en': 'Reception', 'uz': 'Qabulxona', 'ru': 'Ресепшн'},
  'ct.open247': {'en': 'Open 24 / 7', 'uz': '24 / 7 ochiq', 'ru': 'Открыто 24 / 7'},
  'ct.conciergeTitle': {'en': 'Royal Concierge', 'uz': 'Qirollik Konsyerji', 'ru': 'Королевский консьерж'},
  'ct.conciergeBody': {'en': 'Need a private tour, a dinner reservation, or airport pickup? Message us and consider it arranged.', 'uz': 'Shaxsiy sayohat, kechki ovqat broni yoki aeroportdan kutib olish kerakmi? Yozing — bajarilgan deb hisoblang.', 'ru': 'Нужен частный тур, ужин или встреча в аэропорту? Напишите — считайте, что сделано.'},
  'ct.startChat': {'en': 'START A CHAT', 'uz': 'SUHBATNI BOSHLASH', 'ru': 'НАЧАТЬ ЧАТ'},

  // About
  'ab.title': {'en': 'ABOUT', 'uz': 'BIZ HAQIMIZDA', 'ru': 'О НАС'},
  'ab.heading': {'en': 'The VIP UZBE Standard', 'uz': 'VIP UZBE standarti', 'ru': 'Стандарт VIP UZBE'},
  'ab.p1': {'en': 'VIP UZBE is the pinnacle of Tashkent luxury — a sanctuary where ancient Uzbek hospitality meets contemporary elegance. Every suite tells a story, every detail is intentional, and every guest is treated as royalty.', 'uz': 'VIP UZBE — Toshkent hashamatining cho‘qqisi: qadimiy o‘zbek mehmondo‘stligi zamonaviy nafislik bilan uyg‘unlashgan maskan. Har bir lyuks o‘z hikoyasini so‘ylaydi, har bir tafsilot o‘ylangan, har bir mehmon shoh kabi kutib olinadi.', 'ru': 'VIP UZBE — вершина роскоши Ташкента, где древнее узбекское гостеприимство встречает современную элегантность. Каждый люкс рассказывает историю, каждая деталь продумана, а каждый гость — на вес золота.'},
  'ab.p2': {'en': 'Located in the heart of Tashkent, moments from Tashkent City, Chorsu Bazaar and the Broadway, VIP UZBE places the soul of Uzbekistan at your doorstep.', 'uz': 'Toshkent markazida, Tashkent City, Chorsu bozori va Broadway yaqinida joylashgan VIP UZBE O‘zbekiston ruhini ostonangizga olib keladi.', 'ru': 'Расположенный в сердце Ташкента, рядом с Tashkent City, базаром Чорсу и Бродвеем, VIP UZBE приносит душу Узбекистана к вашему порогу.'},
  'ab.stat1': {'en': 'Years of\nExcellence', 'uz': 'Yillik\nmukammallik', 'ru': 'Лет\nсовершенства'},
  'ab.stat2': {'en': 'Signature\nSuites', 'uz': 'Maxsus\nlyukslar', 'ru': 'Фирменных\nлюксов'},
  'ab.stat3': {'en': 'Concierge\nService', 'uz': 'Konsyerj\nxizmati', 'ru': 'Консьерж\nсервис'},

  // More
  'mr.explore': {'en': 'Explore', 'uz': 'Kashf eting', 'ru': 'Исследуйте'},
  'mr.guest': {'en': 'Guest', 'uz': 'Mehmon', 'ru': 'Гость'},
  'mr.eliteMember': {'en': 'Elite member · 20% off', 'uz': 'Elita a’zo · 20% chegirma', 'ru': 'Элитный участник · −20%'},
  'mr.signInSave': {'en': 'Sign in & save 20%', 'uz': 'Kiring va 20% tejang', 'ru': 'Войдите и сэкономьте 20%'},
  'mr.language': {'en': 'LANGUAGE', 'uz': 'TIL', 'ru': 'ЯЗЫК'},
  'mr.svcConcierge': {'en': 'Chat with us 24/7', 'uz': '24/7 biz bilan suhbat', 'ru': 'Чат с нами 24/7'},
  'mr.svcServices': {'en': 'Dining, spa, chauffeur & more', 'uz': 'Taom, spa, shofyor va boshqalar', 'ru': 'Кухня, спа, водитель и др.'},
  'mr.svcGallery': {'en': 'Suites, dining & landmarks', 'uz': 'Lyukslar, taomlar va joylar', 'ru': 'Люксы, кухня и места'},
  'mr.svcAbout': {'en': 'The VIP UZBE standard', 'uz': 'VIP UZBE standarti', 'ru': 'Стандарт VIP UZBE'},
  'mr.svcContact': {'en': '24/7 concierge & location', 'uz': '24/7 konsyerj va manzil', 'ru': 'Консьерж 24/7 и адрес'},
  'mr.navServices': {'en': 'Services', 'uz': 'Xizmatlar', 'ru': 'Услуги'},
  'mr.navGallery': {'en': 'Gallery', 'uz': 'Galereya', 'ru': 'Галерея'},
  'mr.navAbout': {'en': 'About', 'uz': 'Biz haqimizda', 'ru': 'О нас'},
  'mr.navContact': {'en': 'Contact', 'uz': 'Aloqa', 'ru': 'Контакт'},
};

String tr(String key, String lang) {
  final m = _ui[key];
  if (m == null) return key;
  return m[lang] ?? m['en'] ?? key;
}

/// (emoji, title, desc) home amenities, per language.
const Map<String, List<(String, String, String)>> servicesByLang = {
  'en': [
    ('\u{1F37D}️', 'Uzbek Fine Dining', 'Experience the legendary flavors of Uzbekistan by Michelin-star chefs.'),
    ('\u{1F9D6}', 'Royal Spa & Hammam', 'Relax in authentic marble rituals from ancient Bukhara.'),
    ('\u{1F3CA}', 'Infinity Sky Pool', 'Swim across the skyline in our heated rooftop infinity pool.'),
    ('\u{1F697}', 'VIP Chauffeur', 'Private luxury fleet available for your city explorations.'),
  ],
  'uz': [
    ('\u{1F37D}️', 'O’zbek Oliy Taomlari', 'Mishel yulduzli oshpazlar tomonidan tayyorlangan O’zbekistonning afsonaviy lazzatlarini his eting.'),
    ('\u{1F9D6}', 'Qirollik Spa va Xammom', 'Qadimiy Buxoroning haqiqiy marmar marosimlarida dam oling.'),
    ('\u{1F3CA}', 'Infinity Sky hovuzi', 'Isitiladigan tom qismidagi infinity hovuzimizda shahar manzarasi bo’ylab suzing.'),
    ('\u{1F697}', 'VIP Shofyor', 'Shahar bo’ylab sayohatlaringiz uchun shaxsiy hashamatli avtopark mavjud.'),
  ],
  'ru': [
    ('\u{1F37D}️', 'Узбекская высокая кухня', 'Легендарные вкусы Узбекистана от шеф-поваров с звёздами Мишлен.'),
    ('\u{1F9D6}', 'Королевский СПА и хаммам', 'Расслабьтесь в подлинных мраморных ритуалах древней Бухары.'),
    ('\u{1F3CA}', 'Бассейн Infinity', 'Плавайте над городом в нашем подогреваемом бассейне на крыше.'),
    ('\u{1F697}', 'VIP водитель', 'Частный люксовый автопарк для поездок по городу.'),
  ],
};

/// (name, location, text) testimonials, per language.
const Map<String, List<(String, String, String)>> testimonialsByLang = {
  'en': [
    ('James Richardson', 'London, UK', 'Exceptional service and stunning accommodations. The attention to detail is remarkable. VIP UZBE truly lives up to its name.'),
    ('Maria Gonzalez', 'Madrid, Spain', 'The perfect blend of traditional Uzbek hospitality and modern luxury. The staff went above and beyond to make our stay memorable.'),
    ('David Chen', 'Singapore', 'Outstanding business facilities and the concierge service is world-class. Highly recommended for both business and leisure travelers.'),
  ],
  'uz': [
    ('Jeyms Richardson', 'London, Buyuk Britaniya', 'Ajoyib xizmat va hayratlanarli turar joylar. Tafsilotlarga e’tibor ajoyib. VIP UZBE haqiqatan ham o’z nomiga loyiq.'),
    ('Mariya Gonsales', 'Madrid, Ispaniya', 'An’anaviy o’zbek mehmondo’stligi va zamonaviy hashamatning mukammal uyg’unligi. Xodimlar qolishimizni esda qolarli qilish uchun juda harakat qilishdi.'),
    ('Devid Chen', 'Singapur', 'Ajoyib biznes imkoniyatlari va konsyerj xizmati jahon darajasida. Biznes va dam olish sayohatchilari uchun juda tavsiya etiladi.'),
  ],
  'ru': [
    ('Джеймс Ричардсон', 'Лондон, Великобритания', 'Исключительный сервис и потрясающие номера. Внимание к деталям замечательное. VIP UZBE действительно оправдывает своё название.'),
    ('Мария Гонсалес', 'Мадрид, Испания', 'Идеальное сочетание традиционного узбекского гостеприимства и современной роскоши. Персонал сделал всё возможное.'),
    ('Дэвид Чен', 'Сингапур', 'Отличные бизнес-возможности, а консьерж-сервис мирового класса. Настоятельно рекомендуется.'),
  ],
};

/// (question, answer) FAQ, per language.
const Map<String, List<(String, String)>> faqByLang = {
  'en': [
    ('What are the check-in and check-out times?', 'Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are available upon request, subject to availability.'),
    ('Do you offer airport transfer services?', 'Yes, we provide complimentary airport transfers for all suite bookings. Standard room guests can arrange transfers at a nominal fee through our concierge.'),
    ('Is breakfast included in the room rate?', 'A gourmet breakfast buffet is included with all bookings. We offer international and traditional Uzbek cuisine options.'),
    ('What payment methods do you accept?', 'We accept all major credit cards (Visa, Mastercard, American Express), cash in UZS and USD, and bank transfers.'),
    ('Do you have facilities for business meetings?', 'Yes, we have state-of-the-art conference rooms and event spaces with full AV equipment, catering services, and dedicated support staff.'),
    ('Is Wi-Fi available throughout the hotel?', 'High-speed Wi-Fi is complimentary throughout the entire property, including all rooms, public areas, and event spaces.'),
  ],
  'uz': [
    ('Kirish va chiqish vaqtlari qanday?', 'Kirish soat 14:00 dan, chiqish esa soat 12:00 gacha. Erta kirish va kech chiqish mavjudligi asosida so’rov bo’yicha taqdim etiladi.'),
    ('Aeroport transferi xizmati bormi?', 'Ha, barcha lyuks xonalar uchun bepul aeroport transferi taqdim etamiz. Oddiy xonalar uchun konsyerj orqali nominal to’lov evaziga tartibga solish mumkin.'),
    ('Nonushta xona narxiga kiritilganmi?', 'Gurme nonushta bufeti barcha bronlar bilan birga kiritilgan. Xalqaro va an’anaviy o’zbek oshxonasi variantlarini taklif etamiz.'),
    ('Qanday to’lov usullarini qabul qilasiz?', 'Barcha asosiy kredit kartalar (Visa, Mastercard, American Express), UZS va USD naqd pul hamda bank o’tkazmalarini qabul qilamiz.'),
    ('Biznes uchrashuvlar uchun imkoniyatlaringiz bormi?', 'Ha, bizda to’liq AV jihozlar, ovqatlanish xizmatlari va maxsus yordam xodimlari bilan zamonaviy konferentsiya xonalari va tadbir maydonlari mavjud.'),
    ('Mehmonxonada Wi-Fi mavjudmi?', 'Yuqori tezlikdagi Wi-Fi butun bino bo’ylab, jumladan barcha xonalar, umumiy joylar va tadbir maydonlarida bepul taqdim etiladi.'),
  ],
  'ru': [
    ('Какое время заезда и выезда?', 'Заезд с 14:00, выезд до 12:00. Ранний заезд и поздний выезд доступны по запросу.'),
    ('Предоставляете ли вы трансфер из аэропорта?', 'Да, мы предоставляем бесплатный трансфер для всех бронирований люксов.'),
    ('Включён ли завтрак в стоимость?', 'Шведский стол для гурманов включён во все бронирования.'),
    ('Какие способы оплаты вы принимаете?', 'Мы принимаем все основные карты (Visa, Mastercard, American Express), наличные в UZS и USD, банковские переводы.'),
    ('Есть ли помещения для деловых встреч?', 'Да, у нас есть современные конференц-залы с полным AV-оборудованием.'),
    ('Доступен ли Wi-Fi во всём отеле?', 'Высокоскоростной Wi-Fi бесплатен на всей территории, включая все номера.'),
  ],
};
