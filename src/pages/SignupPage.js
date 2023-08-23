import './css/SignUpPage.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { userSignup } from '../auth/userSignUp'
import { sendEmailVerification } from 'firebase/auth'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {error, signup, removeUser } = userSignup();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const from = location.state?.from?.pathname || '/dashboard'
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    const userCredential = await signup(email, password);
    const fireid = userCredential.user.uid
  
    if (!error && userCredential) {
      const data = {
        email: email,
        password: password,
        fireid: fireid
      };
  
      const makeBackendRequest = async (attempt = 0) => {
        if (attempt >= 10) { 
          setErrorMessage('Unable to send to backend. Removing from Firebase...');
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
      setErrorMessage(error);
    }
  }

  return (
    <div className="signup">
      <div className='form-container'>
        <form className="form" onSubmit={handleSignUp}>
          <h2>Sign Up</h2>

          <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
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
