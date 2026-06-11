import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../data/services.dart';
import '../theme.dart';
import '../widgets/page_transition.dart';
import 'service_detail_screen.dart';

class ServicesScreen extends StatelessWidget {
  const ServicesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('SERVICES')),
      body: ListView.builder(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        itemCount: kServices.length,
        itemBuilder: (context, i) => _ServiceCard(service: kServices[i])
            .animate()
            .fadeIn(delay: (i * 70).ms)
            .moveY(begin: 16, end: 0),
      ),
    );
  }
}

class _ServiceCard extends StatelessWidget {
  final HotelService service;
  const _ServiceCard({required this.service});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(18),
          onTap: () => Navigator.push(
            context,
            luxeRoute(ServiceDetailScreen(service: service)),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(18),
            child: Stack(
              children: [
                Hero(
                  tag: 'service-${service.id}',
                  child: CachedNetworkImage(
                    imageUrl: serviceImage(service.hero),
                    height: 170,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    placeholder: (c, _) => Container(height: 170, color: AppColors.navy),
                    errorWidget: (c, _, _) => Container(
                      height: 170,
                      color: AppColors.navy,
                      child: Center(child: Text(service.emoji, style: const TextStyle(fontSize: 40))),
                    ),
                  ),
                ),
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black.withValues(alpha: 0.78)],
                      ),
                    ),
                  ),
                ),
                Positioned(
                  left: 16,
                  right: 16,
                  bottom: 14,
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('${service.emoji}  ${service.title}',
                                style: const TextStyle(
                                    color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                            const SizedBox(height: 2),
                            Text(service.tagline,
                                style: const TextStyle(color: AppColors.gold, fontSize: 13)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: const BoxDecoration(color: AppColors.gold, shape: BoxShape.circle),
                        child: const Icon(Icons.arrow_forward, color: AppColors.navy, size: 18),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
