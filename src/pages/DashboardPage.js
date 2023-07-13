import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
// import {Cookies, useCookies } from 'react-cookie';


const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

function DashboardPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null)
  const [responseData, setResponseData] = React.useState(null);
  

  const handleTitleClick = () => {
    navigate('/title');
  };

  const handleScriptClick = () => {
    navigate('/script');
  };

  return (
    <div className="dashboard">
      <NavBar/>
      <p>Welcome to your dashboard</p>
      {/* <button onClick={handleLogoutClick}>Logout</button> */}

      <div>
        <button onClick={handleTitleClick}>Title</button>
        <button onClick={handleScriptClick}>Script</button>
      </div>
      {responseData && (
      <div>
        <h3>Response Data</h3>
        <p>{JSON.stringify(responseData.reqid)}</p>
        <p>{JSON.stringify(responseData.script)}</p>
      </div>
    )}
    </div>
  );
}

export default DashboardPage;
