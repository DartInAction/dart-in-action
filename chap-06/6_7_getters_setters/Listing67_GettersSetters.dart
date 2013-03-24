import "logon_library.dart";

abstract class AuthService {
  User auth(String username, String password);
  bool get isConnected;
  void set isConnected(bool value);
}

abstract class RoleService {
  List getRoles(User user);
  bool isConnected;
}

class EnterpriseAuthService implements AuthService, RoleService {
  bool _isConnected;
  bool get isConnected => _isConnected;
  set isConnected(bool value) => _isConnected = value;

  //snip auth() and getRoles()
}
