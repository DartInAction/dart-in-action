library dartexpense_server;

import "dart:io";
import "dart:json";

import "client/shared/models.dart";

part "WsExpenseClient.dart";
part "CouchDbHandler.dart";



main() {
  HttpServer server = new HttpServer();
  var fileHandler = new StaticFileHandler();
  server.addRequestHandler(fileHandler.matcher, fileHandler.handler);

  var websocketHandler = getWebsocketHandler();
  server.addRequestHandler(
    (req) => req.path == "/websocket",websocketHandler.onRequest);

  WebSocketHandler wsHandler = new WebSocketHandler();
  server.addRequestHandler(
       (req) => req.path == "/websocket",
       wsHandler.onRequest);
  wsHandler.onOpen = (WebSocketConnection conn) {
    print("New websocket request");
    new ExpenseClientConnection(conn);
  };




  server.listen("127.0.0.1", 8080);
  print("listening...");
}


WebSocketHandler getWebsocketHandler() {
  Map connections = new Map();

  WebSocketHandler wsHandler = new WebSocketHandler();

  var sendUpdatedConnectionCount = () {
    Map data = new Map();
    data["action"] = "CLIENT_COUNT";
    data["connectedClients"] = connections.length;
    var message = JSON.stringify(data);
    print("sending: $message");

    for(var clientConnection in connections.values) {
      clientConnection.send(message);
    }
  };

  wsHandler.onOpen = (WebSocketConnection conn) {
    connections[conn.hashCode] = conn;
    sendUpdatedConnectionCount();

    conn.onClosed = (r,s) {
      connections.remove(conn.hashCode);
      sendUpdatedConnectionCount();
    };

//    var dbHandler = new CouchDbHandler("localhost", 5984, "expensedb");
//    dbHandler.loadData().then((List<Expense> expenses) {
//      print("loaded expenses $expenses");
//      var data = new Map();
//      data["action"] = "load";
//      data["expenses"] = expenses;
//      var jsonData = JSON.stringify(data);
//      conn.send(jsonData);
//    });

    conn.onMessage = (message) {
      var data = JSON.parse(message);
      if (data["action"] == "SYNC") {
        var expense = new Expense.fromJson(data["expense"]);
        data["expense"] = expense.toJson();

        message = JSON.stringify(data);

        for (var clientConnection in connections.values) {

          if (clientConnection.hashCode() != conn.hashCode) {
            clientConnection.send(message);
          }
        }
      }

    };


  };

  return wsHandler;

}






class StaticFileHandler {
  bool matcher(HttpRequest req) {
    return req.path.endsWith(".html") ||
      req.path.endsWith(".dart") ||
      req.path.endsWith(".css") ||
      req.path.endsWith(".js");
  }

  void handler(HttpRequest req, HttpResponse res) {
    var requestedFile = "./client${req.path}";
    print("GET: $requestedFile");
    File file = new File(requestedFile);
    file.openInputStream().pipe(res.outputStream);
  }
}
