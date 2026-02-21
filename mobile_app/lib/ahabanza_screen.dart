import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'profile_hub_page.dart';
import 'secondary_screens.dart';
import 'sector_detail_page.dart';
import 'sectors_list_page.dart';
import 'animations.dart';
import 'services/api_service.dart';

class AhabanzaScreen extends StatefulWidget {
  const AhabanzaScreen({super.key});

  @override
  State<AhabanzaScreen> createState() => _AhabanzaScreenState();
}

class _AhabanzaScreenState extends State<AhabanzaScreen> with TickerProviderStateMixin {
  late AnimationController _animationController;
  late AnimationController _progressController;
  late Animation<double> _fadeAnimation;
  late Animation<double> _progressAnimation;
  
  // Backend data
  DistrictStats? _districtStats;
  List<SectorData> _sectors = [];
  bool _isLoading = true;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _fadeAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
    
    // Progress ring animation
    _progressController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );
    
    _animationController.forward();
    
    // Fetch data from backend
    _loadData();
  }
  
  Future<void> _loadData() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    
    try {
      // Fetch district stats and sectors in parallel
      final results = await Future.wait([
        ApiService.getDistrictStats(),
        ApiService.getSectors(),
      ]);
      
      final stats = results[0] as DistrictStats?;
      final sectors = results[1] as List<SectorData>;
      
      // If backend is not available, use mock data
      if (stats == null || sectors.isEmpty) {
        _useMockData();
        return;
      }
      
      if (mounted) {
        setState(() {
          _districtStats = stats;
          _sectors = sectors;
          _isLoading = false;
        });
        
        // Animate progress ring with real data
        _progressAnimation = Tween<double>(
          begin: 0.0,
          end: stats.averageProgress,
        ).animate(
          CurvedAnimation(
            parent: _progressController,
            curve: Curves.easeOutCubic,
          ),
        );
        
        // Delay progress animation slightly for better effect
        Future.delayed(const Duration(milliseconds: 300), () {
          if (mounted) _progressController.forward();
        });
      }
    } catch (e) {
      print('Error loading data: $e');
      // Use mock data as fallback
      _useMockData();
    }
  }
  
  void _useMockData() {
    if (!mounted) return;
    
    setState(() {
      _districtStats = DistrictStats(
        totalSectors: 4,
        averageProgress: 0.75,
        totalImihigo: 12,
        totalTasks: 28,
        completedTasks: 21,
        redFlags: 1,
        onTrack: 8,
        delayed: 3,
      );
      
      _sectors = [
        SectorData(
          id: 1,
          name: 'Gasabo Sector',
          district: 'Kigali',
          province: 'Kigali City',
          population: 0,
          areaKm2: 0,
          imihigoCount: 3,
          averageProgress: 0.9,
          execSecretary: UserData(
            id: 1,
            nationalId: '123456',
            fullName: 'J. Mutoni',
            role: 'EXEC_SEC',
            isActive: true,
          ),
        ),
        SectorData(
          id: 2,
          name: 'Kicukiro Sector',
          district: 'Kigali',
          province: 'Kigali City',
          population: 0,
          areaKm2: 0,
          imihigoCount: 3,
          averageProgress: 0.6,
          execSecretary: UserData(
            id: 2,
            nationalId: '123457',
            fullName: 'A. Habimana',
            role: 'EXEC_SEC',
            isActive: true,
          ),
        ),
        SectorData(
          id: 3,
          name: 'Nyarugenge',
          district: 'Kigali',
          province: 'Kigali City',
          population: 0,
          areaKm2: 0,
          imihigoCount: 3,
          averageProgress: 0.77,
          execSecretary: UserData(
            id: 3,
            nationalId: '123458',
            fullName: 'D. Bijura',
            role: 'EXEC_SEC',
            isActive: true,
          ),
        ),
        SectorData(
          id: 4,
          name: 'Musanze',
          district: 'Northern',
          province: 'Northern Province',
          population: 0,
          areaKm2: 0,
          imihigoCount: 3,
          averageProgress: 0.45,
          execSecretary: UserData(
            id: 4,
            nationalId: '123459',
            fullName: 'P. Kagaba',
            role: 'EXEC_SEC',
            isActive: true,
          ),
        ),
      ];
      
      _isLoading = false;
    });
    
    // Animate progress ring with mock data
    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: 0.75,
    ).animate(
      CurvedAnimation(
        parent: _progressController,
        curve: Curves.easeOutCubic,
      ),
    );
    
    // Delay progress animation slightly for better effect
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) _progressController.forward();
    });
  }

  @override
  void dispose() {
    _animationController.dispose();
    _progressController.dispose();
    super.dispose();
  }

  // Navigation Helper
  void _navigateTo(Widget page) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => page),
    );
  }
  
  // Navigate to Analytics tab using bottom navigation
  void _navigateToAnalytics() {
    // Find the MainShell parent and switch to Analytics tab (index 2)
    final mainShellState = context.findAncestorStateOfType<State<StatefulWidget>>();
    if (mainShellState != null && mainShellState.mounted) {
      // Access the _onItemTapped method through the state
      (mainShellState as dynamic).setState(() {
        (mainShellState as dynamic)._selectedIndex = 2;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Colors exactly as seen in your screenshots
    const Color bgNavy = Color(0xFF0D1B2A);
    const Color cardNavy = Color(0xFF1B263B);
    const Color emeraldGreen = Color(0xFF10B981);
    const Color coralRed = Color(0xFFFF5252);
    const Color accentGold = Color(0xFFD4AF37);

    // Show loading state
    if (_isLoading) {
      return Scaffold(
        backgroundColor: bgNavy,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(color: accentGold),
              const SizedBox(height: 20),
              const Text(
                'Loading district data...',
                style: TextStyle(color: Colors.white54),
              ),
            ],
          ),
        ),
      );
    }

    // Show error state
    if (_errorMessage != null) {
      return Scaffold(
        backgroundColor: bgNavy,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error_outline, color: coralRed, size: 60),
              const SizedBox(height: 20),
              Text(
                _errorMessage!,
                style: const TextStyle(color: Colors.white70),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _loadData,
                style: ElevatedButton.styleFrom(backgroundColor: accentGold),
                child: const Text('Retry', style: TextStyle(color: Colors.black)),
              ),
            ],
          ),
        ),
      );
    }

    final stats = _districtStats;
    final progress = stats?.averageProgress ?? 0.0;
    final redFlags = stats?.redFlags ?? 0;

    return Scaffold(
      backgroundColor: bgNavy,
      body: RefreshIndicator(
        onRefresh: _loadData,
        color: accentGold,
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 10),
                
                // District Header
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 100),
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          "District Health",
                          style: TextStyle(
                            color: Colors.white54,
                            fontSize: 16,
                            letterSpacing: 0.5,
                          ),
                        ),
                        Text(
                          "${stats?.totalSectors ?? 0} Sectors",
                          style: TextStyle(
                            color: accentGold,
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // 1. THE PROGRESS RING (Redirects to Imibare)
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 200),
                  child: Center(
                    child: GestureDetector(
                      onTap: _navigateToAnalytics, // Navigate to Analytics tab
                      child: AnimatedBuilder(
                        animation: _progressAnimation,
                        builder: (context, child) {
                          return Stack(
                            alignment: Alignment.center,
                            children: [
                              SizedBox(
                                width: 240,
                                height: 240,
                                child: CustomPaint(
                                  painter: SegmentedRingPainter(
                                    progress: _progressAnimation.value,
                                    color: emeraldGreen,
                                  ),
                                ),
                              ),
                              Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  TweenAnimationBuilder<int>(
                                    tween: IntTween(
                                      begin: 0,
                                      end: (_progressAnimation.value * 100).toInt(),
                                    ),
                                    duration: const Duration(milliseconds: 1500),
                                    curve: Curves.easeOutCubic,
                                    builder: (context, value, child) {
                                      return Text(
                                        "$value%",
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 56,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      );
                                    },
                                  ),
                                  Text(
                                    "IMIHIGO FULFILLED",
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.6),
                                      fontSize: 10,
                                      letterSpacing: 1.1,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          );
                        },
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 40),

                // 2. RED FLAG CARD (only show if there are red flags)
                if (redFlags > 0)
                  FadeSlideTransition(
                    delay: const Duration(milliseconds: 300),
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: cardNavy,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: coralRed.withOpacity(0.5),
                          width: 1.5,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.flag, color: coralRed, size: 22),
                              const SizedBox(width: 10),
                              Text(
                                "RED FLAG${redFlags > 1 ? 'S' : ''}",
                                style: TextStyle(
                                  color: coralRed.withOpacity(0.9),
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const Spacer(),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                decoration: BoxDecoration(
                                  color: coralRed.withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  "$redFlags",
                                  style: const TextStyle(
                                    color: coralRed,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Text(
                            "$redFlags sector${redFlags > 1 ? 's have' : ' has'} delayed imihigo targets",
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                            ),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: 160,
                            height: 44,
                            child: ElevatedButton(
                              onPressed: _navigateToAnalytics,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: coralRed,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(22),
                                ),
                              ),
                              child: const Text(
                                "VIEW DETAILS",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                if (redFlags > 0) const SizedBox(height: 30),

                // Status Hub Header with View All
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 400),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        "Status Hub",
                        style: TextStyle(
                          color: Colors.white54,
                          fontSize: 16,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => _navigateTo(const SectorsListPage()),
                        child: Row(
                          children: [
                            Text(
                              "View All",
                              style: TextStyle(
                                color: accentGold,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(width: 4),
                            Icon(
                              Icons.arrow_forward_ios,
                              color: accentGold,
                              size: 12,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 15),

                // 3. STATUS HUB GRID (Real sectors from backend)
                ..._buildSectorCards(emeraldGreen, coralRed),

                const SizedBox(height: 100), // Padding for bottom navigation bar
              ],
            ),
          ),
        ),
      ),
    );
  }

  // Build sector cards dynamically from backend data
  List<Widget> _buildSectorCards(Color emeraldGreen, Color coralRed) {
    if (_sectors.isEmpty) {
      return [
        const Center(
          child: Padding(
            padding: EdgeInsets.all(40.0),
            child: Text(
              'No sectors available',
              style: TextStyle(color: Colors.white54),
            ),
          ),
        ),
      ];
    }

    List<Widget> cards = [];
    for (int i = 0; i < _sectors.length; i += 2) {
      final sector1 = _sectors[i];
      final sector2 = i + 1 < _sectors.length ? _sectors[i + 1] : null;

      cards.add(
        FadeSlideTransition(
          delay: Duration(milliseconds: 500 + (i * 50)),
          child: Row(
            children: [
              Expanded(
                child: _buildSectorCard(
                  context,
                  sector1.name,
                  sector1.execSecretary?.fullName ?? "Unassigned",
                  sector1.averageProgress,
                  _getSectorColor(sector1.averageProgress, emeraldGreen, coralRed),
                ),
              ),
              if (sector2 != null) ...[
                const SizedBox(width: 15),
                Expanded(
                  child: _buildSectorCard(
                    context,
                    sector2.name,
                    sector2.execSecretary?.fullName ?? "Unassigned",
                    sector2.averageProgress,
                    _getSectorColor(sector2.averageProgress, emeraldGreen, coralRed),
                  ),
                ),
              ] else
                const Expanded(child: SizedBox()),
            ],
          ),
        ),
      );

      if (i + 2 < _sectors.length) {
        cards.add(const SizedBox(height: 15));
      }
    }

    return cards;
  }

  // Get color based on progress
  Color _getSectorColor(double progress, Color emeraldGreen, Color coralRed) {
    if (progress >= 0.8) return emeraldGreen;
    if (progress >= 0.5) return Colors.orangeAccent;
    return coralRed;
  }

  Widget _buildSectorCard(
    BuildContext context,
    String title,
    String lead,
    double progress,
    Color color,
  ) {
    return GestureDetector(
      onTap: () => _navigateTo(
        SectorDetailPage(
          sectorName: title,
          progress: progress,
        ),
      ),
      child: Hero(
        tag: 'sector-$title',
        child: Material(
          color: Colors.transparent,
          child: Container(
            height: 140,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF1B263B),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Colors.white.withOpacity(0.05),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  lead,
                  style: const TextStyle(
                    color: Colors.white38,
                    fontSize: 11,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: progress,
                          backgroundColor: Colors.white10,
                          color: color,
                          minHeight: 6,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      "${(progress * 100).toInt()}%",
                      style: TextStyle(
                        color: color,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// CUSTOM PAINTER FOR THE SEGMENTED ARC
class SegmentedRingPainter extends CustomPainter {
  final double progress;
  final Color color;

  SegmentedRingPainter({
    required this.progress,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;
    const strokeWidth = 16.0;

    // Background track
    final trackPaint = Paint()
      ..color = const Color(0xFF1E293B)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth;

    // Progress arc
    final progressPaint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    // Draw background circle
    canvas.drawCircle(center, radius, trackPaint);

    // Draw progress arc
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      2 * math.pi * progress,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
