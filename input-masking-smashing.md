# Introducing SAIM: Simple, Accessible Input Masking

The [`placeholder`](https://www.w3.org/TR/html5/forms.html#attr-input-placeholder) attribute, available for &lt;textarea> and several &lt;input> types, provides a hint describing the expected value of a form control. For example, a developer can tell a browser to display `XXXXX-XXXX` for an input requiring a long-format American ZIP code, or `(XXX) XXX-XXXX` for an input requiring a North American-style telephone number. The placeholder attribute was introduced in HTML5 and has been [supported since IE 10](http://caniuse.com/#search=placeholder%20attribute). 

Here is an example of the placeholder attribute displayed in a text input type:

<label for="fc1">Input with Placeholder: </label><input placeholder="this is the placeholder text" id="fc1">

By default, the placeholder appears as gray text inside an input field, as shown above. The placeholder disappears when the value becomes non-empty. Because of the inability to easily style the placeholder and because it disappears on data entry, designers and developers have wanted "input-masking" – a string of characters representing the expected data format which updates as the user enters the value, continuously displaying a hint as to the remaining required characters.  Designers (and developers) have been asking for an accessible, permanent, styleable placeholder that demarks what data the user is allowed to enter in a text box. There is finally an accessible solution for this demand.

## Accessibility &amp; Placeholder

Before we dive in, a note on accessibility: Do not use the `placeholder` attribute as a replacement for a &lt;label>, as doing so reduces the accessibility and usability of the form control. While the label is shown at all times, the placeholder is only shown before the user enters a value.  

The placeholder is not an alternative for &;t;label> nor for the `title` attribute. 

For each text field, checkbox, radio button, and drop-down menu, include an associated &lt;label> describing its purpose. Associating a &lt;label> with each form control improves accessibility by both providing a large, clickable area for mouse users to access the form control, and by ensuring assistive technologies (AT) correctly inform the user of the purpose of a focused form control.

Always include a &lt;label> with every input to ensure accessibility. The lack of a separate label reduces the size of the hit region available for setting focus on the control. The hint given by the label is always read by AT, unless ARIA attributes provide alternatives.

For a longer hint or other advisory text, the title attribute is appropriate. The title attribute is read when the user requests further help. For improved accessibility, when requiring input data to match a specific pattern, ALWAYS include a title attribute describing the expected pattern.
 
## Watermarks: JavaScript Precursor for Placeholder

Prior to being added to the HTML5 specification, there was a huge demand for a placeholder-like feature. Designers demanded text boxes show a hint when empty. In response, developers created "watermark" scripts for input elements. The plethora of watermark/placeholder polyfills varied in size, with many being plugins sitting on top of larger, required framework or library downloads. 

Here an example of a watermarked input:[^1]

[^1]:This version was created with inline event handlers, but demonstrates the behavior created by larger watermarking scripts.

<label for="fc2">Input with Watermark:</label> <input value="this is a watermark" id="fc2" onfocus="if(this.value=='this is a watermark') this.value='';"
onblur="if(this.value=='') this.value='this is a watermark';">


Like the plethora of watermark scripts, when the `placeholder` attribute was first supported natively in Safari 5, the placeholder text disappeared when the input field received focus. This, like the watermark, was less than optimal for usability. Autofocusing on a form control meant the placeholder text would never be seen, and the short hint – whether a watermark or HTML5 placeholder text – would never be read.

Autofocusing itself is bad for usability, but this disappearing on focus was especially bad for keyboard users: whenever a user tabbed into the input or textarea with the keyboard, the `placeholder` attribute text would disappear. Fortunately, the original placeholder implementation and watermarking scripts – with text that disappears on focus – have been replaced by native support for the more usable placeholder attribute, which remains visible in all supporting browsers until the value of the input is non-empty.

### Benefits of `placeholder` attribute

The `placeholder` attribute is an improvement over the watermark.   One benefit of the placeholder attribute is that it is a native HTML attribute, so implementation requires no JavaScript. Additionally, the placeholder remains visible until the form control gets a value.

Native, semantic HTML is by default accessible. The first rule of WAI-ARIA states, "if you can use a native HTML element or attribute with the semantics and behaviour you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so." Being native, there is no need for JavaScript in implementing placeholder. This is a huge benefit over watermarking scripts.

The other huge benefit is, placeholders remain visible on focus, disappearing when any character is entered into the form control. When a keyboard user tabs to the next form control, the placeholder remains in place until the control has a value.

This is much better than the plethora of watermark plugins, but is still less than optimal. Designers and developers have been looking for input masking solutions. 

## Input Masking

While the `placeholder` attribute definitely improves usability, it can be improved upon. Permanence and validation are two frequently requested features. UX designers want the pattern to continue to display as the user enters data, while disallowing non-conforming characters and auto-entering delimiters such as spaces, dashes and parenthesis. Some designers also desire control over placeholder appearance, which is not a feature supported in current browsers, though is accessible via the shadow DOM[].

Input masks guide the user in entering fixed width data when you want them to enter the data in a specified format like ZIP codes, dates, and phone numbers. Similar to placeholder, an input mask is a string expression defined by a developer informing the user what should be entered into a form control. Unlike `placeholder` or watermarks, the input mask should remain visible, guiding the user through  the syntax of the expected value as data is entered. Unlike `placeholder`, or its JavaScript watermark predecessor, input masks can be used to define what the user is allowed to enter into the form control, setting the format to which the entered data must conform.

A few input masking scripts have been created. Most are plugins sitting atop larger libraries or frameworks. For example, the [jQuery.inputmask plugin](http://robinherbots.github.io/jquery.inputmask/) weighs in at 29 KB, while requiring jQuery at 37.7 KB as a dependency. All available, open source solutions place the mask within the input element, as part of the value, negatively impacting accessibility. By being appended to the value, the mask produced by these scripts can not be styled differently from the value.

The difficulty in creating input masking is the fact the input element is an empty element. As such, we can't put a span around part of a value to style just the mask.

My goal in creating Styleable, Accessible Input Mask (SAIM) was to create a progressively enhanced input masking script that was lightweight in terms of JavaScript (and therefore bandwidth), accessible, and styleable.

I wanted to create a framework-free (not just framework-agnostic) input mask that was reliant on the developer using semantic HTML as the base markup. By forcing semantic HTML, the form renders and is accessible whether or not JavaScript is enabled. The form works immediately upon load without having to wait for the JavaScript to be downloaded, parsed and executed. The input masking is a progressive enhancement.

The SAIM script enables you to include a mask on any input where a specific data entry format is required. The placeholder-like text remains in place, displaying which characters still need to be included. The mask is separate from the input element, and can therefore be styled to any color, preferably one that differentiates the input mask text from the current value the user is entering. The faux placeholder input mask is styleable with CSS without requiring access to shadow DOM or any browser-specific or vendor-prefixed features.

With SAIM, the user can enter letters and numbers. All other characters that are uniformly required – like spaces, dashes, and parenthesis – are automatically added by the SAIM script, making data entry easier when using dynamic keypads. The mask automatically updates to reflect the characters still remaining to be entered as the user progresses through data entry. SAIM prevents the user from entering invalid data.


Here's what the script produces. 

<http://estelle.github.io/input-masking> <!-- put the content from that page here --><object data="http://estelle.github.io/input-masking"></object>

SAIM was tested and works in Safari, Chrome, Firefox, Opera and even IE 8. If you need to support IE 8 or anything older, you really need to find a new job. Until you find that job, SAIM likely works in older versions of IE too with small modifications, such as . I just didn't test it.

The SAIM script works by adding 3 nodes to the DOM for each form control having the masked class.

Each masked form control is encapsulated by a mask shell. The shell contains the mask placeholder, with a nested node containing a copy of the current value of the form control. This is placed before the form control in the DOM, and is made to appear directly behind the text box with a few lines of CSS. I'll explain in more detail below. 

## What the developer marks up

To create an input mask, the developer simply marks up an HTML5 web form semantically, adds a class name to all the form controls needing masking, and includes the 2 KB script.

The developer creates semantic form controls with associated labels, using HTML5 input types and attributes. The only difference between a regular form control and a masked control is that some HTML5 attributes are required for the masked input types. The input should include seven attributes, including:
 
* `id`: 

The `id` is necessary for pairing up the form control with its associated label. It is also used by the script for pairing the mask with the form control.

* `class`: 

The `class` of the input includes "masked" or other masking class set by the developer. This class needs to match the class listed in the JavaScript:

	// Default Values
	defaults: {
		masked : '.masked',
		…
	},

* `pattern`:

The `pattern` defines the regular expression the valid value must conform to.

* `placeholder`:

The `placeholder` is the placeholder or masking text. 

* 	`name`: 

The `name` is required if you are submitting the form, as forms pass along name/value pairs. 

* `title`: 

The `title` attribute, which is not officially required, is essentially required whenever the `pattern` attribute is used for accessibility reasons. The `title` should describe the requirements of the regular expression.

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


Add the input, just like the semantic label and input pairing we discussed above:

	 <label for="zip">Zip Code</label>
	 <input id="zip" type="tel" placeholder="XXXXX" pattern="\d{5}" 
			class="masked" name="uszipcode" title="5-digit zip code"> 
  	     
As stated earlier, the input above is perfectly usable and valid. Even if the JavaScript fails to load, it will include a placeholder and be validated. If the JavaScript and CSS load correctly, you'll get your input masks. 

The SAIM script will alter the DOM by adding three nodes to the DOM for each form control having the masked class – an encapsulating mask shell, with the input prefaced by a node containing the placeholder as text, with a nested node containing a copy of the current value of the form control. 

The generated nodes will look something like this:

	<label for="zip">Zip Code</label>
	<span class="shell">
		<span aria-hidden="true" id="zipMask"><i></i>XXXXX</span>
		<input id="zip" type="tel" name="zipcode" pattern="\d{5}" 
		class="masked" title="5-digit zip code" maxlength="5" 
		data-placeholder="XXXXX">
	</span>

So, what happened?

The input is encapsulated by a mask shell with the class of `shell`. The shell contains the mask placeholder, with a nested &lt;i> containing a copy of the current value of the form control. The `placeholder` attribute name is changed to `data-placeholder` so the default placeholder ceases to display.

That value is currently empty. If the user were to enter the numbers 4, 5, 6, 7 and 8, the &lt;i>&lt;/i> would be updated, as would the `XXXXX`. As data is entered, the markup is updated in the following manner:

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

As the user enters data, the current value of the form control is placed in the mask's first child DOM node, which is by default an empty &lt;i> element. The remaining characters of the mask follow as plain text.

With a few lines of CSS, this mask appears directly behind the text box, with the content of the &lt;i> being identical to, but appearing directly behind, the current value. The contents of the &lt;i> are transparent, either with `opacity: 0`, `color: transparent` or `visibility: hidden`. The input must also have a transparent background, allowing the node behind it to show through.

In the following image, we've changed the style of the &lt;i> to be green and opaque, and the mask to appear above the input to make it more obvious how the masked text works. This is the third example in the code snippets above: `… id="zipMask">&lt;i>45&lt;/i>XXX&lt;/span> &lt;input value="45"...`

![In this image, we've changed the style of the &lt;i> to be green and opaque, and the mask to appear above the input to make it more obvious how the masked text works. This is the third example in the code snippets above: **... id="zipMask"><i>45</i>XXX</span>
		<input value="45"...**](i/greenmask.png). 

As the user enters correct data, the value of the value updates, the value inside the &lt;i> updates to match the value, and the value of the rest of the mask (the visible part of the mask shown in pink in the image) shrinks to match the remaining characters of the mask.

Including `display: none;` would not work, as the masking is reliant on the width of the &lt;i> being the same as the current value. The box model dimensions of the &lt;i> ensure the mask lines up perfectly with the current value.

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

Above I stated, "the input must also have a transparent background, allowing the node behind it to show through." This isn't necessarily true. If your design requires the inputs have a background color or background image, you can put the mask after the input, making it appear on top of the input, and set the mask to `pointer-events: none`.

Those are the visual updates. But there are additional features.
If your placeholder includes non-digits and non-letters, no worries: the script can be set to add them. A great benefit of auto-filling non-alphanumeric characters is that mobile users won't have to change their touch keyboards. They simply need to enter digits and/or letters. For this feature to work with SAIM, make sure your placeholder matches the regular expression of your `pattern` when all the X's are converted to integers.

The script does take care of masking for letters and numbers. If your regular expressions include letters, you must include the made up attribute called `data-charset`. The Canadian postal code in the examples provided is a good example of this: the `data-charset` takes as its value the same value as the pattern, but we include an `X` for each number and an underscore (`_`) for each required letter.

	<label for="zipca">Canadian Postal Code</label>
    <input placeholder="XXX XXX" pattern="\w\d\w \d\w\d" class="masked" 
        data-charset="_X_ X_X" id="zipca" type="text" name="zipcodeca" 
        title="6-character alphanumeric zip code in the format of A1A 1A1">
       
If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a valid string that would match the pattern.

	<label for="expiration"> Credit Card Expiration </label>
    <input id="expiration" type="tel" placeholder="MM/YY" class="masked" 
        pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)" 
        data-valid-example="05/18">

I've included the date in the script as this is common, but if you have a different extraneous requirement, you can add your own enhancements to the script.

The code is available on Github at [https://github.com/estelle/input-masking](https://github.com/estelle/input-masking). If you are OK with all the default options, simply add the attribute `data-autoinit` to your script tag

`<script src="path/js/masking-input.js" data-autoinit="true"></script>`

Alternatively, if you need to pass custom options or want to initialize the script yourself, you can do so like this:

	new InputMask( */options*/ );

If you don't like something in the script, it's open source. Fork it. If you think others will like your suggestions (and even if you don't), create a pull request. Note: if you have new features that can help people, but wouldn't be used by 99% of SAIM users, add a new script. One of the features of SAIM is how lean it is.

I developed SAIM because I wanted a small, accessible masking script with no required dependencies. I encourage all developers to avoid adding dependencies – avoid resume driven development – unless you really need them. With a little bit of thinking outside the box, you can create performant, accessible scripts that meet your product needs without slowing down your site or costing your visitors a ton in bandwidth.
