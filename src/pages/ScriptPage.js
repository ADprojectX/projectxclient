import React, {useState} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
// import sampleData from './sampleData.json'
import Card from '../components/Card';
import ScriptEditingPage from './css/ScriptPage.css'

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function ScriptPage() {
    // const jsonData = Object.values(sampleData); 
    const navigate = useNavigate();
    // const { reqid } = useParams();
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState(null);
    const location = useLocation();
    let reqid = location.state && location.state.reqid

    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/dashboard/`, { withCredentials: true })
        .then((response) => {
          setUserName(response.data.username);
          if(scenes == null || scenes.length() == 0){
            fetchScriptFromBackend();
          }
          // if (fromTitlePage === 'generated') {
          //   // Fetch the script generated by the backend based on the title
          // }
        })
        .catch((error) => {
          setErrorMessage('unauthorized');
          navigate('/login');
          console.log(error);
        });
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
  
    const handleLogoutClick = () => {
      let data = { token: Cookies.get('jwt') };
      axios.post(`${API_BASE_URL}/logout/`, data, { withCredentials: true })
        .then((response) => {
          Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
          Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
          console.log('logout_successful');
          navigate('/login');
        })
        .catch((error) => {
          setErrorMessage('cannot logout');
          console.log(error);
        });
    };

    
    // const handleScriptChange = (e) => {
    //   setScript(e.target.value);
    // };
  
    
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
    const handleSubmit = async () => {
      // let SCENE = `SCENE${}`
      console.log(scenes[0], 'y')
      let finalScene = {};
      let i = 0;
      for (let scene of scenes) {
        if (typeof scene[0] === 'string' && scene[0].trim() !== '') {
          const sceneNumber = i + 1;
          const key = `scene#${sceneNumber}`;
          finalScene[key] = scene;
          i++;
        }
      }
            
      console.log('x',finalScene)
      const finalSceneString = JSON.stringify(finalScene); // Serialize the finalScene object to a JSON string

      axios.get(`${REQ_BASE_URL}/save-script/?reqid=${reqid}&finalScene=${encodeURIComponent(finalSceneString)}`, { withCredentials: true })
        .then(response => {
          // Handle the response
          console.log(response.data);
          navigate('/voice')
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

      
      // TODO : JSON can be taken from Scene UseState
  
      // Here you could send the updated scenes state to your backend
      // Example with fetch:
      // const response = await fetch('https://your-api-endpoint', {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(scenes),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // } else {
      //   // do something with the response if needed
      // }
      // e.preventDefault();
      // if (script.trim() === '') {
      //     setErrorMessage('Script cannot be empty');
      //     return;
      //   }
      // // Perform the desired action with the script
      // console.log('Script:', script);
  
      // // TODO: SEND THIS SCRIPT TO THE BACKEND---------------------
  
      // // Reset the setScript field
      // setScript('');
  
      // navigate('/voice');
      };
    
    return(
        <div className="script-page">
        <h2>Script Page</h2>
        <h1>Hello, {userName}</h1>
        <p>Welcome to the Script Page</p>
        <button onClick={handleLogoutClick}>Logout</button>
        <p></p>
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
          <button className="submit" onClick={handleSubmit}>Submit</button>
        </div>
        
        {/* {fromTitlePage === 'generated' && script ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={script}
              onChange={handleScriptChange}
              placeholder="Enter Script"
            />
            <button type="submit"> Submit </button>
          </form>
        ) : (
            <div>
            <textarea
              value={script}
              onChange={handleScriptChange}
              placeholder="Enter Script"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )} */}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    );
}

export default ScriptPage;