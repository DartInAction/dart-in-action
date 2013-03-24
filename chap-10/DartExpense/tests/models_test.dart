part of dartexpense_tests;

test_models() {
  group("expense", () => test_expense_models());
  group('expenseTypes', () => test_expensetype_models());
}


test_expense_models() {
  test('expense id numbering', () {
    var expense1 = new app.Expense();
    expect(expense1.id, equals(1));

    var expense2 = new app.Expense();
    expect(expense2.id, equals(2));
  });

  test('expense toJson nulls', () {
    var expense = new app.Expense();
    var jsonString = expense.toJson();
    print(jsonString);

    expect(jsonString, contains('"detail":null'));
    expect(jsonString, contains('"amount":0'));
    expect(jsonString, contains('"id":3'));
    expect(jsonString, contains('"isClaimed":false'));
  });

  var jsonString = ""; // if the next test works, we'll re-use this value in a following test

  test('expense toJson populated', () {
    var expense = new app.Expense();
    expense.amount = 50.0;
    expense.isClaimed = false;
    expense.date = new Date(2012, 06, 05, 10, 15, 55, 100);
    expense.detail = "Taxi from airport";
    expense.type = const app.ExpenseType("Travel","TRV");
    jsonString = expense.toJson();
    print(jsonString);

    expect(jsonString, contains('"amount":50.0'));
    expect(jsonString, contains('"date":"2012-06-05 10:15:55.100"'));
    expect(jsonString, contains('"expenseTypeName":"Travel"'));
    expect(jsonString, contains('"expenseTypeCode":"TRV"'));
    expect(jsonString, contains('"detail":"Taxi from airport"'));
    expect(jsonString, contains('"id":4'));
    expect(jsonString, contains('"isClaimed":false'));
  });

  test('expense fromJson', () {
    var expense = new app.Expense.fromJson(jsonString);
    expect(expense.type, equals(const app.ExpenseType("Travel","TRV")));
    expect(expense.detail, equals("Taxi from airport"));
    expect(expense.isClaimed, equals(false));
    expect(expense.amount, equals(50.0));
  });
}

test_expensetype_models() {
  test('expensetype const creation', () {
    var travel = const app.ExpenseType("Travel", "TRV");
    expect(travel, equals(const app.ExpenseType("Travel", "TRV")));

    expect(travel.name, equals("Travel"));
    expect(travel.code, equals("TRV"));
  });
}