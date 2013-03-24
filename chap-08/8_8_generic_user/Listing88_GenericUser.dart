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
