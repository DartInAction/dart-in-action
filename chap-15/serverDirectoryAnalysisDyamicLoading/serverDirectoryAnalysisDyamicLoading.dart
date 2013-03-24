import "dart:io";
import "dart:isolate";
import "sharedLibrary.dart";


// Usage:  Param 1 is the file to analyse
// Other params are analysis functions, eg: fileSize.dart and fileTypes.dart
// Example command line could be:
// dart.exe serverDirectoryAnalysisDynamicalLoading.dart c:\windows filesize.dart fileTypes.dart
// Alternatively, add 
// c:\windows filesize.dart fileTypes.dart
// into the Manage Launches > Script Arguments box
void main() {
  var options = new Options();
  
  var dynamicSourceFiles = new List();
  var analysisFolder = null;
  for (String argument in options.arguments) {
    if (analysisFolder == null) {
      analysisFolder = argument;      
    }
    else {
      dynamicSourceFiles.add(argument);
    }
  }
  
  getFileList(analysisFolder).then((List<String> fileList) {
    analyzeFileList(fileList, dynamicSourceFiles);
  });
  
}

analyzeFileList(fileList, dynamicAnalysisScripts) {
  var replyCount = 0;
  port.receive((data, replyTo) {
    replyCount ++;
    print(data);
    
    if (replyCount == dynamicAnalysisScripts.length) {
      port.close();
    }
  });
  
  var defaultIsolateSendPort = port.toSendPort(); 
  
  for (String sourceFileName in dynamicAnalysisScripts) {
    var dynamicSendPort = spawnUri(sourceFileName);
    dynamicSendPort.send(fileList, defaultIsolateSendPort);  
  }
  
}

 