The `placeholder` attribute, available, for `<textarea>` and several `<input>` types, enables providing a hint describing the expected value of a form control.  For example, a developer can tell a browser to display "http://www.example.com" for a URL input type for a web resource or "XXXXX-XXXX" for an input requiring a long format American zip code. The `placeholder` attribute has been [supported since IE 10](http://caniuse.com/#search=placeholder%20attribute). 

Here is an example of the placeholder attribute displayed in a text input type.

<hr>
<label for="fc1">Input with Placeholder: </label><input type="text" placeholder="this is the placeholder text" id="fc1">
<hr>

The placeholder appears as gray text inside the input field, as shown above. The contrast ratio of the default grey against the default white does not meet [accessibility guidelines for contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) or the preference of many visual designers. In addition, the placeholder disappears when the value becomes non-null. This removes a potentially helpful hint as to the requirements of the field and is not the experience sought by many UX designers. For these two reasons, designers and developers have wanted "input-masking". They've been asking for a permanent, stylable placeholder that demarks what the user is allowed to enter in as input in the input field. With Stylable Accessible Input Mask (SAIM), there is finally an accessible solution for this demand.

## Accessibility &amp; Placeholder

While I am not here to argue about the pros and [cons of placeholders](https://medium.com/simple-human/10-reasons-why-placeholders-are-problematic-f8079412b960) when it comes to accessibilty in general, there are many accessiblity concerns when it comes to web forms and the placeholder attribute in particular. 

Always include a label for each form control enclosed within a `<label>` tag. If the form control is not nested within the label, include the `for` attribute in the opening `label`. The `for` attribute takes as it's value the `id` of the form control with which it is associated. When the user clicks on the label, focus will go to the form control. This increases the hit area for your form controls improving usability for mouse and touch screen users. In addition, screen readers speak the content of the label, informing the AT user as to the purpose of the form control. The lack of a separate label reduces the size of the hit region available for setting focus on the control. The hint given by the label is always shown, unless ARIA attributes provide alternatives. 

<hr>
	<label for="zip">US Zip code: </label>
	<input type="tel" placeholder="XXXXX" id="zip" 
	    title="5 digit zip code" pattern="\d{5}">
<hr>

Do not use the `placeholder` attribute as a replacement for a `<label>` as it reduces the accessibility and usability of the form control.  The `placeholder` is not an alternative for `<label>` nor for the `title` attribute. While the label is shown at all times, the placeholder text is only shown before the user enters a value. Some screenreader / browser combinations read the value of the `placeholder` attribute. Others do not. Consider the placeholder as a progressive enhancement improving accessibility for some sited users. Do not rely on it. Always, always, always include a label for each form control.

If `pattern` is used, include the `title` attribute describing the expected pattern. The WHATWG specification states "When an input element has a `pattern` attribute specified, authors should include a `title` attribute to give a description of the pattern." The `placeholder` value is shown before the user enters a value. While it is read by some screen readers, it disappears and is not available to the sited user once the form field is no longer empty. The `title` attribute is read when the user requests further help. It is also visible to sited mouse users when the form control is hovered in most browsers, even when the form control is not empty. No, the `title` attribute is not the solution to all accessiblity concerns, but it is an improvement, and shouldn't be left out simply because keyboard users can't access it. If you use SAIM, sited keyboard users will see the input mask, resolving this concern. The best solution to the pattern description is actually a hint, visible and available to all users all the time, but good luck getting that past some design teams. 
 
## Watermarks: JavaScript Precursor for Placeholder

Prior to being added to the HTML5 specification, there was a huge demand for a placeholder-like feature. Designers demanded text boxes show a hint when empty. In response, developers created "watermark" plugins for input elements.  The plethora of watermark/placeholder plugins varied in size, with many being plugins sitting on top of larger required framework or library downloads. 

Here an example of a watermarked input:[^1]

[^1]:This version was created with inline event handlers, but demonstrates the behavior created by larger watermarking scripts.)

<label for="fc2">Input with Watermark:</label> <input value="this is a watermark" id="fc2" onfocus="if(this.value=='this is a watermark') this.value='';"
onblur="if(this.value=='') this.value='this is a watermark';">


Like the plethora of watermark scripts, when the `placeholder` attribute was first supported natively in Safari 5, the placeholder text disappeared when the input field received focus. This, like the watermark, was less than optimal for usability. Autofocusing on a form control meant the placeholder text would never be seen, and the short hint -  whether a watermark or HTML5 placeholder text - would never be read. 

Autofocusing itself is bad for usability, but this disappearing on focus was especially bad for keyboard users: whenever a user tabbed into the input or textarea with the keyboard, the placeholder attribute text would disappear. Fortunately, watermarking scripts -- with text that disappears on focus -- have been replaced by native support for the more usable `placeholder` attribute - which remains visible in all supporting browsers until the value of the input is non-empty. 

### Benefits of `placeholder` attribute

The `placeholder` attribute is an improvement over the watermark. 

A benefit of the `placeholder` attribute is that it is a native HTML attribute. HTML is by default accessible (It's our job to not @#$% it up). Being native, there is no need for JavaScript in implementing `placeholder`.  This is a huge benefit over watermarking scripts.

The other huge benefit of `placeholder` is that the placeholders remain visible on focus, disappearing only when the value is not empty -- disappearing when any character is entered into the form control. 

This is much better than the plethora of watermark plugins, but is still less than optimal. Designers and developers have been looking for input masking solutions:  

## Input Masking

While the `placeholder` attribute definitely improves usability, it can be improved upon. Permanance and validation are two frequently requested features: UX designers want the pattern to continue to display as the user enters data, while disallowing non-conforming characters and auto-entering non-number or letters such as spaces, dashes and parenthesis. Some designers also desire control over placeholder colors, which is not a feature supported in current browsers, though is accessible via proprietary shadow DOM properties, and will be accessible in the future via the `::placeholder` pseudo element selector:

	::-webkit-input-placeholder {
		/* Style placeholder for Safari, Chrome & Opera */
	}
	::-moz-placeholder {
		/* Style placeholder for Firefox */
	}
	:-ms-input-placeholder {
		/* Style placeholder for IE & Edge */
	}
	::placeholder {
		/* Style the placeholder for Firefox 51+ and future browser versions */
	}

Similar to `placeholder`, an input mask is a string expression defined by a developer informing the user what should be entered into a form control. Unlike placeholder or watermarks, the input mask should remain visible, guiding the user thru the pattern or syntax of the expected value as data is entered. Unlike `placeholder`, or it's JavaScript watermark predecessor, input masks define what the user is allowed to enter into the form control, setting the format to which the entered data must conform.

Input masks guide the user in entering fixed width data when you want them to enter the data in a specified format like zip codes, dates, credit card numbers and phone numbers.

A few input masking scripts have been created. Most are plugins sitting atop larger libraries or frameworks. For example, the [jQuery.inputmask plugin](http://robinherbots.github.io/Inputmask/) weighs in at 29 kb, while requiring jQuery at 37.7 kb as a dependency. All available, open source solutions place the mask within the input element, as the value of the `value` attribute, negatively impacting accessibility. By being appended to the value, the mask produced by these scripts can not be styled differently from the value. 

Remember, the input element is an empty element. As such, we can't put a span around part of a value to change the color of just the mask.

My goal in creating Styleable, Accessible Input Mask (SAIM) was to create a progressively enhanced input masking script that was lightweight in terms of JavaScript (and therefore bandwidth), accessible, and syleable. 

I wanted to create a framework-free (not just framework agnostic) input mask that was reliant on the developr using semantic HTML as the base markup. By forcing semantic HTML, the form renders and is accessible whether or not JavaScript is enabled: the script itself is a progressive enhancement. 

The mask is separate from the input element, and can therefore be styled to any color, preferably one that differentiates the input mask text from the current value the user is entering.

The SAIM script enables you to include a mask on any input where a specific data entry format is required. The placeholder-like text remains in place, displaying which characters still need to be included. The faux placeholder input mask is styleable with CSS without requiring access to shadow DOM or any browser-specific or vendor-prefixed features.

With SAIM, the user can enter letters and numbers. All other characters that are uniformly required for that specific input -- like spaces, dashes, and parenthesis -- are automatically added by the SAIM script, making data entery easier when using dynamic keypads. The mask automatically updates to reflect the characters that still remain to be entered as the user progresses thru data entry. SAIM prevents the user from entering invalid data. 

Here's what the script produces. 

<http://estelle.github.io/input-masking> <!-- put the content from that page here -->

> Color Contrast Note: For SAIM, you should ensure their is sufficient contrast between the color of the value text and the mask itself to be able to differentiate between the two. The contrast ratio of the text color of the input mask in this example, just like the placeholder, both part of active UI components, are not 3:1. According to WCAG implementation guidelines, text that is part of an inactive user interface component, does not have no contrast requirement. For the `placeholder` attribute, you must use the pseudo-elements and proprietary selectors to target the placeholder for styling. With SAIM, you can increase the ratio to 3:1 with simple CSS.

The SAIM script works by adding 3 nodes to the DOM for each form control having the `masked` class. 

Each masked form control is encapsulated by a mask shell. The shell contains the mask placeholder, with a nested node containing a copy of the current value of the form control. This is placed before the form control in the DOM, and is made to appear directly behind the text box with a few lines of CSS. I'll explain it in more detail below. 

SAIM was tested and works in Safari, Chrome, Firefox, Opera and even IE 8. If you need to support IE 8 or anything older, there is a version of the script that works with jQuery. You don't need to use jQuery and the jQuery version: if you don't, you'll have to add a few lines to support `attachEvent` for IE, and replace `classList` for browsers that came before the selectors API was supported.

## What the developer marks up

To create an input mask, create a semantic form control with an associated label using HTML5 input types and attributes. The only differences between a regular form control and a masked control is 1) some HTML5 attributes are required for the masked input types, and 2) you must include the `masked` class, or other class name you define. 

The `input` to be masked should include seven attributes, including:
 
* `id`: 

The `id` is necessary for pairing up the form control with its associated label. It is also used by the script for pairing the mask with the form control. 

* `class`: 

The `class` of the input includes "masked" or other masking class set by the developer. 

* `pattern`:

The `pattern` defines the regular expression the valid value must conform to. (You only want a mask if you have a pattern. If there is no pattern to match, there will be no mask that makes sense).

* `placeholder`:

The `placeholder` is the placeholder or masking text. 

* 	`name`: 

The `name` is required if you are submitting the form, as forms pass along name/value pairs. 

* `title`: 

The `title` attribute, which is not officially required, is essentially required whenever the `pattern` attribute is used for accessibility reasons: the `title` is used to describe the requirements of the regular expression.

* `type`:
	
The `type` attribute should also be included, usually to `type="tel"` as most form controls that could make use of a masking are numeric values. On devices with dynamic keypads, this type will generally provide the user with a numeric telephone keypad instead of the QWERTY keypad. If ommitted, it still works, defaulting to `type="text"`, displaying the QWERTY keypad on touch devices. You don't want to use `type="num"` as you don't want the spinner GUI.

We create a label with a `for` attribute, along with an input. As noted, include `type="tel"` when requiring numbers only. The minimum required by SAIM is the following: 

	 <label for="zip">Zip Code</label>
	 
	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}"
	        class="masked" name="uszipcode" title="5-digit zip code"> 

Most of the above should look familiar to you. It is completely semantic, accessible HTML. If you're not familiar with the above, I created a tutorial on [HTML5 input types and attributes](http://estelle.github.io/forms). 

While HTML is by default accessible (and it's our job to not @#$% it up), you can improve accessiblity for all users, including sighted, assitive technology and keyboard users. An example with improved accessibility includes:

	 <label for="zip" id="ziplabel">Zip Code</label>
	 
	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
	 		  aria-labelledby="ziplabel ziphint"
	        class="masked" name="uszipcode" title="5-digit zip code"> 
	        
	 <span class="hint" id="ziphint">5-digit zip code</span>
	

In this example there is  the `aria-labelledby` ARIA attribute, thru which you can indicated the id's of multiple elements to be read by the screen reader when the form control receives focus. In this case, the contents of both the label and the hint will be read by the screen reader. 

Preferably the hint will be displayed for all to see. If this is not feasible based on your design requirements, using CSS, the hint can be made visible to sighted users only when the form control receives focus.

With this HTML, you have a fully functional, accessible form, with placeholders, patterns, and the right dynamic keyboards showing up. This form will even be self validating in browsers that support native validation. Thus far there is no JavaScript (yet) and no masking. To create masks you can either use the SAIM script from my Github repo, or you can write your own. Let me explain how it works.

## How SAIM works

SAIM works by creating a shell around the input, and adding a span that appears directly behind a transparent input field containing the mask of the pattern for an empty input, or the remaining characters of the mask if the input is partially of fully entered. JavaScript can also be used to remove the placeholder and add a descripttive `aria-label`.

Example CSS (or SCSS) and JavaScript, along with an explanatory `README.md` file can be found at the [input masking github repository](https://github.com/estelle/input-masking).

If you're using my script, include `masking-input.js`. The `auto-init` attribute was added to allow automatic initialization of the script.


	<script src="path/js/masking-input.js" data-autoinit="true"></script>`


Add either the css file `masking-input.css` to your page, or incorporate the `.scss` component into your sass build

	<link rel="stylesheet" href="path/css/masking-input.css"/>


Add the input, just like the semantic label and input pairing  we discussed above:

	 <label for="zip">Zip</label>
  	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
  	     class="masked" name="uszipcode" title="5-digit zip code"> 
  	     
As stated earlier, the input above is perfectly usable and valid. Even if the JavaScript fails to load, it will include a placeholder and be validated. If the JavaScript and CSS load correctly, you'll get your input masks. The JavaScript will alter the DOM by adding 3 nodes to the DOM for each form control having the `masked` class: an encapsulating mask shell, with the input prefaced by a node containing the placeholder as text, with a nested node containing a copy of the current value of the form control. The generated nodes will look something like this:

	<label for="zip">Zip</label>
	<span class="shell">
		<span aria-hidden="true" id="zipMask"><i></i>XXXXX</span>
		<input id="zip" type="tel" name="zipcode" pattern="\d{5}" 
		class="masked" title="5-digit zip code" maxlength="5"
		aria-label="Zip 5-digit zip code"
		data-placeholder="XXXXX">
	</span>

So, what happened?

The input is encapsulated by a mask shell with the class of `shell`. The shell contains the mask placeholder, with a nested &lt;i> containing a copy of the current value of the form control. 

That value is currently empty. If the user were to enter the numbers 4, 5, 6, 7 and 8, the `&lt;i>&lt;/i>` would be updated, as would the `XXXXX`. As data is entered, the markup is updated in the following manner:

		... id="zipMask"><i></i>XXXXX</span>
		<input value=""...
		
		... id="zipMask"><i>4</i>XXXX</span>
		<input value="4"...
		
		**... id="zipMask"><i>45</i>XXX</span>
		<input value="45"...**
		
		... id="zipMask"><i>456</i>XX</span>
		<input value="456"...
		
		... id="zipMask"><i>4567</i>X</span>
		<input value="4567"...
		
		... id="zipMask"><i>45678</i></span>
		<input value="45678"...

As the user enters data, the current value of the form control is placed in the mask's first child DOM node, which is by default an emtpy &lt;i> element. The remaining characters of the mask follow as plain text. 

With a few lines of CSS, this mask appear directly behind the text box, with the content of the &lt;i> being identical too, but appearing directly behind the current value. The contents of the &lt;i> are transparent, either with `opacity: 0`, `color: transparent` or `visibility: hidden`. The input must also have a transparent background, allowing the node behind it to show thru.

![In this image, we've changed the style of the &lt;i> to be green and opaque, and the mask to appear above the input to make it more obvious how the masked text works. This is the third example in the code snippets above: **... id="zipMask"><i>45</i>XXX</span>
		<input value="45"...**](i/greenmask.png). 

As the user enters correct data, the value of the value updates, the value inside the &lt;i> updates to match the value, and the value of the rest of the mask, the visible part of the mask shown in pink in the image, shrinks to match the remaining characters of the value.

Including `display: none;` would not work, as the masking is reliant on the width of the &lt;i> being the same as the current value. The box model presence of the &lt;i> ensure the mask lines up perfectly with the current value.

While the Github repository includes all the code you need, let's review some of the important points:

	.shell {
		position: relative;
	}
	.shell span {
		position: absolute;
		left: 3px;
		top: 1px;
		color: #ccc;
		pointer-events: none;
		z-index: -1; 
	 }
	.shell span i {
	   font-style: normal;
		/* any of these 3 will work */
		color: transparent;
		opacity: 0;
		visibility: hidden; 
    }
	input.masked,
	.shell span {
		font-size: 16px;
		font-family: monospace;
		background-color: transparent;
	 }

The shell has to be relatively positioned so the absolutely positioned child span will be positioned relative to the shell. The input and the mask must both have the same font size and font family so they will line up perfectly as they update. 

Above I stated, "The input must also have a transparent background, allowing the node behind it to show thru." This isn't necessarily true. If your design requires the inputs have a background color or background image, you can put the mask after the input, making it appear on top of the input, and set the mask to `pointer-events: none`.

Those are the visual updates. But there are additional features.

If your placeholder includes non-digits and non-letters, no worries: the script can be set to add them. A great benefit of auto-filling non-alphanumerica characters is that mobile users won't have to change their touch keyboards. They simply need to enter digits and/or letters. For this feature to work with SAIM, make sure  your placeholder matches the regular expression of your pattern when all the X's are converted to integers. 

The script does take care of masking for letters and numbers. If your regular expressions include letters, you must include the made a made up attribute called `data-charset`. The Canadian zipcode in the examples provided is a good example of this: the `data-charset` takes as it's value the same value as the pattern but we include an `X` for each number and an underscore `_` for each required letter.

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
I've included the date in the script as this is common, but if you have a different extraneous requirement, you can add your own enhancements to the script.

The code is available on Github at [https://github.com/estelle/input-masking](https://github.com/estelle/input-masking).  If you are ok with all the default options, simply add the attribute `data-autoinit` to your script tag

`<script src="path/js/masking-input.js" data-autoinit="true"></script>`

Alternativly if you need to pass custom options or want to initalize the script your self you can do so like this

```js
new InputMask( */options*/ );
```
If you don't like something in the script, it's open source. Fork it. If you think others will like your suggestions (and even if you don't) create a pull request. Note, if you have new features that can help people, but aren't used by 99% of SAIM users, add a new script. One of the features of SAIM is how lean it is.

The reason I came up with SAIM was I wanted an small, accessible masking script that required no dependencies. I encourage all developers to avoid adding dependencies -- avoid resume driven development -- unless you really need them. With a little bit of thinking outside the box, you can create performant, accessible scripts that meet your product needs without slowing down your site or costing your visitors a ton in bandwidth.