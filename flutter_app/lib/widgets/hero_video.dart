import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import '../theme.dart';

/// A looping, muted background video that covers its box. Shows [fallbackImage]
/// while loading or if the video fails — so the hero is never blank.
class HeroVideoBackground extends StatefulWidget {
  final String videoUrl;
  final String fallbackImage;
  const HeroVideoBackground({super.key, required this.videoUrl, required this.fallbackImage});

  @override
  State<HeroVideoBackground> createState() => _HeroVideoBackgroundState();
}

class _HeroVideoBackgroundState extends State<HeroVideoBackground> {
  VideoPlayerController? _controller;
  bool _ready = false;

  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    final c = VideoPlayerController.networkUrl(Uri.parse(widget.videoUrl));
    _controller = c;
    try {
      await c.initialize();
      await c.setLooping(true);
      await c.setVolume(0);
      await c.play();
      if (mounted) setState(() => _ready = true);
    } catch (e) {
      debugPrint('HeroVideoBackground init error: $e');
      // keep showing the fallback image
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final image = CachedNetworkImage(
      imageUrl: widget.fallbackImage,
      fit: BoxFit.cover,
      placeholder: (c, _) => Container(color: AppColors.navy),
      errorWidget: (c, _, _) => Container(color: AppColors.navy),
    );

    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 600),
      child: (_ready && _controller != null)
          ? SizedBox.expand(
              key: const ValueKey('video'),
              child: FittedBox(
                fit: BoxFit.cover,
                child: SizedBox(
                  width: _controller!.value.size.width,
                  height: _controller!.value.size.height,
                  child: VideoPlayer(_controller!),
                ),
              ),
            )
          : SizedBox.expand(key: const ValueKey('image'), child: image),
    );
  }
}
