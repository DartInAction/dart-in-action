import "logon_library.dart";

abstract class AuthService {
  User auth(String username, String password);
}

class EnterpriseAuthService implements AuthService {
  User auth(String username, String password) {
    // some enterprise implementation
  }
}
