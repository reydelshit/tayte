import React, { useContext } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MainContext } from '../../context/MainContext';

const AddTask = () => {
  const { showAddTasksModalNotes, setShowAddTasksModalNotes } =
    useContext(MainContext);

  return (
    <button
      onClick={() => setShowAddTasksModalNotes(!showAddTasksModalNotes)}
      className="button self-end flex justify-center items-center  my-4"
    >
      <AiFillPlusCircle className="font-bold mr-2" />
      Add Task
    </button>
  );
};

export default AddTask;
