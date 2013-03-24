class User {
  String forename;
  String surname;

  String getFullName() {
    return "$forename $surname";
  }
}

main() {
  User user = new User();
  user.forename = "Alice";
  user.surname = "Smith";
  var fullName = user.getFullName();
}
