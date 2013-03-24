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

//  loadFirstView() {
//    var location = window.location;
//    print(location.hash);
//
//    _registerHistoryHandler();
//
//    var locationCookieValue = _getValueFromCookie("location");
//    // navigate to the correct page
//    if (location.hash.length > 0) {
//      //navigate based upon the URL
//      navigateFromPopstate(location.hash.substring(1));
//    }
//    else if (locationCookieValue != null && locationCookieValue.length > 0) {
//      print("$locationCookieValue");
//      location.hash = locationCookieValue;
//      navigateFromPopstate(locationCookieValue);
//    }
//    else {
//      navigate(ViewType.LIST);
//    }
//
//
//  }

  loadFirstView() {
    var view = new ListView(this.expenses);
    updateView(view);
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
    List matchingList = expenses.filter((expense) => expense.id == id);
    return matchingList[0]; //return the first item. Should check for not null
  }

//  EditView getEditView(Object id) {
//    if (id is String) {
//      id = Math.parseInt(id);
//    }
//
//    EditView view = null;
//
//    // if id is null, then create a new expense, otherwise get the existing expense
//    Expense expenseToEdit = null;
//    if (id != null) {
//      expenseToEdit = getExpenseById(id);
//    }
//    else {
//      expenseToEdit = new Expense();
//    }
//
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

  EditView getEditView(int id) {
    // if id is null, then create a new expense, otherwise get the existing expense
    Expense expenseToEdit = null;
    if (id != null) {
      expenseToEdit = getExpenseById(id);
    }
    else {
      expenseToEdit = new Expense();
    }

    return new EditView(expenseToEdit);  // create a new view
  }

  ListView getListView() {
    var view = null;

    if (_viewCache.containsKey(ViewType.LIST)) {
      view = _viewCache[ViewType.LIST]; // read from the cache
      view.refreshUi(this.expenses);
    }
    else {
      view = new ListView(this.expenses);  // create a new view
      _viewCache[ViewType.LIST] = view; // and add to the cache
    }

    return view;
  }


}


abstract class View {
  DivElement rootElement;
  DivElement actions;
}

class ViewType implements Hashable {
  final String name;

  const ViewType._withName(this.name);

  static ViewType LIST = const ViewType._withName("list");
  static ViewType EDIT = const ViewType._withName("edit");

  toString() => name;

  int get hashCode => name.hashCode;

}

abstract class DataAccess {
  Map<String, ExpenseType> expenseTypes;
  Map<int, Expense> _expenses;
  List<Expense> get expenses;
  bool addOrUpdate(Expense expense);
}


