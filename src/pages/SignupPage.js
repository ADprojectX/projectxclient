import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {userSignup} from '../auth/userSignUp'
import SignUpCssPage from './css/SignUpPage.css'


const API_BASE_URL = 'http://localhost:8000/api';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    const data = {email, password};
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

    const userCredential = await signup(email, password);
    const fireid = userCredential.user.uid
    // console.log("USERCRED")
    // console.log(userCredential)
    console.log("USERCRED")
    console.log(fireid)
    

    if (!error && userCredential) {
      const data = {
        email: email,
        password: password,
        fireid: fireid
    };

        let backendSuccess = false;

        for (let i = 0; i < 3; i++) {  // attempt sending data to backend for 3 times
            try {
                await axios.post(`${API_BASE_URL}/signup/`, data)
                .then(response => {
                  // Handle success
                  backendSuccess = true;
                  userCredential.user.sendEmailVerification()
                  console.log('Sent credentials to backend successful');
              })
                .catch(error => {
                  if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      console.error('Error data:', error.response.data);
                      console.error('Error status:', error.response.status);
                  } else if (error.request) {
                      // The request was made but no response was received
                      console.error('No response received:', error.request);
                  } else {
                      // Something happened in setting up the request that triggered an Error
                      console.error('Error', error.message);
                  }
              });
                
            } catch (backendError) {
                console.error(backendError);
            }
        }

        if (!backendSuccess) {
            setErrorMessage('Unable to send to backend. Removing from Firebase...');
            await userSignup().removeUser(userCredential);
            return;
        }

        navigate(from, { replace: true });
        // localStorage.setItem('uid', userCredId)
        setEmail("");
        setPassword("");
        return;
    } else {
        setErrorMessage(error);
    }
}

  // const from = location.state?.from?.pathname || '/dashboard'
  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     setErrorMessage('Passwords do not match');
  //     return;
  //   }
  //   await signup(email, password);

  //   if(!error){
  //     const data = {email, password};

  //     axios.post(`${API_BASE_URL}/signup/`, data)
  //       .then((response) => {
  //         console.log('Sent credentions to backend successful');
  //       })
  //       .catch((error) => {
  //         setErrorMessage(error.response.data.error ||'Unable to send to backend');
  //         console.log(error);
  //       });

  //     navigate(from, { replace: true});
  //     setEmail("")
  //     setPassword("")
  //     return;
  //   }else{
  //     setErrorMessage(error);
  //   }
  // }

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
