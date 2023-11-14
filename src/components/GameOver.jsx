import './GameOver.css'

export default function GameOver({winner, onRestart}){
    return <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a draw!</p>}
        <button onClick={onRestart}>New Game</button>
    </div>
}