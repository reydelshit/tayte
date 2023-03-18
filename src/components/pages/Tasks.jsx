import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../config/firebase-config';
import { MainContext } from '../../context/MainContext';
import AddTask from '../tasks/AddTask';

const Tasks = () => {
  const { task, getTasks } = useContext(MainContext);
  // const [updatedTask, setUpdatedTask] = useState({
  //   taskName: '',
  //   due: '',
  //   isPriority: updatedTask.isPriority,
  // });

  useEffect(() => {
    getTasks();
  }, []);

  // const deleteNote = async (id) => {
  //   try {
  //     const noteDoc = doc(db, 'notes', id);
  //     await deleteDoc(noteDoc);
  //     console.log('note deleted', id);
  //     getNotes();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const updateNote = async (id) => {
  //   try {
  //     const noteDoc = doc(db, 'notes', id);
  //     await updateDoc(noteDoc, {
  //       title: updatedNotes.title,
  //       body: updatedNotes.body,
  //     });
  //     setEditNoteModal({
  //       decider: false,
  //     });

  //     getNotes();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div className="w-full">
      <div className="flex items-center h-20 border-2 border-teal-400 p-2">
        <h1 className="text-2xl font-bold text-left">Tasks</h1>
      </div>
      <div className="w-full flex flex-col justify-end p-2">
        <AddTask />
        <div>
          {task.map((task) => {
            getTasks(task.id);
            return (
              <div key={task.id}>
                <h1>{task.taskName}</h1>
                <h1>{task.due}</h1>
                <h1>{task.isPriority}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
