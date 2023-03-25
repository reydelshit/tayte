import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase-config';
import { MainContext } from '../../context/MainContext';
import AddTask from '../tasks/AddTask';
import Menu from '../notes/Menu';
import EditTaskModal from '../modal/EditTaskModal';

const Tasks = () => {
  const { task, getTasks, toggleEditMenu, toggleEditModal } =
    useContext(MainContext);
  // const [updatedTask, setUpdatedTask] = useState({
  //   taskName: '',
  //   due: '',
  //   isPriority: updatedTask.isPriority,
  // });
  useEffect(() => {
    getTasks();
  }, []);

  const deleteNote = async (id) => {
    try {
      const taskDoc = doc(db, 'tasks', id);
      await deleteDoc(taskDoc);
      console.log('task deleted', id);
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // const toggleEditModalForTask = (id) => {
  //   if (id === id) {
  //     setEditNoteModal({
  //       id: id,
  //       decider: !editNoteModal.decider,
  //     });

  //     getNotes(id);
  //   }
  // };

  return (
    <div className="w-full">
      <div className="flex items-center h-20 border-2 border-teal-400 p-2">
        <h1 className="text-2xl font-bold text-left">Tasks</h1>
      </div>
      <div className="w-full flex flex-col justify-end p-2">
        <AddTask />
        <div className="grid grid-cols-4 gap-4 border-2 border-orange-400">
          {task.map((task) => {
            getTasks(task.id);
            return (
              <div
                className="flex justify-center items-center flex-col relative h-48 border-2 border-orange-500"
                key={task.id}
              >
                <Menu
                  id={task.id}
                  toggleMenu={toggleEditMenu}
                  deleteNote={deleteNote}
                  toggleEditModal={toggleEditModal}
                  title="tasks"
                />
                <h1>{task.taskName}</h1>
                <h1>{task.due}</h1>
                <h1>{task.isPriority} dasda</h1>

                <EditTaskModal
                  taskID={task.id}
                  taskName={task.taskName}
                  taskDue={task.due}
                  taskPriority={task.isPriority}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
