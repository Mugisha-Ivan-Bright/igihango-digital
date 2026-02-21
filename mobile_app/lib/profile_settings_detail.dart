import 'package:flutter/material.dart';

// --- SHARED COMPONENTS ---

class ProfileDetailScaffold extends StatelessWidget {
  final String title;
  final Widget body;
  const ProfileDetailScaffold({super.key, required this.title, required this.body});

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    
    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(title.toUpperCase(), style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: body,
    );
  }
}

// --- DETAIL PAGES ---

class SecuritySettingsPage extends StatefulWidget {
  const SecuritySettingsPage({super.key});

  @override
  State<SecuritySettingsPage> createState() => _SecuritySettingsPageState();
}

class _SecuritySettingsPageState extends State<SecuritySettingsPage> {
  bool _biometricEnabled = true;

  void _toggleBiometric(bool value) {
    if (value) {
      _showBiometricPrompt();
    } else {
      setState(() => _biometricEnabled = false);
    }
  }

  void _showBiometricPrompt() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("BIOMETRIC SECURITY", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        content: const Text("Would you like to enable Biometric authentication (Fingerprint/FaceID) for secure access to IgiHango?", 
          style: TextStyle(color: Colors.white70, fontSize: 13)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("CANCEL", style: TextStyle(color: Colors.white24)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFD4AF37), foregroundColor: Colors.black),
            onPressed: () {
              setState(() => _biometricEnabled = true);
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Biometric Authentication Enabled"), backgroundColor: Color(0xFF10B981)),
              );
            },
            child: const Text("ENABLE"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const Color accentGold = Color(0xFFD4AF37);

    return ProfileDetailScaffold(
      title: "Security Settings",
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          _buildSecurityScore(),
          const SizedBox(height: 30),
          _buildSectionHeader("AUTHENTICATION"),
          _buildDetailItem(Icons.fingerprint, "Biometric Authentication", "Use FaceID or Fingerprint", _biometricEnabled, accentGold),
          _buildDetailItem(Icons.lock_outline, "Change Security PIN", "Last changed 92 days ago", false, Colors.white70),
          const SizedBox(height: 20),
          _buildSectionHeader("DEVICES & SESSIONS"),
          _buildDetailItem(Icons.devices, "Trusted Devices", "iPhone 15 Pro, MacBook Pro", false, Colors.white70),
          _buildDetailItem(Icons.history, "Active Sessions", "Musanze, Rwanda • Active Now", false, Colors.white70),
          const SizedBox(height: 20),
          _buildSectionHeader("ADVANCED"),
          _buildDetailItem(Icons.verified_user_outlined, "Two-Step Verification", "Extra layer of security", false, Colors.white70),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 12),
      child: Text(title, style: const TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
    );
  }

  Widget _buildSecurityScore() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [const Color(0xFF1E293B), const Color(0xFF0A192F).withOpacity(0.1)]),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: Colors.white10),
      ),
      child: Row(
        children: [
          const Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(width: 50, height: 50, child: CircularProgressIndicator(value: 0.85, strokeWidth: 4, color: Colors.greenAccent, backgroundColor: Colors.white10)),
              Text("85", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(width: 20),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Security Strength: HIGH", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                Text("Your account is well protected.", style: TextStyle(color: Colors.white38, fontSize: 12)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailItem(IconData icon, String title, String subtitle, bool isEnabled, Color iconColor) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B).withOpacity(0.5), borderRadius: BorderRadius.circular(12)),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: iconColor.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500, fontSize: 14)),
                Text(subtitle, style: const TextStyle(color: Colors.white38, fontSize: 11)),
              ],
            ),
          ),
          if (icon == Icons.fingerprint) 
            Switch(value: isEnabled, onChanged: _toggleBiometric, activeColor: const Color(0xFFD4AF37), materialTapTargetSize: MaterialTapTargetSize.shrinkWrap),
          if (icon != Icons.fingerprint)
            const Icon(Icons.chevron_right, color: Colors.white24, size: 18),
        ],
      ),
    );
  }
}

class NidaSyncPage extends StatelessWidget {
  const NidaSyncPage({super.key});

  @override
  Widget build(BuildContext context) {
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);
    
    return ProfileDetailScaffold(
      title: "NIDA Data Sync",
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(30),
              decoration: BoxDecoration(color: accentGold.withValues(alpha: 0.05), shape: BoxShape.circle, border: Border.all(color: accentGold.withValues(alpha: 0.2))),
              child: const Icon(Icons.verified_user, color: accentGold, size: 50),
            ),
            const SizedBox(height: 25),
            const Text("IDENTITY VERIFIED", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: 1)),
            const SizedBox(height: 8),
            const Text("Last synced: Feb 20, 2026 • 10:30 AM", style: TextStyle(color: Colors.white38, fontSize: 12)),
            const SizedBox(height: 35),
            
            _buildDataRow("Full Name", "Jean de Dieu HABIMANA"),
            _buildDataRow("ID Number", "1 1982 8 0045231 0 12"),
            _buildDataRow("Date of Birth", "12/05/1982"),
            _buildDataRow("Nationality", "Rwandan"),
            _buildDataRow("District", "Musanze"),
            
            const SizedBox(height: 40),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: cardBlue.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white10)),
              child: const Row(
                children: [
                  Icon(Icons.info_outline, color: accentGold, size: 20),
                  const SizedBox(width: 15),
                  Expanded(
                    child: Text("All data is pulled directly from the National Identification Agency (NIDA).", 
                      style: TextStyle(color: Colors.white54, fontSize: 11, height: 1.4)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: accentGold,
                  foregroundColor: Colors.black,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.sync, size: 18),
                onPressed: () {},
                label: const Text("MANUAL RE-SYNC", style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDataRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.white38, fontSize: 12)),
          Text(value, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}

class LanguagePreferencePage extends StatelessWidget {
  const LanguagePreferencePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ProfileDetailScaffold(
      title: "Language Preference",
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          const Text("Choose your preferred language for the IgiHango interface.", style: TextStyle(color: Colors.white54, fontSize: 13)),
          const SizedBox(height: 25),
          _buildLangTile("English", "US / International", "🇺🇸", true),
          _buildLangTile("Ikinyarwanda", "Ururimi rw'Igifatizo", "🇷🇼", false),
          _buildLangTile("Français", "Standard Européen", "🇫🇷", false),
          _buildLangTile("Kiswahili", "Afrika Mashariki", "🇹🇿", false),
        ],
      ),
    );
  }

  Widget _buildLangTile(String lang, String sub, String flag, bool isSelected) {
    final Color accentGold = const Color(0xFFD4AF37);
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isSelected ? accentGold.withValues(alpha: 0.05) : const Color(0xFF1E293B).withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: isSelected ? accentGold.withValues(alpha: 0.5) : Colors.white.withValues(alpha: 0.05)),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        leading: Text(flag, style: const TextStyle(fontSize: 24)),
        title: Text(lang, style: TextStyle(color: isSelected ? accentGold : Colors.white, fontWeight: isSelected ? FontWeight.bold : FontWeight.w500)),
        subtitle: Text(sub, style: const TextStyle(color: Colors.white38, fontSize: 11)),
        trailing: isSelected ? Icon(Icons.check_circle, color: accentGold, size: 20) : null,
        onTap: () {},
      ),
    );
  }
}

class HelpSupportPage extends StatelessWidget {
  const HelpSupportPage({super.key});

  @override
  Widget build(BuildContext context) {
    const Color cardBlue = Color(0xFF1E293B);
    const Color accentGold = Color(0xFFD4AF37);

    return ProfileDetailScaffold(
      title: "Help & Support",
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          const Text("How can we assist you today?", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 25),
          
          _buildSectionHeader("ASSISTANCE CHANNELS"),
          _buildSupportOption(context, Icons.headset_mic, "Contact Support", "Official RISA Support Line", accentGold),
          _buildSupportOption(context, Icons.forum_outlined, "Live Chat", "Average wait time: 2 mins", Colors.greenAccent),
          
          const SizedBox(height: 20),
          _buildSectionHeader("KNOWLEDGE BASE"),
          _buildSupportOption(context, Icons.help_outline, "FAQs & Guides", "System tutorials for leaders", Colors.white70),
          _buildSupportOption(context, Icons.article_outlined, "User Manual", "PDF Documentation (v2.1)", Colors.white70),
          
          const SizedBox(height: 40),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: cardBlue.withValues(alpha: 0.5), 
              borderRadius: BorderRadius.circular(15),
              border: Border.all(color: Colors.white10)
            ),
            child: Column(
              children: [
                const Icon(Icons.security, color: accentGold, size: 30),
                const SizedBox(height: 15),
                const Text("IGIHANGO SECURE HUB", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 4),
                const Text("Version 1.0.4 production-release", style: TextStyle(color: Colors.white38, fontSize: 10)),
                const SizedBox(height: 20),
                const Text("Protected by Rwanda Information Society Authority (RISA) Military-Grade Encryption.", 
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white24, fontSize: 10, height: 1.4)),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 4, bottom: 12),
      child: Text(title, style: const TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
    );
  }

  Widget _buildSupportOption(BuildContext context, IconData icon, String title, String subtitle, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(color: const Color(0xFF1E293B).withOpacity(0.5), borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
          child: Icon(icon, color: color, size: 20),
        ),
        title: Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500, fontSize: 14)),
        subtitle: Text(subtitle, style: const TextStyle(color: Colors.white38, fontSize: 11)),
        trailing: const Icon(Icons.chevron_right, color: Colors.white24, size: 18),
        onTap: () {
          if (title == "Contact Support") {
            _showRisaRedirect(context);
          }
        },
      ),
    );
  }

  void _showRisaRedirect(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        title: const Text("OFFICIAL REDIRECT", style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        content: const Text("You are being redirected to the official RISA (Rwanda Information Society Authority) portal for specialized support.", 
          style: TextStyle(color: Colors.white70, fontSize: 13)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("CANCEL", style: TextStyle(color: Colors.white24)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFD4AF37), foregroundColor: Colors.black),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text("Redirecting to risa.rw..."), backgroundColor: Color(0xFF10B981)),
              );
            },
            child: const Text("PROCEED"),
          ),
        ],
      ),
    );
  }
}
