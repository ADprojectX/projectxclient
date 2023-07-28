import React, {useState} from 'react';
import {useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const REQ_BASE_URL = 'http://localhost:8000/req';

function ScriptContainer() {
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    let reqid = location.state && location.state.reqid

    React.useEffect(() => {
      if(scenes == null || scenes.length() == 0){
        fetchScriptFromBackend();
      }
    }, [0]);
  
    const fetchScriptFromBackend = () => {
        // Make a request to the backend to fetch the script based on the title
        axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
        .then((response) => {
          let scriptFromBack = response.data.script
          const jsonData = Object.values(scriptFromBack); 
          setScenes(jsonData)
          // setScript(scriptFromBack)
          })
          .catch((error) => {
            setErrorMessage('script generation failed');
            console.log(error);
          });
      };

    const updateCard = (index, newScene) => {
      const newScenes = [...scenes];
      newScenes[index] = newScene;
      setScenes(newScenes);
    };
  
    const deleteCard = (index) => {
      const newScenes = [...scenes];
      newScenes.splice(index, 1);
      setScenes(newScenes);
    };
  
    const addCard = (index) => {
      const newScenes = [...scenes];
      newScenes.splice(index + 1, 0, ['']);
      setScenes(newScenes);
    }
    
    return(
        <div className="scriptContainer">
            {scenes && scenes.map((scene, index) => (
            <Card
                key={index}
                scene={scene}
                index={index}
                updateCard={updateCard}
                deleteCard={deleteCard}
                addCard={addCard}
            />
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default ScriptContainer;