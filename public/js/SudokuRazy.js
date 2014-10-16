SudokuRazy = {};

SudokuRazy.app = function() {
  // Initial hiding of forms and other things in the view upon page load.
  SudokuRazy.GameView.hideLightbox();
  SudokuRazy.WelcomeView.hideForms();
  $('.incorrect').hide()
  $('#tabs').tabs();

  // For the Welcome page and typing of welcome message
  var title = "Welcome to SudokuRazy".split("");
  SudokuRazy.TitleLoader.animateHeader(title)
  setTimeout(SudokuRazy.WelcomeView.showForms, 2500)

  // This does all the steps for the actual game section to run
  var controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, SudokuRazy.GameView)
  controller.bindEvents()
}