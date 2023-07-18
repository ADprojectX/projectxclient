import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/config'

let error = null

const signup = async (email, password) => {
    error = null

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        if (!res) {
            throw new Error("Something went wrong")
        }

    } catch (err) {
        error = err.message
    }
}

export const userSignup = () => {
    return {error, signup};
}