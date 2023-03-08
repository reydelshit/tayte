import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MdTaskAlt } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiHome } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { MainContext } from '../../context/MainContext';

const Navigation = () => {
  const { notesStorage, storeFiltered, setStoreFiltered } =
    useContext(MainContext);

  const handleSearch = (target) => {
    const filteredSearch = notesStorage.filter((note) =>
      note.title.toLowerCase().includes(target.toLowerCase())
    );
    setStoreFiltered(filteredSearch);

    console.log(storeFiltered);
    // setNotesStorage(filteredSearch);
  };

  return (
    <div className="w-full p-2 flex flex-col justify-center items-center">
      <div className="relative">
        <BsSearch className="absolute left-3 top-3" />
        <input
          className="w-52 h-10 outline-none rounded-md pl-10 border-2 border-violet-500"
          type="text"
          placeholder="Search.."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Link to="/dashboard">
        <button className="w-52 h-10 my-2 flex justify-center items-center text-gray-500 font-semibold rounded-md hover:text-white hover:bg-violet-500 active:bg-violet-700 ">
          <FiHome className="mr-2" />
          Home
        </button>
      </Link>
      <Link to="/dashboard/notes">
        <button className="w-52 h-10 my-2 flex justify-center items-center text-gray-500 font-semibold rounded-md hover:text-white  hover:bg-violet-500 active:bg-violet-700">
          <AiOutlineFileText className="mr-2" />
          Notes
        </button>
      </Link>
      <Link to="/dashboard/tasks">
        <button className="w-52 h-10 my-2 flex justify-center items-center text-gray-500 font-semibold rounded-md hover:text-white  hover:bg-violet-500 active:bg-violet-700">
          <MdTaskAlt className="mr-2" />
          Tasks
        </button>
      </Link>
    </div>
  );
};

export default Navigation;
