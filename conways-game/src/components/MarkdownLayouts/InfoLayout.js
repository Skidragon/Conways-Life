import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { colors } from "../../utils/variables";
import { Link } from "gatsby";

const InfoGlobal = styled.div`
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  box-sizing: border-box;
  font-family: sans-serif;
  color: ${colors.white};
  background: ${colors.black};
  position: relative;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 auto;
  line-height: 2.5rem;
  max-width: 50rem;
  font-size: 1.6rem;
  padding: 0 1.6rem;

  & > div > p {
    margin-bottom: 2rem;
  }
 
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem 0;
  font-size: 3rem;
  width: 50%;
  height: 8rem;
  @media screen and (max-width: 60rem) {
        width: 100%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 80%;
    border: 4px solid ${colors.white};
    border-bottom: none;
    height: 1rem;
    top: 0;
   
  }
  &::after {
    content: "";
    position: absolute;
    width: 80%;
    border: 4px solid ${colors.white};
    bottom: 0;
    background: transparent;
    border-top: none;
    height: 10px;
  }
`;

const InfoLayout = props => {
  return (
      <InfoGlobal>
        <InfoWrapper>
          <Title>{props.title}</Title>
          {props.children}
        </InfoWrapper>
      </InfoGlobal>
  );
};
export default InfoLayout;
