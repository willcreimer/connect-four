import './GameBoard.css'
import { useState } from 'react';

export default function GameBoard({onSelectCol, board}){

    console.log(board);
    return(
        <ol id='game-board'>
            {board.map((col, colIndex) => <li key={colIndex} onClick={() => onSelectCol(colIndex)}>
                <ol>
                    {col.map((row, rowIndex) => <li className="board-row" key={rowIndex}><div className={`board-square ${row}`}></div></li>)}
                </ol>
            </li>)}
        </ol>
    );
}