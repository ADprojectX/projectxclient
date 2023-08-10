
import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SideBar from '../components/SideBar';
import './css/VoiceContainer.css'
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function VoiceContainer({ onVoiceChange }) {
    const navigate = useNavigate();
    const [voiceSamples, setVoiceSamples] = useState({});
    const [selectedAudio, setSelectedAudio] = useState(null);
    const { fromTitlePage } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const location = useLocation();
    let reqid = location.state && location.state.reqid

    const audioRef = useRef();

    useEffect(() => {
        axios.get(`${REQ_BASE_URL}/voice-samples/`, { withCredentials: true })
        .then((response) => {
          setVoiceSamples(response.data);
          console.log(voiceSamples)
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);


    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        setSelectedAudio(voiceSamples[event.target.value]);
        if (audioRef.current && selectedAudio) {
            audioRef.current.load();
        }
        onVoiceChange(event.target.value); // call the function passed as prop
    };

    
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log('submit');
    //   axios.get(`${REQ_BASE_URL}/set-voice/?reqid=${reqid}&selectedValue=${selectedValue}`, { withCredentials: true })
    //     .then((response) => {
    //       console.log('voice sent');
    //       navigate('/loading');
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };

    return(
    <div className="voice-content">
        {/* <form onSubmit={handleSubmit}> */}

        {/* </form> */}

        <div className='voice-tile'>
          {selectedAudio && (
            <div>
              <audio controls ref={audioRef}> 
                  <source src={`data:audio/mp3;base64,${selectedAudio}`} type="audio/mp3" />
              </audio>
              </div>
          )}

        {/* <div className="custom-select-wrapper">
            <select className='select-voice-dropdown' value={selectedValue} onChange={handleSelectChange}>
                <option value="" disabled hidden>Select Voice</option>
                {Object.entries(voiceSamples).map(([audioName,_]) => (
                    <option key={audioName} value={audioName}>{audioName}</option>
                ))}
            </select>
        </div> */}


          <select className='select-voice-dropdown' value={selectedValue} onChange={handleSelectChange}>
              <option value="" disabled hidden>Select Voice</option>
              {Object.entries(voiceSamples).map(([audioName,_]) => (
                  <option key={audioName} value={audioName}>{audioName}</option>
              ))}
          </select>
        </div>


        {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
    );
}

export default VoiceContainer;