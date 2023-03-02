import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase-config'
import { MainContext } from './context/MainContext'



const Login = () => {

  const {signInWithGoogle, signIn, setEmail, setPassword} = useContext(MainContext)


  const navigate = useNavigate()

  useEffect(() => {

    // if(!auth.currentUser){
    //   navigate('/');
    // }

  }, [])

    return (
      <div className='login__container'>
        <h1>welcome to tayte!</h1>

          <button className='button__google' onClick={signInWithGoogle} disabled>login with google</button>
  
          <div className='seperator'>
            <hr />
            <p>or</p>
            <hr />
          </div>

          <input type="text" placeholder='email' onChange={((e) => setEmail(e.target.value))}/>
          <input type="password" name="pass" id="pass" placeholder='password' onChange={((e) => setPassword(e.target.value))}/>
          <button className='button__login' onClick={signIn}>Login</button>

          <br />
        <span className='no__account'>if you dont have an account, <Link to={"/signup"}>sign up</Link></span>
      </div>
    )

}

export default Login