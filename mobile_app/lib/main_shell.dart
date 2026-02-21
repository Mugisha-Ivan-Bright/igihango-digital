import 'package:flutter/material.dart';
import 'widgets/brand_logo.dart';
import 'ahabanza_screen.dart';
import 'evidence_screen.dart';
import 'secondary_screens.dart';
import 'profile_hub_page.dart';
import 'alerts_hub.dart';

class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _selectedIndex = 0;

  List<Widget> get _screens => [
    const AhabanzaScreen(),
    const EvidenceScreen(), // Inshingano
    const AnalyticsScreen(), // Imibare
    const AlertsHub(), // Ibiburira
    const ProfileHubPage(), // Umwirondoro
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);

    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const BrandingLogo(isHeader: true),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: GestureDetector(
              onTap: () => _onItemTapped(4), // Redirect to Umwirondoro tab
              child: const CircleAvatar(
                backgroundColor: Colors.white24,
                child: ClipOval(child: Icon(Icons.person, color: accentGold)),
              ),
            ),
          ),
        ],
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        switchInCurve: Curves.easeIn,
        switchOutCurve: Curves.easeOut,
        child: KeyedSubtree(
          key: ValueKey<int>(_selectedIndex),
          child: _screens[_selectedIndex],
        ),
      ),
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(canvasColor: const Color(0xFF1E293B)),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
          type: BottomNavigationBarType.fixed,
          selectedItemColor: accentGold,
          unselectedItemColor: Colors.white30,
          selectedFontSize: 10,
          unselectedFontSize: 10,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_rounded),
              label: 'Ahabanza',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.assignment_turned_in),
              label: 'Inshingano',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.bar_chart_rounded),
              label: 'Imibare',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.notifications_active),
              label: 'Ibiburira',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Umwirondoro',
            ),
          ],
        ),
      ),
    );
  }
}

class _PlaceholderScreen extends StatelessWidget {
  final String title;
  final IconData icon;
  const _PlaceholderScreen({required this.title, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 60, color: Colors.white10),
          const SizedBox(height: 10),
          Text(
            title,
            style: const TextStyle(color: Colors.white24, fontSize: 18),
          ),
        ],
      ),
    );
  }
}
