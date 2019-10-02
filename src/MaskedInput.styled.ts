import styled, { css } from "styled-components";

export interface MaskedInputStyles {
  fontFamily?: string;
  fontSize?: string;
  paddingRight?: string;
  uppercase?: string;
  lineHeight?: string;
  paddingLeft?: string;
}

const consistentTypography = css`
  padding: ${({ padding }) => (padding ? padding : "")};
  border: ${({ border }) => (border ? border : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "inherit")};
  font-size: ${props => (props.fontSize ? props.fontSize : "1em")};
  padding-right: ${props => (props.paddingRight ? props.paddingRight : "10px")};
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : "3px")};
  padding-top: ${props => (props.paddingTop ? props.paddingTop : "1px")};
  text-transform: ${props => (props.uppercase ? "uppercase" : "")};
  line-height: ${props => (props.lineHeight ? props.lineHeight : "1")};
`;

export const TransparentInput = styled.input`
  position: absolute;
  background-color: transparent;
  ${consistentTypography}
`;

export const MaskWrapper = styled.span`
  position: absolute;
  pointer-events: none !important;
  border: 3px solid transparent !important;
  background-color: transparent !important;
  z-index: -1;
  height: inherit;
  ${consistentTypography}
`;

export const Mask = styled.span`
  /* font-style: normal; */
  background: transparent !important;
  border: 3px solid transparent !important;
  background-color: transparent !important;
  white-space: nowrap;
  ${consistentTypography}

  /* Only needed if the shell isn't being used*/
  /* position: absolute; */
  display: contents;

  pointer-events: none !important;
  color: ${props => (props.guideColor ? props.guideColor : "#ccc")};
  z-index: -1;
`;

export const Container = styled.div`
  position: relative;
  display: inherit;

  /* padding-left: ${props =>
    props.paddingLeft ? props.paddingLeft : "3px"}; */
`;
