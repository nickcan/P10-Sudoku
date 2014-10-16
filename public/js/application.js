// $(document).ready(function() {

  // Model
  // var SudokuRazy.GameModel = {
  //   currentBoard: {board: ""},
  //   solvedBoard: {board: ""},

  //   splitBoardString: function(string) {
  //     array = string.split("")
  //     return array
  //   },

  //   checkCorrectness: function(user, api) {
  //     if (user == api) {
  //       sendWin();
  //     } else {
  //       toggleIncorrect();
  //     }
  //   }
  // }

  // var User = {
    // calculateWinPercentage: function(attempts, wins) {
      // return Number(wins)/Number(attempts)
    // }
  // }


  // Controller
  // var bindEvents = function() {
  //   $('.new_board').click(getNewBoard)
  //   $('.solve_board').click(solveBoard)
  //   $('.submit_solution').click(checkSolution)
  //   $('#tabs ul li:nth-child(2) a').click(getProfile)
  //   $('#tabs ul li:nth-child(3) a').click(getUsers)
  //   $('.x_button, .background').click(SudokuRazy.GameView.hideLightbox)
  //   $('.new_game_lightbox').click(function() {
  //     SudokuRazy.GameView.hideLightbox();
  //     getNewBoard();
  //   })
  // }

  // // Series of actions to get a new board and populate it.
  // var getNewBoard = function() {
  //   SudokuRazy.GameModel.solvedBoard.board = ""
  //   clearBoard()
  //   shakeBoard()
  //   information = {element: '/board/new', request_type: "GET"}
  //   ajaxCall(information).done(function(serverData) {
  //     newBoardDoneFunction(serverData)
  //   })
  // }

  // // series of actions to recieve a solved board.
  // var solveBoard = function() {
  //   if (SudokuRazy.GameModel.solvedBoard.board === "") {
  //     information = {element: $(this).attr('href'), request_type: "POST", data_stuff: SudokuRazy.GameModel.currentBoard}
  //     ajaxCall(information).done(function(completedBoard) {
  //       SudokuRazy.GameModel.solvedBoard.board = completedBoard
  //       solveBoardDoneFunction(completedBoard)
  //     })
  //   } else {
  //     event.preventDefault();
  //   }
  // }

  // var checkSolution = function() {
  //   if (SudokuRazy.GameModel.solvedBoard.board === "") {
  //     information = {element: $(this).attr('href'), request_type: "POST", data_stuff: SudokuRazy.GameModel.currentBoard}
  //     ajaxCall(information).done(function(completedBoard) {
  //       string = compileBoardToString()
  //       SudokuRazy.GameModel.checkCorrectness(string, completedBoard)
  //     })
  //   } else {
  //     event.preventDefault();
  //     string = compileBoardToString()
  //     SudokuRazy.GameModel.checkCorrectness(string, SudokuRazy.GameModel.solvedBoard.board)
  //   }
  // }

  // // Gets the User's profile and uses Mustache.js to render into tab area.
  // var getProfile = function(event) {
  //   event.preventDefault();
  //   $.ajax({
  //     url: '/profile',
  //     type: 'GET'
  //   }).done(function(json) {
  //     tabAreaDoneFunction(profileTemplate, json, $('#profile'))
  //   })
  // }

  // // Returns all users
  // var getUsers = function(event) {
  //   event.preventDefault();
  //   $.ajax({
  //     url: '/users',
  //     type: 'GET'
  //   }).done(function(json) {
  //     tabAreaDoneFunction(allUsersTemplate, json, $('#overall'))
  //   })
  // }

  // var sendWin = function() {
  //   ajax = $.ajax({
  //     url: '/win',
  //     type: 'PUT',
  //     data: SudokuRazy.GameModel.solvedBoard
  //   }).done(function() {
  //     showLightbox();
  //   })
  // }

  // // Generic ajax call that takes an object as an argument.
  //  var ajaxCall = function(info) {
  //   event.preventDefault();
  //   ajax = $.ajax({
  //     url: info.element,
  //     type: info.request_type,
  //     data: info.data_stuff
  //   })
  //   return ajax;
  // }

  // var newBoardDoneFunction = function(data) {
  //   clearBoard();
  //   setCurrentBoard(data)
  //   array = SudokuRazy.GameModel.splitBoardString(SudokuRazy.GameModel.currentBoard.board)
  //   setBoard(array)
  // }

  // var solveBoardDoneFunction = function(data) {
  //   setBoard(data)
  //   string = compileBoardToString()
  // }

  // var tabAreaDoneFunction = function(template, user, element) {
  //   var html = Mustache.to_html(template, user);
  //   clearTabArea(element)
  //   appendTabArea(element, html)
  // }

  // var setCurrentBoard = function(data) {
  //   SudokuRazy.GameModel.currentBoard.board = data
  // }


  // View
  // var setBoard = function(array) {
  //   $('#board td').each(function(i) {
  //     if (array[i] == "0") {
  //       $(this).attr('contenteditable', 'true').css('color', '#3d88dd')
  //     } else {
  //       $(this).html(array[i]).css('color', '#000')
  //     }
  //   })
  // }

  // var shakeBoard = function() {
  //   $('#board').effect('shake', 1500, 6)
  // }

  // var compileBoardToString = function() {
  //   var user_solution = $('#board td').text()
  //   return user_solution
  // }

  // var clearBoard = function() {
  //   $('#board td').html("");
  //   $('#board td').attr('contenteditable', 'false')
  // }

  // var clearTabArea = function(identifier) {
  //   identifier.empty()
  // }

  // var appendTabArea = function(identifier, element) {
  //   identifier.append(element)
  // }

  // var showLightbox = function() {
  //   $('.background, .winner').fadeIn('slow');
  // }

  // var hideLightbox = function() {
  //   $('.background, .winner').hide();
  // }

  // var toggleIncorrect = function() {
  //   $('.incorrect').slideDown('slow').delay(1500).slideUp('slow')
  // }

  // var profileTemplate = "<h2>{{username}}'s Profile</h2>" +
  //                         "<p><b>Attempts:</b> {{attempts}}</p>" +
  //                           "<p><b>Wins:</b> {{wins}}"
  //                             // "<p><b>Win Percentage:</b> " + User.calculateWinPercentage("{{attempts}}", "{{wins}}")

  // var allUsersTemplate =  "{{#users}}" +
  //                           "<h3>{{username}}</h3>" +
  //                             "<p><b>Attempts</b>: {{attempts}}  |  <b>Wins:</b> {{wins}}</p>" +
  //                         "{{/users}}"


  // SudokuRazy.GameView.hideLightbox();
  // $('.incorrect').hide()
  // $('#tabs').tabs();

  // SudokuRazy.GameController.bindEvents();

// });






