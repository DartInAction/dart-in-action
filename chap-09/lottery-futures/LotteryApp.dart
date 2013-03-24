import "Lottery.dart";

import "dart:html";

main() {

  Future<int> f1 = getFutureWinningNumber();
  Future<int> f2 = getFutureWinningNumber();
  Future<int> f3 = getFutureWinningNumber();

  // example 3 - stand-alone futures
  // f1.then((result) => updateResult(1, result));
  // f2.then((result) => updateResult(2, result));
  // f3.then((result) => updateResult(3, result));

  // example 4 - nested futures
//  f1.then((result1) {
//    updateResult(1, result1);
//
//    f2.then((result2) {
//      updateResult(2, result2);
//
//      f3.then((result3) {
//        updateResult(3, result3);
//
//        List winningNumbers = new List();
//        winningNumbers.add(f1.value);
//        winningNumbers.add(f2.value);
//        winningNumbers.add(f3.value);
//        var resultString = getResultsString(winningNumbers, "Drawn numbers are: ");
//        document.body.query("#winningNumbers").innerHTML = resultString;
//      });
//    });
//  });

  // example 5 - chained futures
  getFutureWinningNumber().chain((result1) {
    updateResult(1, result1);
    return getFutureWinningNumber();
  }).chain((result2) {
    updateResult(2, result2);
    return getFutureWinningNumber();
  }).then((result3) {
    updateResult(3, result3);
  });

}


updateResult(int ball, int result) {
  document.body.query("#ball$ball").innerHTML = "$result";
}
