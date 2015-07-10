Input Masking
=====================

## Features

`input-mask.js` enables you to include a mask on any input where a specific data entry format is required. The placeholder text remains in place, displaying which characters still need to be included. The placeholder is CSS styleable.

The user can enter letters and numbers. All other characters, like spaces, dashes, and parenthesis are automatically added by the script, making data entery easier when using dynamic keypads.


## Example

<http://estelle.github.io/input-masking>

## Quick Start

Clone `masking-input.js`, and link to it.

	<script src="path/js/masking-input.js"></script>

Add either the css file `masking-input.css` to your page, or incorporate the .scss component into your sass build

	<link rel="stylesheet" href="path/css/masking-input.css"/>

Add inputs with `id`, `placeholder` and `pattern` attributes with the class of `masked`. Include `type="tel"` when requiring numbers only.

	 <label for="zip">Zip Code</label>
  	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
  	     class="masked" name="uszipcode" title="5-digit zip code"> 

If your placeholder includes non-digits and non-letters, no worries. They'll be added by the script. Your mobile users won't have to change their touch keyboards. They simply need to enter letters. 

Do make sure that your placeholder would match the regular expression of your pattern if all the X's were converted to integers. 

If your regular expressions include letters, you must include the made up `data-charset` attribute. Similar to the pattern, include an `X` for each number and an underscore `_` for each required letter.

	<label for="zipca">Canadian Zip Code</label>
  	<input placeholder="XXX XXX" pattern="\w\d\w \d\w\d" class="masked" 
  		data-charset="_X_ X_X" id="zipca" type="text" name="zipcodeca" 
  	    title="6-character alphanumeric zip code in the format of A1A 1A1">
  	
If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a valid value that would match the pattern.

	<label for="expiration"> Credit Card Expiration </label>
    <input id="expiration" type="tel" placeholder="MM/YY" class="masked" 
    	pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)" 
    	data-valid-example="05/18"> 
	

## Browser Support

* Safari
* Chrome
* Firefox
* Opera
* IE 8

## Customization

Don't like the class masked? Make up your own, and change the class in the CSS and the first line in the .

Want to use something other than X? right now the script handles XdDmMyY9 for numeric placeholding. MM/YY and mm/yy will work fine. Want to use something else, simply change the variable `maskedNumber` value in the JS

Want to use something other than X in your placeholder look for masked inputs that require both letters and numbers, you can. You can put different characters in your placeholder, as long as your `data-charset` contains Xs and _ only. If you require _ as a special character in your mask? Simply change the variable `maskedLetter` and in the JS, and also the value of `data-charset` in your HTML

## Documentation

Handles these test cases:

* If the pattern starts with a special character 
* If the next letter is a special character 
* If the next letter is more than one special character 
* If the browser doesn't support placeholder 
* If the browser doesn't support pattern - doesn't matter, does it?
* If the user deletes a letter 
* If the user deletes a special character 
* If the user enters a space 
* If the user uses arrow keys 
* If the user enters more than the allowed characters 
* If the user has a dynamic keyboard 
* Only uppercase letters are shown
* If the user enters an invalid character 
* if the user enters a special character that is already included
* If the user is using a screen reader
* If the user is using a touchpad
* If the user leaves the input
* If the user leaves the input and comes back
* If user gives focus before a special character, jumps forward if typed in.
* Value matches regular expression

## Exceptions

Complex Regular Expressions
If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a valid value that would match the pattern.

	<label for="expiration"> Credit Card Expiration </label>
    <input id="expiration" type="tel" placeholder="MM/YY" class="masked" 
    	pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)" 
    	data-valid-example="05/18"> 
    	
I've taken care of MM in `masking.validateProgress()`, because that is common. But if you have other exceptions, you may need to add other exceptions there.

## Contributions

[Estelle Weyl](http://twitter.com/estellevw). 

## License

This code is available under the [MIT license](LICENSE)

