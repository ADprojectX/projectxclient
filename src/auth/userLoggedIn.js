import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';

export const userLoggedIn = async () => {
  let error = null;
  let response = null;

  try {
    response = await axios.post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true });
    error = null;
  } catch (err) {
    error = err.message;
  }

  return { error, response };
};


// import axios from "axios";


// let error = null
// let loading = true
// let response = null
// const API_BASE_URL = 'http://localhost:8000/api';
// const REQ_BASE_URL = 'http://localhost:8000/req';


// const loggedIn = async () => {
//     error = null

//     try {
//         response = await axios.post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true });
//         // setUser(response.data.email);
//         error = null;
//         loading = false;
//     } catch (err) {
//         error = err.message
//         loading = false;
//     }

//     if (loading) {
//         return <p>Loading...</p>; // Show a loading indicator while checking the user status
//     }

//     return response
    
// }

// export const userLoggedIn = () => {
//     return {error, loggedIn};
// }