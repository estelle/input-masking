The `placeholder` attribute, available, for &lt;textarea> and several &lt;input> types, enables providing a hint describing the expected value of a form control. For example, a developer can tell a browser to display "first name" for a text input type for first name or "XXXXX-XXXX" for an input requiring a long format American zip code. The `placeholder` attribute has been [supported since IE 10](http://caniuse.com/#search=placeholder%20attribute). 

Here is an example of the placeholder attribute displayed in a text input type.

<label for="fc1">Input with Placeholder: </label><input placeholder="this is the placeholder text" id="fc1">

By default, the placeholder appears as gray text inside an input field, as shown above. The placeholder disappears when the value becomes non-null. For these two reasons, designers and developers have wanted "input-masking". They've been asking for a permanent, stylable placeholder that demarks what the user is allowed to enter in as input in a text box. There is finally an accessible solution for this demand.

## Accessibility &amp; Placeholder

Before we dive in, a note on accessibility: Do not use the `placeholder` attribute as a replacement for a &lt;label> as it reduces the accessibility and usability of the form control.  The `placeholder` is not an alternative for &lt;label> nor for the `title` attribute. While the label is shown at all times, the placeholder is only shown before the user enters a value. 

Always include a &lt;label> with every input to ensure accessibility.  The lack of a separate label reduces the size of the hit region available for setting focus on the control. The hint given by the label is always shown, unless ARIA attributes provide alternatives. 
 
For a longer hint or other advisory text, the `title` attribute is  appropriate. The `placeholder` value is shown before the user enters a value. The `title` attribute is read when the user requests further help. For improved accessibility, when requiring input data to match a specific pattern, ALWAYS include a `title` attribute describing the expected pattern. 
 
## Watermarks: JavaScript Precursor for Placeholder

Prior to being added to the HTML5 specification, there was a huge demand for a placeholder-like feature. Designers demanded text boxes show a hint when empty. In response, developers created "watermark" plugins for input elements.  The plethora of watermark/placeholder plugins varied in size, with many being plugins sitting on top of larger required framework or library downloads. 

Here an example of a watermarked input:[^1]

[^1]:This version was created with inline event handlers, but demonstrates the behavior created by larger watermarking scripts.)

<label for="fc2">Input with Watermark:</label> <input value="this is a watermark" id="fc2" onfocus="if(this.value=='this is a watermark') this.value='';"
onblur="if(this.value=='') this.value='this is a watermark';">


Like the plethora of watermark scripts, when the `placeholder` attribute was first supported natively in Safari 5, the placeholder text disappeared when the input field received focus. This, like the watermark, was less than optimal for usability. Autofocusing on a form control meant the placeholder text would never be seen, and the short hint -  whether a watermark or HTML5 placeholder text - would never be read. 

Autofocusing itself is bad for usability, but this disappearing on focus was especially bad for keyboard users: whenever a user tabbed into the input or textarea with the keyboard, the placeholder attribute text would disappear. Fortunately, watermarking scripts -- with text that disappears on focus -- have been replaced by native support for the more usable `placeholder` attribute - which remains visible in all supporting browsers until the value of the input is non-null . 

### Benefits of `placeholder` attribute

The `placeholder` attribute is an improvement over the watermark.  It's a native feature, requiring no JavaScript, and it remains visible until the user enters text rather than disappearing on focus.

The first rule of WAI-ARIA states, "If you can use a native HTML element  or attribute with the semantics and behaviour you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so." A benefit of the `placeholder` attribute is that it is a native HTML attribute. Native, semantic HTML is by default accessible. Being native, there is no need for JavaScript in implementing `placeholder`.  This is a huge benefit over watermarking scripts.

The other huge benefit is placeholders remain visible on focus, disappearing when any character is entered into the form control. 

This is much better than the plethora of watermark plugins, but is still less than optimal. Designers and developers have been looking for input masking solutions: . 

## Input Masking

While the `placeholder` attribute definitely improves usability, it can be improved upon. Permanance and validation are two frequently requested features: UX designers want the pattern to continue to display as the user enters data, while disallowing non-conforming characters and auto-entering non-number or letters such as spaces, dashes and parenthesis. Some designers also desire control over placeholder colors, which is not a feature supported in current browsers, though is accessible via the shadow DOM.

Similar to `placeholder`, an input mask is a string expression defined by a developer informing the user what should be entered into a form control. Unlike placeholder or watermarks, the input mask should remain visible, guiding the user thru the syntax of the expected value as data is entered. Unlike `placeholder`, or it's JavaScript watermark predecessor, input masks define what the user is allowed to enter into the form control, setting the format to which the entered data must conform.

Input masks guide the user in entering fixed width data when you want them to enter the data in a specified format like zip codes, dates, and phone numbers.

A few input masking scripts have been created. Most are plugins sitting atop larger libraries or frameworks. For example, the [jQuery.inputmask plugin](http://robinherbots.github.io/jquery.inputmask/) weighs in at 29 kb, while requiring jQuery at 37.7 kb as a dependency. All available, open source solutions place the mask within the input element, as part of the `value`, negatively impacting accessibility. By being appended to the value, the mask produced by these scrips can not be styled differently from the value. 

Remember, the input element is an empty element. As such, we can't put a span around part of a value to change the color of just the mask.

My goal in creating Styleable, Accessible Input Mask (SAIM) was to create a progressively enhanced input masking script that was lightweight in terms of JavaScript (and therefore bandwidth), accessible, and syleable. 

I wanted to create a framework-free (not just framework agnostic) input mask that was reliant on the developr using semantic HTML as the base markup. By forcing semantic HTML, the form renders and is accessible whether or not JavaScript is enabled: the script itself is a progressive enhancement. 

The mask is separate from the input element, and can therefore be styled to any color, preferably one that differentiates the input mask text from the current value the user is entering.

The SAIM script enables you to include a mask on any input where a specific data entry format is required. The placeholder-like text remains in place, displaying which characters still need to be included. The faux placeholder input mask is styleable with CSS without requiring access to shadow DOM or any browser-specific or vendor-prefixed features.

With SAIM, the user can enter letters and numbers. All other characters that are uniformly required for that specific input -- like spaces, dashes, and parenthesis -- are automatically added by the SAIM script, making data entery easier when using dynamic keypads. The mask automatically updates to reflect the characters that still remain to be entered as the user progresses thru data entry. SAIM prevents the user from entering invalid data. 

Here's what the script produces. 

<http://estelle.github.io/input-masking> <!-- put the content from that page here -->

SAIM was tested and works in Safari, Chrome, Firefox, Opera and even IE 8. If you need to support IE 8 or anything older, you need to find a new job. Until you find that job, SAIM likely works in those older browsers too. I just didn't test it.

The SAIM script works by adding 3 nodes to the DOM for each form control having the `masked` class. 

Each masked form control is encapsulated by a mask shell. The shell contains the mask placeholder, with a nested node containing a copy of the current value of the form control. This is placed before the form control in the DOM, and is made to appear directly behind the text box with a few lines of CSS. I'll explain it in more detail below. 

## What the developer marks up

To create an input mask, the developer simply includes the 2KB script and adds a class to all the form controls needing masking to a form coded using semantic HTML5 form controls.

The developer creates semantic form controls with associated labels, using HTML5 input types and attributes. The only difference between a regular form control and a masked control is that some HTML5 attributes are required for the masked input types. The input should include seven attributes, including:
 
* `id`: 

The `id` is necessary for pairing up the form control with its associated label. It is also used by the script for pairing the mask with the form control. 

* `class`: 

The `class` of the input includes "masked" or other masking class set by the developer. 

* `pattern`:

The `pattern` defines the regular expression the valid value must conform to.

* `placeholder`:

The `placeholder` is the placeholder or masking text. 

* 	`name`: 

The `name` is required if you are submitting the form, as forms pass along name/value pairs. 

* `title`: 

The `title` attribute, which is not officially required, is essentially required whenever the `pattern` attribute is used for accessibility reasons: the `title` is used to describe the requirements of the regular expression.

* `type`:
	
The `type` attribute is a required attribute of the input element. If ommitted, it still works, defaulting to `type="text"`.

We create a label with a `for` attribute, along with an input. Include `type="tel"` when requiring numbers only.

	 <label for="zip">Zip Code</label>
	 
	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}"
	        class="masked" name="uszipcode" title="5-digit zip code"> 
	

The above should look familiar to you. It is completely semantic, accessible HTML. If you're not familiar with the above, I created a tutorial on [HTML5 input types and attributes](http://estelle.github.io/forms).

## How SAIM works

The required CSS (or SCSS) and JavaScript, along with an explanatory README file can be found at the [input masking github repository](https://github.com/estelle/input-masking).

Include `masking-input.js`. The `auto-init` attribute was added to allow automatic initialization of the script.


	<script src="path/js/masking-input.js" data-autoinit="true"></script>`


Add either the css file `masking-input.css` to your page, or incorporate the `.scss` component into your sass build

	<link rel="stylesheet" href="path/css/masking-input.css"/>


Add the input, just like the semantic label and input pairing  we discussed above:

	 <label for="zip">Zip Code</label>
  	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
  	     class="masked" name="uszipcode" title="5-digit zip code"> 
  	     
As stated earlier, the input above is perfectly usable and valid. Even if the JavaScript fails to load, it will include a placeholder and be validated. If the JavaScript and CSS load correctly, you'll get your input masks. The JavaScript will alter the DOM by adding 3 nodes to the DOM for each form control having the `masked` class: an encapsulating mask shell, with the input prefaced by a node containing the placeholder as text, with a nested node containing a copy of the current value of the form control. The generated nodes will look something like this:

	<label for="zip">Zip Code</label>
	<span class="shell">
		<span aria-hidden="true" id="zipMask"><i></i>XXXXX</span>
		<input id="zip" type="tel" name="zipcode" pattern="\d{5}" 
		class="masked" title="5-digit zip code" maxlength="5" 
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