import 'package:flutter/material.dart';
import 'widgets/brand_logo.dart';
import 'services/api_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _idController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _handleLogin() async {
    final nationalId = _idController.text.trim();
    final password = _passwordController.text.trim();

    if (nationalId.isEmpty || password.isEmpty) {
      setState(() {
        _errorMessage = 'Please enter both National ID and Password';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      print('Login attempt: $nationalId');
      final response = await ApiService.login(nationalId, password);

      if (response != null && mounted) {
        // Login successful - save user data
        print('Login successful: ${response.user.fullName} (${response.user.role})');
        Navigator.pushReplacementNamed(context, '/dashboard');
      } else if (mounted) {
        print('Login failed: Invalid credentials');
        setState(() {
          _errorMessage = 'Invalid National ID or Password. Please try again.';
          _isLoading = false;
        });
      }
    } catch (e) {
      print('Login exception: $e');
      if (mounted) {
        setState(() {
          _errorMessage = 'Connection error. Make sure backend is running on http://localhost:8000\n\nError: ${e.toString()}';
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);

    return Scaffold(
      backgroundColor: primaryDark,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Logo Placeholder (mimicking the one inscreenshots)
              const BrandingLogo(),
              const SizedBox(height: 60),
              
              // Error message
              if (_errorMessage != null)
                Container(
                  padding: const EdgeInsets.all(12),
                  margin: const EdgeInsets.only(bottom: 20),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.red.withOpacity(0.3)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.error_outline, color: Colors.red, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          _errorMessage!,
                          style: const TextStyle(color: Colors.red, fontSize: 13),
                        ),
                      ),
                    ],
                  ),
                ),
              
              TextField(
                controller: _idController,
                enabled: !_isLoading,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: "National ID / Email",
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.05),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                controller: _passwordController,
                enabled: !_isLoading,
                obscureText: true,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: "Password",
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.3)),
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.05),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                    borderSide: BorderSide.none,
                  ),
                ),
                onSubmitted: (_) => _handleLogin(),
              ),
              const SizedBox(height: 30),
              
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleLogin,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: accentGold,
                    foregroundColor: primaryDark,
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                    elevation: 10,
                    shadowColor: accentGold.withOpacity(0.3),
                    disabledBackgroundColor: accentGold.withOpacity(0.5),
                  ),
                  child: _isLoading
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF0A192F)),
                          ),
                        )
                      : const Text(
                          "Injira muri NIDA",
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                ),
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () {},
                child: Text(
                  "Nabonye Ikibazo",
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.6),
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
