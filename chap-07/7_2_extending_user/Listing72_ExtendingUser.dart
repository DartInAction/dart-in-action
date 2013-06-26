class EnterpriseUser extends User {
  EnterpriseUser(username) : super(username) { }
  void markExpired() {
    // some new implementation
  }
}


class User {
  User (String this._username) { }

  String _username;
  String _existingPasswordHash;

  String get username => _username;

  String emailAddress;

  bool isPasswordValid(String newPassword) {
    //… some validation code …
  }
}

main() {
  var alice = new User("Alice");
  
  var bob = new EnterpriseUser("Bob");
  print(bob.username);
  bob.markExpired();
  
}