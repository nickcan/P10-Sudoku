SudokuRazy.GameModel = function() {
  this.currentBoard = {board: ""};
  this.solvedBoard = {board: ""};
}

SudokuRazy.GameModel.prototype = {
  splitBoardString: function(string) {
    array = string.split("")
    return array
  },

  checkCorrectness: function(user, api) {
    if (user == api) {
      new SudokuRazy.GameController(new SudokuRazy.GameModel, SudokuRazy.GameView).sendWin();
    } else {
      SudokuRazy.GameView.toggleIncorrect();
    }
  }
}