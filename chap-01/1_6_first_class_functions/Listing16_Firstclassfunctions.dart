String sayHello(name) => "Hello $name";

main() {
  var myFunc = sayHello;

  print(myFunc("World"));

  var mySumFunc = (a,b) {
    return a+b;
  };

  var c = mySumFunc(1,2);
  print(c);
}
