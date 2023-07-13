import { signOut } from 'firebase/auth'
import {auth} from '../firebase/config'

let error = null

const logout = async (email, password) => {
    error = null

    try {
        const res = await signOut(auth);
        error = null
    } catch (err) {
        error = err.message
    }
}

export const userLogout = () => {
    return {error, logout};
}