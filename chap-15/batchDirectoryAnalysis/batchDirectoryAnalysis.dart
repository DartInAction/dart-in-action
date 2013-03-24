import "dart:io";
import "dart:isolate";

String isolateName;

void main() {
  
  Queue<String> foldersToProcess = new Queue<String>();
  foldersToProcess.add(r"c:\windows");
  foldersToProcess.add(r"c:\dart");
  foldersToProcess.add(r"c:\windows\system32");
  foldersToProcess.add(r"c:\Program Files");
  foldersToProcess.add(r"c:\work\");
  
  var expectedReplyCount = 0;
  
  var defaultSendPort = port.toSendPort();
  
  for (int i=0; i < 3; i++) {
    SendPort worker = spawnFunction(getFileListEntryPoint);
    expectedReplyCount++;
    worker.send(foldersToProcess.removeFirst(), defaultSendPort);
  }
  
  var replyCount = 0;
  port.receive( (data, replyToWorker) {
    replyCount++;
    
    print(data);
    
    print("Folders left to process: ${foldersToProcess.length}");
    
    if (foldersToProcess.isEmpty == false) {
      expectedReplyCount++;
      replyToWorker.send(foldersToProcess.removeFirst(), defaultSendPort);
    }
    else {
      replyToWorker.send("close");
    }
    
    if (replyCount == expectedReplyCount) {
      port.close();
      print("exiting");
    }
  });
    
}




void getFileListEntryPoint() {
  var receivePort = port;
  var sendPort = receivePort.toSendPort();
  
  receivePort.receive((data, replyTo) {
    if (data == "close") {
      receivePort.close();
    }
    else {
      print("Processing folder: ${data}");
      getFileList(data).then( (fileList) {
        var typeCount = getFileTypes(fileList);
        replyTo.send([data,typeCount], sendPort);      
      });
    }
  });
}

Map<String,int> getFileTypes(fileList) {
  var result = new Map<String,int>();
  for (var filename in fileList) {
    var extension = getFileExtension(filename);
    if (result[extension] == null) {
      result[extension] = 1;
    }
    else {
      result[extension] ++;
    }
  }
  return result;
}


String getFileExtension(String filename) {
  var extSeparator = filename.lastIndexOf('.');
  extSeparator = extSeparator == -1 ? 0 : extSeparator;
  return filename.substring(extSeparator, filename.length).toUpperCase();  
}


Future<List<String>> getFileList(String folderPath) {
  var completer = new Completer<List<String>>();
  
  var directory = new Directory(folderPath);
  directory.exists().then((bool exists) {
    
    var fileList = new List<String>();
    DirectoryLister lister = directory.list();
    
    lister.onFile = (file) => fileList.add(file); 
      
    lister.onDone = (completed) {
      completer.complete(fileList);
    };
  });
  
  return completer.future;
}