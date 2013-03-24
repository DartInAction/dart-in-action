part of dartexpense_server;

class CouchDbHandler {
  final host;
  final port;
  final dbName;
  final HttpClient client;

  CouchDbHandler(host, port, dbName) :
    this.host = host,
    this.port = port,
    this.dbName = dbName,
    this.client = new HttpClient()
  {
    _tryCreateDb();
  }

  Future<String> _getStringFromInputStream(var inputStream) {
    var completer = new Completer<String>();
    StringBuffer sb = new StringBuffer();
    inputStream.onData = () {
      var buffer = inputStream.read();
      if (buffer != null) {
        sb.add(new String.fromCharCodes(buffer));
      }
    };

    inputStream.onClosed = () {
      print("loading-closed");
      completer.complete(sb.toString());
    };

    return completer.future;
  }


  Future<String> _getData(String path, {String method: 'GET', String data: null}) {
    print("$method: $path");
    var conn = client.open(method, host, port, path);
    if (data != null) {
      conn.onRequest = (HttpClientRequest req) {
        print("$method: $path - request");
        var outputStream = req.outputStream;
        outputStream.writeString(data);
        outputStream.close();
      };
    }

    var completer = new Completer<String>();
    conn.onResponse = (HttpClientResponse response) {
      _getStringFromInputStream(response.inputStream).then((responseText) {
        print("$method: $path - status: ${response.statusCode}");
        print("$method: $path - text: $responseText");
        completer.complete(responseText);
      });
    };

    conn.onError = (e) {
      print("Error: $e");
      if (completer.future.isComplete == false) {
        completer.completeException(e);
      }
    };

    return completer.future;
  }

  _tryCreateDb() {
    print("creatingDb");
    _getData("/$dbName/", method:'PUT');
  }

  Future<List<Expense>> loadData() {
    var completer = new Completer<List<Expense>>();

    var expenseList = new List<Expense>();

    _getData("/$dbName/_all_docs?include_docs=true").then( (responseText) {
      Map data = JSON.parse(responseText);

      for (var rowData in data["rows"]) {
        if (rowData["id"] != "nextId") {
          var expenseJSON = rowData["doc"];
          var expense = new Expense.fromMap(expenseJSON);
          print("expense: $expenseJSON");
          print("rev: ${expense.rev}");
          expenseList.add(expense);
        }
      }

      completer.complete(expenseList);
    });


    return completer.future;
  }

  Future<Expense> addOrUpdate(Expense expense, int nextId) {
    print("saving data");
    var completer = new Completer<Expense>();

    _getData("/$dbName/${expense.id}",
        method:'PUT',
        data:expense.toJson()
        ).then( (responseText) {
      Map data = JSON.parse(responseText);
      expense.rev = data["rev"];
      completer.complete(expense);
    });

    var nextIdMap = new Map();
    nextIdMap["nextId"] = nextId;
    _getData("/$dbName/nextId",method:"PUT", data:JSON.stringify(nextIdMap));

    return completer.future;
  }

  Future<int> getNextId() {
   print("nextId");
   var completer = new Completer<int>();

   _getData("/$dbName/nextId").then( (responseText) {
     var data = JSON.parse(responseText);
     var maxId = 1;
     if (data.containsKey("nextId")) {
       maxId = data["nextId"];
     }

     completer.complete(maxId);
   });

   return completer.future;
  }

}