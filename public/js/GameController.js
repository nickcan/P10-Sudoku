SudokuRazy.GameController = {
  bindEvents: function() {
    $('.new_board').click(this.getNewBoard)
    $('.solve_board').click(this.solveBoard)
    $('.submit_solution').click(this.checkSolution)
    $('#tabs ul li:nth-child(2) a').click(this.getProfile)
    $('#tabs ul li:nth-child(3) a').click(this.getUsers)
    $('.x_button, .background').click(SudokuRazy.GameView.hideLightbox)
    $('.new_game_lightbox').click(function() {
      SudokuRazy.GameView.hideLightbox();
      SudokuRazy.GameController.getNewBoard();
    })
  },

  // Series of actions to get a new board and populate it.
  getNewBoard: function() {
    SudokuRazy.GameModel.solvedBoard.board = ""
    SudokuRazy.GameView.clearBoard()
    SudokuRazy.GameView.shakeBoard()
    information = {element: '/board/new', request_type: "GET"}
    SudokuRazy.GameController.ajaxCall(information).done(function(serverData) {
      SudokuRazy.GameController.newBoardDoneFunction(serverData)
    })
  },

  // series of actions to recieve a solved board.
  solveBoard: function() {
    if (SudokuRazy.GameModel.solvedBoard.board === "") {
      information = {element: $(this).attr('href'), request_type: "POST", data_stuff: SudokuRazy.GameModel.currentBoard}
      SudokuRazy.GameController.ajaxCall(information).done(function(completedBoard) {
        SudokuRazy.GameModel.solvedBoard.board = completedBoard
        SudokuRazy.GameController.solveBoardDoneFunction(completedBoard)
      })
    } else {
      event.preventDefault();
    }
  },

  checkSolution: function() {
    if (SudokuRazy.GameModel.solvedBoard.board === "") {
      information = {element: $(this).attr('href'), request_type: "POST", data_stuff: SudokuRazy.GameModel.currentBoard}
      SudokuRazy.GameController.ajaxCall(information).done(function(completedBoard) {
        string = SudokuRazy.GameView.compileBoardToString()
        SudokuRazy.GameModel.checkCorrectness(string, completedBoard)
      })
    } else {
      event.preventDefault();
      string = SudokuRazy.GameView.compileBoardToString()
      SudokuRazy.GameModel.checkCorrectness(string, SudokuRazy.GameModel.solvedBoard.board)
    }
  },

  // Gets the User's profile and uses Mustache.js to render into tab area.
  getProfile: function(event) {
    event.preventDefault();
    $.ajax({
      url: '/profile',
      type: 'GET'
    }).done(function(json) {
      SudokuRazy.GameController.tabAreaDoneFunction(SudokuRazy.GameView.profileTemplate, json, $('#profile'))
    })
  },

  // Returns all users
  getUsers: function(event) {
    event.preventDefault();
    $.ajax({
      url: '/users',
      type: 'GET'
    }).done(function(json) {
      SudokuRazy.GameController.tabAreaDoneFunction(SudokuRazy.GameView.allUsersTemplate, json, $('#overall'))
    })
  },

  sendWin: function() {
    ajax = $.ajax({
      url: '/win',
      type: 'PUT',
      data: SudokuRazy.GameModel.solvedBoard
    }).done(function() {
      SudokuRazy.GameView.showLightbox();
    })
  },

  // Generic ajax call that takes an object as an argument.
  ajaxCall: function(info) {
    event.preventDefault();
    ajax = $.ajax({
      url: info.element,
      type: info.request_type,
      data: info.data_stuff
    })
    return ajax;
  },

  newBoardDoneFunction: function(data) {
    SudokuRazy.GameView.clearBoard();
    SudokuRazy.GameController.setCurrentBoard(data)
    var array = SudokuRazy.GameModel.splitBoardString(SudokuRazy.GameModel.currentBoard.board)
    SudokuRazy.GameView.setBoard(array)
  },

  solveBoardDoneFunction: function(data) {
    SudokuRazy.GameView.setBoard(data)
    string = SudokuRazy.GameView.compileBoardToString()
  },

  tabAreaDoneFunction: function(template, user, element) {
    var html = Mustache.to_html(template, user);
    SudokuRazy.GameView.clearTabArea(element)
    SudokuRazy.GameView.appendTabArea(element, html)
  },

  setCurrentBoard: function(data) {
    SudokuRazy.GameModel.currentBoard.board = data
  }
}