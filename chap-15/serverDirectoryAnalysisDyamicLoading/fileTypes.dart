import "dart:io";
import "dart:isolate";
import "sharedLibrary.dart";

// Don't run this file directly, it is loaded dynamically.
// See serverDirectoryAnalysisDynamicLoading.dart
void main() {
  var options = new Options();
  print(options.arguments);
  var receivePort = port;
  receivePort.receive((data, replyTo) {
    Map<String,int> typeCount = getFileTypes(data);
    replyTo.send(typeCount);
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

