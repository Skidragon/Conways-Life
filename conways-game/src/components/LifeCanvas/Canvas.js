import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import Cell from "./Cell";
import ControlsContainer from "../ControlsMenu/ControlsContainer";
const CanvasWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.gridSize}, 1fr);
  grid-template-rows: repeat(${props => props.gridSize}, 1fr);
  flex-flow: column;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  background: ${colors.white};
`;
class Canvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cells: []
    };
  }

  /**
   * After the component has mounted
   */
  componentDidMount() {
    this.gridSize = 3;
    this.fullArea = this.gridSize * this.gridSize;
    this.setState({
      cells: Array.apply(null, Array(this.fullArea)).map(
        Number.prototype.valueOf,
        0
      ),
    });
    // Request initial animation frame
  }

  componentWillUnmount() {
    this.setState({
      cells: []
    });
  }

  playAnimation = () => {
    const { cells } = this.state;
    const newCells = this.state.cells.slice();
    let count = 0;
    for (let i = 0; i < cells.length; i++) {
      console.log(`Turn ${i}-----------------`)
      if (cells[i] === 0) {
        count = this.checkNeighbors(cells, i);
        console.log("White cell: ", count);
        if(count === 3) {
          newCells[i] = 1;
        }
      } 
      else {
        count = this.checkNeighbors(cells,i);
        console.log("lightblue cell: ", count);
        if(count >= 4 || count < 2) {
          newCells[i] = 0;
        }
      }
    }
    console.log(newCells);
    
    this.setState({
      cells: newCells
    }, () => {
      setTimeout(() => {
        if(this.props.playActive) {
        return this.playAnimation()
        }
      }, 200)
    });
  }

  checkNeighbors(cells, i) {
    let count = 0;
    const n = this.getNIndex(cells, i);
    const s = this.getSIndex(cells, i);
    console.log(`N: ${n}\n S: ${s}`)
    // Check the north
    if(cells[n] !== undefined) {
      if(cells[n] !== undefined && cells[n] === 1) {
        count++;
      }
      if(cells[n+1] !== undefined && cells[n+1] === 1) {
          count++;
        }
      if(cells[n-1] !== undefined && cells[n-1] === 1) {
        count++;
      }
    }
    // West
    if(cells[i-1] !== undefined && cells[i-1] === 1) {
      count++;
    }
    // East
    if(cells[i+1] !== undefined && cells[i+1] === 1) {
      console.log("east");
      count++;
    }
    if(cells[s] !== undefined) {
      if(cells[s] !== undefined && cells[s] === 1) {
        count++;
      }
      if(cells[s+1] !== undefined && cells[s+1] === 1) {
          count++;
        }
      if(cells[s-1] !== undefined && cells[s-1] === 1) {
        count++;
      }
    }
    return count;
  }

  getNIndex(cells, i) {
    if (cells[i - this.gridSize] !== undefined) {
      return i - this.gridSize;
    } else {
      return undefined;
    }
  }
  getSIndex(cells, i) {
    if (cells[i + this.gridSize] !== undefined) {
      return i + this.gridSize;
    } else {
      return undefined;
    }
  }
  toggleCell = e => {
    const cellIndex = e.target.dataset.cellindex;
    const toggleState = e.target.dataset.togglestate;
    const cells = this.state.cells.slice();

    if (cells[cellIndex] === 0) {
      cells[cellIndex] = 1;
    } else {
      cells[cellIndex] = 0;
    }
    this.setState({
      cells: cells
    });
  };

  clearCanvas = () => {
    this.setState({
      cells: Array.apply(null, Array(this.fullArea)).map(
        Number.prototype.valueOf,
        0
      ),
    });
  }

  /**
   * Render the canvas
   */
  render() {
    return (
      <Fragment>
      <CanvasWrapper
        gridSize={this.gridSize}
        onClick={e => {
          this.toggleCell(e);
        }}
      >
        {this.state.cells.map((cell, i) => {
          return <Cell data-togglestate={cell} key={i} data-cellindex={i} />;
        })}
      </CanvasWrapper>
      <ControlsContainer playActive = {this.props.playActive} 
      playAnimation = {this.playAnimation} 
      toggleState={this.props.toggleState}
      clearCanvas={this.clearCanvas}/>
      </Fragment>
    );
  }
}

export default Canvas;
