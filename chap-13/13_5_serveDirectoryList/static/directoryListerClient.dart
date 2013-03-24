import 'dart:html';
import "dart:json";

main() {
  window.on.popState.add((data) {
    loadFolderList(data.state);
  });

  navigate("/");
}

navigate(String folderName) {
  print("Loading Folder: $folderName");

  loadFolderList(folderName);
  window.history.pushState(folderName, folderName,"#$folderName");
}


loadFolderList(String folderName) {
  if (folderName != null) {
    folderName = folderName.replaceAll("\\",r"\");
    document.query("#currentFolder").innerHTML = "Current Folder: $folderName";
    var url = "http://127.0.0.1:8080/folder$folderName";
    new HttpRequest.get(url, (response) {
      var jsonData = response.responseText;
      Map result = JSON.parse(jsonData);

      updateFolderList(result["dirs"]);
      updateFileList(result["files"]);
    });
  }
}

updateFolderList(List folders) {
  var content = document.query("#folderList");
  content.elements.clear();

  for(String dirName in folders) {
    var link = new Element.html("<div><a href='#'>$dirName</a></div>");
    link.on.click.add((e) => navigate(dirName));
    content.elements.add(link);
  }
}

updateFileList(List files) {
  var content = document.query("#fileList");
  content.elements.clear();

  for(String filepath in files) {
    var filename = filepath.substring(filepath.lastIndexOf('\\')+1);
    var link = new Element.html("<div><a href='#'>$filename</a></div>");
    link.on.click.add((e) => loadFileContent(filepath));
    content.elements.add(link);
  }
}

loadFileContent(String filepath) {
  var filename = filepath.substring(filepath.lastIndexOf('\\')+1);
  document.query("#filename").innerHTML = "Current file: $filename";

  var url = "http://127.0.0.1:8080/file$filepath";
  new HttpRequest.get(url, (response) {
    var contentText = JSON.parse(response.responseText)["content"];
    var content = document.query("#fileContent");
    content.innerHTML = contentText;
  });
}


