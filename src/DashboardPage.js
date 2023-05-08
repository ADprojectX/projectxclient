import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
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
  

  React.useEffect(()=>{
    setCsrfToken(Cookies.get('csrftoken'))
    axios.get(`${API_BASE_URL}/dashboard/`, {withCredentials:true})
      .then((response) => {
        setUserName(response.data.username);
      })
      .catch((error) => {
        setErrorMessage('unauthorized');
        console.log(error);
      });
  }, []);

  const handleLogoutClick = () => {
    axios.post(`${API_BASE_URL}/logout/`, {withCredentials:true})
      .then((response) => {
        Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true});
        Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true});
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

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let headers = {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    };
    let data = {topic:topic, voice:selectedValue}
    axios.post(`${REQ_BASE_URL}/project/`, data, {headers: headers, withCredentials:true})
      .then((response) => {
        console.log(response);
        console.log('Project Submitted');
      })
      .catch((error) => {
        setErrorMessage('project not submitted');
        console.log(error);
      });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <h1>Hello, {userName}</h1>
      <p>Welcome to your dashboard</p>
      <button onClick={handleLogoutClick}>Logout</button>
      <form onSubmit={handleSubmit}>
        <select value={selectedValue} onChange={handleSelectChange}>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index}>{index}</option>
          ))}
        </select>
        <input type="text" placeholder="voice" value={topic} onChange={handleTopicChange} />
        <button type="submit">Submit</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default DashboardPage;
