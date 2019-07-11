//on page load focus on name input
window.onload = function textBoxFocus() {
  $('#name').focus();

  //default hide the other-title textbox
  $('#other-title').hide();
};


//function to show textbox if other is selected and hide if else
$('#title').change(function() {
  if ($('#title').val() === "other") {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});
