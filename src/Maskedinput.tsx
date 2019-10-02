import React, { useRef } from 'react';
import { Guide, Shell, TransparentInput, MaskSpan } from './MaskedInput.styled'

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


const validateProgress = function(value: string, validExample: string, pattern: string, placeholder: string) {
  const regExpPattern = new RegExp(pattern);
  const valLength = value.length;
  let testValue = '';

  //convert to months
  if (valLength === 1 && placeholder.toUpperCase().substr(0, 2) == 'MM') {
    if (Number(value) > 1 && Number(value) < 10) {
      value = '0' + value;
    }
    return value;
  }

  for (let i = valLength; i >= 0; i--) {
    testValue = value + validExample.substr(value.length);
    if (regExpPattern.test(testValue)) {
      return value;
    } else {
      value = value.substr(0, value.length - 1);
    }
  }

  return value;
};

interface MaskedInputProps {
  id: string,
  class: string,
  pattern: string,
  placeholder: string,
  name: string,
  title: string,
  type: string,
  value: string,
  characterSet?: string,
  example?: string,
  label?: string,
  required?: boolean,
  validExample?: string,
  handleChange: (e: Event) => void,
  handleBlur?: (e: Event) => void,
  handleFocus?: (e: Event) => void,
}

export const MaskedInput = (props: MaskedInputProps) => {
  const guideRef = useRef(null);

  const handleChange = function(e) {
    e.target.value = handleCurrentValue(e);
    guideRef.current.innerHTML = setValueOfMask(e);
    props.handleChange && props.handleChange(e);
  };

  const handleCurrentValue = function(e) {
    const isCharsetPresent = props.characterSet ? true : false;
    const maskedNumber = 'XMDY'; // the available matches for a number charset
    const maskedLetter = '_'; // the available matches for a alphabetic charset
    const placeholder = props.characterSet || props.placeholder;
    const value = e.target.value;

    // strip special characters
    const strippedValue = isCharsetPresent ? value.replace(/\W/g, '') : value.replace(/\D/g, '');

    let newValue = ''

    for (let i = 0, j = 0; i < placeholder.length; i++) {
      const isInt = !isNaN(parseInt(strippedValue[j]));
      const isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
      const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
      const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
      if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
        newValue += strippedValue[j++];
      } else if (
        (!isCharsetPresent && !isInt && matchesNumber) ||
        (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
      ) {
        //TODO: Add error handling when passed through
        return newValue;
      } else {
        newValue += placeholder[i];
      }
      // break if no characters left and the pattern is non-special character
      if (strippedValue[j] == undefined) {
        break;
      }
    }

    if (props.validExample) {
      return validateProgress(newValue, props.validExample, props.pattern, placeholder);
    }

    return newValue;
  };

  const setValueOfMask = function(e) {
    const value = e.target.value;
    const placeholder = props.placeholder

    return '<span>' + value + placeholder.substr(value.length) + '</span>';
  };



  const handleBlur = function(e) {
    var currValue = e.target.value,
      pattern;

    // if value is empty, remove label parent class
    if (currValue.length == 0) {
      if (e.target.required) {
        handleError(e, 'required');
      }
    } else {
      pattern = new RegExp('^' + props.pattern + '$');

      if (pattern.test(currValue)) {
      } else {

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

    props.handleFocus && props.handleFocus(e);
  };

  return (
      <>
        <label htmlFor={props.id}>{props.label}</label>
        <Shell>
          <TransparentInput
            id={props.id}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={props.id}
            type={props.type}
            data-placeholder={props.placeholder}
            data-pattern={props.pattern}
            data-valid-example={props.example}
            aria-required={props.required}
            data-charset={props.characterSet}
            required={props.required}
            title={props.title}
          />
          <MaskSpan ref={guideRef} aria-hidden="true" id={props.id + 'Mask'}>
            <Guide >{props.value || ''}</Guide>
            {props.placeholder}
          </MaskSpan>
        </Shell>
    </>
  );
};
