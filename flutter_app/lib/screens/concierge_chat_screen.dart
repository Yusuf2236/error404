import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import '../app_state.dart';
import '../theme.dart';
import '../widgets/glass.dart';

class _Msg {
  final String text;
  final bool fromBot;
  final String time;
  _Msg(this.text, this.fromBot, this.time);
}

/// Rule-based concierge styled like a real messaging app — avatars, timestamps,
/// read ticks, typing indicator and a frosted composer. EN/UZ/RU, on-device.
class ConciergeChatScreen extends StatefulWidget {
  const ConciergeChatScreen({super.key});

  @override
  State<ConciergeChatScreen> createState() => _ConciergeChatScreenState();
}

class _ConciergeChatScreenState extends State<ConciergeChatScreen> {
  final _input = TextEditingController();
  final _scroll = ScrollController();
  final List<_Msg> _messages = [];
  bool _typing = false;

  String get _lang => AppScope.of(context).lang;
  String _now() => DateFormat('HH:mm').format(DateTime.now());

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_messages.isEmpty) {
      _messages.add(_Msg(_kb('greeting', _lang), true, _now()));
    }
  }

  void _send([String? preset]) {
    final text = (preset ?? _input.text).trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_Msg(text, false, _now()));
      _input.clear();
      _typing = true;
    });
    _scrollDown();
    final reply = _answer(text, _lang);
    Future.delayed(const Duration(milliseconds: 900), () {
      if (!mounted) return;
      setState(() {
        _typing = false;
        _messages.add(_Msg(reply, true, _now()));
      });
      _scrollDown();
    });
  }

  void _scrollDown() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(_scroll.position.maxScrollExtent,
            duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = _lang;
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: Row(
          children: [
            _avatar(28),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('Royal Concierge',
                    style: TextStyle(
                        color: AppColors.gold, fontWeight: FontWeight.w700, fontSize: 16)),
                Row(
                  children: [
                    Container(
                        width: 7, height: 7,
                        decoration: const BoxDecoration(
                            color: Colors.greenAccent, shape: BoxShape.circle)),
                    const SizedBox(width: 5),
                    Text(_kb('online', lang),
                        style: const TextStyle(color: Colors.white70, fontSize: 11)),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: _scroll,
              padding: const EdgeInsets.fromLTRB(14, 16, 14, 16),
              itemCount: _messages.length + (_typing ? 1 : 0),
              itemBuilder: (context, i) {
                if (i == _messages.length) return _typingRow(context);
                return _row(context, _messages[i]);
              },
            ),
          ),
          _quickChips(lang),
          _composer(lang),
        ],
      ),
    );
  }

  Widget _avatar(double r) => CircleAvatar(
        radius: r / 2,
        backgroundColor: AppColors.gold,
        child: Icon(Icons.workspace_premium, color: AppColors.navy, size: r * 0.55),
      );

  Widget _row(BuildContext context, _Msg m) {
    final bot = m.fromBot;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        mainAxisAlignment: bot ? MainAxisAlignment.start : MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (bot) ...[_avatar(30), const SizedBox(width: 8)],
          Flexible(
            child: Column(
              crossAxisAlignment: bot ? CrossAxisAlignment.start : CrossAxisAlignment.end,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 11),
                  constraints: const BoxConstraints(maxWidth: 250),
                  decoration: BoxDecoration(
                    color: bot ? context.cardSurface : AppColors.navy,
                    borderRadius: BorderRadius.only(
                      topLeft: const Radius.circular(18),
                      topRight: const Radius.circular(18),
                      bottomLeft: Radius.circular(bot ? 4 : 18),
                      bottomRight: Radius.circular(bot ? 18 : 4),
                    ),
                    border: bot ? Border.all(color: context.cardBorder) : null,
                  ),
                  child: Text(m.text,
                      style: TextStyle(
                          color: bot ? context.primaryText : Colors.white, height: 1.4, fontSize: 14)),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 3, left: 4, right: 4),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(m.time, style: TextStyle(color: context.secondaryText, fontSize: 10)),
                      if (!bot) ...[
                        const SizedBox(width: 3),
                        const Icon(Icons.done_all, size: 13, color: AppColors.gold),
                      ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    ).animate().fadeIn(duration: 250.ms).moveY(begin: 8, end: 0);
  }

  Widget _typingRow(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          _avatar(30),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: context.cardSurface,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(18),
                topRight: Radius.circular(18),
                bottomRight: Radius.circular(18),
                bottomLeft: Radius.circular(4),
              ),
              border: Border.all(color: context.cardBorder),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: List.generate(3, (i) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 2),
                  child: const CircleAvatar(radius: 3, backgroundColor: AppColors.gold)
                      .animate(onPlay: (c) => c.repeat(reverse: true))
                      .fadeIn(delay: (i * 180).ms, duration: 450.ms)
                      .then()
                      .fadeOut(duration: 450.ms),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _quickChips(String lang) {
    final chips = _quick(lang);
    return SizedBox(
      height: 46,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        itemCount: chips.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, i) => ActionChip(
          label: Text(chips[i]),
          backgroundColor: AppColors.gold.withValues(alpha: 0.14),
          labelStyle: const TextStyle(color: AppColors.goldDeep, fontWeight: FontWeight.w600, fontSize: 13),
          side: BorderSide(color: AppColors.gold.withValues(alpha: 0.35)),
          shape: const StadiumBorder(),
          onPressed: () => _send(chips[i]),
        ),
      ),
    );
  }

  Widget _composer(String lang) {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
        child: Glass(
          borderRadius: BorderRadius.circular(28),
          padding: const EdgeInsets.fromLTRB(18, 4, 6, 4),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _input,
                  textInputAction: TextInputAction.send,
                  onSubmitted: (_) => _send(),
                  style: TextStyle(color: context.primaryText),
                  decoration: InputDecoration(
                    hintText: _kb('hint', lang),
                    hintStyle: TextStyle(color: context.secondaryText),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    isDense: true,
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.all(4),
                decoration: const BoxDecoration(color: AppColors.gold, shape: BoxShape.circle),
                child: IconButton(
                  onPressed: () => _send(),
                  icon: const Icon(Icons.send, color: AppColors.navy, size: 20),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- Knowledge base ---
  String _answer(String text, String lang) {
    final q = text.toLowerCase();
    bool has(List<String> ks) => ks.any(q.contains);
    if (has(['hello', 'hi', 'salom', 'assalom', 'привет', 'здравств'])) return _kb('greeting', lang);
    if (has(['room', 'suite', 'xona', 'lyuks', 'номер', 'люкс'])) return _kb('rooms', lang);
    if (has(['book', 'reserv', 'band', 'брон', 'забронир'])) return _kb('booking', lang);
    if (has(['price', 'cost', 'narx', 'qancha', 'цена', 'стоим', 'сколько'])) return _kb('price', lang);
    if (has(['spa', 'hammam', 'massage', 'massaj', 'спа', 'массаж'])) return _kb('spa', lang);
    if (has(['food', 'dining', 'eat', 'restaurant', 'taom', 'ovqat', 'еда', 'ресторан'])) return _kb('dining', lang);
    if (has(['where', 'location', 'address', 'qayer', 'manzil', 'где', 'адрес'])) return _kb('location', lang);
    if (has(['discount', 'chegirma', 'скидк', '20'])) return _kb('discount', lang);
    if (has(['service', 'xizmat', 'услуг'])) return _kb('services', lang);
    if (has(['wifi', 'internet', 'вай'])) return _kb('wifi', lang);
    return _kb('default', lang);
  }

  List<String> _quick(String lang) => switch (lang) {
        'uz' => ['Xonalar', 'Narxlar', 'Band qilish', 'Spa', 'Manzil'],
        'ru' => ['Номера', 'Цены', 'Бронь', 'Спа', 'Адрес'],
        _ => ['Rooms', 'Prices', 'Booking', 'Spa', 'Location'],
      };

  static String _kb(String key, String lang) {
    final m = _data[key] ?? _data['default']!;
    return m[lang] ?? m['en']!;
  }

  static const Map<String, Map<String, String>> _data = {
    'greeting': {
      'en': 'Welcome to VIP UZBE 👑 I’m your Royal Concierge. Ask me about rooms, booking, dining, spa, prices or our location.',
      'uz': 'VIP UZBE’ga xush kelibsiz 👑 Men sizning Qirollik Konsyerjingizman. Xonalar, bron, taomlar, spa, narxlar yoki manzil haqida so’rang.',
      'ru': 'Добро пожаловать в VIP UZBE 👑 Я ваш Королевский консьерж. Спросите о номерах, бронировании, кухне, спа, ценах или адресе.',
    },
    'online': {'en': 'Online · replies instantly', 'uz': 'Onlayn · darhol javob beradi', 'ru': 'Онлайн · отвечает мгновенно'},
    'hint': {'en': 'Type a message…', 'uz': 'Xabar yozing…', 'ru': 'Напишите сообщение…'},
    'rooms': {
      'en': 'We offer 8 elite rooms and suites — from the Chorsu View Deluxe (\$380) to the Amir Temur Heritage Suite (\$2500). Open the Rooms tab to explore them live.',
      'uz': 'Bizda 8 ta elita xona va lyuks bor — Chorsu Deluks (\$380) dan Amir Temur Merosi Lyuksi (\$2500) gacha. Xonalarni jonli ko’rish uchun Xonalar bo’limini oching.',
      'ru': 'У нас 8 элитных номеров и люксов — от Делюкс с видом на Чорсу (\$380) до люкса «Наследие Амира Темура» (\$2500). Откройте вкладку «Номера».',
    },
    'booking': {
      'en': 'Booking takes a minute: open Book, pick your room, dates and guests, then confirm. Members save 20% automatically.',
      'uz': 'Bron bir daqiqa: Band qilish bo’limini oching, xona, sana va mehmonlarni tanlang, tasdiqlang. A’zolar avtomatik 20% tejaydi.',
      'ru': 'Бронирование займёт минуту: откройте «Бронь», выберите номер, даты и гостей, подтвердите. Участники экономят 20%.',
    },
    'price': {
      'en': 'Rooms start at \$320/night, suites up to \$2500. Register to unlock an instant 20% member discount on every booking.',
      'uz': 'Xonalar \$320/tun dan, lyukslar \$2500 gacha. Ro’yxatdan o’tib har bronga 20% a’zo chegirmasini oching.',
      'ru': 'Номера от \$320/ночь, люксы до \$2500. Зарегистрируйтесь и получите 20% скидку участника.',
    },
    'spa': {
      'en': 'Our Royal Spa & Hammam offers authentic Bukhara marble rituals, gold facials and hot-stone therapy. See the Services screen for details.',
      'uz': 'Qirollik Spa va Xammomimizda Buxoro marmar marosimlari, oltin yuz parvarishi va issiq tosh terapiyasi bor. Batafsil — Xizmatlar bo’limida.',
      'ru': 'Наш Королевский СПА и хаммам предлагает мраморные ритуалы Бухары, золотые процедуры и стоун-терапию. Подробности — в «Услугах».',
    },
    'dining': {
      'en': 'Enjoy Uzbek fine dining by Michelin-star chefs — golden Bukhara plov, slow-roasted lamb and more, served 24/7.',
      'uz': 'Mishel yulduzli oshpazlardan o’zbek oliy taomlari — oltin Buxoro palovi, qo’zi va boshqalar, 24/7 xizmat.',
      'ru': 'Узбекская высокая кухня от шеф-поваров Мишлен — золотой бухарский плов, ягнёнок и многое другое, 24/7.',
    },
    'location': {
      'en': 'We’re in the heart of Tashkent — Tashkent City, moments from Chorsu Bazaar, Broadway and Amir Temur Square. See the Explore section.',
      'uz': 'Biz Toshkent markazidamiz — Tashkent City, Chorsu, Broadway va Amir Temur maydoni yaqinida. Explore bo’limini ko’ring.',
      'ru': 'Мы в центре Ташкента — Tashkent City, рядом с Чорсу, Бродвеем и площадью Амира Темура. Смотрите раздел Explore.',
    },
    'discount': {
      'en': 'Yes! Create a free account and you instantly unlock 20% off every booking, plus priority concierge.',
      'uz': 'Ha! Bepul hisob oching va darhol har bronga 20% chegirma hamda ustuvor konsyerj oching.',
      'ru': 'Да! Создайте бесплатный аккаунт и получите 20% скидку на каждое бронирование и приоритетный консьерж.',
    },
    'services': {
      'en': 'We offer fine dining, Royal Spa & Hammam, an infinity sky pool, VIP chauffeur and 24/7 concierge. Tap Services to learn more.',
      'uz': 'Bizda oliy taomlar, Qirollik Spa, infinity hovuz, VIP shofyor va 24/7 konsyerj bor. Batafsil — Xizmatlar.',
      'ru': 'У нас высокая кухня, Королевский СПА, бассейн-инфинити, VIP-водитель и консьерж 24/7. Нажмите «Услуги».',
    },
    'wifi': {
      'en': 'High-speed Wi-Fi is complimentary throughout the entire property, including all rooms and event spaces.',
      'uz': 'Yuqori tezlikdagi Wi-Fi butun mehmonxona bo’ylab bepul, barcha xonalar va tadbir maydonlarida.',
      'ru': 'Высокоскоростной Wi-Fi бесплатен на всей территории, во всех номерах и залах.',
    },
    'default': {
      'en': 'I can help with rooms, booking, prices, dining, spa, services, the 20% discount or our location. What would you like to know?',
      'uz': 'Men xonalar, bron, narxlar, taomlar, spa, xizmatlar, 20% chegirma yoki manzil bo’yicha yordam beraman. Nimani bilmoqchisiz?',
      'ru': 'Я помогу с номерами, бронированием, ценами, кухней, спа, услугами, скидкой 20% или адресом. Что вас интересует?',
    },
  };
}
