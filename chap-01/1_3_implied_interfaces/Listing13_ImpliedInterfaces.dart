abstract class WelcomerInterface { // make the class abstract. 
  printGreeting(); // abstract methods are implied by not having bodies
}

class Welcomer implements WelcomerInterface {
  printGreeting() => print("Hello ${name}");
  var name;
}

class Greeter implements Welcomer {
  printGreeting () => print("Greetings ${name}");
  var name;
}

void sayHello(WelcomerInterface welcomer) {
  welcomer.printGreeting();
}

main() {
  var welcomer = new Welcomer();
  welcomer.name = "Tom";
  sayHello(welcomer);

  var greeter = new Greeter();
  greeter.name = "Tom";
  sayHello(greeter);
}
