import "dart:io";

main() {
  HttpServer server = new HttpServer();

  server.addRequestHandler(
    (HttpRequest req) => req.path.startsWith("/echo/"),
    (HttpRequest req,HttpResponse res) {
      var method = req.method;
      var path = req.path;
      res.headers.contentType.value = "text/plain";
      res.outputStream.writeString("Echo: $method $path");
      res.outputStream.close();
    }
  );

  server.defaultRequestHandler = (HttpRequest req,HttpResponse res) {
    res.headers.contentType.value = "text/plain";
    res.outputStream.writeString("Hello World");
    res.outputStream.close();
  };



  server.listen("127.0.0.1", 8080);
  print("Listening...");
}