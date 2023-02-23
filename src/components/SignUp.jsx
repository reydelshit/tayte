import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db} from '../config/firebase-config'
import { collection, addDoc } from 'firebase/firestore'


const SignUp = () => {

    const [userDetails, setUserDetails] = useState({
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
      password: ""
    })

    const userCollectionRef = collection(db, "user");

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")


    const signUp = async () => {
        try{
          await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)

          await addDoc(userCollectionRef, {
              firstName: userDetails.firstName, 
              lastName: userDetails.lastName, 
              age: userDetails.age, 
              email: userDetails.email, 
              password:userDetails.password})


        } catch(err){
          console.error(err)
        }
      }
  return (
    <div>
        <input type="text" placeholder='first name' onChange={((e) => setUserDetails({
          ...userDetails,
          firstName: e.target.value
        }))}/>
        <input type="text" placeholder='last name' onChange={((e) => setUserDetails({
          ...userDetails,
          lastName: e.target.value
        }))}/>
        <input type="number" placeholder='age' onChange={((e) => setUserDetails({
          ...userDetails,
          age: Number(e.target.value)
        }))}/>
        <input type="email" placeholder='email' onChange={((e) => setUserDetails({
          ...userDetails,
          email: e.target.value
        }))}/>
        <input type="password" name="pass" id="pass" placeholder='password' onChange={((e) => setUserDetails({
            ...userDetails,
            password: e.target.value}
        ))}/>

      <button onClick={signUp}>create an account</button>

      <span>if already have an account, <Link to={"/"}>sign in</Link></span>

    </div>
  )
}

export default SignUp