abstract class IGreetable {
  String sayHello(String name);

  factory IGreetable() {
    return new Greeter();
  }
}

class Greeter implements IGreetable {
  sayHello(name) {
    return "Hello $name";
  }
}

void main() {
  var myGreetable = new IGreetable();
  var message = myGreetable.sayHello("Dart");
  print(message);
}