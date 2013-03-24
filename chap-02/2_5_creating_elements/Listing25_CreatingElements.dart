import "dart:html";

main() {
  query("#status").innerHtml = "Hello World"; // innerHTML now innerHtml
                                              // see code listing 2_4

  var button = new ButtonElement();
  button.text = "Click me";
  button.onClick.listen( (e) { // on.click.add now onClick.listen 
    var div = new Element.html("<div>I am a div element</div>");
    document.body.children.add(div); // body.elements now body.children
  });

  document.body.children.add(button);

}