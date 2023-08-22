import './css/Card.css';
import React from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";


const Card = ({ uuid, index, scene, updateCard, addCard, deleteCard, onSceneClick, isActive }) => {
  const textareaRef = React.useRef();

  React.useEffect(() => {
    const handleResize = () => {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  

  
  return (
    <div onClick={() => onSceneClick(index)} className={`card ${isActive ? 'active' : ''}`}>
      <h2 style={{ color: scene.trim() === '' ? 'red' : 'inherit' }}>{`Scene ${index + 1} :`}</h2>


      <textarea 
        ref={textareaRef}
        className="editField" 
        value={scene} 
        onChange={(e) => updateCard(index, [index, uuid, e.target.value])}
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