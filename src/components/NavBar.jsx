import React from 'react';
import { Icon } from 'react-icons-kit'
import { useNavigate } from 'react-router-dom';
import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBarCss from './css/NavBar.css'    
import {userLoggedIn} from '../auth/userLoggedIn';
import {userLogout} from '../auth/userLogout' //Firebase
import { onAuthStateChanged } from "firebase/auth"; //firebase
import {auth} from '../firebase/config' //firebase

const Dropdown = () => {
  return (
    <div className="dropdown">
      <div className='dropdown-item'>My Account</div>
      <div className='dropdown-item'>My Plan</div>
    </div>
  );
};


const NavBar = ( { user } ) => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
    console.log("Entered")
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
    console.log("Exit")

  };
  
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
  
  // const handleLogoutClick = () => {
  //   let data = { token: Cookies.get('jwt') };
  //   axios.post(`${API_BASE_URL}/logout/`, data, { withCredentials: true })
  //   .then((response) => {
  //     Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
  //     Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
  //     console.log('logout_successful');
  //     navigate('/login');
  //   })
  //   .catch((error) => {
  //     setErrorMessage('cannot logout');
  //     console.log(errorMessage);
  //   });
  // };
  
  return (
    <div className='navbar'>
        <h1>magiclips.ai</h1>
        <div className='nav-right'>
          <p>{user}</p>
          <div
            className="profile"
            style={{ color: '#585A5A' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <VideoCameraFrontRoundedIcon fontSize='large' color="inherit" />
            {showDropdown && <Dropdown />}
        </div>
          {/* change user.email to username for django and user.email for firebase */}
          {/* <button onClick={handleLogoutClick}>Logout</button> */}
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