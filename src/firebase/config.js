// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3zt-3R0GYfj9xuR8R3nGtqVPM1K3seT0",
  authDomain: "projectx-54251.firebaseapp.com",
  projectId: "projectx-54251",
  storageBucket: "projectx-54251.appspot.com",
  messagingSenderId: "496706697351",
  appId: "1:496706697351:web:c3d977b68755b4b43ce022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)