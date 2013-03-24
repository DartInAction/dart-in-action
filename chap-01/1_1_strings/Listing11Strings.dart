void main() {

  var h = "Hello";
  var w = "World";
  print('$h $w');

  print(r'$h $w');

  var helloWorld = "Hello " "World";
  print(helloWorld);

  print("${helloWorld.toUpperCase()}");
  print("The answer is ${5 + 10}");

  var multiline = """
<div id='greeting'>
  "Hello World"
</div>""";
  print(multiline);

  var o = new Object();
  print(o.toString());
  print("$o");

  // new for M4:
  // + operator can now concatenate two strings
  var s = h + w;
  print(s);
  // but + operator cannot concatente anything else
  // s = h + 1; - won't work.
}
