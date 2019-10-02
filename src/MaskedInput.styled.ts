import styled, {css} from 'styled-components'

export interface MaskedInputStyles {
  fontFamily?: string,
  fontSize?: string,
  paddingRight?: string,
  uppercase?: string,
  lineHeight?: string,
  paddingLeft?: string,
}

const consistentTypography = css`
  font-family: ${props => props.fontFamily ? props.fontFamily : 'monospace'};
  font-size: ${props => props.fontSize ? props.fontSize : '1em'};
  padding-right: ${props => props.paddingRight ? props.paddingRight : '10px'};
  text-transform: ${props => props.uppercase ? 'uppercase' : ''};
  line-height: ${props => props.lineHeight ? props.lineHeight : '1'};
`

export const TransparentInput = styled.input`
  position: absolute;
  background-color: transparent;
  ${consistentTypography}
`;

export const MaskSpan = styled.span`
  position: absolute;
  background: transparent;
`;

export const Guide = styled.span`
  font-style: normal;
  white-space: nowrap;
  ${consistentTypography}
  `;

  export const Container = styled.div`
  display: inherit;
  padding-left: ${props => props.paddingLeft ? props.paddingLeft : '3px'};
`;

export const Shell = styled.span`
  position: relative;
  line-height: 1;
  display: inherit;
  height: 1em;

  ${MaskSpan} {
    position: absolute;
    left:  ${props => props.paddingLeft ? props.paddingLeft : '3px'};
    top: ${props => props.top ? props.top : '.1em'};
    pointer-events: none;
    color: ${props => props.guideColor ? props.guideColor : '#ccc'};
    z-index: -1;
  }


`