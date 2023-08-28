import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import {auth} from '../firebase/config'

let error = null

const signup = async (email, password) => {
    error = null

    try {

        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (!res) {
            throw new Error("Something went wrong")
        }

        return res

    } catch (err) {
        error = err.message
    }
}

const removeUser = async (userCredential) => {
    try {
        if (userCredential?.user) {
            await userCredential.user.delete();
        }
    } catch (err) {
        console.error("Failed to delete user from Firebase", err);
    }
}

export const userSignup = () => {
    return { error, signup, removeUser };
}