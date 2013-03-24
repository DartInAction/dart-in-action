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
