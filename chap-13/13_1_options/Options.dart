// import "dart:io";

void main() {
  Options options = new Options();
  print(options.executable);
  print(options.script);

  List<String> args = options.arguments;
  print(options.arguments);


}