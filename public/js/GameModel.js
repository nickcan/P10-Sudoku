SudokuRazy.GameModel = {
  currentBoard: {board: ""},
  solvedBoard: {board: ""},

  splitBoardString: function(string) {
    array = string.split("")
    return array
  },

  checkCorrectness: function(user, api) {
    if (user == api) {
      SudokuRazy.GameController.sendWin();
    } else {
      SudokuRazy.GameView.toggleIncorrect();
    }
  }
}