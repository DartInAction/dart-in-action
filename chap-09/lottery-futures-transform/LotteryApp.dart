import "Lottery.dart";

import "dart:html";

main() {

  Future<int> f1 = getWinningNumber(1);
  Future<int> f2 = getWinningNumber(2);
  Future<int> f3 = getWinningNumber(3);

  f1.then((result) => updateResult(1, result));
  f2.then((result) => updateResult(2, result));
  f3.then((result) => updateResult(3, result));

  // example 5 - wait - then
//  Futures.wait([f1,f2,f3]).then((List winningNumbers) {
//    var resultString = getResultsString(winningNumbers, "Drawn numbers are: ");
//    document.body.query("#winningNumbers").innerHTML = resultString;
//  });

  // example 6 - wait - transform
  Futures.wait([f1,f2,f3]).transform((List winningNumbers) {
    return getResultsString(winningNumbers, "Drawn numbers are: "); // returns string.  Transform wraps it in a future
  }).then((String resultString) {
    document.body.query("#winningNumbers").innerHTML = resultString;
  });

  // example 7 - wait - chain
  Futures.wait([f1,f2,f3]).chain((List winningNumbers) {
    return slowlySortResults(winningNumbers); // returns a future itself
  }).then((String sortedResultString) {
    document.body.query("#sortedNumbers").innerHTML = sortedResultString;
  });


}


updateResult(int ball, int result) {
  document.body.query("#ball$ball").innerHTML = "$result";
}
