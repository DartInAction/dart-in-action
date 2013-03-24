import "dart:html";

main() {
  var title = new Element.html("<h2>PackList</h2>");
  document.body.children.add(title);

  InputElement itemInput = new Element.tag("input");
  document.body.children.add(itemInput);

  ButtonElement addButton = new Element.tag("button");
  document.body.children.add(addButton);

  DivElement itemContainer = new Element.tag("div");
  document.body.children.add(itemContainer);
}
