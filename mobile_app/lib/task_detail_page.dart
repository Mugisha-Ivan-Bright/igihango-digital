import 'package:flutter/material.dart';

class TaskDetailPage extends StatelessWidget {
  final String taskTitle;
  final String taskStatus;
  final Color statusColor;
  final bool isVerified;
  final String usedBudget;
  final String missedBudget;
  final String startDate;
  final String endDate;
  final List<String> progressPhotos;

  const TaskDetailPage({
    super.key,
    required this.taskTitle,
    required this.taskStatus,
    required this.statusColor,
    this.isVerified = false,
    this.usedBudget = "45,000,000 RWF",
    this.missedBudget = "2,500,000 RWF",
    this.startDate = "Jan 12, 2026",
    this.endDate = "March 30, 2026",
    this.progressPhotos = const [
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=400&auto=format&fit=crop', // Excavation
      'https://images.unsplash.com/photo-1517581177682-a083bb7ffb15?q=80&w=400&auto=format&fit=crop', // Foundation
      'https://images.unsplash.com/photo-1590069230002-70cc83815b41?q=80&w=400&auto=format&fit=crop', // Wall Raising
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=400&auto=format&fit=crop', // Roofing
    ],
  });

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
        title: Text(
          taskTitle.toUpperCase(),
          style: const TextStyle(
            color: Colors.white,
            letterSpacing: 1.5,
            fontSize: 16,
          ),
        ),
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
            // 1. Notification Widget (AMENYESHA)
            _buildNotificationBanner(statusGreen),

            const SizedBox(height: 24),

            // 2. Leadership & Amakuru Section
            _buildLeadershipSection(
              cardBlue,
              accentGold,
              isHigherLeader: false,
            ),

            const SizedBox(height: 24),

            // 3. Financial Overview (Amafaranga Yakoreshejwe)
            _buildFinancialOverview(cardBlue, accentGold),

            const SizedBox(height: 24),

            // 4. Project Timeline (Igihe Kigenwe)
            _buildTimelineSection(cardBlue, accentGold),

            const SizedBox(height: 24),

            // 5. Progress Photos (Amafoto Y'ibyakozwe)
            _buildPhotoGrid(context, accentGold),

            const SizedBox(height: 24),

            // 6. Evidence Attachment Toggle (Docx/Image)
            _buildEvidenceInput(),

            const SizedBox(height: 24),

            // 7. Main Action Button with Logic
            _buildFinalActionButton(isVerified, accentGold, statusGreen),
          ],
        ),
      ),
    );
  }

  // 1. Notification Widget (AMENYESHA)
  Widget _buildNotificationBanner(Color statusGreen) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: statusGreen.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: statusGreen.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          const Icon(
            Icons.notifications_active,
            color: Color(0xFF10B981),
            size: 20,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              "Amakuru mashya! Ikiciro cyo gusuzuma cyatangiye.",
              style: TextStyle(
                color: Colors.white.withOpacity(0.9),
                fontSize: 13,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // 2. Leadership & Amakuru Section
  Widget _buildLeadershipSection(
    Color cardBlue,
    Color accentGold, {
    bool isHigherLeader = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Amakuru & Imihigo",
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: cardBlue,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              // Example Comment from Leader
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 12,
                    backgroundColor: accentGold,
                    child: const Icon(
                      Icons.gavel,
                      size: 12,
                      color: Colors.black,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Higher Leader",
                          style: TextStyle(
                            color: accentGold,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                        const Text(
                          "Igenzura rya mbere ryagaragaje ko amategura adafunze neza. Ongera ugenzure.",
                          style: TextStyle(color: Colors.white70, fontSize: 13),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              if (isHigherLeader) ...[
                const Divider(color: Colors.white10, height: 24),
                TextButton.icon(
                  onPressed: () => _setTaskRules(),
                  icon: Icon(Icons.edit_note, color: accentGold),
                  label: Text(
                    "Shyiraho amabwiriza (Set Rules)",
                    style: TextStyle(color: accentGold),
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  // 3. Financial Overview
  Widget _buildFinancialOverview(Color cardBlue, Color accentGold) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Icyegeranyo cy'Imikoreshereze y'Imari",
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: cardBlue,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              _buildFinanceRow(Icons.account_balance_wallet, "Used Budget", usedBudget, Colors.greenAccent),
              const Divider(color: Colors.white10, height: 24),
              _buildFinanceRow(Icons.money_off, "Missed Budget", missedBudget, Colors.redAccent),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFinanceRow(IconData icon, String label, String value, Color color) {
    return Row(
      children: [
        Icon(icon, size: 20, color: color.withOpacity(0.7)),
        const SizedBox(width: 12),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 13)),
        const Spacer(),
        Text(value, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
      ],
    );
  }

  // 4. Timeline Section
  Widget _buildTimelineSection(Color cardBlue, Color accentGold) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Igihe Umushinga Uzamara",
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: cardBlue,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildTimelineItem("STARTING", startDate, accentGold),
              Container(width: 1, height: 40, color: Colors.white10),
              _buildTimelineItem("ENDING", endDate, Colors.white38),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTimelineItem(String label, String date, Color color) {
    return Column(
      children: [
        Text(label, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1)),
        const SizedBox(height: 4),
        Text(date, style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500)),
      ],
    );
  }

  // 5. Progress Photos Grid
  Widget _buildPhotoGrid(BuildContext context, Color accentGold) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              "Amafoto y'iterambere rya task",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              "View All",
              style: TextStyle(color: accentGold, fontSize: 12),
            ),
          ],
        ),
        const SizedBox(height: 12),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            childAspectRatio: 1.5,
          ),
          itemCount: progressPhotos.length,
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () => _showPhotoView(context, progressPhotos[index]),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  progressPhotos[index],
                  fit: BoxFit.cover,
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) return child;
                    return Container(
                      color: Colors.white10,
                      child: const Center(child: Icon(Icons.image, color: Colors.white24)),
                    );
                  },
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  void _showPhotoView(BuildContext context, String imageUrl) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: EdgeInsets.zero,
        child: Stack(
          alignment: Alignment.center,
          children: [
            GestureDetector(
              onTap: () => Navigator.pop(context),
              child: InteractiveViewer(
                child: Image.network(
                  imageUrl,
                  fit: BoxFit.contain,
                  width: double.infinity,
                  height: double.infinity,
                ),
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
    );
  }

  // 3. Evidence Attachment Toggle (Docx/Image)
  Widget _buildEvidenceInput() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          "Ohereza Ibyemezo",
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            _actionPill(Icons.image, "Amafoto"),
            const SizedBox(width: 10),
            _actionPill(Icons.description, "Inyandiko (Docx)"),
          ],
        ),
      ],
    );
  }

  Widget _actionPill(IconData icon, String label) {
    return Expanded(
      child: GestureDetector(
        onTap: () {
          // Handle evidence type selection
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.white10),
            borderRadius: BorderRadius.circular(12),
            color: const Color(0xFF1E293B),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 18, color: Colors.white54),
              const SizedBox(width: 8),
              Text(
                label,
                style: const TextStyle(color: Colors.white54, fontSize: 12),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // 4. Main Action Button with Logic
  Widget _buildFinalActionButton(
    bool isVerified,
    Color accentGold,
    Color statusGreen,
  ) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          height: 55,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: isVerified ? statusGreen : accentGold,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
            ),
            onPressed: () {
              // Handle action
            },
            child: Text(
              isVerified ? "EMEZA KO BYARANGIYE" : "OHEREZA GUKIRWA",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
                color: Colors.white,
              ),
            ),
          ),
        ),
        if (!isVerified)
          Padding(
            padding: const EdgeInsets.only(top: 12),
            child: TextButton(
              onPressed: () {
                // Handle re-open
              },
              child: const Text(
                "SUBIRA MU MYITEGURO (RE-OPEN)",
                style: TextStyle(color: Colors.redAccent, fontSize: 11),
              ),
            ),
          ),
      ],
    );
  }

  void _setTaskRules() {
    // Handle setting task rules
  }
}
