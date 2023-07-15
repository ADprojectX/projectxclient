import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {auth} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

const PrivateRouteLayout = () => {
    const [user, setUser] = useState(null);

    const checkUser = () => {
      axios
        .post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true })
        .then((response) => {
          // Set the user data received from the server
          console.log(response.data.email);
          setUser(response.data.email); // Assuming the server response contains the user's email
          return true;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
    };
  
    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // })
    
      // Call checkUser when the component mounts
    checkUser();

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
    };

    
    export default PrivateRouteLayout;
    