import 'package:flutter/material.dart';
import 'animations.dart';

class AlertsHub extends StatefulWidget {
  const AlertsHub({super.key});

  @override
  State<AlertsHub> createState() => _AlertsHubState();
}

class _AlertsHubState extends State<AlertsHub> {
  final List<Map<String, String>> _notifications = [
    {
      "title": "New Imihigo Target",
      "body": "Your Q3 targets for water distribution are now live. Please review them.",
      "time": "5m ago",
      "type": "Update"
    },
    {
      "title": "Safety Alert",
      "body": "Heavy rains detected in Northern District. Ensure all construction sites are secured.",
      "time": "1h ago",
      "type": "Warning"
    },
    {
      "title": "Report Approved",
      "body": "The infrastructure report for Musanze Sector has been approved by the Governor.",
      "time": "3h ago",
      "type": "Success"
    },
    {
      "title": "System Maintenance",
      "body": "The app will be offline for 10 minutes tonight for core performance updates.",
      "time": "1d ago",
      "type": "System"
    },
  ];

  void _deleteAll() {
    setState(() => _notifications.clear());
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("All notifications deleted"), backgroundColor: Colors.redAccent),
    );
  }

  void _deleteSingle(int index) {
    setState(() => _notifications.removeAt(index));
  }

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
        title: const Text("IBIBURIRA", style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20), onPressed: () => Navigator.pop(context)),
        actions: [
          if (_notifications.isNotEmpty)
            TextButton(
              onPressed: _deleteAll,
              child: const Text("DELETE ALL", style: TextStyle(color: Colors.redAccent, fontSize: 10, fontWeight: FontWeight.bold)),
            )
        ],
      ),
      body: _notifications.isEmpty ? _buildEmptyState() : _buildNotificationList(cardBlue, accentGold),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.notifications_off_outlined, color: Colors.white10, size: 80),
          const SizedBox(height: 20),
          const Text("IBIBURIRA BIRAGARAGARA KO BITARIHO", style: TextStyle(color: Colors.white24, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
          const SizedBox(height: 8),
          const Text("You have no new notifications at the moment.", style: TextStyle(color: Colors.white12, fontSize: 10)),
        ],
      ),
    );
  }

  Widget _buildNotificationList(Color cardBlue, Color accentGold) {
    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: _notifications.length,
      itemBuilder: (context, index) {
        final item = _notifications[index];
        return FadeSlideTransition(
          delay: Duration(milliseconds: 100 * index),
          child: Dismissible(
            key: Key(item['title']! + item['time']!),
            onDismissed: (_) => _deleteSingle(index),
            background: Container(
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(color: Colors.redAccent, borderRadius: BorderRadius.circular(15)),
              alignment: Alignment.centerRight,
              padding: const EdgeInsets.only(right: 20),
              child: const Icon(Icons.delete_outline, color: Colors.white),
            ),
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: cardBlue,
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _getIcon(item['type']!, accentGold),
                  const SizedBox(width: 15),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(item['title']!, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                            Text(item['time']!, style: const TextStyle(color: Colors.white30, fontSize: 10)),
                          ],
                        ),
                        const SizedBox(height: 5),
                        Text(item['body']!, style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.4)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _getIcon(String type, Color gold) {
    switch (type) {
      case 'Warning':
        return const Icon(Icons.warning_amber_rounded, color: Colors.redAccent, size: 20);
      case 'Update':
        return Icon(Icons.info_outline, color: gold, size: 20);
      case 'Success':
        return const Icon(Icons.check_circle_outline, color: Colors.greenAccent, size: 20);
      default:
        return const Icon(Icons.notifications_none, color: Colors.white30, size: 20);
    }
  }
}
