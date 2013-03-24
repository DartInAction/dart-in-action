part of dartexpense;

class EditView implements View {
  DivElement rootElement;
  DivElement actions;

  int _id;
  Expense _expense;


  EditView(Expense expense) {
    updateViewWithId(expense);
  }

  
  updateViewWithId(Expense expense) {
    this._expense = expense;
    _buildView();
    _buildActions();
  }


  _buildView() {
    rootElement = new Element.html("""
      <div class="expense" id="editexpense">
        <label for="expenseTypes">Type</label><select id="expenseTypes">
          ${_getOptions(_expense.type)}
        </select><br/>
        <label for="expenseDate">Date</label>${_getDate(_expense.date)}<br/>
        <label for="expenseAmount">Amount</label>${_getAmount(_expense.amount)}</br>
        <label for="expenseDetail">Detail</label>${_getDetail(_expense.detail)}  
      </div>
          """);

  }

  _buildActions() {
    actions = new Element.tag("div");
    actions.children.add(_getSaveButton());
    actions.children.add(_getCancelButton());
  }

  _getSaveButton() {
    var saveButton = new Element.tag("button");
    saveButton.text = "Save";
    saveButton.on.click.add((e) {
      // read the values from the form back to the object
      // uses expense object in the function local scope
      _saveDetails(_expense);
      navigate(ViewType.LIST, null, "Expense was saved");
    });


    return saveButton;
  }

  _getCancelButton() {
    var cancelButton = new Element.tag("button");
    cancelButton.text = "Cancel";
    cancelButton.on.click.add((e) => navigate(ViewType.LIST));
    return cancelButton;
  }

  _saveDetails(Expense expense) {

    InputElement dateEl = document.query("#expenseDate");
    InputElement amountEl = document.query("#expenseAmount");
    TextAreaElement detailEl = document.query("#expenseDetail");
    SelectElement typeEl = document.query("#expenseTypes");

    if (dateEl.value != "") {
      expense.date = new Date.fromString(dateEl.value);
    }

    if (amountEl.value != "") {
      expense.amount = double.parse(amountEl.value);
    }

    expense.detail = detailEl.value;

    if (typeEl.selectedIndex > 0) {
      var option = typeEl.options[typeEl.selectedIndex]; 
      var typeCode = option.value;
      expense.type = app.expenseTypes[typeCode];
    }

    print(expense.toJson());
    app.addOrUpdate(expense);

  }

}


// UTILITY FUNCTIONS

String _getOptions(ExpenseType selectedExpenseType) {
  var result = new StringBuffer();
  result.add("<option value=''>&nbsp</option>");
  for (ExpenseType et in app.expenseTypes.values) {
    if (et == selectedExpenseType) {
      result.add("<option value='${et.code}' selected='selected'>${et.name}</option>");
    }
    else {
      result.add("<option value='${et.code}'>${et.name}</option>");
    }

  }

  return result.toString();
}

String _getDate(Date expenseDate) {
  // date needs to be in a very specific format of yyyy-mm-dd for the
  // html5 date picker to work.
  var dateElementString = "";

  if (expenseDate != null) {
    var year = _blankIfNull(expenseDate.year);
    var month = _getMonth(_blankIfNull(expenseDate.month));
    var day = _getDay(_blankIfNull(expenseDate.day));
    dateElementString = '<input type="date" id="expenseDate" value="$year-$month-$day">';
  }
  else {
    dateElementString = '<input type="date" id="expenseDate">';
  }

  return dateElementString;
}

String _getAmount(num amount) {
  return '<input type="number" id="expenseAmount" value="${_blankIfNull(amount)}">';
}

String _getDetail(String detail) {
  return '<textarea id="expenseDetail">${_blankIfNull(detail)}</textarea>';
}

Object _blankIfNull(Object o) {
  if (o == null) {
    return "";
  }
  else {
    return o;
  }
}


/// prefixes with a leading zero if the length is only a single char
String _getDay(day) {
  if (day.toString().length == 1) {
    return "0$day";
  }
  else {
    return day.toString();
  }
}

/// prefixes with a leading zero if the length is only a single char
String _getMonth(month) {
  if (month.toString().length == 1) {
    return "0$month";
  }
  else {
    return month.toString();
  }
}

