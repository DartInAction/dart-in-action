main() {
  print("Hello World");
  foo();
}

foo() {
  new MyClass().bar();
}

class MyClass {
  bar() {
    print("bar");
  }
}