
import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function VoicePage() {
    const navigate = useNavigate();
    const [voiceSamples, setVoiceSamples] = useState({});
    const [selectedAudio, setSelectedAudio] = useState(null);
    const { fromTitlePage } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [userName, setUserName] = useState(null);
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
      setSelectedAudio(voiceSamples[event.target.value]);
      if (audioRef.current && selectedAudio) {
        audioRef.current.load();
      }
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit');
      axios.get(`${REQ_BASE_URL}/voice/`, selectedValue ,{ withCredentials: true })
        .then((response) => {
          console.log('voice sent');
          navigate('/loading');
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return(
        <div className="voice-page">
        <p>Welcome to the Voice Page</p>
        <form onSubmit={handleSubmit}>
            <select value={selectedValue} onChange={handleSelectChange}>
            <option value="" disabled hidden>Select Voice</option>
            {Object.entries(voiceSamples).map(([audioName,_]) => (
              <option key={audioName} value={audioName}>{audioName}</option>
            ))}
            </select>
            <button type="submit">Submit</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </form>

        {selectedAudio && (
          <div>
            <h3>{selectedValue}</h3>
            <audio controls ref={audioRef}> 
              <source src={`data:audio/mp3;base64,${selectedAudio}`} type="audio/mp3" />
            </audio>
          </div>
        )}
        
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    );
}

export default VoicePage;


// import React, {useState, useEffect, useRef} from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_BASE_URL = 'http://localhost:8000/api';
// const REQ_BASE_URL = 'http://localhost:8000/req';

// function VoicePage() {
//     const navigate = useNavigate();
//     const [voiceSamples, setVoiceSamples] = useState({});
//     const [selectedAudio, setSelectedAudio] = useState(null); 
//     const { fromTitlePage } = useParams(); 
//     const [errorMessage, setErrorMessage] = useState('');
//     const [userName, setUserName] = useState(null);
//     const [selectedValue, setSelectedValue] = useState('');

//     const audioRef = useRef(); 

//     useEffect(() => {
//         axios.get(`${REQ_BASE_URL}/voice-samples/`, { withCredentials: true })
//         .then((response) => {
//           setVoiceSamples(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, []);
  
//     const handleLogoutClick = () => {
//       let data = { token: Cookies.get('jwt') };
//       axios.post(`${API_BASE_URL}/logout/`, data, { withCredentials: true })
//         .then((response) => {
//           Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
//           Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
//           console.log('logout_successful');
//           navigate('/login');
//         })
//         .catch((error) => {
//           setErrorMessage('cannot logout');
//           console.log(error);
//         });
//     };

//     const handleSelectChange = (event) => {
//       setSelectedValue(event.target.value);
//       setSelectedAudio(voiceSamples[event.target.value]);
//       if (audioRef.current && selectedAudio) { // Check if audioRef.current and selectedAudio are not null
//         audioRef.current.load(); 
//       }
//     };
    
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('submit');
//       axios.get(`${REQ_BASE_URL}/voice/`, selectedValue ,{ withCredentials: true })
//         .then((response) => {
//           console.log('voice sent');
//           navigate('/loading');
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };

//     return(
//         <div className="voice-page">
//         <p>Welcome to the Voice Page</p>
//         <form onSubmit={handleSubmit}>
//             <select value={selectedValue} onChange={handleSelectChange}>
//             {Object.entries(voiceSamples).map(([audioName,_]) => (
//               <option key={audioName} value={audioName}>{audioName}</option>
//             ))}
//             </select>
//             <button type="submit">Submit</button>
//             {errorMessage && <p className="error">{errorMessage}</p>}
//         </form>

//         {selectedAudio && (
//           <div>
//             <h3>{selectedValue}</h3>
//             <audio controls ref={audioRef}> 
//               <source src={`data:audio/mp3;base64,${selectedAudio}`} type="audio/mp3" />
//             </audio>
//           </div>
//         )}
        
//         {errorMessage && <p className="error">{errorMessage}</p>}
//       </div>
//     );
// }

// export default VoicePage;


