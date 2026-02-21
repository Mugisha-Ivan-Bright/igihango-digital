import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // IMPORTANT: Change this if backend is on different host
  // For local development: http://localhost:8000
  // For production: https://your-backend-url.com
  static const String baseUrl = 'http://127.0.0.1:8000';
  
  // Get auth token from storage
  static Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }
  
  // Save auth token to storage
  static Future<void> _saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }
  
  // Clear auth token from storage
  static Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }
  
  // Get headers with auth token
  static Future<Map<String, String>> _getHeaders() async {
    final token = await _getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }
  
  // Login
  static Future<LoginResponse?> login(String nationalId, String password) async {
    try {
      print('Attempting login for: $nationalId');
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'national_id': nationalId,
          'password': password,
        }),
      );
      
      print('Login response status: ${response.statusCode}');
      print('Login response body: ${response.body}');
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final loginResponse = LoginResponse.fromJson(data);
        
        // Save token and user data
        await _saveToken(loginResponse.accessToken);
        await _saveUserData(loginResponse.user);
        
        print('Login successful! Token and user data saved.');
        return loginResponse;
      } else {
        print('Login failed with status: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('Error during login: $e');
      return null;
    }
  }
  
  // Save user data to storage
  static Future<void> _saveUserData(UserData user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_data', json.encode({
      'id': user.id,
      'national_id': user.nationalId,
      'full_name': user.fullName,
      'role': user.role,
      'sector_id': user.sectorId,
      'sector_name': user.sectorName,
      'phone': user.phone,
      'avatar_url': user.avatarUrl,
      'is_active': user.isActive,
    }));
  }
  
  // Get current user data
  static Future<UserData?> getCurrentUser() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userDataString = prefs.getString('user_data');
      if (userDataString != null) {
        final userData = json.decode(userDataString);
        return UserData.fromJson(userData);
      }
      return null;
    } catch (e) {
      print('Error getting current user: $e');
      return null;
    }
  }
  
  // Logout
  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    await prefs.remove('user_data');
  }
  
  // Get district stats
  static Future<DistrictStats?> getDistrictStats() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('$baseUrl/sectors/stats/district'),
        headers: headers,
      );
      
      if (response.statusCode == 200) {
        return DistrictStats.fromJson(json.decode(response.body));
      }
      return null;
    } catch (e) {
      print('Error fetching district stats: $e');
      return null;
    }
  }
  
  // Get all sectors
  static Future<List<SectorData>> getSectors() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('$baseUrl/sectors/'),
        headers: headers,
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => SectorData.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      print('Error fetching sectors: $e');
      return [];
    }
  }
  
  // Get all imihigo
  static Future<List<ImihigoData>> getImihigo() async {
    try {
      final headers = await _getHeaders();
      final response = await http.get(
        Uri.parse('$baseUrl/imihigo/'),
        headers: headers,
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => ImihigoData.fromJson(json)).toList();
      }
      return [];
    } catch (e) {
      print('Error fetching imihigo: $e');
      return [];
    }
  }
}

// Data models
class DistrictStats {
  final int totalSectors;
  final double averageProgress;
  final int totalImihigo;
  final int totalTasks;
  final int completedTasks;
  final int redFlags;
  final int onTrack;
  final int delayed;
  
  DistrictStats({
    required this.totalSectors,
    required this.averageProgress,
    required this.totalImihigo,
    required this.totalTasks,
    required this.completedTasks,
    required this.redFlags,
    required this.onTrack,
    required this.delayed,
  });
  
  factory DistrictStats.fromJson(Map<String, dynamic> json) {
    return DistrictStats(
      totalSectors: json['total_sectors'] ?? 0,
      averageProgress: (json['average_progress'] ?? 0.0).toDouble(),
      totalImihigo: json['total_imihigo'] ?? 0,
      totalTasks: json['total_tasks'] ?? 0,
      completedTasks: json['completed_tasks'] ?? 0,
      redFlags: json['red_flags'] ?? 0,
      onTrack: json['on_track'] ?? 0,
      delayed: json['delayed'] ?? 0,
    );
  }
}

class SectorData {
  final int id;
  final String name;
  final String district;
  final String province;
  final int population;
  final double areaKm2;
  final int imihigoCount;
  final double averageProgress;
  final UserData? execSecretary;
  
  SectorData({
    required this.id,
    required this.name,
    required this.district,
    required this.province,
    required this.population,
    required this.areaKm2,
    required this.imihigoCount,
    required this.averageProgress,
    this.execSecretary,
  });
  
  factory SectorData.fromJson(Map<String, dynamic> json) {
    return SectorData(
      id: json['id'],
      name: json['name'],
      district: json['district'],
      province: json['province'],
      population: json['population'] ?? 0,
      areaKm2: (json['area_km2'] ?? 0.0).toDouble(),
      imihigoCount: json['imihigo_count'] ?? 0,
      averageProgress: (json['average_progress'] ?? 0.0).toDouble(),
      execSecretary: json['exec_secretary'] != null 
          ? UserData.fromJson(json['exec_secretary']) 
          : null,
    );
  }
}

class UserData {
  final int id;
  final String nationalId;
  final String fullName;
  final String role;
  final int? sectorId;
  final String? sectorName;
  final String? phone;
  final String? avatarUrl;
  final bool isActive;
  
  UserData({
    required this.id,
    required this.nationalId,
    required this.fullName,
    required this.role,
    this.sectorId,
    this.sectorName,
    this.phone,
    this.avatarUrl,
    required this.isActive,
  });
  
  factory UserData.fromJson(Map<String, dynamic> json) {
    return UserData(
      id: json['id'],
      nationalId: json['national_id'],
      fullName: json['full_name'],
      role: json['role'],
      sectorId: json['sector_id'],
      sectorName: json['sector_name'],
      phone: json['phone'],
      avatarUrl: json['avatar_url'],
      isActive: json['is_active'] ?? true,
    );
  }
}

class ImihigoData {
  final int id;
  final int sectorId;
  final String? sectorName;
  final String title;
  final String? description;
  final String category;
  final double targetValue;
  final double currentValue;
  final String unit;
  final DateTime deadline;
  final String status;
  final double progress;
  final DateTime createdAt;
  
  ImihigoData({
    required this.id,
    required this.sectorId,
    this.sectorName,
    required this.title,
    this.description,
    required this.category,
    required this.targetValue,
    required this.currentValue,
    required this.unit,
    required this.deadline,
    required this.status,
    required this.progress,
    required this.createdAt,
  });
  
  factory ImihigoData.fromJson(Map<String, dynamic> json) {
    return ImihigoData(
      id: json['id'],
      sectorId: json['sector_id'],
      sectorName: json['sector_name'],
      title: json['title'],
      description: json['description'],
      category: json['category'],
      targetValue: (json['target_value'] ?? 0.0).toDouble(),
      currentValue: (json['current_value'] ?? 0.0).toDouble(),
      unit: json['unit'] ?? '%',
      deadline: DateTime.parse(json['deadline']),
      status: json['status'],
      progress: (json['progress'] ?? 0.0).toDouble(),
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}


class LoginResponse {
  final String accessToken;
  final UserData user;
  
  LoginResponse({
    required this.accessToken,
    required this.user,
  });
  
  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      accessToken: json['access_token'],
      user: UserData.fromJson(json['user']),
    );
  }
}
