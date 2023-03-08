import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { MainContext } from '../context/MainContext';

const Login = () => {
  const { signInWithGoogle, signIn, setEmail, setPassword } =
    useContext(MainContext);

  const navigate = useNavigate();

  useEffect(() => {
    // if(!auth.currentUser){
    //   navigate('/');
    // }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col w-[28rem] h-[30rem] p-5 bg-violet-50 border-2 border-violet-500 rounded-md">
      <h1 className="text-4xl font-bold mb-6">
        welcome to <span className="text-violet-500">tayte</span>!
      </h1>
      <button
        className="w-52 h-10 text-violet-500 font-semibold cursor-pointer hover:border-b-2 hover:border-b-violet-500"
        onClick={signInWithGoogle}
        disabled
      >
        login with google
      </button>

      <p className="text-sm my-5">or</p>

      <input
        className="input-login focus:border-1 focus:border-violet-500"
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input-login focus:border-1 focus:border-violet-500"
        type="password"
        name="pass"
        id="pass"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-violet-500 w-52 h-10 mt-2 rounded-md text-white font-semibold hover:bg-violet-400"
        onClick={signIn}
      >
        Login
      </button>

      <br />
      <span className="text-sm">
        if you dont have an account{' '}
        <Link className="text-violet-500 hover:underline" to={'/signup'}>
          sign up
        </Link>
      </span>
    </div>
  );
};

export default Login;
