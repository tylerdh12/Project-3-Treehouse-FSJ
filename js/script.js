//  Team Treehouse Unit 3 Project
//  Tyler Harper
//  July 16th 2019

////////////////////////////////////////////////////////////////////////////////
//  On Page Load Section                                                      //
//----------------------------------------------------------------------------//
//  focus on name input                                                       //
//  hide the other-title textbox                                              //
////////////////////////////////////////////////////////////////////////////////

window.onload = function textBoxFocus() {
  $('#name').focus();
  $('#other-title').hide();
};

////////////////////////////////////////////////////////////////////////////////
//  Job Role Other-title                                                      //
//----------------------------------------------------------------------------//
//  Show other-title text input if other is selected                          //
//  hide other-title text input if 'other' is not selected                    //
////////////////////////////////////////////////////////////////////////////////

$('#title').change(function() {
  if ($('#title').val() === "other") {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

////////////////////////////////////////////////////////////////////////////////
//  T-Shirt Color Section                                                     //
//----------------------------------------------------------------------------//
//  set value for the color drop down to $noneSelected                        //
//  based on the theme selected choose to show options with the .html() method//
////////////////////////////////////////////////////////////////////////////////

let $colorOption = $('#color option');
let  colorOption = $colorOption.eq().text();

$('#colors-js-puns').hide();
$('#design>option:eq(0)').attr('disabled', true);

$('#design').change(function(){
  if ($('#design option:selected').val() === "js puns") {
    $('#colors-js-puns').show();
    $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
  } else if ($('#design option:selected').val() === "heart js") {
    $('#colors-js-puns').show();
    $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
  }
});

////////////////////////////////////////////////////////////////////////////////
//  Activities Section                                                        //
//----------------------------------------------------------------------------//
//  Assign all Activities to a variable                                       //
//  Total cost section and math for activities selected                       //
//  Conditional loop for conflicting Activities                               //
////////////////////////////////////////////////////////////////////////////////

// Assingment of Activity checkboxes
const $mainConf = $('input[name=all]');               // Main Conference — $200
const $jsFrameworks = $('input[name=js-frameworks]'); // JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100
const $jsLibs = $('input[name=js-libs]');             // JavaScript Libraries Workshop — Tuesday 1pm-4pm, $100
const $express = $('input[name=express]');            // Express Workshop — Tuesday 9am-12pm, $100
const $node = $('input[name=node]');                  // Node.js Workshop — Tuesday 1pm-4pm, $100
const $buildTools = $('input[name=build-tools]');     // Build tools Workshop — Wednesday 9am-12pm, $100
const $npm = $('input[name=npm]');                    // npm Workshop — Wednesday 1pm-4pm, $100

//  Total Cost variables
let $totalCost = 0;
let $totalCostSection = '<div id=totalCostSection><h3></h3></div>'
$('.activities').append($totalCostSection);

// function to +/- $200 to the total cost
function twoHundred() {
  if (this.checked) {
    $totalCost += 200;
    totalCost();
  } else {
    $totalCost -= 200;
    totalCost();
  }
}

// function to +/- $100 to the total cost
function oneHundred() {
  if (this.checked) {
    $totalCost += 100;
    totalCost();
  } else {
    $totalCost -= 100;
    totalCost();
  }
}

// Event Listener Change to modify the total cost
$mainConf.on('change', twoHundred);
$jsFrameworks.on('change', oneHundred);
$jsLibs.on('change', oneHundred);
$express.on('change', oneHundred);
$node.on('change', oneHundred);
$buildTools.on('change', oneHundred);
$npm.on('change', oneHundred);

// Modify the h3 text to show the total cost
function totalCost() {
$('#totalCostSection h3').text('$' + $totalCost);
}

// conflictWith Function
function conflictWith($activity, $conflictedActivity) {
  if ($activity.is(':checked')) {
    $conflictedActivity.prop("disabled", true);
    $conflictedActivity.parent().addClass("conflict");
    $activity.siblings().show();
  } else {
    $conflictedActivity.prop("disabled", false);
    $conflictedActivity.parent().removeClass("conflict");
    $activity.siblings().hide();
  }
}

// append error to activities not selected
$('fieldset.activities legend').append('<div class="activitiesNeeded">Please select at least 1 (one) activity to submit the form</div>');

// append conflicting activity error messages
$jsFrameworks.parent().append('<div class="checkBoxConflicts">This activity conflicts with the Express Workshop</div>');
$jsLibs.parent().append('<div class="checkBoxConflicts">This activity conflicts with the Node Workshop</div>');
$express.parent().append('<div class="checkBoxConflicts">This activity conflicts with the Javascript Frameworks Workshop</div>');
$node.parent().append('<div class="checkBoxConflicts">This activity conflicts with the Javascript Libraries Workshop</div>');



// Event Listener for each Activity and its Confliction activity
$jsFrameworks.on('change', () => conflictWith($jsFrameworks, $express));
$jsLibs.on('change', () => conflictWith($jsLibs, $node));
$express.on('change', () => conflictWith($express, $jsFrameworks));
$node.on('change', () => conflictWith($node, $jsLibs));

////////////////////////////////////////////////////////////////////////////////
//  Credit card Section                                                       //
//----------------------------------------------------------------------------//
//  Disable "Select Payment Method" option from dropdown                      //
//  Set Credit Card as DEFAULT payment option                                 //
//  Hide alternative methods of payment when one option is selected           //
////////////////////////////////////////////////////////////////////////////////

// Disables Select Payment Method option
$('#payment option[value="select_method"]').attr('disabled', true);

// Sets Credit Card as DEFAULT option
function defaultPayment() {
  $('#payment option[value="credit card"]').attr('selected', true);
  $('#credit-card').siblings().eq(3).hide();
  $('#credit-card').siblings().eq(4).hide();
}

// run defaultPayment function
defaultPayment();

//changes state of payment methods when option is selected
const $sibs = $('#credit-card').siblings();

$('#payment').change(function() {
    if ($('#payment').val() === "credit card") {
      $('#credit-card').show();
      $sibs.eq(3).hide();
      $sibs.eq(4).hide();
    } else if ($('#payment').val() === "paypal") {
      $('#credit-card').hide();
      $sibs.eq(3).show();
      $sibs.eq(4).hide();
    }else if ($('#payment').val() === "bitcoin") {
      $('#credit-card').hide();
      $sibs.eq(3).hide();
      $sibs.eq(4).show();

    }
});

////////////////////////////////////////////////////////////////////////////////
//  Form Validation Section                                                   //
//----------------------------------------------------------------------------//
//  functions to configure input validation                                   //
////////////////////////////////////////////////////////////////////////////////

// Validation Values using RegEx
const vName = /^[A-Z\-'\s]+$/i;
const vEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const vCardNum = /^[\d]{13,16}$/;
const vZip = /^\d{5}$/;
const vCvv =/^\d{3}$/;
//Name Field validation
function isValidName(name) {
  if (name !== "" &&  vName.test(name)) {
    $('#name').addClass('isValid');
    $('#name').removeClass('notValid');
    $('#nameError').hide();
    return vName.test(name);
  } else if ($('#name').val() == ""){
    $('#name').addClass('notValid');
    $('#name').removeClass('isValid');
  } else {
    $('#nameError').hide();
    $('#name + span').show()
    $('#name').addClass('notValid');
    $('#name').removeClass('isValid');
  }
}

//Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
function isValidEmail(email) {
  if (email !== "" &&  vEmail.test(email)) {
    $('#mail').addClass('isValid');
    $('#mail').removeClass('notValid');
    $('#mailError').hide();
    return vEmail.test(email);
  } else if ($('#mail').val() == ""){
    $('#mail').addClass('notValid');
    $('#mail').removeClass('isValid');
  } else {
    $('#mailError').hide();
    $('#mail').addClass('notValid');
    $('#mail').removeClass('isValid');
  }
}
//If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
//Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.
//Credit Card field should only accept a number between 13 and 16 digits.
function isValidCreditCard(cardNum) {
  if ($('#cc-num').val() !== "" &&  vCardNum.test(cardNum)) {
    $('#cc-num').addClass('isValid');
    $('#cc-num').removeClass('notValid');
    $('#cnumError').hide();
    return vCardNum.test(cardNum);
  } else if ($('#cc-num').val() == ""){
    $('#cc-num').addClass('notValid');
    $('#cc-num').removeClass('isValid');
  } else  {
    $('#cnumError').hide();
    $('#cc-num').addClass('notValid');
    $('#cc-num').removeClass('isValid');
  }
}
//The Zip Code field should accept a 5-digit number.
function isValidZip(zip) {
  if (zip !== "" &&  vZip.test(zip)) {
    $('#zip').addClass('isValid');
    $('#zip').removeClass('notValid');
    $('#zipError').hide();
    return vZip.test(zip);
  } else if ($('#zip').val() == ""){
    $('#zip').addClass('notValid');
    $('#zip').removeClass('isValid');
  } else {
    $('#zipError').hide();
    $('#zip').addClass('notValid');
    $('#zip').removeClass('isValid');
  }
}
//The CVV should only accept a number that is exactly 3 digits long.
function isValidCvv(cvv) {
  if (cvv !== "" &&  vCvv.test(cvv)) {
    $('#cvv').addClass('isValid');
    $('#cvv').removeClass('notValid');
    $('#cvvError').hide();
    return vCvv.test(cvv);
  } else if ($('#cvv').val() == ""){
    $('#cvv').addClass('notValid');
    $('#cvv').removeClass('isValid');
  } else {
    $('#cvvError').hide();
    $('#cvv').addClass('notValid');
    $('#cvv').removeClass('isValid');
  }
}

function isValidChkBox() {
  if ($('input[name=all]').is(':checked') || $('input[name=js-frameworks]').is(':checked') || $('input[name=js-libs]').is(':checked') || $('input[name=express]').is(':checked') || $('input[name=node]').is(':checked') || $('input[name=build-tools]').is(':checked') || $('input[name=npm]').is(':checked')){
    $('fieldset.activities').addClass('isValid');
    $('fieldset.activities').removeClass('notValid');
    $('.activitiesNeeded').hide();
  } else {
    $('fieldset.activities').removeClass('isValid');
    $('fieldset.activities').addClass('notValid');
    $('.activitiesNeeded').show();
  }
}

//User must select at least one checkbox under the "Register for Activities" section of the form.
$mainConf.on('change', isValidChkBox);
$jsFrameworks.on('change', isValidChkBox);
$jsLibs.on('change', isValidChkBox);
$express.on('change', isValidChkBox);
$node.on('change', isValidChkBox);
$buildTools.on('change', isValidChkBox);
$npm.on('change', isValidChkBox);

// Show or Hide the ToolTips
function showOrHideToolTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

// Runs the validator function through the validators above
function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideToolTip(showTip, tooltip);
  };
}

// All Inputs connected here will have live error reporting due to the handler used
// Event Listeners for checking the validations
$('#name').on("input", createListener(isValidName));
$('#mail').on("input", createListener(isValidEmail));
$('#cc-num').on("input", createListener(isValidCreditCard));
$('#zip').on("input", createListener(isValidZip));
$('#cvv').on("input", createListener(isValidCvv));

// this is a second error for the Credit card number to remind them not to leave it blank
$('#name').after('<div id="nameError" class="emptyError">Please Do Not leave Blank</div>')
$('#mail').after('<div id="mailError" class="emptyError">Please Do Not leave Blank</div>')
$('#cc-num').after('<div id="cnumError" class="emptyError">Please Do Not leave Blank</div>')
$('#zip').after('<div id="zipError" class="emptyError">Please Do Not leave Blank</div>')
$('#cvv').after('<div id="cvvError" class="emptyError">Please Do Not leave Blank</div>')

// Append Span / ToolTips for inputs then shows/hides based on input
$('#name').after('<span>Please Enter Your Name</span>');
$('#mail').after('<span>Must be a valid E-Mail Address \(name@example.com\)</span>');
$('#other-title').after('<span>Select job role if not listed above</span>');
$('#totalCostSection').before('<span>Please Select At Least <strong>ONE</strong> Activity</span>');
$('#cc-num').after('<span>Please Enter a valid Credit Card Number (13-16 Characters)</span>');
$('#zip').after('<span>Please enter your Zip Code (12345)</span>');
$('#cvv').after('<span>Please enter the 3 digit CVV (On the back of your card)</span>');

function showError(element, elementError) {
  if (element.val() == "") {
  	elementError.show();
  } else {
    elementError.hide();
  }
}

function defaultErrors() {
  showError($('#name'), $('#nameError'));
  showError($('#mail'), $('#mailError'));
  isValidChkBox();
}

function creditCardErrors() {
  showError($('#cc-num'), $('#cnumError'));
  showError($('#zip'), $('#zipError'));
  showError($('#cvv'), $('#cvvError'));
}

$('form').on('submit', function() {
  defaultErrors();
  if ($('#payment').val() === "credit card"){
    creditCardErrors();
    if ($('input#name').hasClass("isValid") && $('input#mail').hasClass("isValid") && $('fieldset.activities').hasClass('isValid') && $('input#cc-num').hasClass("isValid") && $('input#zip').hasClass("isValid") && $('input#cvv').hasClass("isValid")) {
    } else {
      event.preventDefault()
    }
  } else if ($('#payment').val() === "paypal") {
    if ($('input#name').hasClass("isValid") && $('input#mail').hasClass("isValid") && $('fieldset.activities').hasClass('isValid')){
    } else {
      event.preventDefault();
    }
  } else if ($('#payment').val() === "bitcoin") {
    if ($('input#name').hasClass("isValid") && $('input#mail').hasClass("isValid") && $('fieldset.activities').hasClass('isValid')){
    } else {
      event.preventDefault();
    }
  }
});


// User must select at least one checkbox under the "Register for Activities" section of the form.
// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
