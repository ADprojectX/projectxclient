import React from 'react';
import './css/VideoScriptCard.css';

const VideoScriptCard = ({ index, scene, updateCard, onSceneClick, isActive }) => {
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
    <div onClick={() => onSceneClick(index)} className={`VideoScriptCard ${isActive ? 'active' : ''}`}>
      <h2>{`${index + 1}`}</h2>
      <textarea 
        ref={textareaRef}
        className="editField" 
        value={scene[0]} 
        onChange={(e) => updateCard(index, [e.target.value, scene[1]])} 
      />
    </div>
  );
};

export default VideoScriptCard;
