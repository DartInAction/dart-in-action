import "Lottery.dart";
import "dart:html";


main() {

  var startButton = new Element.html("<button>Start</button>");
  document.body.elements.add(startButton);

  startButton.on.click.add((e) {
    startButton.disabled = true;

    // each call to getWinningNumber will block
    int num1 = getWinningNumber();
    document.body.query("#ball1").innerHTML = "$num1";
    int num2 = getWinningNumber();
    document.body.query("#ball2").innerHTML = "$num2";
    int num3 = getWinningNumber();
    document.body.query("#ball3").innerHTML = "$num3";
  });

  var resetButton = new Element.html("<button>Replay</button>");
  document.body.elements.add(resetButton);
  resetButton.on.click.add((e) {

    startButton.disabled = false;
    document.body.query("#ball1").innerHTML = "";
    document.body.query("#ball2").innerHTML = "";
    document.body.query("#ball3").innerHTML = "";
  });

}

