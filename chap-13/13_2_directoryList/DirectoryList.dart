import "dart:io";

void main() {
  Options options = new Options();

  if (options.arguments.length != 2) {
    printHelp();
  }
  else if (options.arguments[0].toLowerCase() == '--list') {
    listDir(options.arguments[1]);
  }
  else if (options.arguments[0].toLowerCase() == '--out') {
    outputFile(options.arguments[1]);
  }
  else if (options.arguments[0].toLowerCase() == '--new') {
    writeData(options.arguments[1]);
  }

}

listDir(String folderPath) {
  var directory = new Directory(folderPath);
  directory.exists().then((bool exists) {
    DirectoryLister lister = directory.list();

    var fileCount = 0;
    var dirCount = 0;
    lister.onDir = (dir) {
      print("<DIR>     $dir");
      dirCount += 1;
    };

    lister.onFile = (file) {
      print("<FILE>    $file");
      fileCount += 1;
    };

    lister.onDone = (completed) {
      print("$dirCount directories and $fileCount files");
    };
  });

}

//outputFile(String filePath) {
//  File file = new File(filePath);
//  InputStream inputStream = file.openInputStream();
//
//  StringBuffer sb = new StringBuffer();
//
//  inputStream.onData = () {
//    print("onData");
//    List<int> data = inputStream.read();
//    if (data != null) {
//      print(data);
//      sb.add(new String.fromCharCodes(data));
//    }
//
//  };
//
//  inputStream.onClosed = () {
//    print(sb.toString());
//  };
//
//}

outputFile(String filePath) {
  File file = new File(filePath);
  file.exists().chain((exists) {
    if (exists) {
      return file.readAsString();
    }
    // TODO: real-world: add error handling / exception scenario 
  }).then((content) {
    print(content);
  });
//  Future futureContent = file.readAsText();
//  printContent(filePath, futureContent);
}

printContent(String filePath, Future futureFileContent) {
  futureFileContent.then((content) {
    print("Contents of: $filePath");
    print(content);
  });
}

printHelp() {
  print("""
List files and directories: --list DIR
Output file to console    : --out FILE""");
}

writeData(String filePath) {
  File file = new File(filePath);
  file.create().then((File newFile) {
    OutputStream str = newFile.openOutputStream();
    str.writeString("test");
    str.write("more data".charCodes);
    str.close();
  });
}
