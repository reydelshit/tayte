import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const userCollectionRef = collection(db, 'user');

  const navigate = useNavigate();
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      await addDoc(userCollectionRef, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        age: userDetails.age,
        email: userDetails.email,
        password: userDetails.password,
      }).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);

        setUserDetails({
          firstName: '',
          lastName: '',
          age: 0,
          email: '',
          password: '',
        });

        setConfirmPassword('');
        navigate('/');
      });
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfMatch = () => {
    if (userDetails.password === confirmPassword) {
      return (
        <span className="text-violet-500 text-start p-0">password match</span>
      );
    } else {
      return <span className="text-red-600">password dont match</span>;
    }
  };

  useEffect(() => {
    checkIfMatch();
  }, [confirmPassword.length > userDetails.password - 2]);

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
    <div className="flex items-center justify-center flex-col w-[35rem] h-[35rem] p-5 bg-violet-50 border-2 border-violet-500 rounded-md">
      <div className="flex items-center justify-center flex-col w-full h-full p-2">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-violet-500 mb-1">sign up</h1>
          <p className="text-sm">quick and easy!</p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <input
            className="input-signup w-[100%]"
            type="text"
            placeholder="first name"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                firstName: e.target.value,
              })
            }
          />
          <input
            className="input-signup w-[100%]"
            type="text"
            placeholder="last name"
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div className="flex gap-5 w-full">
          <input
            className="input-signup w-80"
            type="email"
            placeholder="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              })
            }
          />
          <input
            className="input-signup w-40"
            type="number"
            placeholder="age"
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                age: Number(e.target.value),
              })
            }
          />
        </div>

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

        <div className="grid grid-cols-2 gap-2 w-full">
          <input
            className="input-signup"
            type="password"
            name="pass"
            id="pass"
            placeholder="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
          />
          <input
            className="input-signup"
            type="password"
            name="pass"
            id="passs"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {confirmPassword.length > 4 && checkIfMatch()}
        </div>

        <button
          className="bg-violet-500 w-52 h-10 mt-2 rounded-md text-white font-semibold hover:bg-violet-400"
          onClick={signUp}
        >
          create an account
        </button>
      </div>

      <span className="text-sm">
        if already have an account{' '}
        <Link className="text-violet-500 hover:underline" to={'/'}>
          sign in
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
