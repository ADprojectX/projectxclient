import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import {auth} from '../firebase/config'


const auth = getAuth();
sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });



// import { signInWithEmailAndPassword } from 'firebase/auth'
// import {auth} from '../firebase/config'

// let error = null

// const login = async (email, password) => {
//     error = null

//     try {
//         const res = await signInWithEmailAndPassword(auth, email, password);
//         console.log(res)
//         error = null
//     } catch (err) {
//         error = err.message
//     }
// }

// export const userLogin = () => {
//     return {error, login};
// }