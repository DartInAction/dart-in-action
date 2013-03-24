import "logon_library.dart";

abstract class AuthService {
  User auth(String username, String password);

  factory AuthService() {
    return new EnterpriseAuthService();
  }
}


class EnterpriseAuthService {
  String connection;

  EnterpriseAuthService() {
    print("in the constructor");
  }
}

main() {
  var entSvc = new EnterpriseAuthService();
  var entSvc2 = new AuthService();
}
