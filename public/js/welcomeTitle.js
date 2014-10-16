SudokuRazy.TitleLoader = {
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

SudokuRazy.WelcomeView = {
  hideForms: function() {
    $('.forms').hide()
  },

  showForms: function() {
    $('.forms').fadeIn('slow')
  }
}