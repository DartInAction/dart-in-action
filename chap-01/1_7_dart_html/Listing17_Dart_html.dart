import 'dart:html';

void main() {
  var button = new ButtonElement();
  // or...
  // var button = new Element.tag("button");
  button.text = "Click me";
  // button.on.click.add((event) { // on.click now deprecated
  button.onClick.listen((event) { // now uses onClick.listen
    List buttonList = document.queryAll("button");
    window.alert("There is ${buttonList.length} button");
  });

  // document.body.nodes.add(button); // nodes is lower level
  document.body.children.add(button); // recommend to use children

}
