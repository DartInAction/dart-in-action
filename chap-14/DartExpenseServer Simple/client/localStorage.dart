part of dartexpense;

class LocalStorage implements DataAccess {
  final Map<String, ExpenseType> expenseTypes;

  List<Expense> get expenses {
    var maxId = 0;

  List<Expense> expenses = new List<Expense>();
    for (var key in window.localStorage.keys) {
      if (key.startsWith("expense:")) {
        String value = window.localStorage[key];
        var map = JSON.parse(value);
        Expense expense = new Expense.fromMap(map);
        expenses.add(expense);
        if (maxId < expense.id) {
          maxId = expense.id;
        }
      }
    }

    // set the static ID value on expense
    Expense.currentHighestId = maxId;

    return expenses;
  }

  LocalStorage() :
    expenseTypes = loadExpenseTypes(getMockExpenseTypes) // passing in the function in library scope
  {

  }

  /// add to the list. Returns true if it was adeed
  /// returns false if edited
  bool addOrUpdate(Expense expense) {
    var localStorageKey = "expense:${expense.id}";
    bool wasAdded = !window.localStorage.containsKey(localStorageKey);

    try {
      window.localStorage[localStorageKey] = expense.toJson();
    }
    on DOMException catch (ex) {
      if (ex.name == "QUOTA_EXCEEDED_ERR") {
        window.alert("Local storage not enabled");
      }
    }

    return wasAdded;
  }

  List<Expense> getExpensesByType(ExpenseType expenseType) {
    var result = new List<Expense>();

    for (Expense ex in this.expenses) {
      // add all if no type is specified, or filter.
      if (ex.type == expenseType || expenseType == null) {

        result.add(ex);
      }
    }

    return result;
  }
}
