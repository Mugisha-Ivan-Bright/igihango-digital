import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'sector_detail_page.dart';
import 'sectors_list_page.dart';
import 'animations.dart';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0x000a192f); // Transparent to show shell background
    const Color accentGold = Color(0xFFD4AF37);
    const Color statusGreen = Color(0xFF10B981);
    const Color cardBlue = Color(0xFF1E293B);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. District Overview (Big Radial + Red Flag)
          FadeSlideTransition(
            delay: const Duration(milliseconds: 200),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildRadialStat(context, "88%", "DISTRICT\nAVERAGE", Colors.greenAccent),
                const SizedBox(width: 20),
                _buildQuickStat(context, Icons.warning_amber_rounded, "0", "RED FLAGS\nDETECTED", Colors.redAccent),
              ],
            ),
          ),

          const SizedBox(height: 30),

          // 2. Key Metrics Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Key Metrics", 
                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
              const Icon(Icons.chevron_right, color: Colors.white24, size: 20),
            ],
          ),
          const SizedBox(height: 15),
          Row(
            children: [
              _buildMiniMetric(0.62, "62%", "TASKS ON TRACK", statusGreen),
              const SizedBox(width: 10),
              _buildMiniMetric(0.13, "13%", "PENDING VERIFICATION", accentGold),
              const SizedBox(width: 10),
              _buildStatMetric("7", "COMPLETED THIS WEEK", Colors.cyan),
            ],
          ),

          const SizedBox(height: 30),

          // 3. Top Performing Sectors
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("TOP PERFORMING SECTORS", 
                style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
              IconButton(
                icon: const Icon(Icons.chevron_right, color: Colors.white24, size: 20),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SectorAchievementsPage()),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 15),
          _buildPerformanceItem(context, "Gasabo", "Agriculture & Rural Dev", 0.92, statusGreen, "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop"),
          _buildPerformanceItem(context, "Rutunga", "Education Infrastructure", 0.85, statusGreen, "https://images.unsplash.com/photo-1523050853063-bd331a61d6ce?q=80&w=400&auto=format&fit=crop"),

          const SizedBox(height: 30),

          // 4. Areas for Improvement
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("AREAS FOR IMPROVEMENT", 
                style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
              IconButton(
                icon: const Icon(Icons.chevron_right, color: Colors.white24, size: 20),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SectorIssuesPage()),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 15),
          _buildPerformanceItem(context, "Kicukenge", "Critical Infrastructure", 0.38, Colors.redAccent, "https://images.unsplash.com/photo-1590486803833-ffc6f986293a?q=80&w=400&auto=format&fit=crop"),

          const SizedBox(height: 30),

          // 5. Generate Report Button
          SizedBox(
            width: double.infinity,
            height: 55,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: cardBlue,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Colors.white10)),
              ),
              onPressed: () => _showReportDialog(context),
              child: Text("GENERATE OFFICIAL REPORT", 
                style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  void _showReportDialog(BuildContext context) {
    bool isGenerating = false;
    showDialog(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setDialogState) => AlertDialog(
          backgroundColor: const Color(0xFF1E293B),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          title: const Text("Generate Official Report", style: TextStyle(color: Colors.white)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "This will generate the official Q1 district-wide Imihigo performance report as a CSV file.",
                style: TextStyle(color: Colors.white70, fontSize: 13),
              ),
              if (isGenerating) ...[
                const SizedBox(height: 16),
                const LinearProgressIndicator(color: Color(0xFFD4AF37), backgroundColor: Colors.white12),
                const SizedBox(height: 8),
                const Text("Compiling report data...", style: TextStyle(color: Colors.white38, fontSize: 11)),
              ],
            ],
          ),
          actions: [
            TextButton(
              onPressed: isGenerating ? null : () => Navigator.pop(ctx),
              child: const Text("CANCEL", style: TextStyle(color: Colors.white38)),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFD4AF37)),
              onPressed: isGenerating
                  ? null
                  : () async {
                      setDialogState(() => isGenerating = true);
                      await Future.delayed(const Duration(seconds: 1));
                      _downloadReport();
                      if (ctx.mounted) Navigator.pop(ctx);
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Row(
                              children: [
                                Icon(Icons.download_done, color: Colors.white),
                                SizedBox(width: 10),
                                Text("Imihigo_Q1_Report.csv downloaded"),
                              ],
                            ),
                            backgroundColor: Color(0xFF10B981),
                            duration: Duration(seconds: 4),
                          ),
                        );
                      }
                    },
              child: const Text("GENERATE & DOWNLOAD",
                  style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold, fontSize: 11)),
            ),
          ],
        ),
      ),
    );
  }

  void _downloadReport() {
    const csvContent = '''Sector,Lead Officer,Progress (%),Status,Red Flags,Last Updated
Gasabo Sector,J. Mutoni,90,On Track,0,2026-02-21
Kicukiro Sector,A. Habimana,60,In Progress,0,2026-02-21
Musanze Sector,P. Kagaba,45,Delayed,1,2026-02-21
Nyagatare Sector,S. Umutoni,82,On Track,0,2026-02-21
Nyarugenge Sector,D. Bijura,77,On Track,0,2026-02-21
Rubavu Sector,F. Uwera,65,In Progress,0,2026-02-21
\nDistrict Average,N/A,70,N/A,1,2026-02-21
''';

    if (kIsWeb) {
      final bytes = Uri.encodeComponent(csvContent);
      final anchor = html.AnchorElement(
        href: 'data:text/csv;charset=utf-8,$bytes',
      )
        ..setAttribute('download', 'Imihigo_Q1_Report.csv')
        ..click();
    }
  }

  Widget _buildRadialStat(BuildContext context, String percent, String label, Color color) {
    return Expanded(
      flex: 4,
      child: Column(
        children: [
          const Text("District Overview", 
            style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w500)),
          const SizedBox(height: 12),
          GestureDetector(
            onTap: () {
              // Navigate to Detailed Imihigo Analytics
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ImihigoAnalyticsPage()),
              );
            },
            child: CircularPercentIndicator(
              radius: 65.0,
              lineWidth: 10.0,
              percent: double.parse(percent.replaceAll('%', '')) / 100,
              animation: true,
              animationDuration: 1000,
              curve: Curves.easeOutCubic,
              center: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(percent, 
                    style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
                  Text("COMPLETED".toUpperCase(), 
                    style: const TextStyle(color: Colors.white38, fontSize: 8, fontWeight: FontWeight.bold)),
                ],
              ),
              circularStrokeCap: CircularStrokeCap.round,
              backgroundColor: Colors.white10,
              progressColor: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickStat(BuildContext context, IconData icon, String value, String label, Color color) {
    return Expanded(
      flex: 6,
      child: Container(
        padding: const EdgeInsets.all(15),
        decoration: BoxDecoration(
          color: const Color(0xFF1E293B),
          borderRadius: BorderRadius.circular(15),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 16),
                const SizedBox(width: 8),
                Text(value, 
                  style: TextStyle(color: color, fontSize: 18, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 10),
            Text(label, 
              style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w500)),
            const SizedBox(height: 15),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const SectorDetailPage(
                      sectorName: "Northern District Red Flags",
                      progress: 0.15,
                    ),
                  ),
                );
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(color: const Color(0xFFD4AF37), borderRadius: BorderRadius.circular(8)),
                child: const Text("VIEW DETAILS", 
                  style: TextStyle(color: Colors.black, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMiniMetric(double percent, String value, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 15),
        decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(15)),
        child: Column(
          children: [
            CircularPercentIndicator(
              radius: 25.0,
              lineWidth: 4.0,
              percent: percent,
              animation: true,
              animationDuration: 800,
              center: Text(value, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
              circularStrokeCap: CircularStrokeCap.round,
              backgroundColor: Colors.white10,
              progressColor: color,
            ),
            const SizedBox(height: 10),
            Text(label, 
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white38, fontSize: 7, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatMetric(String value, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 15),
        decoration: BoxDecoration(color: const Color(0xFF1E293B), borderRadius: BorderRadius.circular(15)),
        child: Column(
          children: [
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: color.withOpacity(0.3), width: 2),
              ),
              child: Center(
                child: Text(value, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 10),
            Text(label, 
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white38, fontSize: 7, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildPerformanceItem(BuildContext context, String title, String subtitle, double progress, Color color, String imageUrl) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => SectorDetailPage(
              sectorName: title,
              progress: progress,
            ),
          ),
        );
      },
      child: Hero(
        tag: 'sector-$title',
        child: Material(
          color: Colors.transparent,
          child: Container(
            margin: const EdgeInsets.only(bottom: 15),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(15),
              image: DecorationImage(
                image: NetworkImage(imageUrl),
                fit: BoxFit.cover,
                opacity: 0.1,
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 5),
                      Text(subtitle, style: const TextStyle(color: Colors.white54, fontSize: 12)),
                      const SizedBox(height: 15),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(5),
                        child: LinearProgressIndicator(
                          value: progress,
                          backgroundColor: Colors.white10,
                          color: color,
                          minHeight: 6,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 20),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                  child: Text("${(progress * 100).toInt()}%", style: TextStyle(color: color, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ImihigoAnalyticsPage extends StatefulWidget {
  const ImihigoAnalyticsPage({super.key});

  @override
  State<ImihigoAnalyticsPage> createState() => _ImihigoAnalyticsPageState();
}

class _ImihigoAnalyticsPageState extends State<ImihigoAnalyticsPage> {
  bool _isExporting = false;

  void _exportToExcel() async {
    setState(() => _isExporting = true);

    // Simulate data aggregation
    await Future.delayed(const Duration(seconds: 1));

    // Build CSV content for Imihigo Analytics
    const csvContent = '''Imihigo Analytics Report - Q1 2026
Generated: 2026-02-21

Metric,Value
District Average,88%
Tasks on Track,62%
Pending Verification,13%
Completed This Week,7
Total Tasks,26
Verified Tasks,18
Red Flags,2

Monthly Trend (Completion Totals)
Jan,10
Feb,15
Mar,12
Apr,18
May,25
Jun,28
Jul,32
''';

    if (kIsWeb) {
      final bytes = Uri.encodeComponent(csvContent);
      final anchor = html.AnchorElement(
        href: 'data:text/csv;charset=utf-8,$bytes',
      )
        ..setAttribute('download', 'Imihigo_Analytics_Report.csv')
        ..click();
    }

    if (mounted) {
      setState(() => _isExporting = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Row(
            children: [
              Icon(Icons.download_done, color: Colors.white),
              SizedBox(width: 10),
              Text("Imihigo_Analytics_Report.csv downloaded"),
            ],
          ),
          backgroundColor: Color(0xFF10B981),
          duration: Duration(seconds: 4),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);
    const Color statusGreen = Color(0xFF10B981);

    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("IMIHIGO ANALYTICS", style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20), onPressed: () => Navigator.pop(context)),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: IconButton(
              icon: _isExporting 
                ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: accentGold))
                : const Icon(Icons.download_for_offline_outlined, color: accentGold),
              onPressed: _isExporting ? null : _exportToExcel,
              tooltip: "Export to Excel",
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 2. Trend Line Chart
            const Text("Quarterly Imihigo Completion:", 
              style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.circle, color: statusGreen, size: 10),
                const SizedBox(width: 8),
                const Text("Performance Trend", style: TextStyle(color: Colors.white70, fontSize: 12)),
              ],
            ),
            const SizedBox(height: 24),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  lineTouchData: LineTouchData(
                    handleBuiltInTouches: true,
                    touchTooltipData: LineTouchTooltipData(
                      getTooltipColor: (touchedSpot) => Colors.blueGrey.withOpacity(0.8),
                      getTooltipItems: (List<LineBarSpot> touchedSpots) {
                        return touchedSpots.map((LineBarSpot touchedSpot) {
                          return LineTooltipItem(
                            '${touchedSpot.y.toInt()}%',
                            const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          );
                        }).toList();
                      },
                    ),
                    touchCallback: (FlTouchEvent event, LineTouchResponse? touchResponse) {},
                  ),
                  gridData: FlGridData(show: true, drawVerticalLine: false, 
                    getDrawingHorizontalLine: (value) => FlLine(color: Colors.white10, strokeWidth: 1)),
                  titlesData: FlTitlesData(
                    show: true,
                    topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, meta) {
                          String text = '';
                          switch (value.toInt()) {
                            case 0: text = 'Jan'; break;
                            case 2: text = 'Feb'; break;
                            case 4: text = 'Mar'; break;
                            case 6: text = 'Apr'; break;
                          }
                          return Text(text, style: const TextStyle(color: Colors.white38, fontSize: 10));
                        },
                      ),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: [
                        const FlSpot(0, 10),
                        const FlSpot(1, 15),
                        const FlSpot(2, 12),
                        const FlSpot(3, 18),
                        const FlSpot(4, 25),
                        const FlSpot(5, 28),
                        const FlSpot(6, 32),
                      ],
                      isCurved: true,
                      color: statusGreen,
                      barWidth: 3,
                      isStrokeCapRound: true,
                      dotData: FlDotData(show: true, getDotPainter: (spot, percent, barData, index) => 
                        FlDotCirclePainter(radius: 4, color: statusGreen, strokeWidth: 2, strokeColor: primaryDark)),
                      belowBarData: BarAreaData(
                        show: true,
                        gradient: LinearGradient(
                          colors: [statusGreen.withOpacity(0.3), statusGreen.withOpacity(0)],
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),
            
            // 3. Mini Stats cards
            Row(
              children: [
                _buildSimpleStat("26", "Total Tasks", Colors.white12),
                const SizedBox(width: 15),
                _buildSimpleStat("18", "Verified", statusGreen.withOpacity(0.2)),
                const SizedBox(width: 15),
                _buildSimpleStat("2", "Red Flags", Colors.redAccent.withOpacity(0.2)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSimpleStat(String value, String label, Color bgColor) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: bgColor, borderRadius: BorderRadius.circular(12)),
        child: Column(
          children: [
            Text(value, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(label, style: const TextStyle(color: Colors.white38, fontSize: 9, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}

class SectorAchievementsPage extends StatefulWidget {
  const SectorAchievementsPage({super.key});

  @override
  State<SectorAchievementsPage> createState() => _SectorAchievementsPageState();
}

class _SectorAchievementsPageState extends State<SectorAchievementsPage> {
  String selectedSector = "All";

  final List<Map<String, String>> achievements = [
    {"sector": "Gasabo", "task": "Health Clinic Foundation", "status": "Completed", "date": "12 Feb 2026"},
    {"sector": "Gasabo", "task": "New Road Paving", "status": "In Progress", "date": "14 Feb 2026"},
    {"sector": "Rutunga", "task": "Primary School Roof", "status": "Completed", "date": "10 Feb 2026"},
    {"sector": "Rutunga", "task": "Water Pipe Extension", "status": "Verified", "date": "08 Feb 2026"},
    {"sector": "Kicukenge", "task": "Market Renovation", "status": "Started", "date": "01 Feb 2026"},
  ];

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);

    final filteredList = selectedSector == "All" 
        ? achievements 
        : achievements.where((a) => a['sector'] == selectedSector).toList();

    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("SECTOR ACHIEVEMENTS", 
          style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            child: Row(
              children: ["All", "Gasabo", "Rutunga", "Kicukenge"].map((sector) {
                final bool isSelected = selectedSector == sector;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(sector),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        selectedSector = sector;
                      });
                    },
                    backgroundColor: cardBlue,
                    selectedColor: accentGold,
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.black : Colors.white70,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      fontSize: 12,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                );
              }).toList(),
            ),
          ),
          
          // Achievements List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: filteredList.length,
              itemBuilder: (context, index) {
                final item = filteredList[index];
                return FadeSlideTransition(
                  delay: Duration(milliseconds: 100 * index),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => SectorDetailPage(
                            sectorName: item['sector']!,
                            progress: item['sector'] == "Gasabo" ? 0.9 : 0.82,
                          ),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: cardBlue,
                        borderRadius: BorderRadius.circular(15),
                        border: Border.all(color: Colors.white.withOpacity(0.05)),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: accentGold.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.workspace_premium, color: accentGold, size: 20),
                          ),
                          const SizedBox(width: 15),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(item['task']!, 
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    Text(item['sector']!, style: const TextStyle(color: accentGold, fontSize: 11)),
                                    const SizedBox(width: 8),
                                    Text("• ${item['date']}", style: const TextStyle(color: Colors.white38, fontSize: 10)),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.greenAccent.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(item['status']!, 
                              style: const TextStyle(color: Colors.greenAccent, fontSize: 9, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class SectorIssuesPage extends StatefulWidget {
  const SectorIssuesPage({super.key});

  @override
  State<SectorIssuesPage> createState() => _SectorIssuesPageState();
}

class _SectorIssuesPageState extends State<SectorIssuesPage> {
  String selectedSector = "All";

  final List<Map<String, String>> issues = [
    {"sector": "Kicukenge", "task": "Modern Market Construction", "status": "Delayed", "date": "18 Feb 2026"},
    {"sector": "Kicukenge", "task": "Bridge Reinforcement", "status": "On Hold", "date": "15 Feb 2026"},
    {"sector": "Musanze", "task": "Land Title Processing", "status": "Critical", "date": "12 Feb 2026"},
    {"sector": "Rubavu", "task": "Water Source Protection", "status": "Declined", "date": "05 Feb 2026"},
  ];

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color cardBlue = Color(0xFF1E293B);

    final filteredList = selectedSector == "All" 
        ? issues 
        : issues.where((i) => i['sector'] == selectedSector).toList();

    return Scaffold(
      backgroundColor: primaryDark,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text("AREAS FOR IMPROVEMENT", 
          style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            child: Row(
              children: ["All", "Kicukenge", "Musanze", "Rubavu"].map((sector) {
                final bool isSelected = selectedSector == sector;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(sector),
                    selected: isSelected,
                    onSelected: (selected) {
                      setState(() {
                        selectedSector = sector;
                      });
                    },
                    backgroundColor: cardBlue,
                    selectedColor: Colors.redAccent.withOpacity(0.8),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : Colors.white70,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      fontSize: 12,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                );
              }).toList(),
            ),
          ),
          
          // Issues List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: filteredList.length,
              itemBuilder: (context, index) {
                final item = filteredList[index];
                return FadeSlideTransition(
                  delay: Duration(milliseconds: 100 * index),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => SectorDetailPage(
                            sectorName: item['sector']!,
                            progress: 0.38,
                          ),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: cardBlue,
                        borderRadius: BorderRadius.circular(15),
                        border: Border.all(color: Colors.redAccent.withOpacity(0.2)),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: Colors.redAccent.withOpacity(0.1),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.warning_amber_rounded, color: Colors.redAccent, size: 20),
                          ),
                          const SizedBox(width: 15),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(item['task']!, 
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14)),
                                const SizedBox(height: 4),
                                Row(
                                  children: [
                                    Text(item['sector']!, style: const TextStyle(color: Colors.redAccent, fontSize: 11)),
                                    const SizedBox(width: 8),
                                    Text("• ${item['date']}", style: const TextStyle(color: Colors.white38, fontSize: 10)),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.redAccent.withOpacity(0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(item['status']!, 
                              style: const TextStyle(color: Colors.redAccent, fontSize: 9, fontWeight: FontWeight.bold)),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// Redundant AlerthsHub and ProfileSettings removed. 
// Using alerts_hub.dart and profile_hub_page.dart instead.
