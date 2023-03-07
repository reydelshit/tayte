import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import Notes from './Notes';
// import { getNotes } from '../getNotes'

const Home = () => {
  const {
    notesStorage,
    getNotes,
    updateNote,
    updatedNotes,
    setUpdatedNotes,
    toggleEditMenu,
    toggleEditModal,
  } = useContext(MainContext);

  const { storeFilteredData } = useContext(MainContext);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="w-full h-fit border-2 border-violet-500">
      <div className="h-16 text-start mt-7 p-1">
        <h1 className="text-3xl font-bold">
          hello,{' '}
          <span className="text-violet-500">
            {' '}
            {storeFilteredData.firstName}
          </span>
          !
        </h1>
      </div>
      <Notes
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
