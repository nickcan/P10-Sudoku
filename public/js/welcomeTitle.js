TitleLoader = {
  animateHeader: function(text){
    current = 0;
    header = $(".welcome_title");
    setInterval(function() {
      if (current < text.length) {
        header.text(header.text() + text[current++]);
      }
    }, 120);
  }
}

$(document).ready(function() {
  var headerText = "Welcome to Nick's Sudoku".split("");
  TitleLoader.animateHeader(headerText);
  TitleLoader.displayTagline();
});