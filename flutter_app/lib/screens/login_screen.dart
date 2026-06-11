import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../app_state.dart';
import '../data/i18n.dart';
import '../theme.dart';
import '../widgets/auth_ui.dart';
import 'signup_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  String? _busy; // which action is loading

  Future<void> _run(String tag, Future<void> Function() action) async {
    setState(() => _busy = tag);
    try {
      await action();
      if (!mounted) return;
      AppScope.of(context).onAuthChanged();
      Navigator.pop(context);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Sign-in failed: $e')));
    } finally {
      if (mounted) setState(() => _busy = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = AppScope.of(context).auth;
    final lang = AppScope.of(context).lang;
    return AuthScaffold(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const AuthEmblem(),
          const SizedBox(height: 20),
          Text(tr('au.welcomeBack', lang),
              textAlign: TextAlign.center,
              style: Theme.of(context)
                  .textTheme
                  .displaySmall
                  ?.copyWith(color: Colors.white, fontSize: 26)),
          const SizedBox(height: 8),
          Text(tr('au.signinSub', lang),
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white70, height: 1.4)),
          const SizedBox(height: 28),
          AuthField(
            controller: _email,
            hint: tr('au.email', lang),
            icon: Icons.email_outlined,
            keyboard: TextInputType.emailAddress,
          ),
          const SizedBox(height: 14),
          AuthField(
            controller: _password,
            hint: tr('au.password', lang),
            icon: Icons.lock_outline,
            obscure: true,
          ),
          const SizedBox(height: 24),
          GoldButton(
            label: tr('au.signin', lang),
            busy: _busy == 'email',
            onTap: () =>
                _run('email', () => auth.loginWithEmail(_email.text.trim(), _password.text)),
          ),
          const SizedBox(height: 18),
          Row(children: [
            Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.15))),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Text(tr('au.continueWith', lang),
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
                  busy: _busy == 'google',
                  onTap: () => _run('google', () => auth.loginWithProvider('google')),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: SocialButton(
                  label: 'Apple',
                  icon: Icons.apple,
                  busy: _busy == 'apple',
                  onTap: () => _run('apple', () => auth.loginWithProvider('apple')),
                ),
              ),
            ],
          ),
          const SizedBox(height: 22),
          Center(
            child: GestureDetector(
              onTap: () => Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (_) => const SignupScreen())),
              child: RichText(
                text: TextSpan(
                  text: '${tr('au.newHere', lang)}  ',
                  style: const TextStyle(color: Colors.white70),
                  children: [
                    TextSpan(
                        text: tr('au.createAccountLink', lang),
                        style: const TextStyle(color: AppColors.gold, fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
            ),
          ),
        ].animate(interval: 70.ms).fadeIn(duration: 400.ms).moveY(begin: 14, end: 0),
      ),
    );
  }
}
