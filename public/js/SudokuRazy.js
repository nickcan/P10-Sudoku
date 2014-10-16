SudokuRazy = {};

SudokuRazy.app = function() {
  // For the Welcome page and typing of welcome message
  SudokuRazy.WelcomeView.hideForms();
  var title = "Welcome to SudokuRazy".split("");
  SudokuRazy.TitleLoader.animateHeader(title)
  setTimeout(SudokuRazy.WelcomeView.showForms, 2500)

  // This does all the steps for the actual game section to run
  SudokuRazy.GameView.hideLightbox();
  $('.incorrect').hide()
  $('#tabs').tabs();
  var controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, SudokuRazy.GameView)
  controller.bindEvents()
}