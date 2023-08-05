import React, {useState} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import VoiceContainer from '../components/VoiceContainer';
import SideBar from '../components/SideBar';
import ScriptContainer from '../components/ScriptContainer';
import NavBar from '../components/NavBar';
// import sampleData from './sampleData.json'
import Card from '../components/Card';
import ScriptEditingPage from './css/ScriptPage.css'

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function ScriptPage() {

    const navigate = useNavigate();
    const [scenes, setScenes] = useState();
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);  // new state for current scene
    const [selectedValue, setSelectedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    let reqid = location.state && location.state.reqid

    const handleVoiceChange = (selectedVoice) => {
      setSelectedValue(selectedVoice);
    };
  
    const setScriptScenesFromChild = (childScenes) => {
      setScenes(childScenes);
    }

    const handleSubmit = async () => {
      if (selectedValue === null) {
        setErrorMessage('Please select a voice before submitting.');
        return;
      }
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
      // console.log('submitting voice');
      // axios.get(`${REQ_BASE_URL}/set-voice/?reqid=${reqid}&selectedValue=${selectedValue}`, { withCredentials: true })
      //   .then((response) => {
      //     console.log('voice sent');
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      const finalSceneString = JSON.stringify(finalScene); // Serialize the finalScene object to a JSON string
      console.log(finalSceneString)
      axios.get(`${REQ_BASE_URL}/save-script/?reqid=${reqid}&finalScene=${encodeURIComponent(finalSceneString)}&voice=${selectedValue}`, { withCredentials: true })
        .then(response => {
          // Handle the response
          let reqid = location.state && location.state.reqid
          console.log(response.data);
          navigate('/loading', {state:{reqid:reqid}})
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

      };
      
      return(
        <div className="script">

        <SideBar />

        <div className="script-content">
          <p>Welcome to the Script Page</p>
          {/* <ScriptContainer setScenesFromChild={setScenesFromChild} /> */}
          <ScriptContainer 
            setScenesFromChild={setScriptScenesFromChild} 
            currentSceneIndex={currentSceneIndex} 
            setCurrentSceneIndex={setCurrentSceneIndex} 
          />

          <div className='footer'>
            <div className='voice-in-script'>
              <VoiceContainer onVoiceChange={handleVoiceChange} />
              {/* <h3>{selectedValue}</h3> */}
            </div>
            <div>
              <button className="submit" onClick={handleSubmit}>Submit</button>
              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export default ScriptPage;
  
// const handleScriptChange = (e) => {
//   setScript(e.target.value);
// };
  
  
  {/* <div className="scriptContainer">
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
  </div> */}


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


      // React.useEffect(() => {
    //     axios.get(`${API_BASE_URL}/dashboard/`, { withCredentials: true })
    //     .then((response) => {
    //       if(scenes == null || scenes.length() == 0){
    //         fetchScriptFromBackend();
    //       }
    //       setUserName(response.data.username);
    //       // if (fromTitlePage === 'generated') {
    //       //   // Fetch the script generated by the backend based on the title
    //       // }
    //     })
    //     .catch((error) => {
    //       setErrorMessage('unauthorized');
    //       navigate('/login');
    //       console.log(error);
    //     });
    // }, [0]);


    // const updateCard = (index, newScene) => {
    //   const newScenes = [...scenes];
    //   newScenes[index] = newScene;
    //   setScenes(newScenes);
    // };
  
    // const deleteCard = (index) => {
    //   const newScenes = [...scenes];
    //   newScenes.splice(index, 1);
    //   setScenes(newScenes);
    // };
  
    // const addCard = (index) => {
    //   const newScenes = [...scenes];
    //   newScenes.splice(index + 1, 0, ['']);
    //   setScenes(newScenes);
    // }


        // React.useEffect(() => {
    //   if(scenes == null || scenes.length == 0){
    //     fetchScriptFromBackend();
    //   }
    // }, [0]);
  
    // const fetchScriptFromBackend = () => {
    //     // Make a request to the backend to fetch the script based on the title
    //     axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
    //     .then((response) => {
    //       let scriptFromBack = response.data.script
    //       const jsonData = Object.values(scriptFromBack); 
    //       setScenes(jsonData)
    //       // setScript(scriptFromBack)
    //       })
    //       .catch((error) => {
    //         setErrorMessage('script generation failed');
    //         console.log(error);
    //       });
    //   };