library myLibrary;
import "./lib/myOtherLibrary.dart";

part "greeter.dart";
part "leaver.dart";

greetFunc() {
  var g = new Greeter();
  sayHello(g);
}
