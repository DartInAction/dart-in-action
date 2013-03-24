import "package:unittest/unittest.dart";

main() {
  group("sums", () => testSums());
}

testSums() {
  test('test adding', () {
    var a = 2;
    var b = 3;
    expect(a + b, equals(5));
  });

  test('test subtracting', () {
    var a = 5;
    var b = 3;
    expect(a - b, equals(3));
  });
}
