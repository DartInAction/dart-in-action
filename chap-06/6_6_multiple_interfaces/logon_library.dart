library logon_library;

class User {
  String forename;
  String surname;

  String getFullName() {
    return "$forename $surname";
  }
}

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
