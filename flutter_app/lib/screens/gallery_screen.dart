import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import '../data/rooms.dart';
import '../theme.dart';

class GalleryScreen extends StatelessWidget {
  const GalleryScreen({super.key});

  static const _extra = [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ];

  @override
  Widget build(BuildContext context) {
    final images = [...kRooms.map((r) => r.imageUrl), ..._extra];
    return Scaffold(
      appBar: AppBar(title: const Text('GALLERY')),
      body: GridView.builder(
        padding: const EdgeInsets.all(12),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 10,
          crossAxisSpacing: 10,
        ),
        itemCount: images.length,
        itemBuilder: (context, i) => ClipRRect(
          borderRadius: BorderRadius.circular(14),
          child: CachedNetworkImage(
            imageUrl: images[i],
            fit: BoxFit.cover,
            placeholder: (c, _) => Container(color: const Color(0xFFEDE8E1)),
            errorWidget: (c, _, e) =>
                Container(color: const Color(0xFFEDE8E1),
                    child: const Icon(Icons.image_not_supported_outlined, color: AppColors.slate)),
          ),
        ),
      ),
    );
  }
}
