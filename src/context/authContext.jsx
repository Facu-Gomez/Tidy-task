import {auth} from "../firebase"
import { createContext, useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        console.log("error creating auth context")
    }
    return context;
}

export function AuthProvider ({children}) {
    const [user, setUser] = useState ("")
    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) =>{
            if(!currentUser){
                console.log("No hay usuario suscrito")
                setUser("")
            }else{
                setUser(currentUser)
            }
        })
        return () => suscribed()
    }, [])
    const register = async (email, password) =>{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response)
    };

    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log(response)
    }

    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, responseGoogle);
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('El popup fue cerrado por el usuario.');
            } else {
                console.error('Error inesperado durante el inicio de sesión con Google:', error);
            }
        }
    };

    const logout = async () => {
        const response = await signOut(auth)
        console.log(response)
    }

    return <authContext.Provider value={{
        register, 
        login, 
        loginWithGoogle,  
        logout,
        user,

    }}> {children} </authContext.Provider>
}