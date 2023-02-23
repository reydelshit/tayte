import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleAuth } from '../config/firebase-config'



const Login = () => {

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
    } catch (err){
      console.error(err)
    }
  }

  

  return (
    <div className='login__container'>
        <button className='button__google' onClick={signInWithGoogle}>login with google</button>

        <div className='seperator'>
          <hr />
          <p>or</p>
          <hr />
        </div>
      {/* <input type="text" placeholder='Title'/>
      <textarea placeholder='body..' cols="30" rows="10"></textarea> */}
        <input type="text" placeholder='email' onChange={((e) => setEmail(e.target.value))}/>
        <input type="password" name="pass" id="pass" placeholder='password' onChange={((e) => setPassword(e.target.value))}/>

        <button className='button__login' onClick={signIn}>Login</button>

        <br />


      <span className='no__account'>if you dont have an account, <Link to={"/signup"}>sign up</Link></span>
    </div>
  )
}

export default Login