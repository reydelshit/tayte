import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import { auth, googleAuth } from '../../config/firebase-config'


const useLogin = () => {

    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()


  const signIn = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
        navigate("/dashboard")

    } catch(err){
      console.error(err)
    }
  }

  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleAuth)

      const user = auth.currentUser;
        navigate(`/dashboard/signup/${user.uid}`)

    } catch (err){
      console.error(err)
    }
  }
  
    return {signInWithGoogle, signIn, setEmail, setPassword, navigate, auth}
}

export default useLogin