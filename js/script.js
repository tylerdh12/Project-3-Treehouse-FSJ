

let $colorOption = $('#color option');

////////////////////////////////////////////
/////       On Page Load Section       /////
/////----------------------------------/////
/////       focus on name input        /////
/////   hide the other-title textbox   /////
////////////////////////////////////////////

window.onload = function textBoxFocus() {
  $('#name').focus();
  $('#other-title').hide();
};

////////////////////////////////////////////
/////       Job Role Other-title       /////
/////----------------------------------/////
/////      hide other-title input      /////
/////     Show if other is selected    /////
////////////////////////////////////////////

$('#title').change(function() {
  if ($('#title').val() === "other") {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

const regex = /("?)(\w+\ )?(\w+\ )?(\w+\ \()?(\w+\ )+(\w*Puns\w*)(\ \w+\ )?(\w+\)?)("?)/;
let  colorOption = $colorOption.eq().text();
let $regExCheck = true;

$('#colorOption').each(function(i) {

});

///////////////////////////////////////////
/////         T-Shirt Section         /////
/////---------------------------------/////
/////   set value for the color dropnode  /////
/////   down to $noneSelected         /////
/////   ...........................   /////
/////   based on the theme selected   /////
/////   choose to show options with   /////
/////   the .html() method            /////
///////////////////////////////////////////

const $noneSelected = '<option value="none">Please Select a Design then a Color</option>';
$('#color').html($noneSelected);

$('#design').change(function(){
  if ($('#design option:selected').val() === "Select Theme") {
    $('#color').html($noneSelected);
  } else if ($('#design option:selected').val() === "js puns") {
    $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
  } else if ($('#design option:selected').val() === "heart js") {
    $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
  }
});

///////////////////////////////////////////
/////       Activities Section        /////
/////---------------------------------/////
/////   set value for the color drop  /////
/////   down to $noneSelected         /////
/////   ...........................   /////
/////   based on the theme selected   /////
/////   choose to show options with   /////
/////   the .html() method            /////
///////////////////////////////////////////

const $mainConf = $('input[name=all]');               // Main Conference — $200
const $jsFrameworks = $('input[name=js-frameworks]'); // JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100
const $jsLibs = $('input[name=js-libs]');             // JavaScript Libraries Workshop — Tuesday 1pm-4pm, $100
const $express = $('input[name=express]');            // Express Workshop — Tuesday 9am-12pm, $100
const $node = $('input[name=node]');                  // Node.js Workshop — Tuesday 1pm-4pm, $100
const $buildTools = $('input[name=build-tools]');     // Build tools Workshop — Wednesday 9am-12pm, $100
const $npm = $('input[name=npm]');                    // npm Workshop — Wednesday 1pm-4pm, $100

let $totalCost = 0;
let $totalCostSection = '<div id=totalCostSection><h3></h3></div>'
$('.activities').append($totalCostSection);

//function to add $200 to the total cost
function twoHundred() {
  if (this.checked) {
    //add 200$ to $totalCost
    $totalCost += 200;
    totalCost();
  } else {
    $totalCost -= 200;
    totalCost();
  }
}

//function to add $100 to the total cost
function oneHundred() {
  if (this.checked) {
    //add 200$ to $totalCost
    $totalCost += 100;
    totalCost();
  } else {
    $totalCost -= 100;
    totalCost();
  }
}

//added the change event listener to each and assigned the value to modify the total cost
$mainConf.on('change', twoHundred);
$jsFrameworks.on('change', oneHundred);
$jsLibs.on('change', oneHundred);
$express.on('change', oneHundred);
$node.on('change', oneHundred);
$buildTools.on('change', oneHundred);
$npm.on('change', oneHundred);

//Modify the h3 text to show the total cost
function totalCost() {
$('#totalCostSection h3').text('$' + $totalCost);
}

//$jsFrameworks conflicts with $express
//$jsLibs conflicts with $node

//create conditional loop that adds a class that strike through changes the color and disables the checkbox

function conflictWith($activity, $conflictedActivity) {
  if ($activity.is(':checked')) {
    $conflictedActivity.prop("disabled", true);
    $conflictedActivity.parent().addClass("conflict");
  } else {
    $conflictedActivity.prop("disabled", false);
    $conflictedActivity.parent().removeClass("conflict");
  }
}


$jsFrameworks.on('change', () => conflictWith($jsFrameworks, $express));
$jsLibs.on('change', () => conflictWith($jsLibs, $node));
$express.on('change', () => conflictWith($express, $jsFrameworks));
$node.on('change', () => conflictWith($node, $jsLibs));
