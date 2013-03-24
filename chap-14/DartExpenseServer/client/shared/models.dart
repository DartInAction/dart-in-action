library ExpenseModels;

import "dart:json";

abstract class JsonSerializable  {
  String toJson();

}

/// Model class representing an expense item
class Expense implements JsonSerializable, Hashable, Map {

  int _id;
  int get id => _id;
//  String _dbId = null;
  String _rev = null;
  String get rev => _rev;
  void set rev(value) => _rev = value;
  ExpenseType type;
  Date date;
  num amount = 0;
  String detail;
  bool isClaimed = false;

  /// ctor
  /// set the next id value
  Expense() {
    _id = _getNextId();
 //   _dbId = "exp${_id}";
  }

  Map toMap() {
    var map = new Map<String, Object>();
    print("in toMap");
    map["id"] = id;
//    map["_id"] = _dbId;
    if (date != null) {
      map["date"] = date.toString();
    }
    map["amount"] = amount;
    map["detail"] = detail;
    map["isClaimed"] = isClaimed;
    if (type != null) {
      map["expenseType"] = type.toMap();
    }
    map["_rev"] = rev;
    return map;
  }




  /// ctor
  /// build up the object from a json string
  factory Expense.fromJson(String json) {
    var map = JSON.parse(json);
    return new Expense.fromMap(map);
//    _id = map["id"];
//    _rev = map["_rev"];
// //   _dbId = map["_id"];
//    if (map.containsKey("date")) {
//      date = new Date.fromString(map["date"]);
//    }
//    amount = map["amount"];
//    detail = map["detail"];
//    isClaimed = map["isClaimed"] == null ? false : map["isClaimed"];
//    if (map.containsKey("expenseType")) {
//      var expenseTypeMap = map["expenseType"];
//
//      type = new ExpenseType(expenseTypeMap["name"],expenseTypeMap["code"]);
//    }
  }

  Expense.fromMap(Map map) {

    _id = map["id"];
//    _dbId = map["_id"];
    _rev = map["_rev"];
    if (map.containsKey("date") && map["date"] != null) {
      date = new Date.fromString(map["date"]);
    }
    amount = map["amount"];
    detail = map["detail"];
    isClaimed = map["isClaimed"] == null ? false : map["isClaimed"];
    if (map.containsKey("expenseType")) {
      var expenseTypeMap = map["expenseType"];

      type = new ExpenseType(expenseTypeMap["name"],expenseTypeMap["code"]);
    }
  }

  /// convert the object into a json string
  String toJson() {
    return JSON.stringify(this);
  }

  int get hashCode => _id;

  /// shared across all instances
  static int _nextIdValue = 1;
  static int get currentNextIdValue => _nextIdValue;
  static set currentNextIdValue(int val) => _nextIdValue = val;

  /// return the next Id value
  static int _getNextId() => _nextIdValue++;
  static set currentHighestId(int value) => _nextIdValue = value + 1;

  /// Map implementation methods:
  Collection get keys {
    if (this._rev  == null) {
      return ["id", "amount","expenseType","date","detail","isClaimed"];
    }
    else {
      return ["id", "_rev", "amount","expenseType","date","detail","isClaimed"];
    }
  }

  operator [](key) {
    if (key == "id") {
      return this.id;
  //  } else if (key == "_id") {
  //    return this._dbId;
    } else if (key == "_rev") {
      return this.rev;
    } else if (key == "amount") {
      return this.amount;
    } else if (key == "expenseType") {
      if (this.type != null) {
        return this.type.toMap();
      }
      else {
        return null;
      }
    } else if (key == "date") {
      return date == null ? null : date.toString();
    } else if (key == "detail") {
      return this.detail;
    } else if (key == "isClaimed") {
      return this.isClaimed;
    } else {
      return null;
    }


  }

  forEach(func(key,value)) {
    for (var k in this.keys) {
      func(k,this[k]);
    }
  }

  bool get isEmpty { throw new UnimplementedError(); }
  bool containsValue(value) { throw new UnimplementedError(); }
  bool containsKey(value) { throw new UnimplementedError(); }
  Collection get values { throw new UnimplementedError(); }
  int get length { throw new UnimplementedError(); }
  void clear() { throw new UnimplementedError(); }
  void remove(key) { throw new UnimplementedError(); }
  void putIfAbsent(key, ifAbsent) { throw new UnimplementedError(); }
  void operator[]=(key, value) { throw new UnimplementedError(); }

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
    if (other == null) return false;
    return this.name == other.name && this.code == other.code;
  }

  toMap() {
    var map = new Map<String,String>();
    map["name"] = name;
    map["code"] = code;
    return map;
  }
}

