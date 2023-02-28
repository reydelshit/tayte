import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    const [confirmPassword, setConfirmPassword] = useState("")
    const userCollectionRef = collection(db, "user");


    const navigate = useNavigate()

    const signUp = async () => {


        try{
            await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);

            await addDoc(userCollectionRef, {
              firstName: userDetails.firstName, 
              lastName: userDetails.lastName, 
              age: userDetails.age, 
              email: userDetails.email, 
              password:userDetails.password}
              ).then(docRef => {
                console.log("Document written with ID: ", docRef.id)

                setUserDetails({
                  firstName: '',
                  lastName: '',
                  age: 0,
                  email: '',
                  password: ''
                })

                setConfirmPassword("")
                navigate("/")


              })

       
        } catch(err){
          console.error(err)
        }
      }


      const checkIfMatch = () => {

        if(userDetails.password === confirmPassword){
          return <span>password match</span>
        } else {
          return <span>password dont match</span>
        }
      }
      
      useEffect(() => {
          checkIfMatch()
        
      }, [confirmPassword.length > userDetails.password - 2])

      // useEffect(() => {

      //   const userID = auth.currentUser;
      //   if(userID.uid ){
      //     const checkIfEqualsToParams = () => {

      //       if(param.id === userID.uid){
      //         setUserDetails({
      //           ...userDetails,
      //           email: 'reydel321@gmail.com',
      //         })
  
      //       }
      //     }
      //     checkIfEqualsToParams();
      //   }

      // }, [navigate])
      
  return (
    <div className='singup__container'>
      <div className='signup__inputs__container'>
        <input type="text" placeholder='first name' value={userDetails.firstName} onChange={((e) => setUserDetails({
            ...userDetails,
            firstName: e.target.value
          }))}/>
          <input type="text" placeholder='last name' value={userDetails.lastName} onChange={((e) => setUserDetails({
            ...userDetails,
            lastName: e.target.value
          }))}/>
          <input type="number" placeholder='age' onChange={((e) => setUserDetails({
            ...userDetails,
            age: Number(e.target.value)
          }))}/>
          <input type="email" placeholder='email' value={userDetails.email} onChange={((e) => setUserDetails({
            ...userDetails,
            email: e.target.value
          }))}/>

          {/* {param.id ? <>
            <input type="password" name="pass" id="pass" placeholder='password' value={userDetails.password} 
            onChange={((e) => setUserDetails({
              ...userDetails,
              password: e.target.value}
            ))} disabled={isPasswordDisabled}/>

            <input type="password" name="pass" id="passs" placeholder='confirm password' value={confirmPassword} 
            onChange={((e) => setConfirmPassword(e.target.value))} disabled={isPasswordDisabled}/>

          </> : <>
 
          </>} */}

            <input type="password" name="pass" id="pass" placeholder='password' value={userDetails.password} onChange={((e) => setUserDetails({
                ...userDetails,
                password: e.target.value}
            ))}/>
            <input type="password" name="pass" id="passs" placeholder='confirm password' value={confirmPassword} onChange={((e) => setConfirmPassword(e.target.value))}/>

          {confirmPassword.length > 4 && checkIfMatch()}
      </div>


       <div className='singup__buttons__container'>
          <button onClick={signUp}>create an account</button>
         <span>if already have an account, <Link to={"/"}>sign in</Link></span>
      </div>


    </div>
  )
}

export default SignUp