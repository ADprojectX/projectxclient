import React, {useState} from 'react';
import {userLogout} from '../auth/userLogout'
import NavBarCss from './css/NavBar.css'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase/config'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const {error, logout} = userLogout();
    const navigate = useNavigate()
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const handleLogout = async () => {
        await logout()
    
        if(!error){
          navigate("/login")
        }
      }

  return (
    <div className='navbar'>
        <h1>ProjectX</h1>
        <div className='nav-right'>
          <p>Hello {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default NavBar;
