SudokuRazy = {};

SudokuRazy.app = function() {
  SudokuRazy.GameView.hideLightbox();
  $('.incorrect').hide()
  $('#tabs').tabs();
  // controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, new SudokuRazy.GameView())\
  var controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, SudokuRazy.GameView)
  controller.bindEvents()
}