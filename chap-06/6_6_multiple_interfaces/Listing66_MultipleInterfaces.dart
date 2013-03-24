import "logon_library.dart";

User doLogon(AuthService authService, String username, String password) {
  return authService.auth(username, password);
}

showRoles(RolesService rolesService, User user) {
  List roles = rolesService.getRoles(user);
  print(roles);
}

main() {
  var entService = new EnterpriseAuthService();
  var user = doLogon(entService,"Alice","password");
  showRoles(entService, user);
}
