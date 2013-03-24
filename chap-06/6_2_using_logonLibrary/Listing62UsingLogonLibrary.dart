import "dart:html";
import "logon_library.dart";

User doLogon(AuthService authSvc, String username, String password) {
  User user = authSvc.auth(username, password);
  print("User is authenticated:${user==null}");
  return user;
}

buttonClickHandler(event) {
    AuthService authSvc = new AuthService();
    User user = doLogon(authSvc,
        (query("#username") as InputElement).value,
        (query("#password") as InputElement).value);
}