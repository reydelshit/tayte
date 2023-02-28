import React from 'react'
import { auth } from '../../config/firebase-config'
import { signOut } from 'firebase/auth';


const Logout = () => {
    
    const logOut = async () => {
        try{
            await signOut(auth)
          } catch (err){
            console.error(err)
        }
    }

  return (
    <button onClick={logOut}>logout</button>
  )
}

export default Logout