import React from 'react';
import styled from "styled-components";

const CellRow = styled.div`
    height: 100%;
    background: lightblue;
    border: 1px solid black;
    & { 
        position: absolute;
        width: 100%;
        height: 1fr;
    }
`;

export default CellRow;