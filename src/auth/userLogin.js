import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/config'

let error = null

const login = async (email, password) => {
    error = null

    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res)
        error = null
    } catch (err) {
        error = err.message
    }
}

export const userLogin = () => {
    return {error, login};
}