SudokuRazy = {};

SudokuRazy.app = function() {
  // controller = new SudokuRazy.GameController(new SudokuRazy.GameModel, new SudokuRazy.GameView())
  var controller = new SudokuRazy.GameController(SudokuRazy.GameModel, SudokuRazy.GameView)
  controller.bindEvents()
}