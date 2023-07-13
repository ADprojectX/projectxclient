import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {userSignup} from '../auth/userSignUp'
import SignUpCssPage from './css/SignUpPage.css'


const API_BASE_URL = 'http://localhost:8000/api';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {error, signup } = userSignup();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    const data = { username: email, password };
    axios.post(`${API_BASE_URL}/signup/`, data)
      .then((response) => {
        console.log('successful');
        navigate(`/login`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error ||'Unable to sign up');
        console.log(error);
        navigate.replace('/signup');
      });
  };

  const from = location.state?.from?.pathname || '/dashboard'
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    await signup(email, password);
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
    <div className="signup">
      {/* <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form> */}

      <div className='form-container'>
        <form className="form" onSubmit={handleSignUp}>
          <h2>Sign Up</h2>

          <input type="text" placeholder="Email" value={email} onChange={handleUsernameChange} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

          <button type="submit">Continue</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        <p>Already have an account? <Link to="/login" style={{ textDecoration: 'underline' }}>Sign In</Link></p>
        {location.state && location.state.from && (
          <p>You need to login to access {location.state.from.pathname}</p>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
