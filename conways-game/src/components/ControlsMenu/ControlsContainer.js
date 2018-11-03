import React, { Component } from 'react';
import styled from "styled-components";
import { colors } from "../../utils/variables";
import playIcon from "./assets/play-circle.svg";
import pauseIcon from "./assets/pause-circle.svg";
import menuIcon from "./assets/menu.svg";
import settingsIcon from "./assets/settings.svg";
import trashIcon from "./assets/trash.svg";
const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: ${colors.black};
    height: 7.8rem;
`;
const ControlButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 10rem;
    background: none;
    border: none;
    border-left: 3px solid ${ colors.darkGrey };
    border-right: 3px solid ${ colors.darkBlack };
    border-bottom: 3px solid ${ colors.darkBlack };
    &:last-child {
        border-right: none;
    }
    &:active {
        background: ${ colors.darkBlack };
    }
`;

const Icon = styled.img`
    height: 80%;
    width: 80%;
    pointer-events: none;
`;
const GenerationBox = styled(ControlButton)`
    color: ${colors.white};
    font-size: 5rem;
`;
const ControlsContainer = (props) => {
        return (
            <ControlsWrapper>
                <ControlButton onClick = {() => {
                    props.clearCanvas();
                }}
                ><Icon src = {trashIcon} /></ControlButton>
            <ControlButton><Icon src = {settingsIcon} /></ControlButton>
                <GenerationBox>{props.generation}</GenerationBox>
                <ControlButton
                onClick={() => {
                    props.toggleState("playActive");
                    props.playAnimation();
                }}
                ><Icon src = {props.playActive ? pauseIcon : playIcon} /></ControlButton>
                <ControlButton 
                onClick={() => {
                    props.toggleState("menuActive");
                    }}><Icon src = {menuIcon} /></ControlButton>
            </ControlsWrapper>
        );
}
 
export default ControlsContainer;