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

  Future<bool> _tryCreateDb() {
    print("creatingDb");
    var completer = new Completer<bool>();
    var conn = client.open("PUT", host, port, "/$dbName/");
    conn.onResponse = (HttpClientResponse response) {
      var inputStream = response.inputStream;
      inputStream.onData = () => inputStream.read();
      inputStream.onClosed = () {
        print("createdDb");
        print(response.statusCode);
        completer.complete(response.statusCode == 201);
      };

    };

    conn.onError = (e) {
      print("tryCreate: $e");
    };

    return completer.future;
  }

  Future<List<Expense>> loadData() {
    var completer = new Completer<List<Expense>>();
    print("loading data");

    var conn = client.open("GET", host, port, "/$dbName/_all_docs");
    conn.onResponse = (HttpClientResponse response) {
      print("loadedData");

      var buffer = new List<int>();
      var sb = new StringBuffer();
      InputStream inputStream = response.inputStream;
      inputStream.onData = () {
        print("loading-onData");
        buffer = inputStream.read();
        if (buffer != null) {
          sb.add(new String.fromCharCodes(buffer));
        }
      };

      inputStream.onClosed = () {

        print("loading-closed");
        print(sb.toString());
        Map data = JSON.parse(sb.toString());

        var expenseList = new List<Expense>();

        if (data["total_rows"] > 0) {
          for (var rowData in data["rows"]) {
            print(rowData);
            var expense = new Expense.fromMap(rowData);
            expenseList.add(expense);
          }
        }

        completer.complete(expenseList);
      };
    };


    return completer.future;
  }

  Future<Expense> addOrUpdate(Expense expense) {
    print("saving data");
    var completer = new Completer<Expense>();

    var conn = client.open("PUT", host, port, "/$dbName/${expense.id}");
    conn.onRequest = (HttpClientRequest req) {
      print("request");
      var outputStream = req.outputStream;
      outputStream.writeString(expense.toJson());
      outputStream.close();
    };

    var buffer = new List<int>();
    var sb = new StringBuffer();

    conn.onResponse = (HttpClientResponse response) {
      print("saved data");
      var inputStream = response.inputStream;
      inputStream.onData = () {
        print("saving-ondata");
        buffer = inputStream.read();
        if (buffer != null) {
          sb.add(new String.fromCharCodes(buffer));
        }
      };

      inputStream.onClosed = () {
        print("saving-onclosed");
        Map data = JSON.parse(sb.toString());
        print(sb.toString());
        expense.rev = data["rev"];
        completer.complete(expense);
      };

    };

    return completer.future;
  }

}