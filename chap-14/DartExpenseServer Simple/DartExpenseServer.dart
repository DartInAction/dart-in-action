library dartexpense_server;

import "dart:io";
import "dart:json";

part "WsExpenseClient.dart";


main() {
  HttpServer server = new HttpServer();
  var fileHandler = new StaticFileHandler();
  server.addRequestHandler(fileHandler.matcher, fileHandler.handler);

  var websocketHandler = getWebsocketHandler();
  server.addRequestHandler(
    (req) => req.path == "/websocket",websocketHandler.onRequest);

//  WebSocketHandler wsHandler = new WebSocketHandler();
//  server.addRequestHandler(
//       (req) => req.path == "/websocket",
//       wsHandler.onRequest);
//  wsHandler.onOpen = (WebSocketConnection conn) {
//    print("New websocket request");
//    new ExpenseClientConnection(conn);
//  };




  server.listen("127.0.0.1", 8080);
  print("listening...");
}


WebSocketHandler getWebsocketHandler() {
  Map connections = new Map();

  WebSocketHandler wsHandler = new WebSocketHandler();

  var sendUpdatedConnectionCount = () {
    Map data = new Map();
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

    conn.onMessage = (message) {
      // do nothing
    };

    return wsHandler;
  };

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
