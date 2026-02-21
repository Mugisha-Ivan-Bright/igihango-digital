import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'login_screen.dart';
import 'main_shell.dart';

void main() {
  runApp(const IgihangoApp());
}

class ElasticScrollBehavior extends MaterialScrollBehavior {
  @override
  Widget buildScrollbar(BuildContext context, Widget child, ScrollableDetails details) {
    return child; // Suppress scrollbar globally
  }

  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    return const BouncingScrollPhysics(); // Elastic feel on all platforms
  }
}

class IgihangoApp extends StatelessWidget {
  const IgihangoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IgiHango Digital',
      scrollBehavior: ElasticScrollBehavior(),
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF0A192F),
        // textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),
        textTheme: ThemeData.dark().textTheme,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/dashboard': (context) => const MainShell(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
