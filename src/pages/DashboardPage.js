import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
// import {Cookies, useCookies } from 'react-cookie';


const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function DashboardPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userName, setUserName] = React.useState(null)
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [topic, setTopic] = React.useState('');
  const [csrfToken, setCsrfToken] = React.useState('')
  const [responseData, setResponseData] = React.useState(null);
  

  // React.useEffect(()=>{
  //   setCsrfToken(Cookies.get('csrftoken'))
  //   axios.get(`${API_BASE_URL}/dashboard/`, {withCredentials:true})
  //     .then((response) => {
  //       setUserName(response.data.username);
  //     })
  //     .catch((error) => {
  //       setErrorMessage('unauthorized');
  //       navigate('/login');
  //       console.log(error);
  //     });
  // }, []);

  // const handleLogoutClick = () => {
  //   let data = {token : Cookies.get('jwt')}
  //   axios.post(`${API_BASE_URL}/logout/`, data, {withCredentials:true})
  //     .then((response) => {
  //       Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true});
  //       Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true});
  //       console.log('logout_successful');
  //       navigate('/login');
  //     })
  //     .catch((error) => {
  //       setErrorMessage('cannot logout');
  //       console.log(error);
  //     });
  // };

  const handleTitleClick = () => {
    navigate('/title');
  };

  const handleScriptClick = () => {
    navigate('/script');
  };


  // const handleSelectChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  // const handleTopicChange = (e) => {
  //   setTopic(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let headers = {
  //     'X-CSRFToken': csrfToken,
  //     'Content-Type': 'application/json'
  //   };
  //   let data = {topic:topic, voice:selectedValue}
  //   axios.post(`${REQ_BASE_URL}/project/`, data, {headers: headers, withCredentials:true})
  //     .then((response) => {
  //       console.log('Project Submitted');
  //       setResponseData(response.data);
  //     })
  //     .catch((error) => {
  //       setErrorMessage('project not submitted');
  //       console.log(error);
  //     });
  // };

  return (
    <div className="dashboard">
      <NavBar/>
      <h1>Hello, {userName}</h1>
      <p>Welcome to your dashboard</p>
      {/* <button onClick={handleLogoutClick}>Logout</button> */}

      <div>
        <button onClick={handleTitleClick}>Title</button>
        <button onClick={handleScriptClick}>Script</button>
      </div>

      {/* <form onSubmit={handleSubmit}>

        <select value={selectedValue} onChange={handleSelectChange}>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index}>{index}</option>
          ))}
        </select>
        
        <input type="text" placeholder="voice" value={topic} onChange={handleTopicChange} />
        <button type="submit">Submit</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form> */}


      {/* <form onSubmit={handleSubmit}>
        <select value={selectedValue} onChange={handleSelectChange}>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index}>{index}</option>
          ))}
        </select>
        <input type="text" placeholder="voice" value={topic} onChange={handleTopicChange} />
        <button type="submit">Submit</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form> */}
      {responseData && (
      <div>
        <h3>Response Data</h3>
        <p>{JSON.stringify(responseData.reqid)}</p>
        <p>{JSON.stringify(responseData.script)}</p>
      </div>
    )}
    </div>
  );
}

export default DashboardPage;
