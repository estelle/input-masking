# Masked Input

<!-- STORY -->

<!-- TODO: Add details -->

## Usage

```javascript
import { MaskedInput } from "input-masking";

const MyComponent = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>
      <div style={{ display: "flex" }}>
        <label htmlFor={"zip"}>{"Zip Code"}</label>
        <MaskedInput
          id={"zip"}
          placeholder={"xxxxx-xxxx"}
          name={"zip-code"}
          class={""}
          type={"text"}
          value={val}
          handleBlur={handleBlur}
          handleChange={handleChange}
          characterSet={"XXXXX-XXXX"}
          label={"Zip Code"}
          pattern={"ddddd-dddd"}
          name={"zip"}
          title={"9-character zip code in the format of 12345-6789"}
        />
      </div>
    </>
  );
};
```

#### number

Want to use something other than X? right now the script handles XdDmMyY9 for numeric placeholding. MM/YY and mm/yy will work fine. Want to use something else, simply pass an options object setting the `number` option.

```js
// Selector
new InputMask({
  number: "XZdDmMyY9"
});
```

#### letter

Want to use something other than X in your placeholder look for masked inputs that require both letters and numbers, you can. You can put different characters in your placeholder, as long as your `data-charset` contains Xs and \_ only.

```html
<input
  placeholder="XXX XXX"
  pattern="\w\d\w \d\w\d"
  class="masked"
  data-charset="?X? X?X"
  id="zipca"
  type="text"
  name="canadianzip"
  title="6-character alphanumeric code in the format of A1A 1A1"
/>
```

If you require \_ as a special character in your mask? Simply pass an options object setting the `letter` option, and also the value of `data-charset` in your HTML.

```js
new InputMask({
  letter: "?"
});
```

```html
<input
  placeholder="XXX_XXX"
  pattern="\w\d\w\_\d\w\d"
  class="masked"
  data-charset="?X?_X?X"
  id="underscore"
  type="text"
  name="underscoredstring"
  title="6-character alphanumeric code in the format of A1A_1A1"
/>
```

#### onError

Want to add error handling? Simply pass a function to the `onError` option. The function will recieve the keyboard event as the first paramater.

```js
new InputMask({
  onError: function(e) {
    // Handle your errors!
  }
});
```

#### noValidate

As the _pattern_ attribute is being used, you may want to add via javascript the _novalidate_ attribute on any ancestor `form` or form control to disable native browser validation. Do add it via JS, because if the JS fails, native validation is a good alternative.

You can have input masking do this for you by setting the `noValidate` option to true.

```js
new InputMask({
  noValidate: true
});
```

## Documentation

Handles these test cases:

- OK if the pattern starts with a special character
- OK if the next letter is a special character
- Can handle more than one special character
- Doesn't matter if browser supports placeholder attribute: appears even in IE8
- Doesn't matter if browser supports pattern attribute: still works
- characters can be deleted or added mid input
- Arrow keys can be used
- Sets up maxlength based on placeholder length
- Only uppercase letters are shown (this can be changed)
- If user enters an invalid character, character deleted
- Enters special characters automagically
- No unwanted characters are read by screen reader
- Supports keyboard, mouse and touchpad
- Works if the user leaves the input and comes back
- If user gives focus before a special character, jumps forward if typed in.
- Matches simple regular expressions
- Can be made to match complex regular expression

## Exceptions

### Complex Regular Expressions

If the digits allowed by your regular expression are constrained or complicated, such as months only allowing 01-12, include a made up `data-valid-example` attribute that takes as its value a **valid** value that would match the pattern.

```html
<label for="expiration"> Credit Card Expiration </label>
<input
  id="expiration"
  type="tel"
  placeholder="MM/YY"
  class="masked"
  pattern="(1[0-2]|0[1-9])\/(1[5-9]|2\d)"
  data-valid-example="11/18"
  title="2-digit month and 2-digit year greater than 01/15"
/>
```

I've taken care of MM in `masking.validateProgress()`, because that is common. If you have exceptions, add the exceptions there. If you need an expiration month, it is best to use `<input type="month">` instead.

## PropTypes

| Name | Type   | Default   | Required | Notes |
| ---- | ------ | --------- | -------- | ----- |
| id   | string | undefined | Yes      |
