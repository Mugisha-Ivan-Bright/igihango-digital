import 'package:flutter/material.dart';
import 'profile_settings_detail.dart';

class ProfileHubPage extends StatelessWidget {
  const ProfileHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);

    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("UMWIRONDORO", style: TextStyle(color: Colors.white, letterSpacing: 1.2, fontSize: 16)),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 20),
            
            // 1. IDENTITY HEADER
            const CircleAvatar(
              radius: 55,
              backgroundColor: accentGold,
              child: CircleAvatar(
                radius: 52,
                backgroundImage: NetworkImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'), // Official Professional Photo
              ),
            ),
            const SizedBox(height: 16),
            const Text("Jean de Dieu HABIMANA", 
              style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
            const Text("Mayor of Musanze District", 
              style: TextStyle(color: accentGold, fontSize: 13, letterSpacing: 1.1, fontWeight: FontWeight.w600)),
            const SizedBox(height: 30),

            // 2. PERSONAL PERFORMANCE TRACKER
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: cardBlue, borderRadius: BorderRadius.circular(15)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStatColumn(context, "88%", "Imihigo Rate"),
                  Container(width: 1, height: 40, color: Colors.white10),
                  _buildStatColumn(context, "12", "Sectors"),
                  Container(width: 1, height: 40, color: Colors.white10),
                  _buildStatColumn(context, "0", "Red Flags"),
                ],
              ),
            ),

            const SizedBox(height: 30),

            // 3. SETTINGS & SECURITY
            _buildSettingsTile(context, Icons.fingerprint, "Security Settings", "Biometrics Enabled", const SecuritySettingsPage()),
            _buildSettingsTile(context, Icons.sync, "NIDA Data Sync", "Last synced: 2 hours ago", const NidaSyncPage()),
            _buildSettingsTile(context, Icons.language, "Language Preference", "English / Kinyarwanda", const LanguagePreferencePage()),
            _buildSettingsTile(context, Icons.help_outline, "Help & Support", "Official RISA Channel", const HelpSupportPage()),

            const SizedBox(height: 40),

            // 4. LOGOUT ACTION
            SizedBox(
              width: double.infinity,
              child: TextButton(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/');
                },
                style: TextButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: const BorderSide(color: Colors.redAccent, width: 1),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text("SOHOKA (LOGOUT)", 
                  style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 20),
            const Text("IGIHANGO v1.0.4 | RISA Secure Hub", 
              style: TextStyle(color: Colors.white24, fontSize: 10)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatColumn(BuildContext context, String value, String label) {
    return InkWell(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Viewing $label details..."), duration: const Duration(milliseconds: 500)),
        );
      },
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        child: Column(
          children: [
            Text(value, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(label, style: const TextStyle(color: Colors.white54, fontSize: 10)),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsTile(BuildContext context, IconData icon, String title, String subtitle, Widget destination) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B).withOpacity(0.5), borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Icon(icon, color: Colors.white70),
        title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 14)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.white38, fontSize: 12)),
        trailing: const Icon(Icons.chevron_right, color: Colors.white24),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => destination),
          );
        },
      ),
    );
  }
}
