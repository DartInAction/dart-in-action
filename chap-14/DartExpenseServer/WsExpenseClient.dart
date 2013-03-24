part of dartexpense_server;

class ExpenseClientConnection {
  static Map _allClients; // id, client
  static Map<int, ExpenseClientConnection> get allClients {
    if (_allClients == null) {
      _allClients = new Map<int, ExpenseClientConnection>();
    }
    return _allClients;
  }

  static int _nextConnectionId = 0;
  int get nextConnectionId => _nextConnectionId++;

  WebSocketConnection conn;
  int connId;

  ExpenseClientConnection(this.conn) {
    this.connId = nextConnectionId;
    print("Created conn $connId");
    allClients[connId] = this;
    conn.onMessage = onMessageHandler;
    conn.onClosed = onClosedHandler;
    refreshClientCount();
  }

  refreshClientCount() {
    Map data = new Map<String,Object>();
    data["action"] = "CLIENT_COUNT";
    data["connectedClients"] = allClients.length;
    sendToAllClients(data);
  }

  onMessageHandler(message) {
    print("onMessage1 $message");
    var data = JSON.parse(message);
    print("onMessage2 $data");
    if (data["action"] == "SYNC") {
      print("syncing to all clients");
      sendToAllClients(data, includeThisClient:false);
    }
  }

  onClosedHandler(int status, String reason) {
    allClients.remove(connId);
    refreshClientCount();
  }

  sendToAllClients(Map data, {includeThisClient : true}) {
    var jsonData = JSON.stringify(data);
    for (var clientConnection in allClients.values) {
      print("sending $jsonData");

      if (clientConnection.connId != this.connId || includeThisClient) {
        clientConnection.conn.send(jsonData);
      }
    }
  }


}
