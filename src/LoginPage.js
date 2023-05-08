import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:8000/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };
    axios.post(`${API_BASE_URL}/login_user/`, data, {withCredentials:true})
      .then((response) => {
        localStorage.setItem('isAuthenticated', true);
        console.log('successful');
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('Invalid username or password');
        console.log(error);
        navigate('/login');
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Login</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      {location.state && location.state.from && (
        <p>You need to login to access {location.state.from.pathname}</p>
      )}
    </div>
  )
}
