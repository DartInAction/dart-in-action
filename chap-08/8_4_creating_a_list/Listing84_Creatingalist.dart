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

// From earlier

usingIterator(User user) {
  Iterator iterator = user.permissions.iterator();

  var perm1 = null;
  var perm2 = null;

  if (iterator.hasNext) {
    perm1 = iterator.next();
  }

  if (iterator.hasNext) {
    perm2 = iterator.next();
  }

}





// From earilier...

Collection extractAdminPermissions(User user) {
  return user.permissions.filter( (currentPermission) {
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

  Collection permissions;

  User() {
    permissions = new List();
  }
}


// From fig 8.3
class AuthService {
  //snip… other methods

  User login(username, password) {
    User user = new User();
    //snip … logon code

    (user.permissions as List).add(ReaderPermission.ALLOW_READ);
    (user.permissions as List).add(AdminPermission.ALLOW_EDIT);
    return user;
  }
}
