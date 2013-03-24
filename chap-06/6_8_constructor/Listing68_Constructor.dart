import "logon_library.dart";

abstract class AuthService {
  User auth(String username, String password);

  factory AuthService() {
    return new EnterpriseAuthService();
  }
}


class EnterpriseAuthService implements AuthService {
  String connection;

  EnterpriseAuthService() {
    print("in the constructor");
  }
  
  User auth(String username, String password) {
    // snip implementation
  }
}

main() {
  var entSvc = new EnterpriseAuthService();
  var entSvc2 = new AuthService();
}
