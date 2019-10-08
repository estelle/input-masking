# Input Masking

## Introduction

This is a fork of [Estelle Weyl](http://twitter.com/estellevw)'s `input-masking` adapted specifically for use in React projects. You can find the original hosted on [github](https://github.com/estelle/input-masking/).

Where possible, I maintained the spirit of the original project - particularly the intent to have styleable, accessible input forms.

As a result, many of the features described below were initially penned by Estelle and [Alex Schmitz](http://twitter.com/alexrschmitz). I have tried to update them where necessary.

If you find any discrepencies between the original and what this library offers, please let me know.

## Features

`input-mask` enables you to include a mask on any input where a specific data entry format is required. The placeholder text remains in place, displaying which characters still need to be included. The placeholder is CSS styleable.

The user can enter letters and numbers. All other characters, like spaces, dashes, and parentheses are automatically added by the script, making data entery easier when using dynamic keypads.

## Example

This project includes a Storybook to see how to use it. To see the examples for yourself clone this project and run the following:

```shell
$ npm i
$ npm run storybook
```

![example storybook](https://media.giphy.com/media/UTHHdUjsphfW1ClfNY/giphy.gif)

## Quick Start

Install `input-masking` in your project:
`npm i input-masking`

To use:

```javascript
import { MaskedInput } from "input-masking";

<MaskedInput
  id="expiration"
  type="tel"
  placeholder="MM/YY"
  pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)"
  data-valid-example="05/18"
  label="Credit Card Expiration"
/>;
```

## Accessibility

There are accessibility features baked into the examples that you must maintain to maintain accessibility.

- Always include a label for each form control, and associate the form control either implicitly by nesting it, or explicitly with the `htmlFfor` and `id` attributes.
- Always include a `title` attribute that describes the expected pattern when including the `pattern` attribute.
- Always use the best input `type` for the job, so dynamic touchpad users get the right touchpad for the job. Generally this will always be `type="tel"`, as most masking is for digits only. However, when alphanumeric characters are required, use `type="text"`. And, while I've included an expiration month to show an example of using complex regular expressions, use `type="month"` instead of this script.

## Customization

### Initalization

To import the `MaskedInput` component into your project, add it as a dependency to your project.

Then, where you want to use it, import it as follows:

```javascript
import React from 'react'
import MaskedInput from '

var React = require('react'), MaskedInput = require('../index'); window.onload =
function () { React.render(
<ul>
  <li>
    <label htmlFor="month">Month</label>
    <MaskedInput
      id="month"
      type="tel"
      placeholder="MM/YY"
      pattern="(1[0-2]|0[1-9])/([0-9][0-9])"
      data-valid-example="11/18"
      title="2-digit month and 2-digit year greater than 01/15"
    />
  </li>
  <li>
    <label htmlFor="zip">Zip Code</label>
    <MaskedInput
      id="zip"
      type="tel"
      placeholder="XXXXX"
      pattern="d{5}"
      required
      title="5-digit zip code"
    />
  </li>
</ul>
```

## Contributors

## License

This code is available under the [MIT license](LICENSE)

## Thanks

Thanks to Estelle Weyl for the inspiration!
