part of dartexpense;

Collection<Expense> getMockExpenses() {
  List expenses = new List<Expense>();

  var expense = new Expense();
  expense.type = const ExpenseType("Books","BK");
  expense.amount = 40.0;
  expense.detail = "Dart in Action";
  expense.date = new Date(2012, 07, 22, 10, 15, 55, 100);
  expense.isClaimed = true;
  expenses.add(expense);

  expense = new Expense();
  expense.type = const ExpenseType("Travel","TRV");
  expense.amount = 50.0;
  expense.detail = "Taxi from airport";
  expense.date = new Date(2012, 07, 23, 10, 15, 55, 100);
  expense.isClaimed = false;
  expenses.add(expense);


  expense = new Expense();
  expense.type = const ExpenseType("Hotel","HT");
  expense.amount = 150.0;
  expense.detail = "City Hotel";
  expense.date = new Date(2012, 07, 24, 10, 15, 55, 100);
  expense.isClaimed = false;
  expenses.add(expense);

  expense = new Expense();
  expense.type = const ExpenseType("Travel","TRV");
  expense.amount = 55.0;
  expense.detail = "Taxi to airport";
  expense.date = new Date(2012, 07, 24, 10, 15, 55, 100);
  expense.isClaimed = false;
  expenses.add(expense);

  return expenses;
}