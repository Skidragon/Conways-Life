import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../../utils/variables";
import Cell from "./Cell";
import CellRow from "./CellRow";
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
  background: ${ colors.white };
`;
class Canvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cells: [],
      animActive: false
    }
  }

  /**
   * After the component has mounted
   */
  componentDidMount() {
    this.gridSize = 15;
    this.fullArea = this.gridSize*this.gridSize;
    this.setState({
      animActive: this.props.playActive,
      cells: Array.apply(null, Array(this.fullArea)).map(Number.prototype.valueOf,0)
    });
    // Request initial animation frame
  }
  
  componentWillUnmount() {
    // Stop animating
    this.setState({
      animActive: false,
      cells: []
    });
  }

  toggleCell = (e) => {
    const cellIndex = e.target.dataset.cellindex;
    const toggleState = e.target.dataset.togglestate;
    const cells = this.state.cells.slice();
    console.log(cellIndex, toggleState,cells);
    if (cells[cellIndex] === 0) {
      cells[cellIndex] = 1;
    }
    else {
      cells[cellIndex] = 0;
    }
    this.setState({
      cells: cells
    });
  }
  /**
   * Render the canvas
   */
  render() {
        return (
          <CanvasWrapper gridSize = {this.gridSize} onClick = {e => {
              this.toggleCell(e);
            }}>
              {this.state.cells.map((cell, i) => {
                return (
                <Cell data-togglestate = { cell } 
                key = {i} 
                data-cellindex = {i} />
                )
                })}
          </CanvasWrapper>
        )
  }
}

export default Canvas;
