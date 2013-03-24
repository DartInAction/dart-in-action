part of dartexpense;

typedef Map<String,ExpenseType> GetExpenseTypes();
typedef List<Expense> GetExpenses();


Map<String, ExpenseType> loadExpenseTypes(GetExpenseTypes dataSource) {
  return dataSource();
}


Collection<Expense> loadExpenses(GetExpenses dataSource) {
  return dataSource();
}