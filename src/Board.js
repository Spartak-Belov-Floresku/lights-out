import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
const genId = () => Math.random() * 100;

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [...Array(nrows)].map(row => [...Array(ncols)]);

    // TODO: create array-of-arrays of true/false values
    initialBoard.forEach(row => {
      row.forEach((cell, i) => 
        row[i] = Math.floor(Math.random()*chanceLightStartsOn) >= 1? true: false
      );
    });

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    if(!board.some(row => row.some(el => {return el===true})))
      alert('WON!!!') 
  }

  function flipCellsAround(coord) {
    

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        if(x-1 >= 0 && y >= 0 && y < nrows){
          boardCopy[y][x-1] = !boardCopy[y][x-1];
        }
        if(y-1 >= 0 && x >= 0 && x < ncols){
          boardCopy[y-1][x] = !boardCopy[y-1][x];
        }
        if(x+1 < ncols && y >= 0 && y < nrows){
          boardCopy[y][x+1] = !boardCopy[y][x+1];
        }
        if (x >= 0 && x < ncols && y+1 < nrows) {
          boardCopy[y+1][x] = !boardCopy[y+1][x];
        }
        
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCoppyBoard = board.map(elm => [...elm]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCoppyBoard);

      // TODO: return the copy
      return deepCoppyBoard;
    });
  }
  
  // if the game is won, just show a winning msg & render nothing else
  hasWon();

  // TODO table board
  const table = [];
  let rowTable = [];

  board.forEach((rowArray, i) => {
      rowArray.forEach((cellArray, k) => {
        rowTable.push(<Cell flipCellsAroundMe={() => flipCellsAround(`${i}-${k}`)} isLit={cellArray} key={genId()} testid={`${i}-${k}`}/>)
      });
    table.push(<tr key={genId()}>{rowTable}</tr>);
    rowTable = []
  });

  return (<table className="Board"><tbody>{table}</tbody></table>)
}

export default Board;
