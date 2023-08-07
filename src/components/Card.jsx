import React from 'react';
import './css/Card.css';
import { AiFillPlusCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";

import { MdDeleteOutline } from "react-icons/md";


const Card = ({ index, scene, updateCard, addCard, deleteCard, onSceneClick, isActive }) => {
  const textareaRef = React.useRef();

  React.useEffect(() => {
    const handleResize = () => {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };
  
    // Recompute the height when the window is resized
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set textarea's height
    handleResize();
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  
  
  return (
    <div onClick={() => onSceneClick(index)} className={`card ${isActive ? 'active' : ''}`}>
      <h2>{`Scene ${index + 1} :`}</h2>
      <textarea 
        ref={textareaRef}
        className="editField" 
        value={scene[0]} 
        onChange={(e) => updateCard(index, [e.target.value, scene[1]])} 
      />

      {isActive && (
        <div className="card-buttons">
          <button onClick={(e) => {
            e.stopPropagation();
            addCard(index);
          }}>
            <FiPlusCircle className='card-icon-plus-hover-effect' color='#005E4D' size={20}/>
          </button>

          <button className="card-button" onClick={(e) => {
            e.stopPropagation();
            deleteCard(index);
          }}>
            <MdDeleteOutline className='card-icon-hover-effect' color='#FF006B' size={24}/>
          </button>
        </div>
      )}


    </div>
  );
};

export default Card;


// <div className="card-buttons"> 
// <button onClick={(e) => {
//   e.stopPropagation();  
//   addCard(index);
// }}>
//   <FiPlusCircle color='darkgreen' size={17}/>
// </button>

// <button className="card-button" onClick={(e) => {
//   e.stopPropagation();  
//   deleteCard(index);
// }}>
//   <MdDeleteForever color='#FF006B' size={20}/>
// </button>
// </div>
