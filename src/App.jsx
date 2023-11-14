import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { checkForWin } from './components/board-state-checker.js'
import GameOver from './components/GameOver.jsx'

import './App.css'

const NUM_ROWS = 6, NUM_COLS = 7, IN_A_ROW = 4;
const PLAYERS = {player1: 'Player 1', player2: 'Player 2'}
const INIT_GAME_BOARD = Array.apply(null, Array(NUM_COLS)).map(() => Array.apply(null, Array(NUM_ROWS)).map(function(){}));

function getActivePlayer(turns){
  let activePlayer = 'player1';

  if(turns.length > 0 && turns[turns.length - 1].player === 'player1'){
    activePlayer = 'player2';
  }

  return activePlayer;
}

function getGameBoard(turns){
  let gameBoard = [...INIT_GAME_BOARD.map(innerArray => [...innerArray])];;

  for(let i = 0; i < turns.length; i++){
      gameBoard[turns[i].col][turns[i].row] = turns[i].player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [turns, setTurns] = useState([]);
  const activePlayer = getActivePlayer(turns);
  let winner;

  let gameBoard = getGameBoard(turns);
  const draw = turns.length === NUM_COLS * NUM_ROWS && !winner;

  if(turns.length > 0 && checkForWin(gameBoard, turns[turns.length - 1], NUM_COLS, NUM_ROWS, IN_A_ROW)){
    winner = players[turns[turns.length - 1].player];
  }

  function handleSelectCol(colIndex){
    setTurns((prevTurns) => {
      const updatedTurns = [...prevTurns];
      let rowIndex = NUM_ROWS - 1;

      for(let i = 0; i < updatedTurns.length; i++){
        if(updatedTurns[i].col === colIndex){
          rowIndex--;
        }
      }

      if(rowIndex >= 0){
        const activePlayer = getActivePlayer(updatedTurns);

        updatedTurns.push({col: colIndex, row: rowIndex, player: activePlayer});

        if(rowIndex == 0){
          gameBoard[colIndex][rowIndex] = activePlayer;
        }
      }
      return updatedTurns;
    });
  }

  function handleRestart(){
    setTurns((turns) => []);
  }

  function handlePlayerNameChange(player, newName){
    setPlayers((prevPlayers) => {
      return{
        ...prevPlayers,
        [player]: newName
      };
    })
  }

  function handleEdit(){

  }

  return (
    <div id='main'>
      <h1 id='header'>Connect {IN_A_ROW}</h1>
        <ol id='players' className='highlight-players'>
          <Player onEdit={handleEdit} initialName={PLAYERS.player1} player="player1" isActive={activePlayer === 'player1'} onChangeName={handlePlayerNameChange}/>
          
          <Player onEdit={handleEdit} initialName={PLAYERS.player2} player="player2" isActive={activePlayer === 'player2'} onChangeName={handlePlayerNameChange}/>
        </ol>
        <div id='game-wrapper'>
          <GameBoard onSelectCol={handleSelectCol} board={gameBoard}/>
          {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        </div>
        
        
        <Log turns={turns}/>
      </div>
  )
}

export default App
