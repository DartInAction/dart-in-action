import "dart:json" as JSON;

usingPutIfAbsent() {
  var userLogons = new Map<String, List<DateTime> >();

  userLogons.putIfAbsent("charlie", () => new List<DateTime>());
  userLogons["charlie"].add(new DateTime.now());
}

// From earlier

main() {
  var jsonString = '{"charlieKey":"2012-07-23","aliceKey":"2012-08-16"}';
  Map lastLogonMap = JSON.parse(jsonString);
  print(lastLogonMap["charlieKey"]);
  jsonString = JSON.stringify(lastLogonMap);
}


creatingMaps() {
  Map<String, User> userMap = new Map<String, User>();

  userMap["aliceKey"] = new User("Alice");
  userMap["bobKey"] = new User("Bob");

  User aliceUser = userMap["aliceKey"];
  User bobUser = userMap["bobKey"];

  User charlieUser = userMap["charlieKey"];
}


creatingAList() {
  List literal = [ReaderPermission.ALLOW_READ,ReaderPermission.ALLOW_SHARE];
  literal.add(ReaderPermission.ALLOW_COMMENT);
  print(literal.length);

  List growable = new List();
  print(growable.length);
  growable.add(ReaderPermission.ALLOW_READ);
  growable.add(ReaderPermission.ALLOW_SHARE);

  List fixedSize = new List(2);
  print(fixedSize.length);
  fixedSize[0] = ReaderPermission.ALLOW_READ;
  fixedSize[1] = ReaderPermission.ALLOW_SHARE;
  // fixedSize.add(ReaderPermission.ALLOW_COMMENT);

  List fromOther = new List.from(fixedSize);
  fromOther.add(ReaderPermission.ALLOW_COMMENT);
}



usingIterator(User user) {
  Iterator iterator = user.permissions.iterator;

  var perm1 = null;
  var perm2 = null;

  if (iterator.moveNext()) {
    perm1 = iterator.current;
  }

  if (iterator.moveNext()) {
    perm2 = iterator.current;
  }

}





// From earilier...

Iterable extractAdminPermissions(User user) {
  return user.permissions.where( (currentPermission) {
    return currentPermission is AdminPermission;
  });
}



class Permission {
  final String name;
  const Permission(this.name);
}


class ReaderPermission extends Permission {

  const ReaderPermission(String name) : super(name);

  static const ReaderPermission ALLOW_READ =
                        const ReaderPermission("ALLOW_READ");
  static const ReaderPermission ALLOW_COMMENT =
                          const ReaderPermission("ALLOW_COMMENT");
  static const ReaderPermission ALLOW_SHARE =
                          const ReaderPermission("ALLOW_SHARE");
}

class AdminPermission extends Permission {

  const AdminPermission(String name) : super(name);

  static const AdminPermission ALLOW_EDIT =
                         const AdminPermission("ALLOW_EDIT");
  static const AdminPermission ALLOW_DELETE =
                         const AdminPermission("ALLOW_DELETE");
  static const AdminPermission ALLOW_CREATE =
                         const AdminPermission("ALLOW_CREATE");
}


// From fig 8.3
class User {
  //snip… other properties

  Iterable permissions;
  var name;

  User(this.name) {
    permissions = new List();
  }
}


// From fig 8.3
class AuthService {
  //snip… other methods

  User login(username, password) {
    User user = new User("");
    //snip … logon code

    (user.permissions as List).add(ReaderPermission.ALLOW_READ);
    (user.permissions as List).add(AdminPermission.ALLOW_EDIT);
    return user;
  }
}
