$(document).ready(function() {

  // Model
  var Game = {
    currentBoard: {board: ""},

    splitBoardString: function(string) {
      array = string.split("")
      return array
    }
  }


  // Controller
  var bindEvents = function() {
    $('#new_board').click(getBoard)
    $('#solve_board').click(solveBoard)
  }

  // Series of actions to get a new board and populate it.
  var getBoard = function() {
    information = {element: $(this), request_type: "GET"}
    ajaxCall(information).done(function(serverData) {
      newBoardDoneFunction(serverData)
    })
  }

  // series of actions to recieve a solved board.
  var solveBoard = function() {
    information = {element: $(this), request_type: "POST", data_stuff: Game.currentBoard}
    ajaxCall(information).done(function(completedBoard) {
      $('body').append(completedBoard)
      solveBoardDoneFunction(completedBoard)
    })
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
    checkCorrectness(string, data)
  }

  var setCurrentBoard = function(data) {
    Game.currentBoard.board = data
  }


  // View

  var setBoard = function(array) {
    $('td').each(function(i) {
      if (array[i] == "0") {
        $(this).attr('contenteditable', 'true')
      } else {
        $(this).html(array[i])
      }
      i += 1
    })
  }

  var compileBoardToString = function() {
    var user_solution = $('td').text()
    return user_solution
  }

  var checkCorrectness = function(user, api) {
    if (user == api) {
      console.log("winner!")
    } else {
      console.log('you lost')
    }
  }

  var clearBoard = function() {
    $('td').html("");
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
