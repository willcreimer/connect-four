import './Log.css';

export default function Log({turns}){
    return <ol id="log">
        {turns.toReversed().map(turn => <li key={`${turn.col}${turn.row}`} className={turn.player}>Column {turn.col + 1}, Row {turn.row + 1}</li>)}
        <li>----New Game----</li>
    </ol>
}