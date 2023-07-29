import React from 'react';
import './css/Card.css';

const Card = ({ index, scene, updateCard, addCard, deleteCard, onSceneClick, isActive }) => {
  const textareaRef = React.useRef();

  React.useEffect(() => {
    const handleResize = () => {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };
  
    // Recompute the height when the window is resized
    window.addEventListener('resize', handleResize);
  
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
    </div>
  );
};

export default Card;
