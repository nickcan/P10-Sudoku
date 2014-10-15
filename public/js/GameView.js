SudokuRazy.GameView = {
  profileTemplate: "<h2>{{username}}'s Profile</h2>" +
                          "<p><b>Attempts:</b> {{attempts}}</p>" +
                            "<p><b>Wins:</b> {{wins}}",
                              // "<p><b>Win Percentage:</b> " + User.calculateWinPercentage("{{attempts}}", "{{wins}}")

  allUsersTemplate:  "{{#users}}" +
                            "<h3>{{username}}</h3>" +
                              "<p><b>Attempts</b>: {{attempts}}  |  <b>Wins:</b> {{wins}}</p>" +
                          "{{/users}}",

  setBoard: function(array) {
    $('#board td').each(function(i) {
      if (array[i] == "0") {
        $(this).attr('contenteditable', 'true').css('color', '#3d88dd')
      } else {
        $(this).html(array[i]).css('color', '#000')
      }
    })
  },

  shakeBoard: function() {
    $('#board').effect('shake', 1500, 6)
  },

  compileBoardToString: function() {
    var user_solution = $('#board td').text()
    return user_solution
  },

  clearBoard: function() {
    $('#board td').html("");
    $('#board td').attr('contenteditable', 'false')
  },

  clearTabArea: function(identifier) {
    identifier.empty()
  },

  appendTabArea: function(identifier, element) {
    identifier.append(element)
  },

  showLightbox: function() {
    $('.background, .winner').fadeIn('slow');
  },

  hideLightbox: function() {
    $('.background, .winner').hide();
  },

  toggleIncorrect: function() {
    $('.incorrect').slideDown('slow').delay(1500).slideUp('slow')
  }
}