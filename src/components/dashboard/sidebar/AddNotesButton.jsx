import React, { useContext, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { AiFillPlusCircle } from 'react-icons/ai';

const AddNotes = () => {
  const { showAddModal, setShowAddModal } = useContext(MainContext);

  return (
    <button
      onClick={() => setShowAddModal(!showAddModal)}
      className="button flex justify-center items-center self-center my-4"
    >
      <AiFillPlusCircle className="font-bold mr-2" />
      Add Notes
    </button>
  );
};

export default AddNotes;
