import React from 'react';
import './css/Card.css';

const Card = ({ index, scene, updateCard, addCard, deleteCard }) => {
  return (
    <div className="card">
      <h2>{`Scene ${index + 1}`}</h2>
      <textarea 
        className="editField" 
        value={scene[0]} 
        onChange={(e) => updateCard(index, [e.target.value, scene[1]])} 
      />
      <button className="insertButton" onClick={() => addCard(index)}>Insert</button>
      <button className="deleteButton" onClick={() => deleteCard(index)}>Delete</button>
    </div>
  );
};

export default Card;
