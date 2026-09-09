import 'dart:ui';
import 'package:flutter/material.dart';

/// iOS-26-style "liquid glass": a blurred, translucent surface with a hairline
/// highlight. Used selectively on floating/overlay chrome (nav bar, sticky bars,
/// pills) — not on regular content cards.
class Glass extends StatelessWidget {
  final Widget child;
  final double blur;
  final BorderRadius borderRadius;
  final EdgeInsetsGeometry? padding;
  final Color? tint;

  /// When false, skips the (expensive) BackdropFilter and uses a near-opaque
  /// fill instead — use for persistent chrome (e.g. the nav bar) so it never
  /// re-samples scrolling content each frame. Keeps high fps.
  final bool blurred;

  const Glass({
    super.key,
    required this.child,
    this.blur = 12,
    this.borderRadius = const BorderRadius.all(Radius.circular(22)),
    this.padding,
    this.tint,
    this.blurred = true,
  });

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    // Solid mode uses a higher opacity so it reads as a surface without blur.
    final fill = tint ??
        (blurred
            ? (dark ? const Color(0xFF0E1422).withValues(alpha: 0.55)
                    : Colors.white.withValues(alpha: 0.62))
            : (dark ? const Color(0xFF141B2B).withValues(alpha: 0.94)
                    : Colors.white.withValues(alpha: 0.94)));

    final content = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: fill,
        borderRadius: borderRadius,
        border: Border.all(
          color: Colors.white.withValues(alpha: dark ? 0.10 : 0.45),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: dark ? 0.30 : 0.08),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: child,
    );

    if (!blurred) {
      return ClipRRect(borderRadius: borderRadius, child: content);
    }
    return ClipRRect(
      borderRadius: borderRadius,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: content,
      ),
    );
  }
}
