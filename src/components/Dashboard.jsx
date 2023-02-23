import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase-config'



const Dashboard = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user)
                console.log(user)
            } else {
                navigate('/');
            }
          })
    
          return() => {
            listen();
          }
    }, [navigate])

    const logOut = async () => {
        try{
            await signOut(auth)
          } catch (err){
            console.error(err)
        }
    }
  return (
    <div>Dashboard
        {/* <h1>{user.displayName}</h1> */}
        <button onClick={logOut}>logout</button>
    </div>
  )
}

export default Dashboard