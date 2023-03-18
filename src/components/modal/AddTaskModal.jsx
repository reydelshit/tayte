import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { auth, db } from '../../config/firebase-config';
import { MainContext } from '../../context/MainContext';

const AddTaskModal = () => {
  const { showAddTasksModalNotes, setShowAddTasksModalNotes, getTasks } =
    useContext(MainContext);

  const [taskForFirebase, setTaskForFirebase] = useState({
    taskName: '',
    due: '',
    isPriority: false,
  });

  const taskCollectionRef = collection(db, 'tasks');

  const handleSubmit = async () => {
    if (taskForFirebase.taskName && taskForFirebase.due !== '') {
      try {
        await addDoc(taskCollectionRef, {
          taskName: taskForFirebase.taskName,
          due: taskForFirebase.due,
          isPriority: taskForFirebase.isPriority,
          userID: auth?.currentUser?.uid,
        }).then((task) => {
          setShowAddTasksModalNotes(false);
          console.log('task added', task.id);
          setTaskForFirebase({
            taskName: '',
            due: '',
            isPriority: false,
          });

          getTasks();
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cancelButton = () => {
    setShowAddTasksModalNotes(false);
  };

  return (
    <>
      {showAddTasksModalNotes && (
        <div className="absolute grid items-center place-content-center p-5 h-full w-full border-2 ">
          <div className="flex flex-col items-center justify-center w-[40rem] h-[35rem] border-2 border-violet-500 bg-violet-50">
            <h1 className="text-2xl font-bold">Add Task</h1>
            <input
              type="text"
              onChange={(e) =>
                setTaskForFirebase({
                  ...taskForFirebase,
                  taskName: e.target.value,
                })
              }
            />
            <input
              type="date"
              onChange={(e) =>
                setTaskForFirebase({
                  ...taskForFirebase,
                  due: e.target.value,
                })
              }
            />{' '}
            <input
              type="checkbox"
              onChange={(e) =>
                setTaskForFirebase({
                  ...taskForFirebase,
                  isPriority: e.target.checked,
                })
              }
            />
          </div>
          <div>
            <button className="button !bg-red-500 mr-2" onClick={cancelButton}>
              Cancel
            </button>
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
