import "dart:io";
import "dart:json";


// Usage example: http://127.0.0.1:8080/folder/dart
// Navigate to http://127.0.0.1:8080/index.html for UI
// serves filelisting from c:\dart
// .dart files are listed in the "Files list window"
main() {
  HttpServer server = new HttpServer();

  var staticFile = new StaticFileHandler();
  var folderList = new FolderListHandler();
  var fileContent = new FileContentHandler();

  server.addRequestHandler(staticFile.matcher, staticFile.handler);
  server.addRequestHandler(folderList.matcher, folderList.handler);
  server.addRequestHandler(fileContent.matcher, fileContent.handler);

  server.listen("127.0.0.1",8080);
  print("Listening... on 127.0.0.1:8080");
}


addHeaders(res) {
  res.headers.add("Access-Control-Allow-Origin", "*");
  res.headers.add("Access-Control-Allow-Credentials", true);
}


class StaticFileHandler {

  bool matcher(HttpRequest req) {
    return req.path.startsWith("/static") && req.method == "GET";
  }

  void handler(HttpRequest req, HttpResponse res) {
    var filename = ".${req.path}";
    print("GET: Static File: $filename");


    File file = new File(filename);
    // print("created file object");

    file.exists().then((exists) {
      if (exists) {
        res.headers.contentType.value = "text/plain";
        file.openInputStream().pipe(res.outputStream);
      }
      else {
        res.outputStream.writeString("Not found!");
        res.outputStream.close();
      }
    });


  }
}

class FolderListHandler {

  bool matcher(HttpRequest req) {
    return req.path.startsWith("/folder") && req.method == "GET";
  }

  /// return a json list of the folder
  void handler(HttpRequest req, HttpResponse res) {
    addHeaders(res);

    var folder = req.path.substring('/folder'.length);
    print("GET: folderList: $folder");
    DirectoryLister list = new Directory(folder).list();

    List<String> dirList = new List<String>();
    List<String> fileList = new List<String>();

    list.onDir = (dir) {
      dirList.add(dir.replaceAll("\\",r'\'));
    };

    list.onFile = (file) {
      // only show Dart files
      if (file.endsWith(".dart")) {
        fileList.add(file.replaceAll("\\",r'\'));
      }
    };

    list.onDone = (done) {
      Map<String,List> result = new Map<String,List>();
      result["files"] = fileList;
      result["dirs"] = dirList;
      print("on done");
      res.outputStream.writeString(JSON.stringify(result));
      res.outputStream.close();
    };
  }

}

class FileContentHandler {
  bool matcher(HttpRequest req) {
    return req.path.startsWith("/file") && req.method == "GET";
  }

  //return the file wrapped in json
  void handler(HttpRequest req, HttpResponse res) {
    addHeaders(res);

    var filename = req.path.substring("/file".length);
    print("GET: fileContent: $filename");

    File file = new File(filename);
    
    file.readAsString().then((String content) {
      Map<String,String> result = new Map<String,String>();
      result["content"] = content;
      res.outputStream.writeString(JSON.stringify(result));
      res.outputStream.close();
    });
  }


}
