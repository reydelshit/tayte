import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';

import NotesDashboard from '../dashboard/NotesDashboard';
import AddNotesButton from '../sidebar/AddNotesButton';

const Notes = () => {
  const {
    deleteNote,
    toggleEditModal,
    toggleEditMenu,
    storeFiltered,
    notesStorage,
  } = useContext(MainContext);

  const { id } = useParams();

  return (
    <div className="w-full">
      <div className="flex items-center h-20 border-2 border-teal-400 p-2">
        <h1 className="text-2xl font-bold text-left">Notes</h1>
      </div>
      <div className="w-full flex justify-end p-2">
        <AddNotesButton />
      </div>
      <NotesDashboard />
    </div>
  );
};

export default Notes;
