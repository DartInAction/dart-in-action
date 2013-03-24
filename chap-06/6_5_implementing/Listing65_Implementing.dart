import "logon_library.dart";

abstract class RolesService {
  List getRoles(User user);
}

abstract class AuthService {
  User auth(String username, String password);
}

class EnterpriseAuthService implements AuthService, RolesService {
  User auth(String username, String password) {
    // some enterprise implementation
  }

  List getRoles(User user) {
    // some enterprise implementation
  }
}
