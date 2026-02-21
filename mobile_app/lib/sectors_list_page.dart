import 'package:flutter/material.dart';
import 'sector_detail_page.dart';

class SectorsListPage extends StatelessWidget {
  const SectorsListPage({super.key});

  final List<Map<String, dynamic>> sectors = const [
    {"name": "Gasabo District", "lead": "J. Mutoni", "progress": 0.9, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1596483572320-9e469d510d3a?q=80&w=300&auto=format&fit=crop'},
    {"name": "Kicukiro District", "lead": "A. Habimana", "progress": 0.6, "color": Color(0xFFD4AF37), "image": 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=300&auto=format&fit=crop'},
    {"name": "Musanze District", "lead": "P. Kagaba", "progress": 0.45, "color": Colors.redAccent, "image": 'https://images.unsplash.com/photo-1588615419957-ed6999fa6890?q=80&w=300&auto=format&fit=crop'},
    {"name": "Nyagatare District", "lead": "S. Umutoni", "progress": 0.82, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=300&auto=format&fit=crop'},
    {"name": "Nyarugenge District", "lead": "D. Bijura", "progress": 0.77, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1596425272643-ec3a301ba161?q=80&w=300&auto=format&fit=crop'},
    {"name": "Rubavu District", "lead": "F. Uwera", "progress": 0.65, "color": Color(0xFFD4AF37), "image": 'https://images.unsplash.com/photo-1628153396654-e0c8dd82c3f1?q=80&w=300&auto=format&fit=crop'},
    {"name": "Gicumbi District", "lead": "M. Mugabo", "progress": 0.55, "color": Color(0xFFD4AF37), "image": 'https://images.unsplash.com/photo-1571243161324-f7c18617f694?q=80&w=400&auto=format&fit=crop'},
    {"name": "Huye District", "lead": "B. Kalisa", "progress": 0.88, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1596425272643-ec3a301ba161?q=80&w=400&auto=format&fit=crop'},
    {"name": "Karongi District", "lead": "L. Mukamana", "progress": 0.42, "color": Colors.redAccent, "image": 'https://images.unsplash.com/photo-1596483572320-9e469d510d3a?q=80&w=300&auto=format&fit=crop'},
    {"name": "Rusizi District", "lead": "E. Nkurunziza", "progress": 0.61, "color": Color(0xFFD4AF37), "image": 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop'},
    {"name": "Kayonza District", "lead": "R. Uwase", "progress": 0.79, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop'},
    {"name": "Nyanza District", "lead": "G. Karemera", "progress": 0.73, "color": Color(0xFF10B981), "image": 'https://images.unsplash.com/photo-1590069230002-70cc83815b41?q=80&w=400&auto=format&fit=crop'},
  ];

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
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text("LIST OF DISTRICTS", 
          style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        centerTitle: true,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: sectors.length,
        itemBuilder: (context, index) {
          final sector = sectors[index];
          return Container(
            margin: const EdgeInsets.only(bottom: 15),
            decoration: BoxDecoration(
              color: cardBlue,
              borderRadius: BorderRadius.circular(15),
              border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.all(12),
              leading: Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  image: DecorationImage(
                    image: NetworkImage(sector['image']),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              title: Text(sector['name'], 
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4),
                  Text("Lead: ${sector['lead']}", style: const TextStyle(color: Colors.white54, fontSize: 12)),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(2),
                    child: LinearProgressIndicator(
                      value: sector['progress'],
                      backgroundColor: Colors.white10,
                      color: sector['color'],
                      minHeight: 4,
                    ),
                  ),
                ],
              ),
              trailing: const Icon(Icons.chevron_right, color: Colors.white24),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => SectorDetailPage(
                      sectorName: sector['name'],
                      progress: sector['progress'],
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
