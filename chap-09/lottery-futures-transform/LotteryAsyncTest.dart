import "Lottery.dart";
import "package:unittest/unittest.dart";
import "package:unittest/html_config.dart";
import "dart:html";

// example 1 - incorrecct
//main() {
// useHtmlConfiguration();

//  test('get winning number', () {
//    Future f = getWinningNumber();
//    f.then( (int winningNumber) {
//      expect(winningNumber, isNonZero());
//    });
//  });
//
//}


main() {

  useHtmlConfiguration();

  test('get winning number', () {
    Future f = getWinningNumber(1);

    var onSuccess = expectAsync1((int winningNumber) {
      expect(winningNumber, isNonZero);
      expect(winningNumber, greaterThanOrEqualTo(1));
      expect(winningNumber, lessThanOrEqualTo(60));

    });

    f.then(onSuccess);
  });

  test('multiple futures', () {
    Future f1 = getWinningNumber(1);
    Future f2 = getWinningNumber(2);
    Futures.wait([f1,f2]).then( expectAsync1( (List allNumbers) {
      expect(allNumbers.length, equals(2));
    }));

  });


  test('sort results', () {
    Future f = slowlySortResults([9,7,8]); // out of order list of ints

    var onSuccess = expectAsync1((String resultString) {
      expect(resultString, equals("Confirmed numbers: 7, 8, 9"));
    });

    f.then(onSuccess);
  });

}