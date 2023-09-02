import './css/LoginPage.css';
import PublicNavBar from '../components/PublicNavBar';
import { userLogin } from '../auth/userLogin'
import PublicFooter from '../components/PublicFooter';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase/config'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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



  const handleGoogleSignIn = async() => {
    const provider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(auth, provider);
    const fireid = userCredential.user.uid
    const emailId = userCredential.user.email
    const token = userCredential.user.accessToken

    if (!error && userCredential) {
      const data = {
        email: emailId,
        // password: "password",
        fireid: fireid
      };

      console.log("data");
      console.log(data);
  
      const makeBackendRequest = async (attempt = 0) => {
        if (attempt >= 3) { 
          console.error('Unable to send to backend. Removed from Firebase.');
          alert("Login unsuccessful, please try again")
          await userCredential.user.delete();
          return;
        }
  
        try {
          await axios.post(`${API_BASE_URL}/signup/`, data)
          .then(response => {
            // Handle success
            try {
              sendEmailVerification(userCredential.user);
              console.log("Email sent")
            } catch {
              console.log("Email Not sent")
            }
            console.log('Sent credentials to backend : successful');
            navigate(from, { replace: true });
            setEmail("");
            setPassword("");
          })
          .catch(error => {
            console.error('Error:', error);
            setTimeout(() => makeBackendRequest(attempt + 1), 1000 * (attempt + 1));
          });
        } catch (backendError) {
          console.error(backendError);
        }
      }
  
      makeBackendRequest();
    } else {
      console.error(error);
    }

  };
  return (
    <div>
      <PublicNavBar />
      <div className="login">
        <div className='form-container'>
          
          <h2>Welcome Back</h2>

          <form className="form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={handleUsernameChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button type="submit">Continue</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>

          <p>Do not have an account? <Link to="/signup" style={{ textDecoration: 'underline' }}>Sign Up</Link></p>
          {location.state && location.state.from && (
            <p>You need to login to access {location.state.from.pathname}</p>
          )}

          <div class="divider-container">
            <div class="line"></div>
            <span class="or-text">OR</span>
            <div class="line"></div>
          </div>

          <div className='other-sign-in-buttons'>
            <div className='other-sign-in-buttons-div' onClick={handleGoogleSignIn}>
                <img src="../google-logo.png" className='other-sign-in-buttons-icon' />
                <div className='other-sign-in-buttons-text'>Continue with Google</div>
            </div>
          </div>

        </div>
      </div>
      <PublicFooter />
    </div>
  )
}
