part of dartexpense;

class AppController {
  final DataAccess _appData;
  final DivElement _uiRoot;
  final Map<ViewType, View> _viewCache;
  DivElement _content;
  DivElement _actions;

  AppController(Element this._uiRoot, DataAccess this._appData) :
    _viewCache = new Map<ViewType,View>();

  List<Expense> get expenses => _appData.expenses;
  Map<String, ExpenseType> get expenseTypes => _appData.expenseTypes;
  List<Expense> getExpensesByType(ExpenseType expenseType) => _appData.getExpensesByType(expenseType);

  buildUI() {

    var header = new Element.html("<header class='section'>DartExpense</header>");
    _uiRoot.elements.add(header);

    _content = new Element.tag("div");
    _content.id= "content";
    _content.classes.add("section");
    _uiRoot.elements.add(_content);

    _actions = new Element.tag("div");
    _actions.id = "actions";
    _actions.classes.add("section");
    _uiRoot.elements.add(_actions);

    var footer = new Element.html("<footer class='section'>Offline</footer>");
    _uiRoot.elements.add(footer);
  }

  loadFirstView() {

    // try and load a value from the location cookie
    var stateCookieValue = getValueFromCookie("stateData");

    if (stateCookieValue != null && stateCookieValue.length > 0) {
      print("stateCookie=$stateCookieValue");
      List<String> stateData = stateCookieValue.split("/");
      var viewName = stateData[0];
      var id = stateData.length == 2 ? int.parse(stateData[1]) : null;
      var viewType = new ViewType(viewName);

      navigate(viewType, id);
      //window.location.hash = locationCookieValue; // update the hash value on the browser url
    }
    else {
      navigate(ViewType.LIST, null);
    }



//    // navigate to the correct page
//    if (window.location.hash.length > 0) {
//      //navigate based upon the URL
//      navigate(viewState:window.location.hash.substring(1));
//    }
////    else {
//      navigate(ViewType.LIST, null);
////    }


  }

  updateView(View view) {
    _content.elements.clear();
    _content.elements.add(view.rootElement);
    _actions.elements.clear();
    _actions.elements.add(view.actions);
  }

  addOrUpdate(Expense expense) {
    //add it to the list if it's not already there.
    _appData.addOrUpdate(expense);
  }

  showMessage(String message) {
    // TODO: Implement this - such as "Your expense has been saved"
  }

  hideMessage() {
    // TODO: Implement this
  }

  Expense getExpenseById(int id) {
    var result = null;
    if (id == null || id.toString().length == 0) {
      result = new Expense();  // create a new expense
    }
    else {
      List matchingList = expenses.filter((expense) => expense.id == id);
      result = matchingList[0]; // return an existing expense
    }

    return result;
  }

//  EditView getEditView(Object id) {
//    if (id is String) {
//      id = Math.parseInt(id);
//    }
//
//    EditView view = null;
//
//    Expense expenseToEdit = getExpenseById(id);
//
//    if (_viewCache.containsKey(ViewType.EDIT)) {
//      view = _viewCache[ViewType.EDIT]; // read from the cache
//      view.updateViewWithId(expenseToEdit); // update the id
//    }
//    else {
//      view = new EditView(expenseToEdit);  // create a new view
//      _viewCache[ViewType.EDIT] = view; // place it in the cache
//    }
//
//    return view;
//  }
//
//
//  ListView getListView() {
//    var view = null;
//
//    if (_viewCache.containsKey(ViewType.LIST)) {
//      view = _viewCache[ViewType.LIST]; // read from the cache
//      view.refreshUi(this.expenses);
//    }
//    else {
//      view = new ListView(this.expenses);  // create a new view
//      _viewCache[ViewType.LIST] = view; // and add to the cache
//    }
//
//    return view;
//  }


}


abstract class View {
  DivElement rootElement;
  DivElement actions;
}

class ViewType implements Hashable {
  final String name;

  const ViewType(this.name);

  static ViewType LIST = const ViewType("list");
  static ViewType EDIT = const ViewType("edit");
  static ViewType CHART = const ViewType("chart");

  toString() => name;

  int get hashCode => name.hashCode;

  bool operator ==(other) => other.name == this.name;
}

abstract class DataAccess {
  Map<String, ExpenseType> get expenseTypes;
  List<Expense> get expenses;
  bool addOrUpdate(Expense expense);
  List<Expense> getExpensesByType(ExpenseType expenseType);
  Map<ExpenseType, double> getAggregatedData();
}

sendToJavaScript(String action, var payload) {
  var data = new Map<String,Object>();
  data["type"] = "dart2js";
  data["action"] = action;
  data["payload"] = payload;
  window.postMessage(JSON.stringify(data), window.location.href);
}
