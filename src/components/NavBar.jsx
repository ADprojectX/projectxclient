import './css/NavBar.css'
import React from 'react';
import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';

const Dropdown = () => {
  return (
    <div className="dropdown">
      <div className='dropdown-item'>My Account</div>
      <div className='dropdown-item'>My Plan</div>
    </div>
  );
};


const NavBar = ( { user } ) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  
  return (
    <div className='navbar'>
        <div className="navbar-logo-div">
            <img className="public-navbar-logo" src="../logo.png" />
            <h1 className='public-navbar-text'>magiclips.ai</h1>
        </div>
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
        </div>
    </div>
  );
};

export default NavBar;