import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="w-full p-2 flex flex-col justify-center items-center">
      <input
        className="w-52 h-10 outline-none rounded-md pl-2 border-2 border-violet-500"
        type="text"
        placeholder="Search.."
      />
      <button className="w-52 h-10 my-2 grid justify-center place-content-center text-violet-500 hover:text-white font-bold rounded-md hover:bg-violet-500 active:bg-violet-700 ">
        <Link to="/dashboard">Home</Link>
      </button>
      <button className="w-52 h-10 my-2 grid justify-center place-content-center text-violet-500 hover:text-white font-bold rounded-md hover:bg-violet-500 active:bg-violet-700">
        <Link to="/dashboard/notes">Notes</Link>
      </button>
      <button className="w-52 h-10 my-2 grid justify-center place-content-center text-violet-500 hover:text-white font-bold rounded-md hover:bg-violet-500 active:bg-violet-700">
        <Link to="/dashboard/tasks">Tasks</Link>
      </button>
    </div>
  );
};

export default Navigation;
