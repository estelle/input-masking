import React, { useRef } from "react";
import {
  Container,
  MaskedInputStyles,
  Mask,
  MaskWrapper,
  TransparentInput
} from "./MaskedInput.styled";

const validateProgress = function(
  value: string,
  validExample: string,
  pattern: string,
  placeholder: string
) {
  const regExpPattern = new RegExp(pattern);
  const valLength = value.length;
  let testValue = "";
  //convert to months
  if (valLength === 1 && placeholder.toUpperCase().substr(0, 2) == "MM") {
    if (Number(value) > 1 && Number(value) < 10) {
      value = "0" + value;
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
  id: string;
  class: string;
  pattern: string;
  placeholder: string;
  name: string;
  title: string;
  type: string;
  value: string;
  characterSet?: string;
  example?: string;
  number?: string;
  required?: boolean;
  validExample?: string;
  handleChange: (e: Event) => void;
  handleBlur?: (e: Event) => void;
  handleFocus?: (e: Event) => void;
}

export const MaskedInput = (props: MaskedInputProps & MaskedInputStyles) => {
  const maskRef = useRef(null);
  const {
    id,
    handleBlur,
    handleFocus,
    type,
    placeholder,
    pattern,
    validExample,
    required,
    characterSet,
    title,
    value,
    ...rest
  } = props;

  const handleChange = function(e) {
    e.target.value = handleCurrentValue(e);
    maskRef.current.innerHTML = setGuideValue(e);
    props.handleChange && props.handleChange(e);
  };

  const handleCurrentValue = function(e) {
    const isCharsetPresent = !!props.characterSet;
    const placeholder = props.characterSet || props.placeholder;
    const maskedNumber = "#XZdDmMyY0123456789"; // the available matches for a number charset
    const maskedLetter =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"; // the available matches for a alphabetic charset

    const value = e.target.value;

    // strip special characters
    const strippedValue = isCharsetPresent
      ? value.replace(/\W/g, "")
      : value.replace(/\D/g, "");

    let newValue = "";

    for (let i = 0, j = 0; i < placeholder.length; i++) {
      const isInt = !isNaN(parseInt(strippedValue[j]));
      const isLetter = strippedValue[j]
        ? strippedValue[j].match(/[A-Z]/i)
        : false;
      const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
      const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;

      if (
        (matchesNumber && isInt) ||
        (isCharsetPresent && matchesLetter && isLetter)
      ) {
        newValue += strippedValue[j++];
      } else if (
        (!isCharsetPresent && !isInt && matchesNumber) ||
        (isCharsetPresent &&
          ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
      ) {
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
      return validateProgress(
        newValue,
        props.validExample,
        props.pattern,
        placeholder
      );
    }

    return newValue;
  };

  const setGuideValue = function(e) {
    const value = e.target.value;
    const placeholder = props.characterSet || props.placeholder;
    return `<span style="color: transparent;">${value}</span>${placeholder.substr(
      value.length
    )}`;
  };

  return (
    <Container>
      <TransparentInput
        {...rest}
        id={id}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={id}
        type={type}
        data-placeholder={placeholder}
        data-pattern={pattern}
        data-valid-example={validExample}
        aria-required={required}
        data-characterset={characterSet}
        required={required}
        title={title}
      />
      <MaskWrapper {...rest}>
        <Mask ref={maskRef} {...rest}>
          {characterSet || placeholder}
        </Mask>
      </MaskWrapper>
    </Container>
  );
};
