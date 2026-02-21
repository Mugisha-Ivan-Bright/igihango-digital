import 'package:flutter/material.dart';

class BrandingLogo extends StatelessWidget {
  final double scale;
  final bool isHeader;

  const BrandingLogo({
    super.key, 
    this.scale = 1.0,
    this.isHeader = false,
  });

  @override
  Widget build(BuildContext context) {
    const Color accentGold = Color(0xFFD4AF37);
    
    if (isHeader) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.all_inclusive, color: accentGold, size: 24 * scale),
          const SizedBox(width: 8),
          Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "IGIHANGO",
                style: TextStyle(
                  color: accentGold,
                  fontSize: 14 * scale,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
              Text(
                "DIGITAL",
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 6 * scale,
                  letterSpacing: 1.5,
                  fontWeight: FontWeight.w300,
                ),
              ),
            ],
          ),
        ],
      );
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.all_inclusive, size: 80 * scale, color: accentGold),
        Text(
          "IGIHANGO",
          style: TextStyle(
            color: accentGold,
            fontSize: 28 * scale,
            fontWeight: FontWeight.bold,
            letterSpacing: 4,
          ),
        ),
        Text(
          "DIGITAL",
          style: TextStyle(
            color: Colors.white70,
            fontSize: 12 * scale,
            letterSpacing: 2,
            fontWeight: FontWeight.w300,
          ),
        ),
        if (!isHeader) ...[
          const SizedBox(height: 8),
          Text(
            "ihura rirambye ry'inshingano",
            style: TextStyle(
              color: Colors.white.withOpacity(0.5),
              fontSize: 10 * scale,
              fontStyle: FontStyle.italic,
            ),
          ),
        ]
      ],
    );
  }
}
