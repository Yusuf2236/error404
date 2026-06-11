import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// VIP UZBE brand palette — mirrors the web site's CSS custom properties.
class AppColors {
  static const navy = Color(0xFF0F172A); // --primary-color
  static const gold = Color(0xFFD4AF37); // --secondary-color
  static const goldDeep = Color(0xFFC5A028); // --accent-color
  static const cream = Color(0xFFF8F5F2); // --background-color
  static const ink = Color(0xFF0F172A); // --text-dark
  static const light = Color(0xFFF8FAFC); // --text-light
  static const slate = Color(0xFF64748B);
  static const surfaceDark = Color(0xFF111827);
}

class AppTheme {
  static ThemeData get light {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.cream,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.gold,
        primary: AppColors.gold,
        secondary: AppColors.navy,
        surface: Colors.white,
        brightness: Brightness.light,
      ),
    );

    return base.copyWith(
      textTheme: GoogleFonts.interTextTheme(base.textTheme).copyWith(
        displayLarge: GoogleFonts.playfairDisplay(
          fontSize: 40, fontWeight: FontWeight.w700, color: AppColors.navy),
        displaySmall: GoogleFonts.playfairDisplay(
          fontSize: 28, fontWeight: FontWeight.w700, color: AppColors.navy),
        titleLarge: GoogleFonts.playfairDisplay(
          fontSize: 22, fontWeight: FontWeight.w600, color: AppColors.navy),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.navy,
        foregroundColor: AppColors.gold,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.playfairDisplay(
          fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.gold,
          letterSpacing: 1.5),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.gold,
          foregroundColor: AppColors.navy,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          textStyle: GoogleFonts.inter(fontWeight: FontWeight.w700, fontSize: 15,
            letterSpacing: 0.5),
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 6,
        shadowColor: AppColors.navy.withValues(alpha: 0.12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: const BorderSide(color: AppColors.gold, width: 2),
        ),
      ),
    );
  }

  static const _darkPage = Color(0xFF0B0F1A);
  static const _darkCard = Color(0xFF161D2E);

  static ThemeData get dark {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: _darkPage,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.gold,
        primary: AppColors.gold,
        secondary: AppColors.gold,
        surface: _darkCard,
        brightness: Brightness.dark,
      ),
    );

    return base.copyWith(
      textTheme: GoogleFonts.interTextTheme(base.textTheme).copyWith(
        displayLarge: GoogleFonts.playfairDisplay(
            fontSize: 40, fontWeight: FontWeight.w700, color: Colors.white),
        displaySmall: GoogleFonts.playfairDisplay(
            fontSize: 28, fontWeight: FontWeight.w700, color: Colors.white),
        titleLarge: GoogleFonts.playfairDisplay(
            fontSize: 22, fontWeight: FontWeight.w600, color: Colors.white),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: const Color(0xFF111726),
        foregroundColor: AppColors.gold,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.playfairDisplay(
            fontSize: 22, fontWeight: FontWeight.w700, color: AppColors.gold, letterSpacing: 1.5),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.gold,
          foregroundColor: AppColors.navy,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          textStyle: GoogleFonts.inter(fontWeight: FontWeight.w700, fontSize: 15, letterSpacing: 0.5),
        ),
      ),
      cardTheme: CardThemeData(
        color: _darkCard,
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      ),
    );
  }
}

/// Theme-aware surface/text colors so custom screens adapt to dark mode.
extension BrandColors on BuildContext {
  bool get isDarkMode => Theme.of(this).brightness == Brightness.dark;
  Color get cardSurface => isDarkMode ? const Color(0xFF161D2E) : Colors.white;
  Color get cardBorder => isDarkMode ? const Color(0xFF26324A) : const Color(0xFFE2E8F0);
  Color get primaryText => isDarkMode ? Colors.white : AppColors.navy;
  Color get secondaryText => isDarkMode ? const Color(0xFF9AA7BD) : AppColors.slate;
}
