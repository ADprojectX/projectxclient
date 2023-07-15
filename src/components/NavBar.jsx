import React, {useState} from 'react';
import {userLoggedIn} from '../auth/userLoggedIn';
import {userLogout} from '../auth/userLogout'
import NavBarCss from './css/NavBar.css'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase/config'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

const NavBar = () => {
    //Firebase
    // const {error, logout} = userLogout();
    const navigate = useNavigate()
    // const [user, setUser] = useState({});

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // })

    // const handleLogout = async () => {
    //     await logout()
    //     if(!error){
    //       navigate("/login")
    //     }
    // }

    //django
    const [errorMessage, setErrorMessage] = React.useState("");
    const [userName, setUserName] = React.useState(null);
    const [title, setTitle] = useState("");
    const [csrfToken, setCsrfToken] = React.useState("")
    const [topic, setTopic] = React.useState("");

    const getUserResponse = async () => {
      // e.preventDefault();
      // const res = await loggedIn();
      const {error, response} = await userLoggedIn();
      setUserName(response.data.email);
    }
    getUserResponse()

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

  return (
    <div className='navbar'>
        <h1>ProjectX</h1>
        <div className='nav-right'>
          <p>Hello {userName}</p> 
          {/* change user.email to username for django and user.email for firebase */}
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
    </div>
  );
};

export default NavBar;
