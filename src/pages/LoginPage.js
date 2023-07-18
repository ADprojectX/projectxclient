import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginCssPage from './css/LoginPage.css'
import { userLogin } from '../auth/userLogin'
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {error, login} = userLogin()

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const from = location.state?.from?.pathname || '/dashboard'
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if(!error){
      navigate(from, { replace: true});
      setEmail("")
      setPassword("")
      return;
    }else{
      setErrorMessage(error);
    }
  }

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    axios.post(`${API_BASE_URL}/login_user/`, data, {withCredentials:true})
      .then((response) => {
        localStorage.setItem('isAuthenticated', true);
        console.log('login successful');
        navigate('/dashboard');
      })
      .catch((error) => {
        setErrorMessage('Invalid username or passwordddd');
        console.log(error);
        navigate('/login');
      });
  };

  return (
    <div className="login">
      <div className='form-container'>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input type="email" placeholder="Email" value={email} onChange={handleUsernameChange} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <button type="submit">Continue</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        <p>Do not have an account? <Link to="/signup" style={{ textDecoration: 'underline' }}>Sign Up</Link></p>
        {location.state && location.state.from && (
          <p>You need to login to access {location.state.from.pathname}</p>
        )}
      </div>
    </div>
  )
}
