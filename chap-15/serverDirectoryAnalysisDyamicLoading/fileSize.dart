import "dart:io";
import "dart:isolate";
import "sharedLibrary.dart";

// Don't run this file directly, it is loaded dynamically.
// See serverDirectoryAnalysisDynamicLoading.dart
void main() {
  var receivePort = port;
  receivePort.receive((data, replyTo) {
    Map<String,int> totalSizes = getFileSizes(data);
    replyTo.send(totalSizes);
  });  
  
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

