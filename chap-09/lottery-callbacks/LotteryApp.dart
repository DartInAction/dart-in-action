import "Lottery.dart";
import "dart:html";


main() {

// example 1 - stand-alone callbacks
//  getWinningNumber( (int result1) => updateResult(1, result1));
//  getWinningNumber( (int result2) => updateResult(2, result2));
//  getWinningNumber( (int result3) => updateResult(3, result3));

  // example 2.1
//  List<int> results = new List<int>();
//
//  void addAndDisplay(int result) {
//    results.add(result);
//    if (results.length == 3) {
//      var resultString = getResultsString(results, "Drawn numbers are: ");
//      document.body.query("#winningNumbers").innerHTML = resultString;
//    }
//  }
//
//  getWinningNumber( (int result1) {
//    updateResult(1, result1);
//    addAndDisplay(result1);
//  });
//
//  getWinningNumber( (int result2) {
//    updateResult(2, result2);
//    addAndDisplay(result2);
//  });
//
//  getWinningNumber( (int result3) {
//    updateResult(3, result3);
//    addAndDisplay(result3);
//  });



  // example 2.2 - nexted callbacks
  getWinningNumber( (int result1) {

    updateResult(1, result1);

    getWinningNumber( (int result2) {

      updateResult(2, result2);

      getWinningNumber( (int result3 ) {
        updateResult(3, result3);

        List winningNumbers = new List();
        winningNumbers.add(result1);
        winningNumbers.add(result2);
        winningNumbers.add(result3);
        var resultString = getResultsString(winningNumbers, "Drawn numbers are: ");
        document.body.query("#winningNumbers").innerHTML = resultString;
      });

    });

  });

}



updateResult(int ball, int result) {
  document.body.query("#ball$ball").innerHTML = "$result";
}