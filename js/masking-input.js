/* 

INSTRUCTIONS
--------------------------------

example: 
<input id="expiration" type="tel" placeholder="MM/YY" class="masked" pattern="(1[0-2]|0\d)\/(1[5-9]|2\d)" data-valid-example="05/18">
<input id="zip" type="tel"  placeholder="XXXXX" pattern="\d{5}" class="masked">
<input id="zipcanada" type="tel"  placeholder="XXX XXX" pattern="\d\w\d \w\d\w" class="masked" data-charset="X_X _X_">

Input attributes
----------------
id - required.
type - optional. useful for correct keyboard
name - optional. needed if submitting via post or get
pattern - optional. Used for validation
placeholder - required. used for laying out the value
class='masked' - required for masking. if you change name, change js.
data-charset - needed if non-digits are allowed
data-valid-example - needed for validation in cases of complex patterns

*/


var masking = {

  // change class name, special characters and masking characters here:
  maskedInputs : document.getElementsByClassName('masked'),
  maskedNumber : 'XdDmMyY9',
  maskedLetter : '_',

  init: function () {
    masking.setUpMasks(masking.maskedInputs);
    masking.activateMasking(masking.maskedInputs);
  },

  setUpMasks: function (inputs) {
    var i, l = inputs.length;

    for(i = 0; i < l; i++) {
      masking.createShell(inputs[i]);
    }
  },
  
  // replaces each masked input with a shall containing the input and it's mask.
  createShell : function (input) {
    var text = '', 
        placeholder = input.getAttribute('placeholder');

    input.setAttribute('maxlength', placeholder.length);
    input.setAttribute('data-placeholder', placeholder);
    input.removeAttribute('placeholder');

    text = '<span class="shell">' +
      '<span aria-hidden="true" id="' + input.id + 
      'Mask"><i></i>' + placeholder + '</span>' + 
      input.outerHTML +
      '</span>';

    input.outerHTML = text;
  },

  setValueOfMask : function (e) {
    var value = e.target.value,
        placeholder = e.target.getAttribute('data-placeholder');

    return "<i>" + value + "</i>" + placeholder.substr(value.length);
  },
  
  // add event listeners
  activateMasking : function (inputs) {
    var i, l;

    for (i = 0, l = inputs.length; i < l; i++) {
      masking.maskedInputs[i].addEventListener('keyup', function(e) {
        masking.handleValueChange(e);
      }, false); 
    }
  },
  
  handleValueChange : function (e) {
    var id = e.target.getAttribute('id');
        
    switch (e.keyCode) { // allows navigating thru input
      case 20: // caplocks
      case 17: // control
      case 18: // option
      case 16: // shift
      case 37: // arrow keys
      case 38:
      case 39:
      case 40:
      case  9: // tab (let blur handle tab)
        return;
      }

    document.getElementById(id).value = masking.handleCurrentValue(e);
    document.getElementById(id + 'Mask').innerHTML = masking.setValueOfMask(e);

  },

  handleCurrentValue : function (e) {
    var isCharsetPresent = e.target.getAttribute('data-charset'), 
        placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder'),
        value = e.target.value, l = placeholder.length, newValue = '', 
        i, j, isInt, isLetter, strippedValue;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

    for (i = 0, j = 0; i < l; i++) {
        isInt = Number.isInteger(parseInt(strippedValue[j]));
        isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
        matchesNumber = masking.maskedNumber.indexOf(placeholder[i]) >= 0;
        matchesLetter = masking.maskedLetter.indexOf(placeholder[i]) >= 0;

        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {

                newValue += strippedValue[j++];

          } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {

                masking.errorOnKeyEntry(placeholder[i], strippedValue[j]);
                return newValue; 

        } else {
            newValue += placeholder[i];
        } 
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) { 
          break;
        }
    }
    if (e.target.getAttribute('data-valid-example')) {
      return masking.validateProgress(e, newValue);
    }
    return newValue;
  },

  validateProgress : function (e, value) {
    var validExample = e.target.getAttribute('data-valid-example'),
        pattern = new RegExp(e.target.getAttribute('pattern')),
        placeholder = e.target.getAttribute('data-placeholder'),
        l = value.length, testValue = '';

    //convert to months
    if (l == 1 && value < 10 && placeholder.toUpperCase().substr(0,2) == 'MM') {
      value = '0' + value;
    }
    // test the value, removing the last character, until what you have is a submatch
    for ( i = l; i >= 0; i--) {
      testValue = value + validExample.substr(value.length);
      if (pattern.test(testValue)) {
        return value;
      } else {
        value = value.substr(0, value.length-1);
      }
    }
  
    return value;
  },

  errorOnKeyEntry : function (expected, actual) {
    // this is a temp function. 
    // Please write your own error handling
    var action = expected == 'X' ? 'number' : 'letter';
    console.log('You entered ' + actual + ' when a ' + action + ' was expected');
  }
}

masking.init();