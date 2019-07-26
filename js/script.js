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

let $colorOption = $('#color option');
const regex = /("?)(\w+\ )?(\w+\ )?(\w+\ \()?(\w+\ )+(\w*Puns\w*)(\ \w+\ )?(\w+\)?)("?)/;
let  colorOption = $colorOption.eq().text();
let $regExCheck = true;


////////////////////////////////////////////////////////////////////////////////
//  T-Shirt Section                                                           //
//----------------------------------------------------------------------------//
//  set value for the color drop down to $noneSelected                        //
//                                                                            //
//  based on the theme selected choose to show options with the .html() method//
////////////////////////////////////////////////////////////////////////////////

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

// Assingment Activity checkboxes
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

// function to add $200 to the total cost
function twoHundred() {
  if (this.checked) {
    $totalCost += 200;
    totalCost();
  } else {
    $totalCost -= 200;
    totalCost();
  }
}

// function to add $100 to the total cost
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

//append conflicting activity error messages
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
      $($sibs.eq(3), $sibs.eq(4)).hide();
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

// Validation Values
const vName = /^[A-Z\-'\s]+$/i;
const vEmail = /^[^@]+@[^@.]+\.[a-z]$/i;
const vCardNum = /^[\d]{13,16}$/;
const vZip = /^\d{5}$/;
const vCvv =/^\d{3}$/;

//Name Field can't be blank
function isValidName(name) {
  return vName.test(name);
}
//Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
function isValidEmail(email) {
  return vEmail.test(email);
}
//If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
//Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.
//Credit Card field should only accept a number between 13 and 16 digits.
function isValidCreditCard(cardNum) {
  return vCardNum.test(cardNum)
}
//The Zip Code field should accept a 5-digit number.
function isValidZip(zip) {
  return vZip.test(zip);
}
//The CVV should only accept a number that is exactly 3 digits long.
function isValidCvv(cvv) {
  return vCvv.test(cvv);
}

function validator(check, valid){
  return valid.test(check);

}

//User must select at least one checkbox under the "Register for Activities" section of the form.
// $(document).ready(function() {
//   let $checkboxes = $('input[type="checkbox"]');
//   $checkboxes.change(function() {
//     if($checkboxes.prop('checked')) {
//       console.log('checked');
//     }else {
//       console.log('unchecked');
//     }
//   });
// });


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
$('#zip').on("focusout", createListener(isValidZip));
$('#cvv').on("focusout", createListener(isValidCvv));

// Append Span / ToolTips for inputs then shows/hides based on input
$('#name').after('<span>Please Enter Your First and Last Name</span>');
$('#mail').after('<span>Must be a valid E-Mail Address \(name@example.com\)</span>');
$('#other-title').after('<span>Other Job Role if Job NOT Listed Above</span>');
$('#totalCostSection').before('<span>Please Select At Least <strong>ONE</strong> Activity</span>');
$('#cc-num').after('<span>Please Enter a valid Credit Card Number (13-16 Characters)</span>');
$('#zip').after('<span>Please enter a valid Zip Code (12345)</span>');
$('#cvv').after('<span>Please enter the 3 digit CVV (On the back of your card)</span>');

$('button').on('click', function() {
  // if (/*all form inputs valid*/){
  // submit form
  // } else if (/*any form inputs invalid*/) {
  event.preventDefault();
  // and show error reporting the issue
  // }
});

// If any of the following validation errors exist, prevent the user from submitting the form:
// Name field can't be blank.
// User must select at least one checkbox under the "Register for Activities" section of the form.
// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
