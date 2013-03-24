import "dart:io";

// Browse to: 
// http://localhost:8080/index.html
// Make sure that the "Manage Launches > Working Directory setting
// is pointing to 04_ServeStaticFiles if you have problems
main() {
  HttpServer server = new HttpServer();
  var fileHandler = new StaticFileHandler();
  server.addRequestHandler(fileHandler.matcher, fileHandler.handler);

  server.listen("127.0.0.1", 8080);
  print("listening...");
}


class StaticFileHandler {
  bool matcher(HttpRequest req) {
    return req.path.endsWith(".html") ||
      req.path.endsWith(".dart") ||
      req.path.endsWith(".css") ||
      req.path.endsWith(".js");
  }

  void handler(HttpRequest req, HttpResponse res) {
    var requestedFile = "./client${req.path}";
    File file = new File(requestedFile);
    file.openInputStream().pipe(res.outputStream);
  }
}
