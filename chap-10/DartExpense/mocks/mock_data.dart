part of dartexpense;

class MockData implements DataAccess {
  final Map<String, ExpenseType> expenseTypes;
  final Map<int, Expense> _expenses;

  List<Expense> get expenses => _expenses.values;

  MockData() :
     // constructor initializer block
    expenseTypes = loadExpenseTypes(getMockExpenseTypes), // passing in the function in library scope
    _expenses = new Map<int, Expense>()
  {
    var tmpExpenses = loadExpenses(getMockExpenses); // passing in the function in library scope

    //transfer the list of expenses into a map so that we can lookup by id later
    for (Expense ex in tmpExpenses) {
      _expenses[ex.id] = ex;
    }
  }

  /// add to the list. Returns true if it was adeed
  /// returns false if edited
  bool addOrUpdate(Expense expense) {
    bool wasAdded = false;

    if (_expenses.containsKey(expense.id) == false) {
      print("adding new item");
      wasAdded = true;
    }

    _expenses[expense.id] = expense;

    return wasAdded;
  }
}
