$(document).ready(function() {

  // Model
  var Game = {
    currentBoard: {board: ""},
    solvedBoard: {board: ""},

    splitBoardString: function(string) {
      array = string.split("")
      return array
    },

    checkCorrectness: function(user, api) {
      if (user == api) {
        console.log("winner!")
      } else {
        console.log('you lost')
      }
    }
  }


  // Controller
  var bindEvents = function() {
    $('.new_board').click(getNewBoard)
    $('.solve_board').click(solveBoard)
    $('.submit_solution').click(checkSolution)
  }

  // Series of actions to get a new board and populate it.
  var getNewBoard = function() {
    Game.solvedBoard.board = ""
    information = {element: $(this), request_type: "GET"}
    ajaxCall(information).done(function(serverData) {
      newBoardDoneFunction(serverData)
    })
  }

  // series of actions to recieve a solved board.
  var solveBoard = function() {
    if (Game.solvedBoard.board === "") {
      information = {element: $(this), request_type: "POST", data_stuff: Game.currentBoard}
      ajaxCall(information).done(function(completedBoard) {
        Game.solvedBoard.board = completedBoard
        solveBoardDoneFunction(completedBoard)
      })
    } else {
      event.preventDefault();
    }
  }

  var checkSolution = function() {
    if (Game.solvedBoard.board === "") {
      information = {element: $(this), request_type: "POST", data_stuff: Game.currentBoard}
      ajaxCall(information).done(function(completedBoard) {
        string = compileBoardToString()
        Game.checkCorrectness(string, completedBoard)
      })
    } else {
      event.preventDefault();
      string = compileBoardToString()
      Game.checkCorrectness(string, Game.solvedBoard.board)
    }
  }

  // Generic ajax call that takes an object as an argument.
   var ajaxCall = function(info) {
    event.preventDefault();
    ajax = $.ajax({
      url: info.element.attr('href'),
      type: info.request_type,
      data: info.data_stuff
    })
    return ajax;
  }

  var newBoardDoneFunction = function(data) {
    clearBoard();
    setCurrentBoard(data)
    array = Game.splitBoardString(Game.currentBoard.board)
    setBoard(array)
  }

  var solveBoardDoneFunction = function(data) {
    setBoard(data)
    string = compileBoardToString()
  }

  var setCurrentBoard = function(data) {
    Game.currentBoard.board = data
  }


  // View
  var setBoard = function(array) {
    $('#board td').each(function(i) {
      if (array[i] == "0") {
        $(this).attr('contenteditable', 'true').css('color', '#3d88dd')
      } else {
        $(this).html(array[i]).css('color', '#000')
      }
    })
  }

  var compileBoardToString = function() {
    var user_solution = $('#board td').text()
    return user_solution
  }

  var clearBoard = function() {
    $('#board td').html("");
    $('#board td').attr('contenteditable', 'false')
  }

  bindEvents();
});




// attr('contenteditable', 'true')

// "{{#board}}<td>{{.}}</td>{{/board}}" +
// View
// var boardTemplate = "<table id='board_table'>" +
//                       "<tr>" +
//                         "{{#board}}<td>{{.}}</td>{{/board}}" +
//                       "</tr>" +
//                     "</table>"
