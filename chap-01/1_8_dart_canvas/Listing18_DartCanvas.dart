import 'dart:html';
import 'dart:math';

void main() {
  CanvasElement canvas = new Element.tag("canvas");
  canvas.height = 300;
  canvas.width = 300;
  document.body.nodes.add(canvas);

  var ctx = canvas.getContext("2d");

  ctx.fillText("hello canvas", 10, 10);

  ctx.beginPath();
  ctx.arc(50, 50, 20, 0, PI*2, true);
  ctx.closePath();
  ctx.fill();

}
