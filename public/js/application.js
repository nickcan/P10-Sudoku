$(document).ready(function() {
  var currentBoard = {board: ""}

  $('#new_board').click(function(event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      type: 'GET'
    }).done(function(serverData) {
      currentBoard.board = serverData
      array = splitString(currentBoard.board)
      setBoard(array)
    })
  })

  $('#solve_board').click(function(event) {
    event.preventDefault();
    $.ajax({
      url: '/board/solution',
      type: 'POST',
      data: currentBoard
    }).done(function(completedBoard) {
      $('body').append(completedBoard)
      string = compileBoardToString()
      checkCorrectness(string, completedBoard)
    })
  })

  var splitString = function(string) {
    array = string.split("")
    return array
  }

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
});




// attr('contenteditable', 'true')

// "{{#board}}<td>{{.}}</td>{{/board}}" +
// View
// var boardTemplate = "<table id='board_table'>" +
//                       "<tr>" +
//                         "{{#board}}<td>{{.}}</td>{{/board}}" +
//                       "</tr>" +
//                     "</table>"
