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

    var footer = new Element.html("<footer class='section' id='footer'></footer>");
    _uiRoot.elements.add(footer);
    refreshFooterStatus();
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
    sync(expense);
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

  WebSocket _websocket;
  int _conectedClients = 0;

  connectToWebsocket() {
    _websocket = new WebSocket(WEBSOCKET_URL);
    _websocket.on.message.add( (MessageEvent message) {
      Map data = JSON.parse(message.data);
      print("retieved data: $data");
//      if (data["action"] == "CLIENT_COUNT") {
        _conectedClients = data["connectedClients"];
        refreshFooterStatus();
//      }
//      else if (data["action"] == "SYNC") {
//        var expenseJSON = data["expense"];
//        Expense.currentNextIdValue = data["nextId"];
//        var expense = new Expense.fromJson(expenseJSON);
//        _appData.addOrUpdate(expense);
//        navigate(ViewType.LIST, null);
//      }
    });
  }

  refreshFooterStatus() {
    //var connStatus = window.navigator.onLine ? "Online" : "Offline";
    var statusText = "$_conectedClients clients connected";
    var footer = document.query("#footer");
    footer.innerHTML = statusText;
  }

  sync(Expense expense) {
    var expenseJson = expense.toJson();

    Map data = new Map();
    data["action"] = "SYNC";
    data["expense"] = expenseJson;
    data["nextId"] = Expense.currentNextIdValue;
    var jsonData = JSON.stringify(data);
    _websocket.send(jsonData);
  }

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

  toString() => name;

  int get hashCode => name.hashCode;

  bool operator ==(other) => other.name == this.name;
}

abstract class DataAccess {
  Map<String, ExpenseType> get expenseTypes;
  List<Expense> get expenses;
  bool addOrUpdate(Expense expense);
  List<Expense> getExpensesByType(ExpenseType expenseType);
}


