$(document).ready(function() {
  new SudokuRazy.app()

  SudokuRazy.GameView.hideLightbox();
  $('.incorrect').hide()
  $('#tabs').tabs();
});