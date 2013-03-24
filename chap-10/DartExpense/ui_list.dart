part of dartexpense;

class ListView implements View {

  DivElement rootElement;
  DivElement actions;

  ListView(List<Expense> expenses) {
    refreshUi(expenses);
    // refreshUi_usingDynamicTable(expenses);
    _buildActions();
  }


  refreshUi(List<Expense> expenses) {
    _updateRootElement();

     var tableElement = new Element.tag("table");
     var head = new Element.html("""
          <thead>
            <td class="type">Type</td>
            <td class="date">Date</td>
            <td class="detail">Item</td>
            <td class="amount">Amount</td>
            <td class="claimed>Claimed?</td>
            <td class="edit">&nbsp;</td>
          </thead>""");

     tableElement.children.add(head);

     for (Expense ex in expenses) {
       tableElement.children.add(_getRowElement(ex));
     }

    rootElement.children.add(tableElement);
  }

  refreshUi_usingDynamicTable(List<Expense> expenses) {
    _updateRootElement();

    var columnConfig = new Map<String, GetValueFunc>();
    columnConfig["type"] = (expense) => expense.type.name;
    columnConfig["date"] = (expense) => expense.date.toString();
    columnConfig["detail"] = (expense) => expense.detail;
    columnConfig["amount"] = (expense) => expense.amount.toString();

    var tableElement = getDynamicTable(expenses, columnConfig);

    rootElement.children.add(tableElement);
  }


  _updateRootElement() {
    if (rootElement == null) {
      rootElement = new Element.tag("div");
      rootElement.id="list";
    }
    else {
      rootElement.children.clear();

    }
  }


  _buildActions() {
    actions = new Element.tag("div");
    actions.on.click.add( (MouseEvent event) {
      print("actions click");
     // event.stopPropagation();
    }, false);

    actions.children.add(_getAddButton());
    actions.children.add(_getClaimButton());
    actions.children.add(_getSyncButton());
  }

  _getAddButton() {
    var addButton = new Element.tag("button");
    addButton.text = "Add...";
    addButton.on.click.add((e) {
      print("add clicked");
      navigate(ViewType.EDIT, null);
      e.stopImmediatePropagation();
    }); // null value passed in means add new

    addButton.on.click.add((e) => print("second event handler"));


    return addButton;
  }

  _getClaimButton() {
    ButtonElement claimButton = new Element.tag("button");
    claimButton.text = "Claim All";
    claimButton.disabled = true;
    return claimButton;
  }

  _getSyncButton() {
    ButtonElement syncButton = new Element.tag("button");
    syncButton.text = "Sync";
    syncButton.disabled = true;
    return syncButton;
  }

}

// UTILITY FUNCTIONS

TableRowElement _getRowElement(Expense ex) {
  TableRowElement row = new Element.tag("tr");
  row.children.add(new Element.html('<td>${ex.type.name}</td>'));
  row.children.add(new Element.html('<td>${ex.date.day}-${ex.date.month}-${ex.date.year}</td>'));
  row.children.add(new Element.html('<td>${ex.detail}</td>'));
  row.children.add(new Element.html('<td>${ex.amount}</td>'));
  row.children.add(new Element.html('<td>${_getIsClaimed(ex.isClaimed)}</td>'));

  var editCol = new Element.html('<td class="edit"><button>Edit...</button></td>');
  row.children.add(editCol);

  editCol.query("button").on.click.add((e) {
    navigate(ViewType.EDIT, ex.id);
  });

  return row;
}

String _getIsClaimed(bool isClaimed) {
  if (isClaimed ) {
    return "Claimed";
  }

  return "";
}