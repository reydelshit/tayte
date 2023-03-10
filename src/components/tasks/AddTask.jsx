import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

const AddTask = () => {
  return (
    <button className="button flex justify-center items-center self-center my-4">
      <AiFillPlusCircle className="font-bold mr-2" />
      Add Task
    </button>
  );
};

export default AddTask;
