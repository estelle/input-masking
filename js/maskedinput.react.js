import React from 'react';
/**
 * The masked input requires the following props
 * @param {string} id "The `id` is necessary for pairing up the form control with its associated label. It is also used by the script for pairing the mask with the form control."
 * @param {string} class The `class` of the input includes "masked" or other masking class set by the developer.
 * @param {string} pattern The `pattern` defines the regular expression the valid value must conform to. (You only want a mask if you have a pattern. If there is no pattern to match, there will be no mask that makes sense).
 * @param {string} placeholder The `placeholder` is the placeholder or masking text.
 * @param {string} name The `name` is required if you are submitting the form, as forms pass along name/value pairs.
 * @param {string} title The `title` attribute, which is not officially required, is essentially required whenever the `pattern` attribute is used for accessibility reasons: the `title` is used to describe the requirements of the regular expression.
 * @param {string} type The `type` of input should also be included, usually to `type="tel"` as most form controls that could make use of a masking are numeric values.
 * @param {string} [data-charset] - If your regular expressions include letters, you must include the made a made up attribute called `data-charset`.
 */
export var MaskedInput = props => {

  const handleChange = function(e) {
    e.target.value = handleCurrentValue(e);
    document.getElementById(props.id + 'Mask').innerHTML = setValueOfMask(e);
    props.handleChange && props.handleChange(e);
  };

  const handleCurrentValue = function(e) {
    const charset = e.target.getAttribute('data-charset');
    // debugger;
    var isCharsetPresent = e.target.getAttribute('data-charset'),
      maskedNumber = 'XMDY',
      maskedLetter = '_',
      placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder'),
      value = e.target.value,
      l = placeholder.length,
      newValue = '',
      i,
      j,
      isInt,
      isLetter,
      strippedValue,
      matchesNumber,
      matchesLetter;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/\W/g, '') : value.replace(/\D/g, '');

    for (i = 0, j = 0; i < l; i++) {
      isInt = !isNaN(parseInt(strippedValue[j]));
      isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
      matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
      matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
      if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
        newValue += strippedValue[j++];
      } else if (
        (!isCharsetPresent && !isInt && matchesNumber) ||
        (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
      ) {
        //options.onError( e ); // write your own error handling function
        return newValue;
      } else {
        newValue += placeholder[i];
      }
      // break if no characters left and the pattern is non-special character
      if (strippedValue[j] == undefined) {
        break;
      }
    }

    if (props['data-valid-example']) {
      return validateProgress(e, newValue);
    }

    return newValue;
  };

  const setValueOfMask = function(e) {
    var value = e.target.value,
      placeholder = e.target.getAttribute('data-placeholder');

    return '<i>' + value + '</i>' + placeholder.substr(value.length);
  };

  const validateProgress = function(e, value) {
    var validExample = props['data-valid-example'],
      pattern = new RegExp(props.pattern),
      placeholder = e.target.getAttribute('data-placeholder'),
      l = value.length,
      testValue = '',
      i;

    //convert to months
    if (l == 1 && placeholder.toUpperCase().substr(0, 2) == 'MM') {
      if (value > 1 && value < 10) {
        value = '0' + value;
      }
      return value;
    }

    for (i = l; i >= 0; i--) {
      testValue = value + validExample.substr(value.length);
      if (pattern.test(testValue)) {
        return value;
      } else {
        value = value.substr(0, value.length - 1);
      }
    }

    return value;
  };

  const handleBlur = function(e) {
    var currValue = e.target.value,
      pattern;

    // if value is empty, remove label parent class
    if (currValue.length == 0) {
      if (e.target.required) {
        updateLabelClass(e, 'required', true);
        handleError(e, 'required');
      }
    } else {
      pattern = new RegExp('^' + props.pattern + '$');

      if (pattern.test(currValue)) {
        updateLabelClass(e, 'good', true);
      } else {
        updateLabelClass(e, 'error', true);
        handleError(e, 'invalidValue');
      }
    }
    props.handleBlur && props.handleBlur(e);
  };

  const handleError = function(e, errorMsg) {
    // the event and errorMsg name are passed. Label is already handled. What else do we do with error?
    //var possibleErrorMsgs = ['invalidValue', 'required'];
    return true;
  };

  const handleFocus = function(e) {
    updateLabelClass(e, 'focus', false);
    props.handleFocus && props.handleFocus(e);
  };

  const updateLabelClass = function(e, className, replaceExistingClass) {
    var parentLI = e.target.parentNode.parentNode,
      pastClasses = ['error', 'required', 'focus', 'good'],
      i;

    if (replaceExistingClass) {
      for (i = 0; i < pastClasses.length; i++) {
        parentLI.classList.remove(pastClasses[i]);
      }
    }

    parentLI.classList.add(className);
  };

  return (
    <span className="maskShell">
      <label htmlFor={props.id} />
      <span aria-hidden="true" id={props.id + 'Mask'}>
        <i>{props.value || ''}</i>
        {props.placeholder}
      </span>
      <input
        id={props.id}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={props.id}
        type={props.type}
        className={'masked' + (props.className || '')}
        data-placeholder={props.placeholder}
        data-pattern={props.pattern}
        data-valid-example={props.example}
        aria-required={props.required}
        data-charset={props['data-charset']}
        required={props.required}
        title={props.title}
      />
    </span>
  );
};
