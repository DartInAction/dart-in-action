library shared_library;

import "dart:io";

// See serverDirectoryAnalysisDynamicLoading.dart

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


String getFileExtension(String filename) {
  var extSeparator = filename.lastIndexOf('.');
  extSeparator = extSeparator == -1 ? 0 : extSeparator;
  return filename.substring(extSeparator, filename.length).toUpperCase();  
}

