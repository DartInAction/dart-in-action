import "dart:html";

main() {
  var title = new Element.html("<h2>PackList</h2>");
  document.body.children.add(title);

  InputElement itemInput = new Element.tag("input");
  itemInput.id = "txt-item";
  itemInput.placeholder = "Enter an item";
  document.body.children.add(itemInput);

  ButtonElement addButton = new Element.tag("button");
  addButton.id = "btn-add";
  addButton.text = "Add";
  document.body.children.add(addButton);

  DivElement itemContainer = new Element.tag("div");
  itemContainer.id = "items";
  itemContainer.style.width = "300px";
  itemContainer.style.border = "1px solid black";
  itemContainer.innerHTML = "&nbsp;";
  document.body.children.add(itemContainer);
}
