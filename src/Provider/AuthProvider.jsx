import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';




export const AuthContext=createContext(null)
const auth=getAuth() 
const GoogleProvider=new GoogleAuthProvider() 

const AuthProvider = ({children}) => { 
    const [loading,setLoading]=useState(true) 
    const [user,setUser]=useState(null)


const createUser=(email,password)=>{
    setLoading(true)
     return createUserWithEmailAndPassword(auth,email,password)
} 

const SignIn=(email,password)=>{
     setLoading(true) 
     return signInWithEmailAndPassword(auth,email,password)
} 

const LogOut=()=>{
     setLoading(true)
     return signOut(auth)
} 
const signInWithGoogle=()=>{
     setLoading(true)
     return signInWithPopup(auth,GoogleProvider)
} 
useEffect(()=>{
 const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
     setUser(currentUser) 
     setLoading(false)
 }) 
 return ()=>unSubscribe()
},[])



    const authInfo={ 
        createUser,
        SignIn,
        signInWithGoogle,
        LogOut,
        loading,
        user
         
    }

    return (
        <div>
            <AuthContext value={authInfo}> {children} </AuthContext>
        </div>
    );
};

export default AuthProvider;