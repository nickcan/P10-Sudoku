SudokuRazy.GameController = function(GameModel, GameView) {
  self = this

  this.bindEvents = function() {
    $('.new_board').click(this.getNewBoard)
    $('.solve_board').click(this.solveBoard)
    $('.submit_solution').click(this.checkSolution)
    $('#tabs ul li:nth-child(2) a').click(this.getProfile)
    $('#tabs ul li:nth-child(3) a').click(this.getUsers)
    $('.x_button, .background').click(SudokuRazy.GameView.hideLightbox)
    $('.new_game_lightbox').click(function() {
      SudokuRazy.GameView.hideLightbox();
      this.getNewBoard();
    })
  }

  // Series of actions to get a new board and populate it.
  this.getNewBoard = function() {
    GameModel.solvedBoard.board = ""
    SudokuRazy.GameView.clearBoard()
    SudokuRazy.GameView.shakeBoard()
    var information = {element: '/board/new', request_type: "GET"}
    self.ajaxCall(information).done(function(serverData) {
      self.newBoardDoneFunction(serverData)
    })
  }

  // series of actions to recieve a solved board.
  this.solveBoard = function() {
    if (GameModel.solvedBoard.board === "") {
      var information = {element: $(this).attr('href'), request_type: "POST", data_stuff: GameModel.currentBoard}
      self.ajaxCall(information).done(function(completedBoard) {
        GameModel.solvedBoard.board = completedBoard
        self.solveBoardDoneFunction(completedBoard)
      }.bind(this))
    } else {
      event.preventDefault();
    }
  }

  this.checkSolution = function() {
    if (GameModel.solvedBoard.board === "") {
      var information = {element: $(this).attr('href'), request_type: "POST", data_stuff: GameModel.currentBoard}
      this.ajaxCall(information).done(function(completedBoard) {
        string = SudokuRazy.GameView.compileBoardToString()
        GameModel.checkCorrectness(string, completedBoard)
      })
    } else {
      event.preventDefault();
      string = SudokuRazy.GameView.compileBoardToString()
      GameModel.checkCorrectness(string, GameModel.solvedBoard.board)
    }
  }

  // Gets the User's profile and uses Mustache.js to render into tab area.
  this.getProfile = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/profile',
      type: 'GET'
    }).done(function(json) {
      self.tabAreaDoneFunction(SudokuRazy.GameView.profileTemplate, json, $('#profile'))
    })
  }

  // Returns all users
  this.getUsers = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/users',
      type: 'GET'
    }).done(function(json) {
      self.tabAreaDoneFunction(SudokuRazy.GameView.allUsersTemplate, json, $('#overall'))
    })
  }

  this.sendWin = function() {
    var ajax = $.ajax({
      url: '/win',
      type: 'PUT',
      data: GameModel.solvedBoard
    }).done(function() {
      SudokuRazy.GameView.showLightbox();
    })
  }

  // Generic ajax call that takes an object as an argument.
  this.ajaxCall = function(info) {
    event.preventDefault();
    var ajax = $.ajax({
      url: info.element,
      type: info.request_type,
      data: info.data_stuff
    })
    return ajax;
  }

  this.newBoardDoneFunction = function(data) {
    SudokuRazy.GameView.clearBoard();
    this.setCurrentBoard(data)
    var array = GameModel.splitBoardString(GameModel.currentBoard.board)
    SudokuRazy.GameView.setBoard(array)
  }

  this.solveBoardDoneFunction = function(data) {
    SudokuRazy.GameView.setBoard(data)
    string = SudokuRazy.GameView.compileBoardToString()
  }

  this.tabAreaDoneFunction = function(template, user, element) {
    var html = Mustache.to_html(template, user);
    SudokuRazy.GameView.clearTabArea(element)
    SudokuRazy.GameView.appendTabArea(element, html)
  }

  this.setCurrentBoard = function(data) {
    GameModel.currentBoard.board = data
  }
}