import React, { useRef } from "react";
import validateProgress from "./helpers/validateProgress";
import "./masked-input.css";

interface MaskedInputProps {
  id: string;
  name: string;
  pattern: string;
  placeholder: string;
  title: string;
  type: string;
  value: string;
  characterSet?: string;
  className?: string;
  example?: string;
  number?: string;
  required?: boolean;
  uppercase?: boolean;
  validExample?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MaskedInput = (props: MaskedInputProps) => {
  const maskRef = useRef(null);
  const {
    id,
    name, // TODO: confirm this is used
    pattern,
    placeholder,
    title,
    type,
    value,
    characterSet,
    className,
    number, // TODO: Confirm this is used
    required,
    uppercase,
    validExample,
    handleChange,
    handleBlur,
    handleFocus,
    ...rest
  } = props;

  const onChange = function(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.value = handleCurrentValue(event);
    maskRef.current.innerHTML = setGuideValue(event);
    props.handleChange && props.handleChange(event);
  };

  const handleCurrentValue = function(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const isCharsetPresent = !!props.characterSet;
    const placeholder = props.characterSet || props.placeholder;
    const maskedNumber = "#XZdDmMyY0123456789"; // the available matches for a number charset
    const maskedLetter =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"; // the available matches for a alphabetic charset

    const value = event.target.value;

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

  const setGuideValue = function(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const placeholder = props.characterSet || props.placeholder;
    return `<span style="color: transparent;">${value}</span>${placeholder.substr(
      value.length
    )}`;
  };

  return (
    <div className={"container"}>
      <input
        className={`transparent-input consistent-typography ${className} ${uppercase &&
          "uppercase"}`}
        {...rest}
        id={id}
        onChange={onChange}
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
      <span
        className={`mask-wrapper consistent-typography ${className} ${uppercase &&
          "uppercase"}`}
        {...rest}
      >
        <span
          className={`mask consistent-typography ${className} ${uppercase &&
            "uppercase"}`}
          ref={maskRef}
          {...rest}
        >
          {characterSet || placeholder}
        </span>
      </span>
    </div>
  );
};

export default MaskedInput;
