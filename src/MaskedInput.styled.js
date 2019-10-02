import styled from 'styled-components'

export const TransparentInput = styled.input`
  position: absolute;
  background-color: transparent;
`;

export const MaskSpan = styled.span`
  position: absolute;
  background: transparent;
`;

export const Guide = styled.span``;

export const Shell = styled.span`
position: relative;
line-height: 1;
display: inherit;

  ${MaskSpan} {
    position: absolute;
    left: 3px;
    top: 1px;
    color: #ccc;
    pointer-events: none;
    z-index: -1;
  }

  ${Guide} {
    font-style: normal;
    /* any of these 3 will work */
    color: transparent;
    opacity: 0;
    visibility: hidden;
  }
`