import React from 'react';
import styled from "styled-components";
const Cell = styled.div`
    width: 100%;
    background: ${props => props['data-togglestate']? "lightblue" : "white"};
    border: 1px solid black;
    &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default Cell;