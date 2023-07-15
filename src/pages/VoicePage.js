import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function VoicePage() {
    const navigate = useNavigate();
    const [voiceSamples, setVoiceSamples] = useState({});
    const { fromTitlePage } = useParams(); // Check if user came from the TitlePage
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState(null);
    const [selectedValue, setSelectedValue] = React.useState(0);

  
    React.useEffect(() => {
        axios.get(`${REQ_BASE_URL}/voice-samples/`, { withCredentials: true })
        .then((response) => {
          // Set the voice samples data received from the server
          setVoiceSamples(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
  
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

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };
    
    const handleSubmit = (e) => {
      console.log('submit')
        e.preventDefault();
        axios.get(`${REQ_BASE_URL}/voice/`, selectedValue ,{ withCredentials: true })
        .then((response) => {
          // Set the voice samples data received from the server
          console.log('voice sent');
          navigate('/loading');
        })
        .catch((error) => {
          console.error(error);
        });
        // Perform the desired action with the script

        // TODO: SEND THIS SCRIPT TO THE BACKEND---------------------

        // Reset the title field
    };

    return(
        <div className="voice-page">
        <h2>Voice Page</h2>
        <h1>Hello, {userName}</h1>
        <p>Welcome to the Voice Page</p>
        <button onClick={handleLogoutClick}>Logout</button>
        <form onSubmit={handleSubmit}>
            <select value={selectedValue} onChange={handleSelectChange}>
            {Object.entries(voiceSamples).map(([audioName,_]) => (
              <option key={audioName} value={audioName}>{audioName}</option>
            ))}
            {/* {[...Array(10)].map((_, index) => (
                <option key={index} value={index}>{index}</option>
            ))} */}
            </select>
            
            {/* <input type="text" placeholder="voice" value={topic} onChange={handleTopicChange} /> */}
            <button type="submit">Submit</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        {Object.entries(voiceSamples).map(([audioName, audioData]) => (
        <div key={audioName}>
          <h3>{audioName}</h3>
          <audio controls>
            <source src={`data:audio/mp3;base64,${audioData}`} type="audio/mp3" />
          </audio>
        </div>
      ))}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    );
}

export default VoicePage;