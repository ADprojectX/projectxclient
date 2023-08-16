import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

let error = null;
let currentUser = null;

const checkUserAuthentication = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            error = null;
            callback(true, user);
        } else {
            currentUser = null;
            error = "User is not authenticated";
            callback(false, null);
        }
    });
};

export const userLoggedIn = () => {
    return { currentUser, error, checkUserAuthentication };
};



// import axios from "axios";

// const API_BASE_URL = 'http://localhost:8000/api';

// export const userLoggedIn = async () => {
//   let error = null;
//   let response = null;

//   try {
//     response = await axios.post(`${API_BASE_URL}/alive/`, {}, { withCredentials: true });
//     error = null;
//   } catch (err) {
//     error = err.message;
//   }

//   return { error, response };
// };