library logon_library;

class User {
  String forename;
  String surname;

  String getFullName() {
    return "$forename $surname";
  }
}

class AuthService {
  User auth(String username, String password) {
    User user = new User();
    user.forename = "Alice";  // Some implementation
    user.surname = "Smith";
    return user;
  }
}