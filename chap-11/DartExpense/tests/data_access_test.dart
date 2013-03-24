part of dartexpense_tests;

test_data_access() {
  group('expense types', () => test_data_access_expense_types());

  group('expenses', () => test_data_access_expenses());
}

test_data_access_expense_types() {
  test('load mock expense types', () {
    var expenseTypes = app.loadExpenseTypes(app.getMockExpenseTypes);
    expect(expenseTypes.length, equals(3));
  });

}

test_data_access_expenses() {
  test('load mock expenses', () {
    var expenseTypes = app.loadExpenses(app.getMockExpenses);
    expect(expenseTypes.length, equals(4));
  });

}