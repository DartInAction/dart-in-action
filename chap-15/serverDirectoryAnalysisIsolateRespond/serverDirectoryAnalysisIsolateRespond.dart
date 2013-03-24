import "dart:io";
import "dart:isolate";

String isolateName;

// Requires one command line argument, eg: c:\windows
// which is the folder to analyse
void main() {
  var options = new Options();
  getFileList(options.arguments[0]).then((List<String> fileList) {
    analyzeFileList(fileList);
  });
  
}

analyzeFileList(fileList) {
  var replyCount = 0;
  port.receive((data, replyTo) {
    replyCount ++;
    print(data);
    
    if (replyCount == 2) {
      port.close();
    }
  });
  
  var defaultIsolateSendPort = port.toSendPort();
  
  var fileTypesSendPort = spawnFunction(getFileTypesEntryPoint);
  fileTypesSendPort.send(fileList, defaultIsolateSendPort);
  var fileSizesSendPort = spawnFunction(getFileSizesEntryPoint);
  fileSizesSendPort.send(fileList, defaultIsolateSendPort);
}

void getFileTypesEntryPoint() {
  var receivePort = port;
  receivePort.receive((data, replyTo) {
    Map<String,int> typeCount = getFileTypes(data);
    replyTo.send(typeCount);
    //receivePort.close();
  });
}

void getFileSizesEntryPoint() {
  var receivePort = port;
  receivePort.receive((data, replyTo) {
    Map<String,int> totalSizes = getFileSizes(data);
    replyTo.send(totalSizes);
    //receivePort.close();
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

Map<String, int> getFileSizes(fileList) {
  var result = new Map<String,int>();
  
  for (var filename in fileList) {
    var file = new File(filename);
    var extension = getFileExtension(filename);
    if (result[extension] == null) {
     result[extension] = file.lengthSync(); 
    }
    else {
      result[extension] += file.lengthSync();
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