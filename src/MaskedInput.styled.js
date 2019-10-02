import styled from 'styled-components'

export const Shell = styled.span`
position: relative;
line-height: 1;

  ${BackgroundSpan} {
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

export const TransparentInput = styled.input`
  background-color: transparent;
  position: absolute;
`;

export const BackgroundSpan = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Guide = styled.i``