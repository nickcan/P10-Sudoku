SudokuRazy = {};

SudokuRazy.app = function() {
  SudokuRazy.GameView.hideLightbox();
  $('.incorrect').hide()
  $('#tabs').tabs();
  var controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, SudokuRazy.GameView)
  controller.bindEvents()
}