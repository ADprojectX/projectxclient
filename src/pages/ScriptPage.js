import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VoiceContainer from '../components/VoiceContainer';
import SideBar from '../components/SideBar';
import ScriptContainer from '../components/ScriptContainer';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function ScriptPage() {

    const navigate = useNavigate();
    const [scenes, setScenes] = useState([]);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [selectedValue, setSelectedValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const animateButtonRef = useRef(null);
    let reqid = localStorage.getItem('reqid');

    console.log('scenes')
    console.log(scenes)
    const handleVoiceChange = (selectedVoice) => {
      setSelectedValue(selectedVoice);
    };
  
    const setScriptScenesFromChild = (childScenes) => {
      setScenes(childScenes);
    }

    useEffect(() => {
      const animateButton = (e) => {
          e.preventDefault();
          e.target.classList.remove('animate');
          e.target.classList.add('animate');
          setTimeout(() => {
              e.target.classList.remove('animate');
          }, 700);
      };
  
      const button = animateButtonRef.current;
      if (button) {
          button.addEventListener('click', animateButton);
      }
  
      return () => {
          if (button) {
              button.removeEventListener('click', animateButton);
          }
      };
    }, []);
  
    const handleSubmit = async () => {
      if (selectedValue === null) {
        setErrorMessage('Please select a voice before submitting.');
        return;
      }

      for (let scene of scenes) {
        if (!scene[2] || scene[2].trim() === '') {
          setErrorMessage('One or more scenes have empty script content. Please fill them before submitting.');
          return;
        }
      }

      setIsLoading(true);
  
      const payload = {
          reqid: reqid,
          scenes: JSON.stringify(scenes),
          voice: selectedValue
      };

      console.log('scenes2')
      console.log(JSON.stringify(scenes))

      axios.post(`${REQ_BASE_URL}/save-script/`, payload, { 
          withCredentials: true 
      })
      .then(response => {
          navigate('/video', {state: {reqid: reqid}});
      })
      .catch(error => {
          console.error(error);
      });
    };

      return(
        <div className="script">

        <SideBar />
        {isLoading && (
            <div className="loading-popup">
                Loading...
            </div>
        )}
        <div className="script-content">
          <p>LET'S CRAFT YOUR SCRIPT</p>
          <ScriptContainer 
            setScenesForParent={setScriptScenesFromChild} 
            currentSceneIndex={currentSceneIndex} 
            setCurrentSceneIndex={setCurrentSceneIndex} 
            />
          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className='footer'>
            <div className='voice-in-script'>
              <VoiceContainer 
                onVoiceChange={handleVoiceChange} 
                handleSubmit={handleSubmit}
              />
              <div className='create-video-btn-div'>
                <button 
                  ref={animateButtonRef} 
                  className="create-video-btn" 
                  onClick={handleSubmit}
                  >
                    CREATE VIDEO
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    );
  }
  
  export default ScriptPage;