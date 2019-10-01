import styled from 'styled-components'

export const Shell = styled.span`
position: relative;
width: 100%;
min-width: 300px;
min-height: 20px;
line-height: 1;
  .shell span {
    position: absolute;
    left: 3px;
    top: 1px;
    color: #ccc;
    pointer-events: none;
    z-index: -1;
  }

  .shell span i {
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

export const Guide = styled.i`
  font-style: normal;
  /* any of these 3 will work */
  color: transparent;
  opacity: 0;
  visibility: hidden;
`