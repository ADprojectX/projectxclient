import './css/PublicNavbar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="public-navbar">
        <div className="public-navbar-logo-div clickable-logo" onClick={handleLogoClick}>
            <img className="public-navbar-logo" src="../logo.png" alt="Logo" />
            <h1 className="public-navbar-text" onClick={handleLogoClick}>magiclips.ai</h1>
            <div className="public-navbar-beta">BETA</div>
        </div>

        <button className={`menu-button ${menuOpen ? 'opened' : ''}`} onClick={toggleMenu}>☰</button>

        <div className={`public-navbar-items ${menuOpen ? 'open' : ''}`}>
                <a href='/'><p>Home</p></a>
                <a href='/contact'><p>Contact</p></a>
                {/* <a><p>Features</p></a> */}
                {/* <a><p>Pricing</p></a> */}
                {/* <a><p>About Us</p></a> */}
                {/* <button className="pnavbar-get-started" onClick={handleGetStarted}>Get Started</button> */}
                <button className="button_slide slide_right" onClick={handleGetStarted}>Get Started</button>
        </div>  
    </div>
    );
}

export default PublicNavBar;