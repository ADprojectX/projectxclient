import './css/PublicNavbar.css'
import React from 'react';
import { useNavigate } from 'react-router-dom'


const PublicNavBar = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    }

    return (
        <div className="public-navbar">
            <h1>magiclips.ai</h1>
            <div className='public-navbar-items'>
                <a><p>Home</p></a>
                <a><p>Features</p></a>
                <a><p>Pricing</p></a>
                <a><p>Contact</p></a>
                <a><p>About Us</p></a>
                <button onClick={handleGetStarted}>Get Started</button>
            </div>
        </div>
      );
}

export default PublicNavBar;