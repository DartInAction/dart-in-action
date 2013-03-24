part of dartexpense;

class ChartView implements View {
  DivElement rootElement;
  DivElement actions;
  Map<ExpenseType, double> expenseSummary;
  ButtonElement returnToListButton;
  
  
  ChartView(this.expenseSummary) {
     //_addGoogleAPI();
    _buildViewWithInjection();
    _buildActions();
  }
  
  
  _buildViewWithInjection() {
    
    rootElement = new Element.html("<div id='chartView' style='width:500px; height:150px'></div>");
    
    List payload = new List();
    payload.add(["Type","Amount"]);
    
    for (var expenseType in expenseSummary.keys) {
      var totalAmount = expenseSummary[expenseType];
      payload.add([expenseType.name, totalAmount]);
    }
    
    sendToJavaScript("chart",payload);
    
    onFinishedListener(event) {
      var data = JSON.parse(event.data);                           
      if (data["type"] == "js2dart") {                             
        if (data["action"] == "chartComplete") {                   
          window.on.message.remove(onFinishedListener);            
          returnToListButton.disabled = false;                     
        }
      }      
    };

    window.on.message.add(onFinishedListener);                     

  }
   
  
  _buildActions() {
    actions = new Element.tag("div");
    returnToListButton = new Element.html("<button>View List</button>");
    returnToListButton.disabled = true;
    returnToListButton.on.click.add((e) =>  navigate(ViewType.LIST, null));
    actions.elements.add(returnToListButton);
  }

}
