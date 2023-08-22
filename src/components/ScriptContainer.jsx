import React, {useState} from 'react';
import {useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/ScriptContainer.css'
import Card from '../components/Card';

// const REQ_BASE_URL = 'http://localhost:8000/req';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function ScriptContainer( { setScenesForParent, currentSceneIndex, setCurrentSceneIndex } ) {
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true); 

    console.log("re-rendered")
    console.log(scenes)

    // const location = useLocation();
    // let reqid = location.state && location.state.reqid
    let reqid = localStorage.getItem('reqid');

    React.useEffect(() => {
      if(scenes == null || scenes.length == 0){
        fetchScriptFromBackend();
      }
    }, []);

    const fetchScriptFromBackend = () => {
      // Make a request to the backend to fetch the script based on the title
      axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
      .then((response) => {
        let scriptFromBack = response.data.script

        console.log("scriptfromback ")

        setScenesAndUpdateParent(scriptFromBack)
        setIsLoading(false);
        // setScenes(jsonData)
        // setScript(scriptFromBack)
        })
        .catch((error) => {
          setErrorMessage('script generation failed');
          console.log(error);
          setIsLoading(false);
        });
    };

    const setScenesAndUpdateParent = (newScenes) => {
      setScenes(newScenes);
      setScenesForParent(newScenes);  // pass the updated state to the parent
    }
    
    const updateCard = (index, updatedScene) => {
      const newScenes = [...scenes];
      newScenes[index] = updatedScene;
      // setScenes(newScenes);
      setScenesAndUpdateParent(newScenes);
    };
  
    const deleteCard = (index) => {
      const newScenes = scenes.slice(0, index).concat(scenes.slice(index+1)).map((scene, idx) => {
        scene[0] = idx;  // Update the index of each scene
        return scene;
    });
    setScenesAndUpdateParent(newScenes);
    };
  
    const addCard = (index) => {
      const newScene = [index + 1, '', ''];  // Assuming uuid is handled by the backend
      const newScenes = scenes.slice(0, index+1).concat([newScene], scenes.slice(index+1)).map((scene, idx) => {
          scene[0] = idx;  // Update the index of each scene
          return scene;
      });
      setScenesAndUpdateParent(newScenes);
    }

    const handleSceneClick = (index) => {
      setCurrentSceneIndex(index);
    };

    console.log("before return")
    
    return(
        <div className="scriptContainer">
              {isLoading && (
                <div className="loading-popup">
                    Loading...
                </div>
            )}
            {scenes && scenes.map(([i , uuid, script]) => (
            <Card
                uuid={uuid}
                index={i}
                scene={script}
                updateCard={updateCard}
                deleteCard={deleteCard}
                addCard={addCard}
                onSceneClick={handleSceneClick} // new prop to handle scene click
                isActive={i === currentSceneIndex} // new prop to indicate active scene
            />
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default ScriptContainer;