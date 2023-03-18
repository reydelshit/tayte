import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { db } from '../../config/firebase-config';
import { MainContext } from '../../context/MainContext';

const EditTaskModal = ({ taskID, taskName, taskDue, taskPriority }) => {
  const {
    getTasks,
    editTaskModal,
    setEditTaskModal,
    updatedTask,
    setUpdatedTask,
    updateTaskHandle,
  } = useContext(MainContext);

  const cancelButton = () => {
    editTaskModal({
      decider: false,
    });
  };

  return (
    <>
      {editTaskModal.decider && editTaskModal.id === taskID && (
        <div className="absolute grid items-center place-content-center p-5 h-full w-full border-2 ">
          <div className="flex flex-col items-center justify-center w-[40rem] h-[35rem] border-2 border-violet-500 bg-violet-50">
            <h1 className="text-2xl font-bold">Add Task</h1>
            <input
              type="text"
              defaultValue={taskName}
              onChange={(e) =>
                setUpdatedTask({
                  ...updatedTask,
                  taskName: e.target.value,
                })
              }
            />
            <input
              type="date"
              defaultValue={taskDue}
              onChange={(e) =>
                setUpdatedTask({
                  ...updatedTask,
                  due: e.target.value,
                })
              }
            />{' '}
            <input
              type="checkbox"
              defaultValue={taskPriority}
              onChange={(e) =>
                setUpdatedTask({
                  ...updatedTask,
                  isPriority: e.target.checked,
                })
              }
            />
          </div>
          <div>
            <button className="button !bg-red-500 mr-2" onClick={cancelButton}>
              Cancel
            </button>
            <button className="button" onClick={() => updateTaskHandle(taskID)}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskModal;
