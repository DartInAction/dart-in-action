import "logon_library.dart";

class MockAuthService implements AuthService {

  User auth(String username, String password) {
    var user = new User();
    user.forename = "testForename";
    user.surname = "testSurname";
    return user;
  }

}

User doLogon(AuthService authSvc, String username, String password) {
  User user = authSvc.auth(username, password);
  print("User is authenticated:${user==null}");
  return user;
}


main() {
  AuthService authService = new MockAuthService();
  var user = doLogon(authService, "Alice", "password");
  print(user.forename);
  print(user.surname);
}
