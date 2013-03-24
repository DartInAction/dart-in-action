usingGeneric() {
  User<Permission> permissionUser = new User<Permission>();

  User<Role> roleUser = new User<Role>();
  roleUser.addCredential(const Role("ADMIN"));
  print( roleUser.containsCredential(const Role("ADMIN")) );


  User<String> stringUser = new User<String>();
  stringUser.addCredential("ACCESS_ALL_AREAS");

  User<int> intUser = new User<int>();
  intUser.addCredential(999);

}


// From earlier...

class User<C> {

  List<C> credentials;

  User() {
    credentials = new List<C>();
  }

  addCredential(C credential) {
    this.credentials.add(credential);
  }

  bool containsCredential(C credential) {
    return this.credentials.some((item) => item == credential);
  }

  List<C> getCredentialsList() {
    return new List<C>.from(credentials);
  }

}




class Permission {
  final String name;
  const Permission(this.name);
}

class Role {
  final String name;
  const Role(this.name);
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
