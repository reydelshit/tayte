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
    <div className="w-full border-2 border-violet-500">
      <div className="greeting__container">
        <h1>hello, {storeFilteredData.firstName}!</h1>
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
