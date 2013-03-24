part of dartexpense;

void navigate(ViewType view, [Object value = null, String flashMessage = null, bool fromBrowserHistory = false ]) {
  String valueAsString = value == null ? "${view.name}" : "${view.name}/${value.toString()}";


  if (fromBrowserHistory == false) {
    // store new location in browser history
    window.history.pushState(valueAsString, valueAsString, "#${valueAsString}");
  }

  // store current location in cookie
  document.cookie = "locationCookie=$valueAsString";

  document.title = "DartExpense: $valueAsString";

  if (view == ViewType.LIST) {
    print("Navigate: List");
    app.updateView(app.getListView());

  } else if (view == ViewType.EDIT) {
    print("Navigate: Edit");
    app.updateView(app.getEditView(value)); // null passed in becomes an ADD
  }
}



_registerHistoryHandler() {
  window.on.popState.add((event) {
    if (event.state != null) {
      navigateFromPopstate(event.state);
    }
  });
}


/// extracts the view by name
void navigateFromPopstate(String state) {
  print("State=$state");
  if (state != null) {
    List<String> values = state.split("/");
    print(values.length);
    var viewName = values[0];
    var data = values.length == 2 ? values[1] : null;


    if (viewName == ViewType.LIST.name) {
      navigate(ViewType.LIST, fromBrowserHistory: true);
    }
    else if (viewName == ViewType.EDIT.name) {
      navigate(ViewType.EDIT, value: data, fromBrowserHistory: true);
    }
  }
  else {
    // default
    navigate(ViewType.LIST);

  }

}

String _getValueFromCookie(String cookieName) {
  for (String cookieKV in document.cookie.split(";")) {
    if (cookieKV.startsWith(cookieName)) {
      print("Found location cookie:$cookieKV");
      List cookie = cookieKV.split("=");
      return cookie.length > 1 ? cookie[1] : "";
    }
  }
}
