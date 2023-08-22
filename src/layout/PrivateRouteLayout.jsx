import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {userLoggedIn} from '../auth/userLoggedIn';
import NavBar from '../components/NavBar'

const PrivateRouteLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { error, checkUserAuthentication } = userLoggedIn();

  useEffect(() => {
    checkUserAuthentication((isAuthenticated, user) => {
      setLoading(false);

      if (isAuthenticated) {
        setUser(user.email);
      } else {
        console.error(error);
      }
    });
  }, []);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (!user) {
    console.log('User not authenticated');
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <NavBar user={user}/>
        <Outlet />
      </>
    );
  }
};

export default PrivateRouteLayout;
  