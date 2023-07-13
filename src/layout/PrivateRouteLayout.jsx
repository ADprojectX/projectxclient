import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {auth} from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";

const PrivateRouteLayout = () => {
    // const location =  useLocation();
    // const navigate = useNavigate();
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    return user ? (<Outlet/>) : (
        <Navigate to="/login" />
    );
}

export default PrivateRouteLayout;