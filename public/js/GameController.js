SudokuRazy.GameController = function(GameModel, GameView) {
  self = this

  this.bindEvents = function() {
    $('.new_board').click(this.getNewBoard)
    $('.solve_board').click(this.solveBoard)
    $('.submit_solution').click(this.checkSolution)
    $('#tabs ul li:nth-child(2) a').click(this.getProfile)
    $('#tabs ul li:nth-child(3) a').click(this.getUsers)
    $('.x_button, .background').click(GameView.hideLightbox)
    $('.new_game_lightbox').click(function() {
      GameView.hideLightbox();
      this.getNewBoard();
    }.bind(this))
  }.bind(this)

  // Series of actions to get a new board and populate it.
  this.getNewBoard = function() {
    GameModel.solvedBoard.board = ""
    GameView.clearBoard()
    GameView.shakeBoard()
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
      self.ajaxCall(information).done(function(completedBoard) {
        var string = GameView.compileBoardToString()
        GameModel.checkCorrectness(string, completedBoard)
      })
    } else {
      event.preventDefault();
      string = GameView.compileBoardToString()
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
      self.tabAreaDoneFunction(GameView.profileTemplate, json, $('#profile'))
    })
  }

  // Returns all users
  this.getUsers = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/users',
      type: 'GET'
    }).done(function(json) {
      self.tabAreaDoneFunction(GameView.allUsersTemplate, json, $('#overall'))
    })
  }

  this.sendWin = function() {
    var ajax = $.ajax({
      url: '/win',
      type: 'PUT',
      data: GameModel.solvedBoard
    }).done(function() {
      GameView.showLightbox();
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
    GameView.clearBoard();
    this.setCurrentBoard(data)
    var array = GameModel.splitBoardString(GameModel.currentBoard.board)
    GameView.setBoard(array)
  }

  this.solveBoardDoneFunction = function(data) {
    GameView.setBoard(data)
    string = GameView.compileBoardToString()
  }

  this.tabAreaDoneFunction = function(template, user, element) {
    var html = Mustache.to_html(template, user);
    GameView.clearTabArea(element)
    GameView.appendTabArea(element, html)
  }

  this.setCurrentBoard = function(data) {
    GameModel.currentBoard.board = data
  }
}