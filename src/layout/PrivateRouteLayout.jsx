import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {userLoggedIn} from '../auth/userLoggedIn';
import axios from "axios";
// import OutletContext from '../context/OutletContext'
// import { OutletContext } from '../context/OutletContext';


const API_BASE_URL = 'http://localhost:8000/api';
// import {auth} from '../firebase/config'
// import { onAuthStateChanged } from "firebase/auth";

const PrivateRouteLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('Aatish');
  
  
  const handleUserLoggedIn = async () => {
    const {error, response} = await userLoggedIn();
    
    if(!error){
      setUser(response.data.email);
      setLoading(false);
      return;
    }else{
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleUserLoggedIn();
}, []);
  
  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while checking the user status
  }
  
  if (!user) {
    console.log('User not authenticated');
    return <Navigate to="/login" />;
  }else{
    // return <Outlet/>;
    <p>User: {user}</p>
    console.log('user')
    return (
      <Outlet context={[name, setName]} /> // Pass the user data as a prop to the child routes  

    //   <OutletContext.Provider value={user}>
    //   <Outlet />
    // </OutletContext.Provider>
    );
  }
};

export default PrivateRouteLayout;










// // OLD working style without userloggedIn from auth
// useEffect(() => {
//   const checkUser = async () => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true });
//       setUser(response.data.email);
//       setLoading(false);
//       console.log("try block")
      
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };
//   checkUser();
// }, []);
  // const {error, loggedIn} = userLoggedIn();

  //Firebase
  // // onAuthStateChanged(auth, (currentUser) => {
  // //     setUser(currentUser);
  // // })
  