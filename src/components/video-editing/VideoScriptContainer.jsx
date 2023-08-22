import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoScriptCard from './VideoScriptCard';
import '../css/video-editing/VideoScriptContainer.css'

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function VideoScriptContainer( { setScenesFromChild, currentSceneIndex, setCurrentSceneIndex } ) {
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const activeCardRef = useRef(null);
    let reqid = localStorage.getItem('reqid');


    React.useEffect(() => {
      if(scenes == null || scenes.length == 0){
        fetchScriptFromBackend();
      }
    }, [0]);

    const setScenesAndUpdateParent = (newScenes) => {
      setScenes(newScenes);
      setScenesFromChild(newScenes);  
    }
  
    const fetchScriptFromBackend = () => {
      axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
      .then((response) => {
        let scriptFromBack = response.data.script
        setScenesAndUpdateParent(scriptFromBack)
        })
        .catch((error) => {
          setErrorMessage('script generation failed');
          console.log(error);
        });
    };

    const updateCard = (index, updatedScene) => {
      const newScenes = [...scenes];
      newScenes[index] = updatedScene;
      setScenesAndUpdateParent(newScenes);
    };
  
    const deleteCard = (index) => {
      const newScenes = scenes.slice(0, index).concat(scenes.slice(index+1)).map((scene, idx) => {
        scene[0] = idx;
        return scene;
    });
    setScenesAndUpdateParent(newScenes);
    };
  
    const addCard = (index) => {
      const newScene = [index + 1, '', ''];  
      const newScenes = scenes.slice(0, index+1).concat([newScene], scenes.slice(index+1)).map((scene, idx) => {
        scene[0] = idx;
          return scene;
      });
      setScenesAndUpdateParent(newScenes);
    }

    const handleSceneClick = (index) => {
      setCurrentSceneIndex(index);
    };

    useEffect(() => {
        if (activeCardRef.current) {
        activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentSceneIndex]);
    
    return(
      <div className="videoScriptContainer">
            {scenes && scenes.map(([i , uuid, script]) => (
            <div
            key={uuid}
            ref={i === currentSceneIndex ? activeCardRef : null}
            >
                <VideoScriptCard
                    uuid={uuid}
                    index={i}
                    scene={script}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                    addCard={addCard}
                    onSceneClick={handleSceneClick} 
                    isActive={i === currentSceneIndex}
                />
            </div>
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default VideoScriptContainer;