import './css/ScriptContainer.css'
import axios from 'axios';
import React, {useState} from 'react';
import Card from '../components/Card';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function ScriptContainer( { setScenesForParent, currentSceneIndex, setCurrentSceneIndex } ) {
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); 

    let reqid = localStorage.getItem('reqid');

    React.useEffect(() => {
      if(scenes == null || scenes.length == 0){
        fetchScriptFromBackend();
      }
    }, []);

    const fetchScriptFromBackend = () => {
      axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
      .then((response) => {
        let scriptFromBack = response.data.script

        setScenesAndUpdateParent(scriptFromBack)
        setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage('script generation failed');
          console.log(error);
          setIsLoading(false);
        });
    };

    const setScenesAndUpdateParent = (newScenes) => {
      setScenes(newScenes);
      setScenesForParent(newScenes);
    }
    
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

    return(
        <div className="scriptContainer">
              {isLoading && (
                <div className="loading-popup">
                    Loading...
                </div>
            )}
            {scenes && scenes.map(([i , uuid, script]) => (
            <Card
                key={uuid}
                uuid={uuid}
                index={i}
                scene={script}
                updateCard={updateCard}
                deleteCard={deleteCard}
                addCard={addCard}
                onSceneClick={handleSceneClick} 
                isActive={i === currentSceneIndex}
            />
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default ScriptContainer;