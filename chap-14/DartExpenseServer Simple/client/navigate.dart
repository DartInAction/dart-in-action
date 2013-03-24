part of dartexpense;

void navigate(ViewType viewType, int id, [fromPopState = false]) {
  // store a string representation of the viewType and value
  var state = id == null ? "${viewType.name}" : "${viewType.name}/${id.toString()}";


  if (fromPopState == false) {
    // the navigate request did not come from the browser history,
    // so store new location in browser history
    window.history.pushState(state, "", "#$state");

  }

  // store current location in cookie
  var expires = new Date.now().toUtc().toString();
  //document.cookie = "stateData=$state; expires=Fri, 3 Aug 2012 20:47:11 UTC; path=/";
  document.cookie = "stateData=$state; Max-Age=60;";
  document.cookie = "expenseType=books";


  // update browser title
  document.title = "DartExpense: $state";

  if (viewType == ViewType.LIST) {
    print("Navigate: List");
    //app.updateView(app.getListView());
    app.updateView(new ListView(app.expenses));
  } else if (viewType == ViewType.EDIT) {
    print("Navigate: Edit: $id");
    //app.updateView(app.getEditView(value)); // null passed in becomes an ADD
    app.updateView(new EditView(app.getExpenseById(id)));
  }
}





void onPopState(PopStateEvent event) {
  if (event.state != null) {
    String state = event.state;
    List<String> stateData = state.split("/");
    var viewName = stateData[0];
    var id = stateData.length == 2 ? int.parse(stateData[1]) : null;
    var viewType = new ViewType(viewName);

    navigate(viewType, id, true);
  }
}



String getValueFromCookie(String key) {
  for (String cookieKV in document.cookie.split(";")) {
    List cookie = cookieKV.split("=");
    if (cookie.length > 1) {
      var cookieKey = cookie[0].trim();
      if (cookieKey == key && cookie.length>1) {
        var cookieValue = cookie[1];
        return cookieValue;
      }
    }
  }
  return "";
}

