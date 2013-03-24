part of dartexpense;

typedef String GetValueFunc(dynamic item);


TableElement getDynamicTable(List items, Map<String, GetValueFunc> columnConfig) {
  var table = new Element.tag("table");

  var header = new Element.tag("thead");
  for (String colName in columnConfig.keys) {
    header.elements.add(new Element.html("<td>$colName</td>"));
  }
  table.elements.add(header);

  for (var item in items) {
    var row = new Element.tag("tr");
    table.elements.add(row);

    for (String colName in columnConfig.keys) {
      var getValueFunc = columnConfig[colName];
      var textValue = getValueFunc(item);
      row.elements.add(new Element.html("<td>$textValue</td>"));
    }

  }

  return table;
}
