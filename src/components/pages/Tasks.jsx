import React from 'react';
import AddTask from '../tasks/AddTask';

const Tasks = () => {
  return (
    <div className="w-full">
      <div className="flex items-center h-20 border-2 border-teal-400 p-2">
        <h1 className="text-2xl font-bold text-left">Tasks</h1>
      </div>
      <div className="w-full flex justify-end p-2">
        <AddTask />
      </div>
    </div>
  );
};

export default Tasks;
