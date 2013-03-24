library Lottery;

import "dart:html";
import "dart:math";


getWinningNumber(Function callback(int winningNumber)) {

  Random r = new Random();

  int millisecs = r.nextInt(2000) + 10;
  print("waiting: $millisecs ms");

  window.setTimeout(() {
    var number = r.nextInt(59) + 1;
    print("drawn number: $number");
    callback(number);
  }, millisecs);


}


String getResultsString(List<int> results, String message) {
  var str = new StringBuffer();
  str.add(message);

  for (int i = 0; i < results.length; i++) {
    var currentResult = results[i];
    str.add(currentResult);
    if (i != results.length - 1) str.add(", ");
  }

  return str.toString();
}

Future<String> slowlySortResults(List<int> results) {
  Completer completer = new Completer<String>();

  window.setTimeout(() {
    results.sort((val1, val2) => val1 < val2 ? -1 : 1);

    var str = getResultsString(results, "Confirmed numbers are: ");

    completer.complete(str);
  },2000);

  return completer.future;
}