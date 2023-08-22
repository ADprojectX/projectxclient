import axios from 'axios';
import './css/LoginPage.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogin } from '../auth/userLogin'
import { Link } from 'react-router-dom';

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

  return (
    <div className="login">
      <div className='form-container'>
        <form className="form" onSubmit={handleLogin}>
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
