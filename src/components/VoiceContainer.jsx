import React, {useState, useEffect, useRef} from 'react';
import './css/VoiceContainer.css'
import axios from 'axios';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function VoiceContainer({ onVoiceChange }) {
    const [voiceSamples, setVoiceSamples] = useState({});
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const audioRef = useRef();

    useEffect(() => {
        axios.get(`${REQ_BASE_URL}/voice-samples/`, { withCredentials: true })
        .then((response) => {
          setVoiceSamples(response.data);
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
        onVoiceChange(event.target.value);
    };


    return(
    <div className="voice-content">
        <div className='voice-tile'>
          {selectedAudio && (
            <div>
              <audio controls ref={audioRef}> 
                  <source src={`data:audio/mp3;base64,${selectedAudio}`} type="audio/mp3" />
              </audio>
              </div>
          )}

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