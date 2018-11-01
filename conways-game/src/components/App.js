import React, { Fragment, Component } from "react";
import { createGlobalStyle } from "styled-components";
import ControlsMenu from "../components/ControlsMenu/ControlsContainer";
import HeaderPanel from "../components/PresetSection/HeaderPanel";
import CarouselPanel from "../components/PresetSection/CarouselPanel";
import { colors } from "../utils/variables";
import NavigationContainer from "./NavigationMenu/NavigationContainer";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
    }
    html {
        font-family: sans-serif;
        font-size: 62.5%;
        color: ${colors.white};
    }
    body {
        font-size: 1.6rem;
    }
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      playActive: false
    };
  }
  componentDidMount() {
    this.setState(
      {
        menuActive: false,
        playActive: false
      },
      () => {
        this.canvas = this.refs.canvas;
        this.gridSize = 20;
        this.squareLen = this.canvas.width / this.gridSize;
        this.ctx = this.canvas.getContext("2d");
        this.initialDrawing();
      }
    );
  }
  initialDrawing() {
    console.log("squareLength: ", this.squareLen);
    console.log("gridSize: ", this.gridSize);
    this.ctx.beginPath();
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        let row = i;
        let column = j;
        this.ctx.rect(
          column * this.squareLen,
          row * this.squareLen,
          this.squareLen,
          this.squareLen
        );
        this.ctx.stroke();
      }
    }
  }
  updateRect(e) {
    const clickedSqX = Math.ceil(e.clientX / this.squareLen);
    const clickedSqY = Math.ceil(e.clientY / this.squareLen);
    console.log(`X: ${clickedSqX} -- Y: ${clickedSqY}`);
    this.ctx.beginPath();
    const currentImageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.ctx.rect(
      (clickedSqX - 1) * this.squareLen,
      (clickedSqY - 1) * this.squareLen,
      this.squareLen,
      this.squareLen
    );

    const pixel = this.getPixel(
      currentImageData,
      (clickedSqX - 1) * this.squareLen,
      (clickedSqY - 1) * this.squareLen);
    if (pixel[0] === 0) {
      this.ctx.fillStyle = "white";
    }
    else {
      this.ctx.fillStyle = "rgb(0,0,0)";
    }
    this.ctx.fill();
    this.ctx.stroke();
    const newImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.putImageData(newImageData, 0, 0);
  }
  componentWillUnmount() {
    this.setState({
      playActive: false
    });
  }
  toggleState = stateName => {
    const boolState = this.state[stateName];
    if (stateName === "playActive") {
      this.setState({ [stateName]: !boolState }, this.onAnimFrame);
      return;
    } else if (typeof boolState === "boolean") {
      this.setState({ [stateName]: !boolState });
    } else {
      console.error(
        "toggleState: works only with a state name that has a boolean type"
      );
    }
  };
  clear() {}
  onAnimFrame = () => {
    if (this.state.playActive) {
      requestAnimationFrame(() => {
        this.onAnimFrame();
      });
    }
  };
  getPixel(imageData, x, y) {
    const w = imageData.width;
    const h = imageData.height;
    if (x < 0 || x >= w || y < 0 || y >= h) {
      return null;
    }

    const index = this.getPixelIndex(x, y, w);

    return imageData.data.slice(index, index + 4);
  }
  putPixel(imageData, x, y) {
    const w = imageData.width;
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
      return null;
    }

    const index = this.getPixelIndex(x, y, w);

    imageData[index] = 255;
    imageData[index + 1] = 0;
    imageData[index + 2] = 0;
    imageData[index + 3] = 255;
    this.ctx.putImageData(imageData, 0, 0);
  }
  getPixelIndex(x, y, width) {
    return (y * width + x) * 4;
  }
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <canvas
          ref="canvas"
          width="500"
          height="500"
          onClick={e => {
            this.updateRect(e);
          }}
        />
        <ControlsMenu
          toggleState={this.toggleState}
          playActive={this.state.playActive}
          onAnimFrame={this.onAnimFrame}
        />
        <HeaderPanel />
        <CarouselPanel />
        <NavigationContainer
          toggleState={this.toggleState}
          menuActive={this.state.menuActive}
        />
      </Fragment>
    );
  }
}

export default App;
