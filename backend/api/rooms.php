<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$rooms = [
  [
    "id" => "vip-platinum-suite",
    "type" => "suite",
    "specs" => [
      "area" => "120m²",
      "bed" => "King Size (Silk Sheets)",
      "floor" => "15th (Sky View)",
      "capacity" => "2 Adults + 1 Child"
    ],
    "name" => [
      "en" => "Platinum Panorama Suite",
      "uz" => "Platina Panorama Lyuksi",
      "ru" => "Платиновый Панорамный Люкс"
    ],
    "description" => [
      "en" => "Located on the 15th floor with a 270-degree view of Tashkent City and the Humo Arena. Features a private terrace, smart climate control, and a dedicated workspace. This suite is designed for those who demand the absolute pinnacle of urban luxury. Includes a master bedroom with premium Italian furniture and a living area equipped with a personal bar.",
      "uz" => "15-qavatda joylashgan, Tashkent City va Humo Arena-ga 270 darajali ko'rinishga ega. Shaxsiy ayvon, aqlli iqlim nazorati va maxsus ish joyiga ega. Ushbu lyuks shahar hashamatining eng yuqori cho'qqisini talab qiladiganlar uchun mo'ljallangan. Premium italyan mebellari bilan jihozlangan asosiy yotoqxona va shaxsiy bariga ega yashash xonasini o'z ichiga oladi.",
      "ru" => "Расположен на 15-м этаже с 270-градусным видом на Tashkent City и Humo Arena. Включает частную террасу, умный климат-контроль и выделенное рабочее место. Этот люкс создан для тех, кто требует абсолютного пика городского люкса. Включает главную спальню с итальянской мебелью премиум-класса и гостиную зону с персональным баром."
    ],
    "price" => 550,
    "imageUrl" => "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  [
    "id" => "imperial-silk-room",
    "type" => "room",
    "specs" => [
      "area" => "65m²",
      "bed" => "Queen Size (Heritage Silk)",
      "floor" => "10-12th",
      "capacity" => "2 Adults"
    ],
    "name" => [
      "en" => "Imperial Silk Room",
      "uz" => "Imperial Shoyi Xonasi",
      "ru" => "Императорский Шелковый Номер"
    ],
    "description" => [
      "en" => "Decorated with authentic Margilan silk and hand-carved walnut furniture. Includes a selection of premium Uzbek teas and sweets. The room offers a unique blend of heritage craftsmanship and 21st-century comfort. Every piece of textile is hand-woven by national masters, providing an atmosphere of royal tranquility.",
      "uz" => "Haqiqiy Marg'ilon shoyisi va yong'oq daraxtidan ishlangan mebellar bilan bezatilgan. Premium o'zbek choylari va shirinliklari kiritilgan. Xona meros hunarmandchiligi va 21-asr qulayligining noyob kombinatsiyasini taklif etadi. Har bir to'qimachilik mahsuloti milliy ustalar tomonidan qo'lda to'qilgan bo'lib, qirollik osoyishtaligi muhitini yaratadi.",
      "ru" => "Декорирован подлинным маргиланским шелком и мебелью из грецкого ореха ручной работы. Включает выбор премиального узбекского чая и сладостей. Номер предлагает уникальное сочетание традиционного мастерства и комфорта 21 века. Каждое изделие из текстиля соткано вручную национальными мастерами, создавая атмосферу королевского спокойствия."
    ],
    "price" => 450,
    "imageUrl" => "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  [
    "id" => "samarkand-royal",
    "type" => "suite",
    "specs" => [
      "area" => "250m²",
      "bed" => "King Size (Gold Thread)",
      "floor" => "Penthouse",
      "capacity" => "4 Adults"
    ],
    "name" => [
      "en" => "Amir Temur Heritage Suite",
      "uz" => "Amir Temur Merosi Lyuksi",
      "ru" => "Люкс Наследие Амира Темура"
    ],
    "description" => [
      "en" => "A grand space featuring replicas of Samarkand's architectural wonders. Absolute privacy with a 24/7 dedicated butler and private elevator access. The suite features a grand hall for receptions and a private library with rare manuscripts. It is the most prestigious accommodation in the region, offering a level of service and security beyond any comparison.",
      "uz" => "Samarqand me'moriy mo'jizalarining nusxalari bilan bezatilgan keng xona. 24/7 ishlaydigan shaxsiy xizmatkor va maxsus lift orqali mutlaq maxfylik. Lyuks qabullar uchun katta zal va noyob qo'lyozmalar mavjud bo'lgan shaxsiy kutubxonani o'z ichiga oladi. Bu mintaqadagi eng nufuzli qarorgoh bo'lib, har qanday taqqoslashdan tashqari xizmat va havfsizlik darajasini taklif etadi.",
      "ru" => "Роскошное пространство с репликами архитектурных чудес Самарканда. Полная приватность с круглосуточным дворецким и частным лифтом. В люксе есть парадный зал для приемов и частная библиотека с редкими манускриптами. Это самое престижное жилье в регионе, предлагающее уровень сервиса и безопасности вне всякого сравнения."
    ],
    "price" => 2500,
    "imageUrl" => "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  [
    "id" => "chorsu-deluxe",
    "type" => "room",
    "specs" => [
      "area" => "55m²",
      "bed" => "King Size",
      "floor" => "4-8th",
      "capacity" => "2 Adults"
    ],
    "name" => [
      "en" => "Chorsu View Deluxe",
      "uz" => "Chorsu Ko'rinishidagi Deluks",
      "ru" => "Делюкс Вид на Чорсу"
    ],
    "description" => [
      "en" => "Overlooking the vibrant Chorsu Bazaar. Soundproof windows ensure a peaceful stay while keeping you close to the heart of the Old City. The room is decorated in an eclectic style that celebrates Tashkent's urban history. High-speed Wi-Fi and 55-inch smart TVs are standard features for our modern elite guests.",
      "uz" => "Gavjum Chorsu bozoriga qaragan xona. Ovoz o'tkazmaydigan derazalar Eski Shahar markazida bo'lishingizga qaramay, tinch dam olishni ta'minlaydi. Xona Toshkentning shahar tarixini nishonlaydigan eklektik uslubda bezatilgan. Yuqori tezlikdagi Wi-Fi va 55 dyuymli smart TV-lar zamonaviy elita mehmonlarimiz uchun standart xususiyatlardir.",
      "ru" => "С видом на оживленный базар Чорсу. Звукоизолированные окна гарантируют спокойный отдых, сохраняя близость к сердцу Старого города. Номер оформлен в эклектичном стиле, воспевающем городскую историю Ташкента. Высокоскоростной Wi-Fi и 55-дюймовые смарт-телевизоры являются стандартными функциями для наших современных элитных гостей."
    ],
    "price" => 380,
    "imageUrl" => "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  [
    "id" => "tashkent-city-executive",
    "type" => "suite",
    "specs" => [
      "area" => "95m²",
      "bed" => "King Size",
      "floor" => "14th",
      "capacity" => "2 Adults"
    ],
    "name" => [
      "en" => "Tashkent City Executive",
      "uz" => "Tashkent City Ekzekyutiv",
      "ru" => "Ташкент Сити Эксклюзив"
    ],
    "description" => [
      "en" => "Modern executive suite with floor-to-ceiling windows. Perfect for business leaders who want to be in the center of the new business district. Includes access to our private business lounge on the executive floor, offering complimentary refreshments and meeting spaces for high-stakes negotiations.",
      "uz" => "Zamonaviy biznes-lyuks panaramali derazalar bilan. Yangi biznes tumani markazida bo'lishni xohlovchi ishbilarmonlar uchun mukammal tanlov. Ekzekyutiv qavatdagi shaxsiy biznes-zalga kirish imkoniyatini o'z ichiga oladi, u yerda yuqori darajadagi muzokaralar uchun bepul ichimliklar va uchrashuv joylari taklif etiladi.",
      "ru" => "Современный представительский люкс с панорамными окнами. Идеально для бизнес-лидеров в центре нового делового района. Включает доступ в наш частный бизнес-лаундж на представительском этаже, предлагающий бесплатные напитки и конференц-залы для важных переговоров."
    ],
    "price" => 850,
    "imageUrl" => "https://images.unsplash.com/photo-1590490360182-f33fb0e201b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
];

echo json_encode($rooms);
