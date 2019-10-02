import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { MaskedInput } from "./Maskedinput";
import { text, boolean } from "@storybook/addon-knobs";

import styled from "styled-components";

const StyledMaskedInput = styled(MaskedInput)`
  border: 2px solid red;
  background: rgba(216, 221, 208, 0.5);
  margin: 14px;
  padding: 10px;
`;

import Readme from "./MaskedInput.md";

const CustomPlaceholder = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>
      <div style={{ display: "flex" }}>
        <label htmlFor={text("id", "expiration")}>
          {text("label", "Zip Code")}
        </label>
        <MaskedInput
          id={text("id", "expiration")}
          placeholder={text("placeholder", "MM/YY")}
          name={"zip-code"}
          type={text("type", "tel")}
          value={text("value", val)}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label={text("label", "Zip Code")}
          pattern={text("pattern", "(1[0-2]|0[1-9])/(1[5-9]|[0-9][0-9])")}
          name={text("name", "zip")}
          validExample={text("validExample", "11/18")}
          title={text(
            "title",
            "2-digit month and 2-digit year greater than 01/15"
          )}
        />
      </div>
    </>
  );
};

const CustomStyled = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>

      <div style={{ display: "flex" }}>
        <label classname={"label"} htmlFor={text("id", "expiration")}>
          {text("label", "Zip Code")}
        </label>
        <StyledMaskedInput
          id={text("id", "expiration")}
          placeholder={text("placeholder", "MM/YY")}
          name={"zip-code"}
          type={text("type", "tel")}
          value={text("value", val)}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label={text("label", "Zip Code")}
          pattern={text("pattern", "(1[0-2]|0[1-9])/(1[5-9]|[0-9][0-9])")}
          name={text("name", "zip")}
          validExample={text("validExample", "11/18")}
          title={text(
            "title",
            "2-digit month and 2-digit year greater than 01/15"
          )}
        />
      </div>
    </>
  );
};

const ControllingComponent = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>
      <div style={{ display: "flex" }}>
        <label htmlFor={text("id", "zip")}>{text("label", "Zip Code")}</label>
        <MaskedInput
          id={text("id", "zip")}
          placeholder={text("placeholder", "ZZZZZ-YYYY")}
          name={"zip-code"}
          class={""}
          type={text("type", "text")}
          value={text("value", val)}
          handleBlur={handleBlur}
          handleChange={handleChange}
          label={text("label", "Zip Code")}
          pattern={text("pattern", "ddddd-dddd")}
          name={text("name", "zip")}
          title={text(
            "title",
            "9-character zip code in the format of 12345-6789"
          )}
        />
      </div>
    </>
  );
};

const CharacterSetComponent = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>
      <div style={{ display: "flex" }}>
        <label htmlFor={text("id", "zipca")}>
          {text("label", "Canadian Zip Code")}
        </label>
        <MaskedInput
          id={text("id", "zipca")}
          placeholder={text("placeholder", "")}
          name={"zip-code"}
          class={""}
          type={text("type", "text")}
          value={text("value", val)}
          handleBlur={handleBlur}
          handleChange={handleChange}
          characterSet={text("characterSet", "_X_ X_X")}
          pattern={text("pattern", "wdw dwd")}
          name={text("name", "canadian-zip")}
          title={text(
            "title",
            "6-character alphanumeric code in the format of A1A 1A1"
          )}
        />
      </div>
    </>
  );
};

const StyledComponent = () => {
  const [val, setVal] = useState("");
  const handleChange = event => {
    setVal(event.target.value);
  };
  const handleBlur = () => {};

  return (
    <>
      <div>The value is: {val}</div>
      <div style={{ display: "flex" }}>
        <label htmlFor={text("id", "zipca")}>{text("label", "Zip Code")}</label>
        <MaskedInput
          paddingLeft={text("paddingLeft", "3px")}
          paddingRight={text("paddingLeft", "10px")}
          top={text("top", ".1em")}
          guideColor={text("guideColor", "#ccc")}
          fontFamily={text("fontFamily", "times")}
          fontSize={text("fontSize", "1em")}
          lineHeight={text("lineHeight", "1em")}
          uppercase={boolean("uppercase", true)}
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

storiesOf("MaskedInput", module)
  .addParameters({
    readme: {
      content: Readme
    }
  })
  .addParameters({
    info: `Original component documentation: https://github.com/estelle/input-masking`
  })
  .add("default", () => (
    <div style={{ padding: "50px" }}>
      <ControllingComponent />
    </div>
  ))
  .add("with characterSet", () => (
    <div style={{ padding: "50px" }}>
      <CharacterSetComponent />
    </div>
  ))
  .add("with custom styling", () => (
    <div style={{ padding: "50px" }}>
      <StyledComponent />
    </div>
  ))
  .add("with custom placeholder", () => (
    <div style={{ padding: "50px" }}>
      <CustomPlaceholder />
    </div>
  ))
  .add("with custom styledComponent", () => (
    <div style={{ padding: "50px" }}>
      <CustomStyled />
    </div>
  ));
