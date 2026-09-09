import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../models/room.dart';
import '../theme.dart';
import '../widgets/glass.dart';
import 'booking_screen.dart';

class RoomDetailScreen extends StatelessWidget {
  final Room room;
  const RoomDetailScreen({super.key, required this.room});

  static const _amenities = [
    ('rd.am.king', Icons.bed),
    ('rd.am.wifi', Icons.wifi),
    ('rd.am.view', Icons.landscape_outlined),
    ('rd.am.minibar', Icons.local_bar_outlined),
    ('rd.am.tv', Icons.tv),
    ('rd.am.service', Icons.room_service_outlined),
    ('rd.am.ac', Icons.ac_unit),
    ('rd.am.bath', Icons.bathtub_outlined),
  ];

  static const _included = [
    (Icons.free_breakfast_outlined, 'rd.inc.breakfast', 'rd.inc.breakfastSub'),
    (Icons.directions_car_filled_outlined, 'rd.inc.transfer', 'rd.inc.transferSub'),
    (Icons.support_agent_outlined, 'rd.inc.concierge', 'rd.inc.conciergeSub'),
  ];

  @override
  Widget build(BuildContext context) {
    final state = AppScope.of(context);
    final occupied = state.occupied.contains(room.id);
    final fav = state.isFavorite(room.id);
    final isSuite = room.type == 'suite';

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 320,
            pinned: true,
            backgroundColor: AppColors.navy,
            foregroundColor: AppColors.gold,
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 8, top: 8, bottom: 8),
                child: Glass(
                  borderRadius: BorderRadius.circular(30),
                  tint: Colors.black.withValues(alpha: 0.25),
                  child: IconButton(
                    onPressed: () => state.toggleFavorite(room.id),
                    icon: Icon(fav ? Icons.favorite : Icons.favorite_border,
                        color: fav ? Colors.redAccent : Colors.white),
                  ),
                ),
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  Hero(
                    tag: 'room-${room.id}',
                    child: CachedNetworkImage(
                      imageUrl: room.imageUrl,
                      fit: BoxFit.cover,
                      placeholder: (c, _) => Container(color: AppColors.navy),
                      errorWidget: (c, _, _) => Container(
                        color: AppColors.navy,
                        child: const Center(
                          child: Icon(Icons.hotel, color: AppColors.gold, size: 56),
                        ),
                      ),
                    ),
                  ),
                  const DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.black26, Colors.transparent, Colors.black87],
                        stops: [0, 0.45, 1],
                      ),
                    ),
                  ),
                  Positioned(
                    left: 20,
                    bottom: 18,
                    right: 20,
                    child: Row(
                      children: [
                        _tag(isSuite ? 'SUITE' : 'ROOM', AppColors.gold, AppColors.navy),
                        const SizedBox(width: 8),
                        if (occupied) _tag('BOOKED TODAY', Colors.red.shade700, Colors.white),
                        const Spacer(),
                        const Icon(Icons.star, color: AppColors.gold, size: 16),
                        const SizedBox(width: 4),
                        const Text('4.9',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
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
                  Text(room.localizedName(state.lang),
                      style: Theme.of(context).textTheme.displaySmall),
                  const SizedBox(height: 14),
                  // Quick facts
                  _facts(context, isSuite),
                  const SizedBox(height: 22),
                  _heading(context, tr('rd.experience', state.lang)),
                  const SizedBox(height: 8),
                  Text(room.localizedDescription(state.lang),
                      style: TextStyle(color: context.secondaryText, height: 1.7, fontSize: 15)),
                  const SizedBox(height: 26),
                  _heading(context, tr('rd.amenities', state.lang)),
                  const SizedBox(height: 14),
                  _amenityGrid(context),
                  const SizedBox(height: 26),
                  _heading(context, tr('rd.included', state.lang)),
                  const SizedBox(height: 12),
                  for (final inc in _included) _includedRow(context, inc),
                  const SizedBox(height: 20),
                  _locationCard(context),
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (state.isLoggedIn)
                    Text('\$${room.price}',
                        style: TextStyle(
                            color: context.secondaryText,
                            fontSize: 14,
                            decoration: TextDecoration.lineThrough)),
                  RichText(
                    text: TextSpan(children: [
                      TextSpan(
                        text: '\$${state.priceFor(room.price)}',
                        style: const TextStyle(
                            color: AppColors.goldDeep, fontSize: 26, fontWeight: FontWeight.w800),
                      ),
                      TextSpan(
                        text: ' ${tr('c.night', state.lang)}',
                        style: TextStyle(color: context.secondaryText, fontSize: 13),
                      ),
                    ]),
                  ),
                  if (state.isLoggedIn)
                    Text(tr('rd.memberPrice', state.lang),
                        style: const TextStyle(color: AppColors.goldDeep, fontSize: 11)),
                ],
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => BookingScreen(preselectedRoomId: room.id)),
                ),
                child: Text(tr('c.bookNow', state.lang)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _tag(String label, Color bg, Color fg) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(6)),
        child: Text(label,
            style: TextStyle(color: fg, fontSize: 11, letterSpacing: 1, fontWeight: FontWeight.w700)),
      );

  Widget _heading(BuildContext context, String text) =>
      Text(text, style: Theme.of(context).textTheme.titleLarge);

  Widget _facts(BuildContext context, bool isSuite) {
    final lang = AppScope.of(context).lang;
    final facts = [
      (Icons.king_bed_outlined, isSuite ? tr('rd.kingSofa', lang) : tr('rd.king', lang)),
      (Icons.group_outlined, '${isSuite ? 4 : 2} ${tr('c.guests', lang)}'),
      (Icons.square_foot, isSuite ? '65 m²' : '38 m²'),
      (Icons.landscape_outlined, tr('rd.cityView', lang)),
    ];
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final f in facts)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
            decoration: BoxDecoration(
              color: AppColors.gold.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.gold.withValues(alpha: 0.25)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(f.$1, size: 16, color: AppColors.goldDeep),
                const SizedBox(width: 6),
                Text(f.$2,
                    style: TextStyle(
                        color: context.primaryText, fontSize: 13, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
      ],
    );
  }

  Widget _amenityGrid(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        for (final a in _amenities)
          SizedBox(
            width: (MediaQuery.of(context).size.width - 44 - 12) / 2,
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: [
                      AppColors.gold.withValues(alpha: 0.18),
                      AppColors.goldDeep.withValues(alpha: 0.10),
                    ]),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(a.$2, color: AppColors.goldDeep, size: 19),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(tr(a.$1, AppScope.of(context).lang),
                      style: TextStyle(
                          color: context.primaryText, fontSize: 13, fontWeight: FontWeight.w500)),
                ),
              ],
            ),
          ),
      ],
    );
  }

  Widget _includedRow(BuildContext context, (IconData, String, String) inc) {
    final lang = AppScope.of(context).lang;
    return Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: context.cardSurface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: context.cardBorder),
        ),
        child: Row(
          children: [
            Icon(inc.$1, color: AppColors.goldDeep),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(tr(inc.$2, lang),
                      style: TextStyle(
                          color: context.primaryText, fontWeight: FontWeight.w700, fontSize: 14)),
                  Text(tr(inc.$3, lang), style: TextStyle(color: context.secondaryText, fontSize: 12)),
                ],
              ),
            ),
            const Icon(Icons.check_circle, color: AppColors.gold, size: 18),
          ],
        ),
      );
  }

  Widget _locationCard(BuildContext context) {
    final lang = AppScope.of(context).lang;
    return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [AppColors.navy, Color(0xFF1B2438)],
          ),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            const Icon(Icons.location_on, color: AppColors.gold),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(tr('rd.locTitle', lang),
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 2),
                  Text(tr('rd.locSub', lang),
                      style: const TextStyle(color: Colors.white70, fontSize: 12)),
                ],
              ),
            ),
            const Icon(Icons.map_outlined, color: AppColors.gold, size: 20),
          ],
        ),
      );
  }
}
