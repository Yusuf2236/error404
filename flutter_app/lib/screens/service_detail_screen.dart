import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../data/services.dart';
import '../theme.dart';
import '../widgets/glass.dart';
import 'concierge_chat_screen.dart';

class ServiceDetailScreen extends StatelessWidget {
  final HotelService service;
  const ServiceDetailScreen({super.key, required this.service});

  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: AppColors.navy,
            foregroundColor: AppColors.gold,
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Hero(
                    tag: 'service-${service.id}',
                    child: CachedNetworkImage(
                      imageUrl: serviceImage(service.hero),
                      fit: BoxFit.cover,
                      placeholder: (c, _) => Container(color: AppColors.navy),
                      errorWidget: (c, _, _) => Container(
                        color: AppColors.navy,
                        child: Center(child: Text(service.emoji, style: const TextStyle(fontSize: 56))),
                      ),
                    ),
                  ),
                  const DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.black26, Colors.transparent, Colors.black87],
                        stops: [0, 0.4, 1],
                      ),
                    ),
                  ),
                  Positioned(
                    left: 20,
                    right: 20,
                    bottom: 18,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.gold,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text('${service.emoji}  ${tr('sv.signature', lang)}',
                              style: const TextStyle(
                                  color: AppColors.navy, fontSize: 10, fontWeight: FontWeight.w800,
                                  letterSpacing: 1)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(22, 22, 22, 120),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(service.title, style: Theme.of(context).textTheme.displaySmall),
                  const SizedBox(height: 4),
                  Text(service.tagline,
                      style: const TextStyle(
                          color: AppColors.goldDeep, fontSize: 15, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 18),
                  Text(service.description,
                      style: TextStyle(color: context.secondaryText, height: 1.7, fontSize: 15)),
                  const SizedBox(height: 26),
                  _heading(context, tr('sv.gallery', lang)),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 150,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: service.gallery.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 12),
                      itemBuilder: (context, i) => GestureDetector(
                        onTap: () => _openImage(context, serviceImage(service.gallery[i])),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: CachedNetworkImage(
                            imageUrl: serviceImage(service.gallery[i]),
                            width: 210,
                            height: 150,
                            fit: BoxFit.cover,
                            placeholder: (c, _) => Container(width: 210, color: const Color(0xFFEDE8E1)),
                            errorWidget: (c, _, _) => Container(width: 210, color: const Color(0xFFEDE8E1)),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 26),
                  _heading(context, tr('sv.highlights', lang)),
                  const SizedBox(height: 12),
                  for (final f in service.features) _feature(context, f),
                ].animate(interval: 60.ms).fadeIn(duration: 350.ms).moveY(begin: 12, end: 0),
              ),
            ),
          ),
        ],
      ),
      bottomSheet: Glass(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        padding: const EdgeInsets.fromLTRB(22, 16, 22, 16),
        child: SafeArea(
          top: false,
          child: Row(
            children: [
              Expanded(
                child: Text(tr('sv.arrange', lang),
                    style: const TextStyle(color: AppColors.goldDeep, fontWeight: FontWeight.w600)),
              ),
              const SizedBox(width: 12),
              ElevatedButton.icon(
                onPressed: () => Navigator.push(
                    context, MaterialPageRoute(builder: (_) => const ConciergeChatScreen())),
                icon: const Icon(Icons.chat_bubble_outline, size: 18),
                label: Text(tr('c.request', lang)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _openImage(BuildContext context, String url) {
    showDialog(
      context: context,
      barrierColor: Colors.black87,
      builder: (_) => GestureDetector(
        onTap: () => Navigator.pop(context),
        child: InteractiveViewer(
          child: Center(
            child: CachedNetworkImage(imageUrl: url, fit: BoxFit.contain),
          ),
        ),
      ),
    );
  }

  Widget _heading(BuildContext context, String t) =>
      Text(t, style: Theme.of(context).textTheme.titleLarge);

  Widget _feature(BuildContext context, (IconData, String) f) => Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Row(
          children: [
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [
                  AppColors.gold.withValues(alpha: 0.18),
                  AppColors.goldDeep.withValues(alpha: 0.10),
                ]),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(f.$1, color: AppColors.goldDeep, size: 20),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Text(f.$2,
                  style: TextStyle(
                      color: context.primaryText, fontSize: 14, fontWeight: FontWeight.w500)),
            ),
          ],
        ),
      );
}
