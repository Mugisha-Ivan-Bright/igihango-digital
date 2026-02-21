import 'dart:io';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:geolocator/geolocator.dart';
import 'package:intl/intl.dart';
import 'animations.dart';

class EvidenceScreen extends StatefulWidget {
  const EvidenceScreen({super.key});

  @override
  State<EvidenceScreen> createState() => _EvidenceScreenState();
}

class _EvidenceScreenState extends State<EvidenceScreen> {
  String? selectedSector;
  final Set<int> _expandedIndices = {};

  final List<String> sectors = ["All Sectors", "Muhoza Sector", "Busasamana Sector", "Cyuve Sector", "Kimonyi Sector", "Kinigi Sector", "Gacaca Sector", "Muko Sector"];

  final List<Map<String, String>> _broadcasts = [
    {"sector": "Musanze", "msg": "Urgent: Infrastructure review requested.", "type": "Written", "time": "12m ago", "details": "Please ensure all sector leads have submitted their Q1 infrastructure reports specifically focusing on rural road connectivity."},
    {"sector": "All Districts", "msg": "Mayor's Monday Keynote Speech", "type": "Voice", "time": "2h ago", "details": "The Mayor's strategic alignment speech for the upcoming fiscal year. Mandatory listening for all department heads."},
    {"sector": "Gasabo", "msg": "Budget approval for Q3 targets", "type": "Written", "time": "1d ago", "details": "Q3 budget allocations for school renovations have been approved. Funds will be dispersed by Friday."},
  ];

  @override
  Widget build(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);

    if (selectedSector != null) {
      return CommunicationHub(
        sectorName: selectedSector!,
        onBack: () => setState(() => selectedSector = null),
      );
    }

    return Scaffold(
      backgroundColor: primaryDark,
      body: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: const EdgeInsets.all(20.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                const Text("INSHINGANO - COMMAND CENTER", 
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                const SizedBox(height: 25),
                const Text("ACTIVE CHANNELS", 
                  style: TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 15),
              ]),
            ),
          ),
          
          // Sector Grid
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 15,
                mainAxisSpacing: 15,
                childAspectRatio: 1.6,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final sector = sectors[index];
                  bool isAll = sector == "All Sectors";
                  return FadeSlideTransition(
                    delay: Duration(milliseconds: 100 * index),
                    child: GestureDetector(
                      onTap: () => setState(() => selectedSector = sector),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: isAll ? accentGold.withOpacity(0.1) : cardBlue,
                          borderRadius: BorderRadius.circular(15),
                          border: Border.all(color: isAll ? accentGold.withOpacity(0.3) : Colors.white.withOpacity(0.05)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Icon(isAll ? Icons.rss_feed : Icons.forum_outlined, 
                              color: isAll ? accentGold : Colors.white30, size: 20),
                            const Spacer(),
                            Text(sector, 
                              style: TextStyle(color: isAll ? accentGold : Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
                          ],
                        ),
                      ),
                    ),
                  );
                },
                childCount: sectors.length,
              ),
            ),
          ),

          // Global History Summary
          SliverPadding(
            padding: const EdgeInsets.all(20.0),
            sliver: SliverList(
              delegate: SliverChildListDelegate([
                const SizedBox(height: 20),
                const Text("RECENT BROADCASTS", 
                  style: TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 15),
                if (_broadcasts.isEmpty)
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 40),
                      child: Column(
                        children: [
                          Icon(Icons.notifications_none, color: Colors.white.withOpacity(0.1), size: 40),
                          const SizedBox(height: 10),
                          const Text("No recent broadcasts", style: TextStyle(color: Colors.white24)),
                        ],
                      ),
                    ),
                  ),
                ...List.generate(_broadcasts.length, (index) {
                  final b = _broadcasts[index];
                  return FadeSlideTransition(
                    delay: Duration(milliseconds: 100 * (index + 4)),
                    child: _buildExpandableBroadcast(index, b),
                  );
                }),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExpandableBroadcast(int index, Map<String, String> b) {
    const Color cardBlue = Color(0xFF1E293B);
    const Color accentGold = Color(0xFFD4AF37);
    final bool isExpanded = _expandedIndices.contains(index);

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: cardBlue, 
        borderRadius: BorderRadius.circular(15),
        border: Border.all(color: isExpanded ? accentGold.withOpacity(0.3) : Colors.transparent),
      ),
      child: Column(
        children: [
          ListTile(
            onTap: () {
              setState(() {
                if (isExpanded) {
                  _expandedIndices.remove(index);
                } else {
                  _expandedIndices.add(index);
                }
              });
            },
            leading: Icon(b['type'] == "Voice" ? Icons.mic_none : Icons.description_outlined, color: accentGold, size: 18),
            title: Text(b['msg']!, 
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13)),
            subtitle: Text("${b['sector']} • ${b['time']}", style: const TextStyle(color: Colors.white38, fontSize: 10)),
            trailing: Icon(isExpanded ? Icons.expand_less : Icons.expand_more, color: Colors.white10),
          ),
          if (isExpanded)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Divider(color: Colors.white10),
                  const SizedBox(height: 8),
                  Text(b['details']!, style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.5)),
                  const SizedBox(height: 15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton.icon(
                        onPressed: () {
                          setState(() {
                            _broadcasts.removeAt(index);
                            _expandedIndices.remove(index);
                            // Adjust indices if necessary or just use unique IDs (for a demo index works)
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text("Broadcast cancelled"), backgroundColor: Colors.redAccent),
                          );
                        },
                        icon: const Icon(Icons.cancel_outlined, color: Colors.redAccent, size: 16),
                        label: const Text("CANCEL BROADCAST", style: TextStyle(color: Colors.redAccent, fontSize: 10, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class CommunicationHub extends StatefulWidget {
  final String sectorName;
  final VoidCallback onBack;
  const CommunicationHub({super.key, required this.sectorName, required this.onBack});

  @override
  State<CommunicationHub> createState() => _CommunicationHubStateImpl();
}

class _CommunicationHubStateImpl extends State<CommunicationHub> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _textController = TextEditingController();
  bool isRecording = false;
  String sortBy = "Recent";

  final List<Map<String, String>> history = [
    {"type": "Written", "content": "Maintain focus on the modern market construction.", "date": "20 Feb, 10:30 AM"},
    {"type": "Voice", "content": "Voice Speech: Q3 Strategic Alignment", "date": "18 Feb, 02:15 PM"},
    {"type": "Written", "content": "Land title backlog resolution instructions.", "date": "15 Feb, 09:00 AM"},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _textController.dispose();
    super.dispose();
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
        leading: IconButton(icon: const Icon(Icons.arrow_back_ios, color: Colors.white, size: 20), onPressed: widget.onBack),
        title: Text(widget.sectorName.toUpperCase(), 
          style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: AnimatedScaleButton(
              onTap: () => _showComposeOverlay(context),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: accentGold.withOpacity(0.3)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.add_circle_outline, color: Color(0xFFD4AF37), size: 18),
                    SizedBox(width: 8),
                    Text("VUGA", style: TextStyle(color: Color(0xFFD4AF37), fontWeight: FontWeight.bold, fontSize: 12)),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          // History Section Header
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
            sliver: SliverToBoxAdapter(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("MESSAGE ARCHIVE", 
                    style: TextStyle(color: Colors.white24, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                  DropdownButton<String>(
                    value: sortBy,
                    dropdownColor: cardBlue,
                    underline: const SizedBox(),
                    icon: const Icon(Icons.sort, color: accentGold, size: 16),
                    style: const TextStyle(color: accentGold, fontSize: 11, fontWeight: FontWeight.bold),
                    items: ["Recent", "Type", "Priority"].map((String value) {
                      return DropdownMenuItem<String>(value: value, child: Text(value.toUpperCase()));
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => sortBy = val);
                    },
                  ),
                ],
              ),
            ),
          ),

          // History List
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final item = history[index];
                  return FadeSlideTransition(
                    delay: Duration(milliseconds: 100 * index),
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 12),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: cardBlue.withOpacity(0.5),
                        borderRadius: BorderRadius.circular(15),
                        border: Border.all(color: Colors.white.withOpacity(0.02)),
                      ),
                      child: Row(
                        children: [
                          Icon(item['type'] == "Voice" ? Icons.play_circle_fill : Icons.chat_bubble_outline, 
                            color: accentGold.withOpacity(0.5), size: 18),
                          const SizedBox(width: 15),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(item['content']!, 
                                  style: const TextStyle(color: Colors.white70, fontSize: 12, height: 1.4)),
                                const SizedBox(height: 4),
                                Text(item['date']!, style: const TextStyle(color: Colors.white24, fontSize: 10)),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
                childCount: history.length,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showComposeOverlay(BuildContext context) {
    const Color primaryDark = Color(0xFF0A192F);
    const Color accentGold = Color(0xFFD4AF37);
    const Color cardBlue = Color(0xFF1E293B);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => StatefulBuilder(
        builder: (context, setSheetState) {
          return Container(
            height: MediaQuery.of(context).size.height * 0.65,
            decoration: const BoxDecoration(
              color: primaryDark,
              borderRadius: BorderRadius.vertical(top: Radius.circular(25)),
              boxShadow: [BoxShadow(color: Colors.black54, blurRadius: 20, spreadRadius: 5)],
            ),
            child: Column(
              children: [
                const SizedBox(height: 12),
                Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(10))),
                const SizedBox(height: 20),
                Text("NEW BROADCAST: ${widget.sectorName.toUpperCase()}", 
                  style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold, letterSpacing: 1.1)),
                const SizedBox(height: 10),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(20),
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: cardBlue,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: accentGold.withOpacity(0.1)),
                      ),
                      child: Column(
                        children: [
                          TabBar(
                            controller: _tabController,
                            indicatorColor: accentGold,
                            labelColor: accentGold,
                            unselectedLabelColor: Colors.white30,
                            tabs: const [
                              Tab(icon: Icon(Icons.edit_note), text: "WRITTEN"),
                              Tab(icon: Icon(Icons.mic), text: "VOICE SPEECH"),
                            ],
                          ),
                          SizedBox(
                            height: 200,
                            child: TabBarView(
                              controller: _tabController,
                              children: [
                                // Written Tab
                                Padding(
                                  padding: const EdgeInsets.only(top: 20),
                                  child: TextField(
                                    controller: _textController,
                                    maxLines: 5,
                                    style: const TextStyle(color: Colors.white, fontSize: 14),
                                    decoration: InputDecoration(
                                      hintText: "Enter your instructions here...",
                                      hintStyle: const TextStyle(color: Colors.white24),
                                      filled: true,
                                      fillColor: primaryDark.withOpacity(0.5),
                                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                                    ),
                                  ),
                                ),
                                // Voice Tab
                                Center(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      GestureDetector(
                                        onTap: () => setSheetState(() => isRecording = !isRecording),
                                        child: Container(
                                          padding: const EdgeInsets.all(25),
                                          decoration: BoxDecoration(
                                            color: isRecording ? Colors.redAccent.withOpacity(0.2) : accentGold.withOpacity(0.1),
                                            shape: BoxShape.circle,
                                            border: Border.all(color: isRecording ? Colors.redAccent : accentGold, width: 2),
                                          ),
                                          child: Icon(isRecording ? Icons.stop : Icons.mic, 
                                            color: isRecording ? Colors.redAccent : accentGold, size: 40),
                                        ),
                                      ),
                                      const SizedBox(height: 15),
                                      Text(isRecording ? "RECORDING SPEECH..." : "TAP TO START RECORDING", 
                                        style: TextStyle(color: isRecording ? Colors.redAccent : Colors.white38, fontSize: 10, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 20),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () {
                                Navigator.pop(context);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text("Broadcast Sent Successfully"), backgroundColor: Color(0xFF10B981)),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: accentGold,
                                foregroundColor: Colors.black,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                              child: const Text("SEND TO SECTOR", style: TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        }
      ),
    );
  }
}
