import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import NotesDashboard from './NotesDashboard';

import { AiOutlineFileText } from 'react-icons/ai';
// import { getNotes } from '../getNotes'

const Home = () => {
  const {
    notesStorage,
    getNotes,
    updateNote,
    updatedNotes,
    setUpdatedNotes,
    toggleEditModal,
  } = useContext(MainContext);

  const { storeFilteredData } = useContext(MainContext);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="w-full f-full border-2 border-green-500">
      <div className="h-16 text-start mt-7 p-1">
        <h1 className="text-3xl font-bold mb-4">
          hello,{' '}
          <span className="text-violet-500">
            {' '}
            {storeFilteredData.firstName}
          </span>
          !
        </h1>
        <h1 className="font-semibold text-xl ml-4 mt-8 flex justify-start items-center">
          <AiOutlineFileText className="mr-2" /> My notes
        </h1>
      </div>
      <NotesDashboard
        notesStorage={notesStorage}
        updatedNotes={updatedNotes}
        updateNote={updateNote}
        // toggleEditMenu={toggleEditMenu}
        toggleEditModal={toggleEditModal}
        setUpdatedNotes={setUpdatedNotes}
      />
    </div>
  );
};

export default Home;
