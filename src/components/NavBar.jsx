import React, {useEffect} from 'react';
import {userLoggedIn} from '../auth/userLoggedIn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBarCss from './css/NavBar.css'    
import {userLogout} from '../auth/userLogout' //Firebase
import { onAuthStateChanged } from "firebase/auth"; //firebase
import {auth} from '../firebase/config' //firebase

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

const NavBar = ( { user } ) => {
  const navigate = useNavigate()
  
  //django
  const [errorMessage, setErrorMessage] = React.useState("");
  // const [userName, setUserName] = React.useState(null);
  // useEffect(() => {
  //   console.log(user)
  //   setUserName(user);
  // }, []);
  // const getUserResponse = async () => {
  //   // e.preventDefault();
  //   // const res = await loggedIn();
  //   const {error, response} = await userLoggedIn();
  //   setUserName(response.data.email);
  // }
  // getUserResponse()
  
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
      console.log(errorMessage);
    });
  };
  
  return (
    <div className='navbar'>
        <h1>ProjectX</h1>
        <div className='nav-right'>
          <p>Hello {user}</p> 
          {/* change user.email to username for django and user.email for firebase */}
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
    </div>
  );
};

export default NavBar;






//Firebase
// const {error, logout} = userLogout();
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