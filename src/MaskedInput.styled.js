import styled from 'styled-components'

export const TransparentInput = styled.input`
  position: absolute;
  background-color: transparent;
  font-family: monospace;
  font-size: 16px;
  padding-right: 10px;
  text-transform: uppercase;
  line-height: 1;
`;

export const MaskSpan = styled.span`
  position: absolute;
  background: transparent;
`;

export const Guide = styled.span`
  font-style: normal;
  white-space: nowrap;
  font-family: monospace;
  font-size: 16px;
  padding-right: 10px;
  text-transform: uppercase;
  line-height: 1;
`;

export const Container = styled.div`
  display: inherit;
  padding-left: 3px;
`;

export const Shell = styled.span`
  position: relative;
  line-height: 1;
  display: inherit;
  height: 1em;

  ${MaskSpan} {
    position: absolute;
    left: 3px;
    top: 1px;
    color: #ccc;
    pointer-events: none;
    z-index: -1;
  }


`