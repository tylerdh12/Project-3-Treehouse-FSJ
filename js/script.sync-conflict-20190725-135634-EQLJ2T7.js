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
  } else {
    $conflictedActivity.prop("disabled", false);
    $conflictedActivity.parent().removeClass("conflict");
  }
}

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
  $creditCardPaymentRequired();
  $('#payment option[value="credit card"]').attr('selected', true);
  $('#credit-card').siblings().eq(3).hide();
  $('#credit-card').siblings().eq(4).hide();
}

// run defaultPayment function
defaultPayment();

//Disables register button untill credit card is filled outline
function $creditCardPaymentRequired() {
  if ($('#payment option[value="credit card"]') === true) {
    $('button').attr('disabled', true);
  }
}

//changes state of payment methods when option is selected
$('#payment').change(function() {
    if ($('#payment').val() === "credit card") {
      $creditCardPaymentRequired();
      $('#credit-card').show();
      $('#credit-card').siblings().eq(3).hide();
      $('#credit-card').siblings().eq(4).hide();
    } else if ($('#payment').val() === "paypal") {
      $('#credit-card').hide();
      $('#credit-card').siblings().eq(3).show();
      $('#credit-card').siblings().eq(4).hide();
    }else if ($('#payment').val() === "bitcoin") {
      $('#credit-card').hide();
      $('#credit-card').siblings().eq(3).hide();
      $('#credit-card').siblings().eq(4).show();

    }
});

$()

////////////////////////////////////////////////////////////////////////////////
//  Form Validation Section                                                   //
//----------------------------------------------------------------------------//
//  functions to configure input validation                                   //
////////////////////////////////////////////////////////////////////////////////

// for( i = 0; i < inputs.length){
// $('input').each().prop('required',true);
// }

//Name Field can't be blank
function isValidName(name) {
  return /^[A-Z\-'\s]+$/i.test(name);
}

//Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

//User must select at least one checkbox under the "Register for Activities" section of the form.
let checkboxes = $('input[type="checkbox"]');


//If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
//Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.

  //Credit Card field should only accept a number between 13 and 16 digits.
  function isValidCreditCard(cardNum) {
    return /^[\d]{13,16}$/.test(cardNum)
  }
  //The Zip Code field should accept a 5-digit number.
  function isValidZip(zip) {
    return /^\d{5}$/.test(zip);
  }
  //The CVV should only accept a number that is exactly 3 digits long.
  function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
  }

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
$('#name').on("keyup", createListener(isValidName));
$('#mail').on("keyup", createListener(isValidEmail));
$('#cc-num').on("focusout", createListener(isValidCreditCard));
$('#zip').on("focusout", createListener(isValidZip));
$('#cvv').on("focusout", createListener(isValidCvv));

// Append Span / ToolTips for inputs
$('#name').after('<span>Please Enter Your Name</span>');
$('#mail').after('<span>Must be a valid E-Mail Address \(name@example.com\)</span>');
$('#other-title').after('<span>Other Job Role if Job NOT Listed Above</span>');
$('#totalCostSection').before('<span>Please Select At Least <strong>ONE</strong> Activity</span>');
$('#cc-num').after('<span>Please Enter a valid Credit Card Number (13-16 Characters)</span>');
$('#zip').after('<span>Please enter a valid Zip Code (12345)</span>');
$('#cvv').after('<span>Please enter the 3 digit CVV (On the back of your card)</span>');

// add an event listener to on the card number input to disable the button
//  prevent default until validation has passed
// $submit.on('click',function( event) { let number = /^\d{13,16}$/; let zip = /^\d{5}$/; let cvv = /^\d{3}$/; $ccNumber.before("<divid=numbererror></div>") ; $ccZip.before("<divid=ziperror></div>") ; $ccCvv.before("<divid=cvverror></div>");
//run formComplete()
// submit form only if form completed returns true
