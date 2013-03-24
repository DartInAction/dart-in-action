
import 'dart:html';

void main() {
  query('#status').innerHtml = "Hello World"; // innerHTML now innerHtml
  // The view has been taken that 2 char abbreviations are uppercase, but any
  // longer should be camel case.  eg, window.indexedDB would be upper, 
  // but HTML woud be Html
}
