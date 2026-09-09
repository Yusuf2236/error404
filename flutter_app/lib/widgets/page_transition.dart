import 'package:flutter/material.dart';

/// A premium page transition: the new screen fades + scales up while sliding
/// gently from below, and the outgoing screen dims and recedes. Combined with a
/// Hero image it makes opening a room/service feel cinematic.
Route<T> luxeRoute<T>(Widget page) {
  return PageRouteBuilder<T>(
    transitionDuration: const Duration(milliseconds: 520),
    reverseTransitionDuration: const Duration(milliseconds: 360),
    pageBuilder: (_, _, _) => page,
    transitionsBuilder: (context, animation, secondary, child) {
      final inCurve = CurvedAnimation(parent: animation, curve: Curves.easeOutCubic);
      final outCurve = CurvedAnimation(parent: secondary, curve: Curves.easeInCubic);

      return FadeTransition(
        opacity: inCurve,
        child: ScaleTransition(
          scale: Tween<double>(begin: 0.92, end: 1).animate(inCurve),
          child: SlideTransition(
            position: Tween<Offset>(begin: const Offset(0, 0.04), end: Offset.zero)
                .animate(inCurve),
            // Outgoing screen recedes slightly for depth.
            child: ScaleTransition(
              scale: Tween<double>(begin: 1, end: 0.98).animate(outCurve),
              child: child,
            ),
          ),
        ),
      );
    },
  );
}
