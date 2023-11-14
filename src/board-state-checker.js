export function checkForWin(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, IN_A_ROW){
    //Check row
    let win = checkLine(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, 0, 1, IN_A_ROW);

    //check col
    win = win || checkLine(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, 1, 0, IN_A_ROW);

    //check downward diagonal
    win = win || checkLine(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, 1, -1, IN_A_ROW);

    //check upward diagonal
    win = win || checkLine(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, 1, 1, IN_A_ROW);

    return win;
}

function checkLine(gameBoard, lastTurn, NUM_COLS, NUM_ROWS, colIncrement, rowIncrement, IN_A_ROW){
    let inARow = 1;

    //check backward from last turn
    for(let i = 1; i < IN_A_ROW && inARow !== IN_A_ROW; i++){
        //if incrementing out of board, break
        if(lastTurn.col - i*colIncrement < 0 || lastTurn.row - i*rowIncrement < 0){
            break;
        }
        //if square in line before last turn matches player of last turn, increment inARow
        if(gameBoard[lastTurn.col - i*colIncrement][lastTurn.row - i*rowIncrement] === lastTurn.player){
            inARow++;
        }
        //if square in line before last turn doesn't match player of last turn, break
        else{
            break;
        }
    }

    //check forward from last turn
    for(let i = 1; i < IN_A_ROW && inARow !== IN_A_ROW; i++){
        //if incrementing out of board, break
        if(lastTurn.col + i*colIncrement > NUM_COLS - 1 || lastTurn.row + i*rowIncrement > NUM_ROWS - 1){
            break;
        }
        //if square in line before last turn matches player of last turn, increment inARow
        if(gameBoard[lastTurn.col + i*colIncrement][lastTurn.row + i*rowIncrement] === lastTurn.player){
            inARow++;
        }
        //if square in line before last turn doesn't match player of last turn, break
        else{
            break;
        }
    }

    return inARow === IN_A_ROW;
}