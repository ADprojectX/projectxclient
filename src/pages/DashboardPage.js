import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
// import OutletContext from '../context/OutletContext';
import axios from 'axios';
import NavBar from '../components/NavBar';

const API_BASE_URL = 'http://localhost:8000/api';

function DashboardPage() {
  // const user  = useContext(OutletContext);
  // try {
  //   const [user, setUser] = useOutletContext();
  // } catch (error) {
  //   console.log("error")
  //   console.log(error)
  // }

  const [name, setName] = useOutletContext()
  const navigate = useNavigate();
  
  const handleTitleClick = () => {
    navigate('/title');
  };

  const handleScriptClick = () => {
    navigate('/script');
  };



  return (
    <div className="dashboard">
    {/* <p>User: {user}</p> */}
    <NavBar />
      <p>Welcome to your dashboard</p>
      <div>
        <button onClick={handleTitleClick}>Title</button>
        <button onClick={handleScriptClick}>Script</button>
      </div>
    </div>
  );
}

export default DashboardPage;




// import React, {useState} from 'react';
// import { useNavigate, Link, Navigate, Outlet} from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import NavBar from '../components/NavBar';
// // import {Cookies, useCookies } from 'react-cookie';


// const API_BASE_URL = 'http://localhost:8000/api';
// const REQ_BASE_URL = 'http://localhost:8000/req';

// function DashboardPage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const [userName, setUserName] = React.useState(null)
//   const [responseData, setResponseData] = React.useState(null);
  

//   const handleTitleClick = () => {
//     navigate('/title');
//   };

//   const handleScriptClick = () => {
//     navigate('/script');
//   };


//   const checkUser = () => {
//     axios
//       .post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true })
//       .then((response) => {
//         // Set the user data received from the server
//         setUser(response.data.email); // Assuming the server response contains the user's email
//         console.log("USER: ", user)
//         return true;
//       })
//       .catch((error) => {
//         console.error(error);
//         return false;
//       });
//   };

//   // onAuthStateChanged(auth, (currentUser) => {
//   //     setUser(currentUser);
//   // })
  
//     // Call checkUser when the component mounts
//   checkUser();

//   if (user) {
//       console.log("Navigating to Dashboard");
//       <Navigate to="/dashboard" />
//       // return <Outlet />;
//   } else {
//       console.log("error navigating")
//       console.log(user)
//       // return <Navigate to="/login" />;
//   }


//   return (
//     <div className="dashboard">
//       <NavBar/>
//       <p>Welcome to your dashboard</p>
//       {/* <button onClick={handleLogoutClick}>Logout</button> */}

//       <div>
//         <button onClick={handleTitleClick}>Title</button>
//         <button onClick={handleScriptClick}>Script</button>
//       </div>
//       {responseData && (
//       <div>
//         <h3>Response Data</h3>
//         <p>{JSON.stringify(responseData.reqid)}</p>
//         <p>{JSON.stringify(responseData.script)}</p>
//       </div>
//     )}
//     </div>
//   );
// }

// export default DashboardPage;
