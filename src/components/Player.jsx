import './Player.css'
import * as Icon from 'react-feather';
import {useState} from 'react';

export default function Player({initialName, player, isActive, onChangeName, onEdit}){
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(){
    setIsEditing((editing) => !editing);
    if(isEditing){
      onChangeName(player, playerName);
    }
    else{
      onEdit(player);
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value);
  }

  let playerNameField = <span className='player-name'>{playerName}</span>;

  if(isEditing){
    playerNameField = <input required value={playerName} className='player-name' onChange={handleChange}></input>;
  }

  return(
      <li className={isActive ? 'active' : null}>
        <span className={`player ${player}`}>
          {playerNameField}
        </span>
        <button className='edit-btn' onClick={handleEdit}>{isEditing ? <Icon.Save/> : <Icon.Edit/>}</button>
      </li>
  );
}