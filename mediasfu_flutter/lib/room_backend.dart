import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mediasfu_sdk/mediasfu_sdk.dart';

const _backendBaseUrl = 'https://your-app.example/api/mediasfu';

Future<CreateJoinRoomResult> _postRoom(String operation, Map<String, dynamic> payload) async {
  final base = Uri.parse(_backendBaseUrl);
  if (base.scheme != 'https' || base.userInfo.isNotEmpty || base.query.isNotEmpty || base.fragment.isNotEmpty) {
    throw StateError('Configure a plain HTTPS backend base URL.');
  }
  final response = await http.post(
    base.resolve('${base.path.endsWith('/') ? '' : '/'}rooms/$operation'),
    headers: const {'Content-Type': 'application/json'},
    body: jsonEncode(payload),
  );
  final value = jsonDecode(response.body) as Map<String, dynamic>;
  if (response.statusCode < 200 || response.statusCode >= 300) {
    return CreateJoinRoomResult(data: CreateJoinRoomError.fromJson(value), success: false);
  }
  return CreateJoinRoomResult(data: CreateJoinRoomResponse.fromJson(value), success: true);
}

Future<CreateJoinRoomResult> createRoomViaBackend(CreateMediaSFUOptions options) =>
    _postRoom('create', options.payload.toMap());

Future<CreateJoinRoomResult> joinRoomViaBackend(JoinMediaSFUOptions options) =>
    _postRoom('join', options.payload.toMap());
