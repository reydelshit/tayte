import React, { useContext, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MainContext } from '../../context/MainContext';

const AddNotes = () => {
  const { showAddModalNotes, setShowAddModalNotes } = useContext(MainContext);

  return (
    <button
      onClick={() => setShowAddModalNotes(!showAddModalNotes)}
      className="button flex justify-center items-center self-center my-4"
    >
      <AiFillPlusCircle className="font-bold mr-2" />
      Add Notes
    </button>
  );
};

export default AddNotes;
