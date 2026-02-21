import 'package:flutter/material.dart';
import 'task_detail_page.dart';
import 'animations.dart';

class SectorDetailPage extends StatefulWidget {
  final String sectorName;
  final double progress;

  const SectorDetailPage({
    super.key, 
    required this.sectorName, 
    required this.progress
  });

  @override
  State<SectorDetailPage> createState() => _SectorDetailPageState();
}

class _SectorDetailPageState extends State<SectorDetailPage> {
  late PageController _pageController;
  int _currentPage = 1;

  final List<String> _images = [
    'https://images.unsplash.com/photo-1544253108-7df783344692?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586773860418-d319a39ec55e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515162816999-a0c47dc132f7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(viewportFraction: 0.7, initialPage: 1);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _showImageOverlay(String imageUrl) {
    showDialog(
      context: context,
      builder: (context) => GestureDetector(
        onTap: () => Navigator.pop(context),
        child: Material(
          color: Colors.black.withOpacity(0.9),
          child: Stack(
            children: [
              Center(
                child: Hero(
                  tag: imageUrl,
                  child: Image.network(imageUrl, fit: BoxFit.contain),
                ),
              ),
              Positioned(
                top: 40,
                right: 20,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 30),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ],
          ),
        ),
      ),
    );
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
        title: Text(widget.sectorName.toUpperCase(), 
          style: const TextStyle(color: Colors.white, letterSpacing: 1.5, fontSize: 16)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. PERFORMANCE SUMMARY CARD
            Hero(
              tag: 'sector-${widget.sectorName}',
              child: Material(
                color: Colors.transparent,
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: cardBlue,
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(color: Colors.white10),
                    boxShadow: [
                      BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 5))
                    ],
                  ),
                  child: Row(
                    children: [
                      SizedBox(
                        width: 60,
                        height: 60,
                        child: TweenAnimationBuilder<double>(
                          tween: Tween<double>(begin: 0, end: widget.progress),
                          duration: const Duration(seconds: 1),
                          builder: (context, value, child) {
                            return CircularProgressIndicator(
                              value: value,
                              strokeWidth: 8,
                              backgroundColor: Colors.white10,
                              color: value > 0.8 ? Colors.greenAccent : accentGold,
                            );
                          },
                        ),
                      ),
                      const SizedBox(width: 20),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("${(widget.progress * 100).toInt()}% Complete", 
                            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                          const Text("Current Imihigo Status", style: TextStyle(color: Colors.white54)),
                        ],
                      )
                    ],
                  ),
                ),
              ),
            ),
            
            const SizedBox(height: 30),
            const Text("UBWIZA NYABURANGA", style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
            const SizedBox(height: 20),

            // 2. INTERACTIVE PHOTO CAROUSEL
            SizedBox(
              height: 200,
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemCount: _images.length,
                itemBuilder: (context, index) {
                  return AnimatedBuilder(
                    animation: _pageController,
                    builder: (context, child) {
                      double value = 1.0;
                      if (_pageController.position.hasContentDimensions) {
                        value = _pageController.page! - index;
                        value = (1 - (value.abs() * 0.3)).clamp(0.0, 1.0);
                      } else {
                        value = index == _currentPage ? 1.0 : 0.7;
                      }

                      return Center(
                        child: GestureDetector(
                          onTap: () => _showImageOverlay(_images[index]),
                          child: SizedBox(
                            height: Curves.easeInOut.transform(value) * 200,
                            width: Curves.easeInOut.transform(value) * 350,
                            child: child,
                          ),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.5),
                            blurRadius: 10,
                            spreadRadius: 2,
                          )
                        ],
                        image: DecorationImage(
                          image: NetworkImage(_images[index]),
                          fit: BoxFit.cover,
                        ),
                        border: Border.all(
                          color: index == _currentPage ? accentGold : Colors.transparent,
                          width: 2,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 30),
            const Text("ACTIVE TASKS", style: TextStyle(color: Colors.white70, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),

            // 3. DETAILED TASK LIST
            FadeSlideTransition(
              delay: const Duration(milliseconds: 200),
              child: _buildTaskItem(
                context, 
                "Health Clinic Foundation", 
                "Verified", 
                Colors.greenAccent, 
                promet: "100%", 
                hagezweho: "100%",
                used: "12,450,000 RWF",
                missed: "0 RWF",
                start: "Jan 5, 2026",
                end: "Feb 15, 2026",
                imageUrl: 'https://images.unsplash.com/photo-1544253108-7df783344692?q=80&w=200&auto=format&fit=crop',
              ),
            ),
            FadeSlideTransition(
              delay: const Duration(milliseconds: 350),
              child: _buildTaskItem(
                context, 
                "Water Pipe Extension", 
                "In Progress", 
                accentGold, 
                promet: "5km", 
                hagezweho: "3.2km",
                used: "8,900,000 RWF",
                missed: "1,200,000 RWF",
                start: "Feb 1, 2026",
                end: "April 10, 2026",
                imageUrl: 'https://images.unsplash.com/photo-1586773860418-d319a39ec55e?q=80&w=200&auto=format&fit=crop',
              ),
            ),
            FadeSlideTransition(
              delay: const Duration(milliseconds: 500),
              child: _buildTaskItem(
                context, 
                "Primary School Desks", 
                "Delayed", 
                Colors.redAccent, 
                promet: "500", 
                hagezweho: "120",
                used: "2,100,000 RWF",
                missed: "4,500,000 RWF",
                start: "Feb 10, 2026",
                end: "March 15, 2026",
                imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc132f7?q=80&w=200&auto=format&fit=crop',
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTaskItem(
    BuildContext context, 
    String title, 
    String status, 
    Color statusColor, {
      String promet = "100%", 
      String hagezweho = "75%",
      String used = "45,000,000 RWF",
      String missed = "0 RWF",
      String start = "Jan 1, 2026",
      String end = "Dec 31, 2026",
      String? imageUrl,
    }) {
    final bool isVerified = status == "Verified";
    
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => TaskDetailPage(
              taskTitle: title,
              taskStatus: status,
              statusColor: statusColor,
              isVerified: isVerified,
              usedBudget: used,
              missedBudget: missed,
              startDate: start,
              endDate: end,
            ),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            if (imageUrl != null)
              Container(
                width: 60,
                height: 60,
                margin: const EdgeInsets.only(right: 15),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  image: DecorationImage(image: NetworkImage(imageUrl), fit: BoxFit.cover),
                ),
              ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title.toUpperCase(),
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13, letterSpacing: 1.1),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      _buildStatusPill("PROMET: $promet", Colors.white24),
                      const SizedBox(width: 8),
                      _buildStatusPill("DONE: $hagezweho", statusColor),
                    ],
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: Colors.white24, size: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusPill(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Text(
        label,
        style: TextStyle(color: color == Colors.white24 ? Colors.white70 : color, fontSize: 10, fontWeight: FontWeight.bold),
      ),
    );
  }
}
