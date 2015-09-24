Input Masking
=====================

## Features

`input-mask.js` enables you to include a mask on any input where a specific data entry format is required. The placeholder text remains in place, displaying which characters still need to be included. The placeholder is CSS styleable.

The user can enter letters and numbers. All other characters, like spaces, dashes, and parenthesis are automatically added by the script, making data entery easier when using dynamic keypads.


## Example

<http://estelle.github.io/input-masking>

## Quick Start

Include `masking-input.js`.

```html
<script src="path/js/masking-input.js" data-autoinit="true"></script>`
```

Add either the css file `masking-input.css` to your page, or incorporate the .scss component into your sass build

```html
<link rel="stylesheet" href="path/css/masking-input.css"/>
```

Add inputs with `id`, `placeholder` and `pattern` attributes with the class of `masked`. Include `type="tel"` when requiring numbers only.
```html
	 <label for="zip">Zip Code</label>
  	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
  	     class="masked" name="uszipcode" title="5-digit zip code"> 
```

If your placeholder includes non-digits and non-letters, no worries. They'll be added by the script. Your mobile users won't have to change their touch keyboards. They simply need to enter letters. 

Do make sure that your placeholder would match the regular expression of your pattern if all the X's were converted to integers. 

If your regular expressions include letters, you must include the made up `data-charset` attribute. Similar to the pattern, include an `X` for each number and an underscore `_` for each required letter.

```html
	<label for="zipca">Canadian Zip Code</label>
  	<input placeholder="XXX XXX" pattern="\w\d\w \d\w\d" class="masked" 
  		data-charset="_X_ X_X" id="zipca" type="text" name="zipcodeca" 
  	    title="6-character alphanumeric zip code in the format of A1A 1A1">
```

If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a valid value that would match the pattern.

```html
	<label for="expiration"> Credit Card Expiration </label>
    <input id="expiration" type="tel" placeholder="MM/YY" class="masked" 
    	pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)" 
    	data-valid-example="05/18"> 
```

## Accessibility

There are accessibility features baked into the examples that you must maintain to maintain accessibility.

* Always include a label for each form control, and associate the form control either implicitly by nesting it, or explicitly with the `for` and `id` attributes.
* Always include a `title` attribute that describes the expected pattern when including the `pattern` attribute.
* Always use the best input `type` for the job, so dynamic touchpad users get the right touchpad for the job. Generally this will always be `type="tel"`, as most masking is for digits only. However, when alphanumeric characters are required, use `type="text"`. And, while I've included an expiration month to show an example of using complex regular expressions, use `type="month"` instead of this script.


## Browser Support

* Safari
* Chrome
* Firefox
* Opera
* IE 8

## Customization

### Initalization
If you are ok with all the default options you can have masked-inputs initalize it self and avoid writing any JavaScript at all. Simplu add the attribute `data-autoinit="false"` to your script tag

`<script src="path/js/masking-input.js" data-autoinit="true"></script>`

Alternativly if you need to pass custom options or want to initalize the script your self you can do so like this

```js
new InputMask( */options*/ );
```

### Options
#### masked
Don't like the class `masked` for a selector? Pass an options object instead and set your selector with the masked property or event pass a `nodeList`.

```js
// Selector
new InputMask({
  masked: ".custom-selector"
});

// Node List
new InputMask({
  masked: nodeList
});
```

#### number
Want to use something other than X? right now the script handles XdDmMyY9 for numeric placeholding. MM/YY and mm/yy will work fine. Want to use something else, simply pass an options object setting the `number` option.

```js
// Selector
new InputMask({
  number: 'XZdDmMyY9'
});
```

#### letter
Want to use something other than X in your placeholder look for masked inputs that require both letters and numbers, you can. You can put different characters in your placeholder, as long as your `data-charset` contains Xs and _ only.

```html
<input placeholder="XXX XXX" pattern="\w\d\w \d\w\d" class="masked" 
      data-charset="?X? X?X" id="zipca" type="text" name="canadianzip" 
        title="6-character alphanumeric code in the format of A1A 1A1">
```

If you require _ as a special character in your mask? Simply pass an options object setting the `letter` option, and also the value of `data-charset` in your HTML.

```js
new InputMask({
  letter: '?'
});
```

```html
<input placeholder="XXX_XXX" pattern="\w\d\w\_\d\w\d" class="masked" 
      data-charset="?X?_X?X" id="underscore" type="text" name="underscoredstring" 
        title="6-character alphanumeric code in the format of A1A_1A1">
```

#### onError
Want to add error handling? Simply pass a function to the `onError` option. The function will recieve the keyboard event as the first paramater.
```js
new InputMask({
  onError: function( e ) {
    // Handle your errors!
  }
});
```
#### noValidate

As the *pattern* attribute is being used, you may want to add via javascript the *novalidate* attribute on any ancestor `form` or form control to disable native browser validation. Do add it via JS, because if the JS fails, native validation is a good alternative.

You can have input masking do this for you by setting the `noValidate` option to true.

```js
new InputMask({
  noValidate: true
});
```

## Documentation

Handles these test cases:

* OK if the pattern starts with a special character 
* OK if the next letter is a special character 
* Can handle more than one special character 
* Doesn't matter if browser supports placeholder attribute: appears even in IE8 
* Doesn't matter if browser supports pattern attribute: still works
* characters can be deleted or added mid input
* Arrow keys can be used
* Sets up maxlength based on placeholder length
* Only uppercase letters are shown (this can be changed)
* If user enters an invalid character, character deleted 
* Enters special characters automagically
* No unwanted characters are read by screen reader
* Supports keyboard, mouse and touchpad
* Works if the user leaves the input and comes back 
* If user gives focus before a special character, jumps forward if typed in.
* Matches simple regular expressions
* Can be made to match complex regular expression

## Exceptions

####Complex Regular Expressions
If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a **valid** value that would match the pattern.

```html
	<label for="expiration"> Credit Card Expiration </label>
    <input id="expiration" type="tel" placeholder="MM/YY" class="masked" 
    	pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)" 
    	data-valid-example="11/18"
    	title="2-digit month and 2-digit year greater than 01/15"> 
```

I've taken care of MM in `masking.validateProgress()`, because that is common. If you have  exceptions, add the exceptions there. If you need an expiration month, it is best to use `<input type="month">` instead.

## ReactJS version

```html
	var React = require('react'),
		MaskedInput = require('../index');

	window.onload = function () {
    	React.render(
	 <ul>
           <li>
	    <label htmlFor="month">Month</label>
            <MaskedInput 
            id="month" 
            type="tel" 
            placeholder="MM/YY"
            pattern="(1[0-2]|0[1-9])\/\d\d" 
            data-valid-example="11/18"
            title="2-digit month and 2-digit year greater than 01/15" />
        </li>
        <li>
          <label htmlFor="zip">Zip Code</label>
          <MaskedInput 
            id="zip" 
            type="tel" 
            placeholder="XXXXX" 
            pattern="\d{5}" 
            required
            title="5-digit zip code" />
        </li>      
        </ul>,
        document.getElementById('component')
    );
  };
```

## Contributors

[Estelle Weyl](http://twitter.com/estellevw). 
[Alex Schmitz](http://twitter.com/alexrschmitz).

## License

This code is available under the [MIT license](LICENSE)

## Thanks

Thanks to @[stevefaulkner](https://twitter.com/stevefaulkner)

