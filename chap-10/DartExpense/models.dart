part of dartexpense;

abstract class JsonSerializable {
  String toJson();
}

/// Model class representing an expense item
class Expense implements JsonSerializable, Hashable {

  int _id;
  int get id => _id;
  ExpenseType type;
  Date date;
  num amount = 0;
  String detail;
  bool isClaimed = false;

  /// ctor
  /// set the next id value
  Expense() {
    _id = _getNextId();
  }

  /// ctor
  /// build up the object from a json string
  Expense.fromJson(String json) {
    var values = JSON.parse(json);
    _id = values["id"];
    if (values.containsKey("date")) {
      date = new Date.fromString(values["date"]);
    }
    amount = values["amount"];
    detail = values["detail"];
    isClaimed = values["isClaimed"];
    if (values.containsKey("expenseTypeName")) {
      type = new ExpenseType(values["expenseTypeName"], values["expenseTypeCode"]);
    }
  }

  /// convert the object into a json string
  String toJson() {
    var values = new Map<String, Object>();
    values["id"] = _id;
    if (date != null) {
      values["date"] = date.toString();
    }
    values["amount"] = amount;
    values["detail"] = detail;
    values["isClaimed"] = isClaimed;
    if (type != null) {
      values["expenseTypeName"] = type.name;
      values["expenseTypeCode"] = type.code;
    }
    return JSON.stringify(values);
  }

  int get hashCode => _id;

  /// shared across all instances
  static int _nextIdValue = 1;

  /// return the next Id value
  static int _getNextId() => _nextIdValue++;

}


/// Used to list the type of expenses
class ExpenseType {
  final String name;
  final String code;

  const ExpenseType(this.name, this.code);

  toString() {
    return "${super.toString()}: $name, $code";
  }

//  operator equals(other) {
//    return this.name == other.name && this.code == other.code;
//  }

  bool operator ==(other) {
    if (other == null) {
      return false;
    }
    return this.name == other.name && this.code == other.code;
  }
}

