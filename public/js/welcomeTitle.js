TitleLoader = {
  animateHeader: function(text){
    current = 0;
    header = $(".welcome_title");
    setInterval(function() {
      if (current < text.length) {
        header.text(header.text() + text[current++]);
      }
    }, 100);
  }
}

WelcomeView = {
  hideForms: function() {
    $('.forms').hide()
  },

  showForms: function() {
    $('.forms').fadeIn('slow')
  }
}

$(document).ready(function() {
  WelcomeView.hideForms();
  var headerText = "Welcome to Sudoku-razy".split("");
  TitleLoader.animateHeader(headerText)
  setTimeout(WelcomeView.showForms, 2500)
});