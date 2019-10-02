import React, { useRef } from 'react';
import { Container, Guide, Shell, TransparentInput, MaskSpan } from './MaskedInput.styled'

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
    guideRef.current.innerText = setGuideValue(e);
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

  const setGuideValue = function(e) {
    const value = e.target.value;
    const placeholder = props.placeholder
    return value + placeholder.substr(value.length);
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
      <Container>
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
          <MaskSpan  aria-hidden="true" id={props.id + 'Mask'}>
            <Guide ref={guideRef}>{props.placeholder}</Guide>
          </MaskSpan>
        </Shell>
     </Container>
  );
};
