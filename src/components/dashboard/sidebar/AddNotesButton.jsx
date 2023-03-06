import React, { useContext, useState } from 'react';
import { MainContext } from '../../context/MainContext';

const AddNotes = () => {
  const { showAddModal, setShowAddModal } = useContext(MainContext);

  return (
    <button
      onClick={() => setShowAddModal(!showAddModal)}
      className="button grid self-center items-center my-4"
    >
      Add Notes
    </button>
  );
};

export default AddNotes;
