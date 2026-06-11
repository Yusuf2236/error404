import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';
import '../app_state.dart';
import '../data/content.dart';
import '../data/i18n.dart';
import '../data/rooms.dart';
import '../data/services.dart';
import '../theme.dart';
import '../widgets/hero_video.dart';
import '../widgets/page_transition.dart';
import '../widgets/room_card.dart';
import 'room_detail_screen.dart';
import 'service_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  final void Function(int tab) onNavigateTab;
  const HomeScreen({super.key, required this.onNavigateTab});

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final lang = state.lang;
    final featured = kRooms.take(3).toList();

    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _Hero(lang: lang, onRooms: () => onNavigateTab(1), onContact: () => onNavigateTab(3)),

        _SectionHead(title: tr('rooms.title', lang), subtitle: tr('rooms.subtitle', lang)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              for (final (i, room) in featured.indexed)
                RoomCard(
                  room: room,
                  occupied: state.occupied.contains(room.id),
                  lang: lang,
                  onTap: () => Navigator.push(
                    context,
                    luxeRoute(RoomDetailScreen(room: room)),
                  ),
                ).animate().fadeIn(delay: (i * 100).ms).moveY(begin: 20, end: 0),
              const SizedBox(height: 4),
              OutlinedButton(
                onPressed: () => onNavigateTab(1),
                style: OutlinedButton.styleFrom(
                  foregroundColor: context.primaryText,
                  side: BorderSide(color: context.primaryText),
                  padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 14),
                ),
                child: Text(tr('rooms.all', lang)),
              ),
            ],
          ),
        ),

        // Live exchange rate
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 28, 20, 0),
          child: _FxConverter(),
        ),

        const SizedBox(height: 8),
        _AmenitiesSection(lang: lang),

        _SectionHead(title: tr('testi.title', lang), subtitle: tr('testi.subtitle', lang)),
        SizedBox(
          height: 230,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: (testimonialsByLang[lang] ?? testimonialsByLang['en']!).length,
            separatorBuilder: (_, _) => const SizedBox(width: 14),
            itemBuilder: (context, i) =>
                _TestimonialCard((testimonialsByLang[lang] ?? testimonialsByLang['en']!)[i]),
          ),
        ),

        const SizedBox(height: 36),
        _LocalExplorerSection(lang: lang),

        _SectionHead(title: tr('faq.title', lang), subtitle: tr('faq.subtitle', lang)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [for (final f in (faqByLang[lang] ?? faqByLang['en']!)) _FaqTile(f)],
          ),
        ),

        const SizedBox(height: 36),
        _Newsletter(lang: lang),
        const SizedBox(height: 150),
      ],
    );
  }
}

class _Hero extends StatelessWidget {
  final String lang;
  final VoidCallback onRooms;
  final VoidCallback onContact;
  const _Hero({required this.lang, required this.onRooms, required this.onContact});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 460,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // Looping muted video background (falls back to the hero image).
          const RepaintBoundary(
            child: HeroVideoBackground(
              // Cinematic walkthrough of a modern luxury property (Pexels, CORS-ok).
              videoUrl:
                  'https://videos.pexels.com/video-files/7578541/7578541-hd_1280_720_30fps.mp4',
              fallbackImage: SiteImages.heroBg,
            ),
          ),
          Container(color: AppColors.navy.withValues(alpha: 0.5)),
          Positioned(
            left: 24,
            right: 24,
            bottom: 40,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('VIP UZBE',
                    style: TextStyle(
                        color: AppColors.gold,
                        fontSize: 14,
                        letterSpacing: 6,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 12),
                Text(tr('hero.title', lang),
                    style: Theme.of(context)
                        .textTheme
                        .displayLarge
                        ?.copyWith(color: Colors.white, height: 1.12)),
                const SizedBox(height: 14),
                Text(tr('hero.subtitle', lang),
                    style: const TextStyle(color: Colors.white70, fontSize: 14, height: 1.6)),
                const SizedBox(height: 22),
                Row(
                  children: [
                    ElevatedButton(onPressed: onRooms, child: Text(tr('hero.viewRooms', lang))),
                    const SizedBox(width: 12),
                    OutlinedButton(
                      onPressed: onContact,
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.gold,
                        side: const BorderSide(color: AppColors.gold),
                        padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 15),
                      ),
                      child: Text(tr('hero.contact', lang)),
                    ),
                  ],
                ),
              ].animate(interval: 90.ms).fadeIn(duration: 500.ms).moveY(begin: 14, end: 0),
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionHead extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool light;
  const _SectionHead({required this.title, required this.subtitle, this.light = false});

  @override
  Widget build(BuildContext context) {
    final titleColor = light ? Colors.white : context.primaryText;
    final subColor = light ? Colors.white70 : context.secondaryText;
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 30, 20, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: Theme.of(context).textTheme.displaySmall?.copyWith(color: titleColor)),
          const SizedBox(height: 6),
          Text(subtitle, style: TextStyle(color: subColor, fontSize: 14, height: 1.5)),
        ],
      ),
    );
  }
}

class _AmenitiesSection extends StatelessWidget {
  final String lang;
  const _AmenitiesSection({required this.lang});

  @override
  Widget build(BuildContext context) {
    final services = servicesByLang[lang] ?? servicesByLang['en']!;
    return Stack(
      children: [
        Positioned.fill(
          child: CachedNetworkImage(
            imageUrl: SiteImages.servicesBg,
            fit: BoxFit.cover,
            placeholder: (c, _) => Container(color: AppColors.navy),
            errorWidget: (c, _, _) => Container(color: AppColors.navy),
          ),
        ),
        Positioned.fill(child: Container(color: AppColors.navy.withValues(alpha: 0.82))),
        Column(
          children: [
            _SectionHead(
              title: tr('amenities.title', lang),
              subtitle: tr('amenities.subtitle', lang),
              light: true,
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 28),
              child: GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 0.86,
                children: [
                  for (final (i, s) in services.indexed)
                    GestureDetector(
                      onTap: () {
                        if (i < kServices.length) {
                          Navigator.push(
                              context, luxeRoute(ServiceDetailScreen(service: kServices[i])));
                        }
                      },
                      child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Colors.white.withValues(alpha: 0.12),
                            Colors.white.withValues(alpha: 0.04),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: AppColors.gold.withValues(alpha: 0.3)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: AppColors.gold.withValues(alpha: 0.16),
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: AppColors.gold.withValues(alpha: 0.3)),
                            ),
                            child: Text(s.$1, style: const TextStyle(fontSize: 26)),
                          ),
                          const SizedBox(height: 14),
                          Text(s.$2,
                              style: const TextStyle(
                                  color: AppColors.gold, fontWeight: FontWeight.w700, fontSize: 15)),
                          const SizedBox(height: 6),
                          Text(s.$3,
                              maxLines: 3,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.4)),
                        ],
                      ),
                    ),
                    ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _TestimonialCard extends StatelessWidget {
  final (String, String, String) data;
  const _TestimonialCard(this.data);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: context.cardSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: context.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('★★★★★', style: TextStyle(color: AppColors.gold, fontSize: 16)),
          const SizedBox(height: 10),
          Expanded(
            child: Text('“${data.$3}”',
                maxLines: 5,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    color: context.primaryText, height: 1.5, fontStyle: FontStyle.italic)),
          ),
          const SizedBox(height: 10),
          Text(data.$1,
              style: TextStyle(color: context.primaryText, fontWeight: FontWeight.w700)),
          Text(data.$2, style: TextStyle(color: context.secondaryText, fontSize: 12)),
        ],
      ),
    );
  }
}

class _LocalExplorerSection extends StatelessWidget {
  final String lang;
  const _LocalExplorerSection({required this.lang});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _SectionHead(title: tr('explore.title', lang), subtitle: tr('explore.subtitle', lang)),
        SizedBox(
          height: 200,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: kLandmarks.length,
            separatorBuilder: (_, _) => const SizedBox(width: 14),
            itemBuilder: (context, i) {
              final l = kLandmarks[i];
              return SizedBox(
                width: 250,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    fit: StackFit.expand,
                    children: [
                      CachedNetworkImage(
                        imageUrl: l.$1,
                        fit: BoxFit.cover,
                        placeholder: (c, _) => Container(color: const Color(0xFFEDE8E1)),
                        errorWidget: (c, _, _) => Container(color: const Color(0xFFEDE8E1)),
                      ),
                      const DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.center,
                            end: Alignment.bottomCenter,
                            colors: [Colors.transparent, Colors.black87],
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(14),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(l.$2,
                                style: const TextStyle(
                                    color: Colors.white, fontWeight: FontWeight.w700, fontSize: 16)),
                            const SizedBox(height: 2),
                            Text(l.$3, style: const TextStyle(color: AppColors.gold, fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _FaqTile extends StatelessWidget {
  final (String, String) data;
  const _FaqTile(this.data);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: context.cardSurface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: context.cardBorder),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          shape: const Border(),
          collapsedShape: const Border(),
          iconColor: AppColors.goldDeep,
          collapsedIconColor: context.secondaryText,
          title: Text(data.$1,
              style: TextStyle(
                  color: context.primaryText, fontWeight: FontWeight.w600, fontSize: 14)),
          childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Text(data.$2,
                  style: TextStyle(color: context.secondaryText, height: 1.5, fontSize: 13)),
            ),
          ],
        ),
      ),
    );
  }
}

class _Newsletter extends StatelessWidget {
  final String lang;
  const _Newsletter({required this.lang});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.navy,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          Text(tr('news.title', lang),
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(color: AppColors.gold)),
          const SizedBox(height: 8),
          Text(tr('news.subtitle', lang),
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white70, height: 1.5)),
          const SizedBox(height: 18),
          const TextField(
            textAlign: TextAlign.center,
            decoration: InputDecoration(hintText: 'concierge@vipuzbe.com'),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(minimumSize: const Size.fromHeight(50)),
              child: Text(tr('news.subscribe', lang)),
            ),
          ),
        ],
      ),
    );
  }
}

/// Real-time USD → UZS converter (fixes the "rate shows 0" issue with a live feed).
class _FxConverter extends StatefulWidget {
  const _FxConverter();

  @override
  State<_FxConverter> createState() => _FxConverterState();
}

class _FxConverterState extends State<_FxConverter> {
  final _controller = TextEditingController(text: '100');
  double _amount = 100;

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final lang = state.lang;
    final rate = state.usdToUzs;
    final result = _amount * rate;
    final fmt = NumberFormat.decimalPattern();

    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.navy, Color(0xFF1B2438)],
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.gold.withValues(alpha: 0.25)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Text('💱', style: TextStyle(fontSize: 18)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(tr('fx.title', lang),
                    style: const TextStyle(
                        color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15)),
              ),
              if (state.fxLoading)
                const SizedBox(
                    width: 14, height: 14,
                    child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.gold))
              else
                GestureDetector(
                  onTap: state.refreshRate,
                  child: const Icon(Icons.refresh, color: AppColors.gold, size: 18),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Text('1 USD = ${fmt.format(rate.round())} UZS',
              style: const TextStyle(color: AppColors.gold, fontSize: 12)),
          const SizedBox(height: 14),
          TextField(
            controller: _controller,
            keyboardType: TextInputType.number,
            style: const TextStyle(color: Colors.white),
            onChanged: (v) => setState(() => _amount = double.tryParse(v) ?? 0),
            decoration: InputDecoration(
              labelText: tr('fx.amount', lang),
              labelStyle: const TextStyle(color: Colors.white60),
              prefixText: '\$ ',
              prefixStyle: const TextStyle(color: AppColors.gold),
              filled: true,
              fillColor: Colors.white.withValues(alpha: 0.06),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.14)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: const BorderSide(color: AppColors.gold, width: 1.5),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Text(tr('fx.estimated', lang),
              style: const TextStyle(color: Colors.white60, fontSize: 12)),
          const SizedBox(height: 2),
          Text('${fmt.format(result.round())} UZS',
              style: const TextStyle(
                  color: AppColors.gold, fontSize: 24, fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }
}
