import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';
import '../widgets/auth_ui.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _busy = false;

  Future<void> _finish(Future<void> Function() action) async {
    setState(() => _busy = true);
    final state = AppScope.of(context);
    try {
      await action();
      if (!mounted) return;
      state.onAuthChanged();
      await _showWelcome();
      if (!mounted) return;
      Navigator.pop(context);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Sign-up failed: $e')));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;
    final state = AppScope.of(context);
    _finish(() => state.auth.signUp(
          name: _name.text.trim(),
          email: _email.text.trim(),
          password: _password.text,
        ));
  }

  Future<void> _showWelcome() {
    final lang = AppScope.of(context).lang;
    return showDialog(
      context: context,
      barrierColor: Colors.black87,
      barrierDismissible: false,
      builder: (_) => Dialog(
        backgroundColor: Colors.transparent,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
            child: Container(
              padding: const EdgeInsets.all(28),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppColors.navy.withValues(alpha: 0.96),
                    const Color(0xFF1B2438).withValues(alpha: 0.96),
                  ],
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.gold.withValues(alpha: 0.4)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: LinearGradient(colors: [AppColors.gold, AppColors.goldDeep]),
                    ),
                    child: const Icon(Icons.celebration, color: AppColors.navy, size: 40),
                  )
                      .animate()
                      .scale(duration: 600.ms, curve: Curves.elasticOut)
                      .then()
                      .shimmer(duration: 1200.ms, color: Colors.white),
                  const SizedBox(height: 18),
                  Text(tr('au.unlocked', lang),
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              color: AppColors.gold,
                              letterSpacing: 3,
                              fontWeight: FontWeight.w800))
                      .animate()
                      .fadeIn(delay: 250.ms),
                  const SizedBox(height: 12),
                  Text(
                    tr('au.welcomeMsg', lang),
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.white70, height: 1.55),
                  ).animate().fadeIn(delay: 450.ms),
                  const SizedBox(height: 22),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text(tr('au.startSaving', lang)),
                    ),
                  ).animate().fadeIn(delay: 650.ms).moveY(begin: 10, end: 0),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final lang = AppScope.of(context).lang;
    return AuthScaffold(
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const AuthEmblem(),
            const SizedBox(height: 16),
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [AppColors.gold, AppColors.goldDeep]),
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                        color: AppColors.gold.withValues(alpha: 0.4),
                        blurRadius: 16,
                        spreadRadius: 1),
                  ],
                ),
                child: Text(tr('au.welcomeBadge', lang),
                    style: const TextStyle(
                        color: AppColors.navy,
                        fontWeight: FontWeight.w800,
                        fontSize: 12,
                        letterSpacing: 0.8)),
              ),
            )
                .animate(onPlay: (c) => c.repeat(reverse: true))
                .scaleXY(begin: 1, end: 1.04, duration: 1300.ms, curve: Curves.easeInOut),
            const SizedBox(height: 22),
            Text(tr('au.create', lang),
                textAlign: TextAlign.center,
                style: Theme.of(context)
                    .textTheme
                    .displaySmall
                    ?.copyWith(color: Colors.white, fontSize: 26)),
            const SizedBox(height: 8),
            Text(tr('au.createSub', lang),
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.white70, height: 1.4)),
            const SizedBox(height: 26),
            AuthField(
              controller: _name,
              hint: tr('au.fullName', lang),
              icon: Icons.person_outline,
              validator: (v) => (v == null || v.trim().isEmpty) ? 'Required' : null,
            ),
            const SizedBox(height: 14),
            AuthField(
              controller: _email,
              hint: tr('au.email', lang),
              icon: Icons.email_outlined,
              keyboard: TextInputType.emailAddress,
              validator: (v) => (v == null || !v.contains('@')) ? 'Valid email required' : null,
            ),
            const SizedBox(height: 14),
            AuthField(
              controller: _password,
              hint: tr('au.password', lang),
              icon: Icons.lock_outline,
              obscure: true,
              validator: (v) => (v == null || v.length < 4) ? 'Min 4 characters' : null,
            ),
            const SizedBox(height: 24),
            GoldButton(label: tr('au.createSave', lang), busy: _busy, onTap: _submit),
            const SizedBox(height: 18),
            Row(children: [
              Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.15))),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Text(tr('au.signupWith', lang),
                    style: TextStyle(color: Colors.white.withValues(alpha: 0.55), fontSize: 12)),
              ),
              Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.15))),
            ]),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: SocialButton(
                    label: 'Google',
                    icon: Icons.g_mobiledata,
                    busy: _busy,
                    onTap: () => _finish(() => AppScope.of(context).auth.loginWithProvider('google')),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: SocialButton(
                    label: 'Apple',
                    icon: Icons.apple,
                    busy: _busy,
                    onTap: () => _finish(() => AppScope.of(context).auth.loginWithProvider('apple')),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 22),
            Center(
              child: GestureDetector(
                onTap: () => Navigator.pushReplacement(
                    context, MaterialPageRoute(builder: (_) => const LoginScreen())),
                child: RichText(
                  text: TextSpan(
                    text: '${tr('au.alreadyMember', lang)}  ',
                    style: const TextStyle(color: Colors.white70),
                    children: [
                      TextSpan(
                          text: tr('au.signinLink', lang),
                          style: const TextStyle(color: AppColors.gold, fontWeight: FontWeight.w700)),
                    ],
                  ),
                ),
              ),
            ),
          ].animate(interval: 70.ms).fadeIn(duration: 400.ms).moveY(begin: 14, end: 0),
        ),
      ),
    );
  }
}
