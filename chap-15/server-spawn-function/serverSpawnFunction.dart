import "dart:io";
import "dart:isolate";

void main() {
    
  ReceivePort receivingPort = port;
  receivingPort.receive((message, SendPort replyTo) {
    print("main receives: $message");
  });
  
  List<SendPort> sendPorts = new List<SendPort>();
  sendPorts.add(spawnFunction(main_other));
  sendPorts.add(spawnFunction(main_other));
  sendPorts.add(spawnFunction(main_other));
    
  print("sending foo");
  for (SendPort sendPort in sendPorts) {
    var replyTo = receivingPort.toSendPort();
    sendPort.send("foo", replyTo);  
  }
  
  print("sending bar");
  for (SendPort sendPort in sendPorts) {
    var replyTo = receivingPort.toSendPort();
    sendPort.send("bar", replyTo);  
  }
  print("closing");
  for (SendPort sendPort in sendPorts) {
    var replyTo = receivingPort.toSendPort();
    sendPort.send("close", replyTo);  
  }
  
}

void main_other() {
  ReceivePort receivingPort = port;
  receivingPort.receive((message, SendPort replyTo) {
    
    if (message != "close") {
    
      print("main_other Received: $message");
      replyTo.send("$message back", replyTo);
    }
    else {
      receivingPort.close();
    }
  });
}
