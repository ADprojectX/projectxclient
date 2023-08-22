import '../css/video-editing/Timeline.css'

import React, { useRef, useEffect } from 'react';

const Timeline = ({ scenes, currentSceneIndex, handleClick }) => {
  const thumbnailsRef = useRef([]);
  
  useEffect(() => {
    thumbnailsRef.current[currentSceneIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currentSceneIndex]);

  return (
    <div className='timeline'>
      {scenes.map((scene, index) => (        
        <img
          key={index}
          ref={(el) => thumbnailsRef.current[index] = el}
          src={scene.thumbnail}
          alt={`Thumbnail ${index}`}
          className={`thumbnail ${index === currentSceneIndex ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Timeline;