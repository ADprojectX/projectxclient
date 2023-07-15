import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {auth} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';

const PrivateRouteLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // // onAuthStateChanged(auth, (currentUser) => {
    // //     setUser(currentUser);
    // // })
    
    
    useEffect(() => {
      const checkUser = async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true });
          setUser(response.data.email);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      
      checkUser();
    }, []);
    
    if (loading) {
      return <p>Loading...</p>; // Show a loading indicator while checking the user status
    }

    if (!user) {
      console.log('User not authenticated');
      return <Navigate to="/login" />;
    }else{
      return <Outlet />;
    }
};
    
    export default PrivateRouteLayout;
    