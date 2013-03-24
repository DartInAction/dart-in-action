import "dart:html";

main() {
  query("#status").innerHTML = "Hello World";

  var button = new ButtonElement();
  button.text = "Click me";
  button.on.click.add( (e) {
    var div = new Element.html("<div>I am a div element</div>");
    document.body.elements.add(div);
  });

  document.body.elements.add(button);

}