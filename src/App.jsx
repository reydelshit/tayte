import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';

import Login from './components/Login';
import SignUp from './components/SignUp';

import Home from './components/dashboard/Home';
import Tasks from './components/pages/Tasks';
import NotesDetails from './components/pages/NotesDetails';
import Notes from './components/pages/Notes';

import { MainContext } from './context/MainContext';

import useUserDetails from './hooks/useUserDetails';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from './config/firebase-config';

import { signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  // notes
  const { storeFilteredData, setStoreFilteredData } = useUserDetails();
  const [notesStorage, setNotesStorage] = useState([]);
  const [showAddModalNotes, setShowAddModalNotes] = useState(false);
  const [showAddTasksModalNotes, setShowAddTasksModalNotes] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeFiltered, setStoreFiltered] = useState([]);
  const navigate = useNavigate();
  const [updatedNotes, setUpdatedNotes] = useState({
    title: '',
    body: '',
  });
  const [editNoteModal, setEditNoteModal] = useState({
    id: null,
    decider: false,
  });
  const [openMenu, setOpenMenu] = useState({
    id: null,
    decider: false,
  });

  // task
  const [task, setTask] = useState([]);

  const [editTaskModal, setEditTaskModal] = useState({
    id: null,
    decider: false,
  });

  const [updatedTask, setUpdatedTask] = useState({
    taskName: '',
    due: '',
    isPriority: null,
  });

  useEffect(() => {
    const checkIfLoggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    });

    return () => {
      checkIfLoggedIn();
    };
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth?.currentUser) {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);

      const user = auth.currentUser;
      navigate(`/dashboard/signup/${user.uid}`);
    } catch (err) {
      console.error(err);
    }
  };

  // notes
  const notesCollectionRef = collection(db, 'notes');

  const getNotes = async (id) => {
    try {
      const data = await getDocs(notesCollectionRef);
      const notess = data.docs.map((note) => ({
        ...note.data(),
        id: note.id,
      }));

      if (auth?.currentUser?.uid) {
        const filteredNotes = notess.filter(
          (note) => note.userID === auth?.currentUser?.uid
        );

        const currentNote = filteredNotes.find((note) => note.id === id);

        if (currentNote) {
          setUpdatedNotes({
            title: currentNote.title,
            body: currentNote.body,
          });
        }

        console.log(filteredNotes);
        setNotesStorage(filteredNotes);
        setStoreFiltered(filteredNotes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(db, 'notes', id);
      await deleteDoc(noteDoc);
      console.log('note deleted', id);
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const updateNoteHandle = async (id) => {
    try {
      const noteDoc = doc(db, 'notes', id);
      await updateDoc(noteDoc, {
        title: updatedNotes.title,
        body: updatedNotes.body,
      });
      setEditNoteModal({
        decider: false,
      });

      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEditMenu = (id) => {
    if (id === id) {
      setOpenMenu({
        id: id,
        decider: !openMenu.decider,
      });
    }
  };

  const toggleEditModal = (id, whatToEdit) => {
    if (id === id) {
      if (whatToEdit === 'notes') {
        setEditNoteModal({
          id: id,
          decider: !editNoteModal.decider,
        });

        getNotes(id);
      } else {
        setEditTaskModal({
          id: id,
          decider: !editTaskModal.decider,
        });

        getTasks(id);
      }
    }
  };
  // task
  const taskCollectionRef = collection(db, 'tasks');

  const getTasks = async (id) => {
    try {
      const data = await getDocs(taskCollectionRef);
      const taskss = data.docs.map((task) => ({
        ...task.data(),
        id: task.id,
      }));

      if (auth?.currentUser?.uid) {
        const filteredNotes = taskss.filter(
          (task) => task.userID === auth?.currentUser?.uid
        );

        // const currentTask = filteredNotes.find((task) => task.id === id);

        // if (currentTask) {
        //   setUpdatedTask({
        //     taskName: currentTask.taskName,
        //     due: currentTask.due,
        //     isPriority: currentTask.isPriority,
        //   });
        // }

        setTask(filteredNotes);
        // console.log(currentNote);
        // setNotesStorage(filteredNotes);
        // setStoreFiltered(filteredNotes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskHandle = async (id) => {
    try {
      const taskDoc = doc(db, 'tasks', id);
      await updateDoc(taskDoc, {
        taskName: updatedTask.taskName,
        isPriority: updatedTask.isPriority,
        due: updatedTask.due,
      });
      setEditTaskModal({
        decider: false,
      });

      getTasks();

      console.log(updatedTask.taskName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContext.Provider
      value={{
        signInWithGoogle,
        signIn,
        setEmail,
        setPassword,
        storeFilteredData,
        setStoreFilteredData,
        showAddModalNotes,
        setShowAddModalNotes,
        notesStorage,
        setNotesStorage,
        getNotes,
        deleteNote,
        updateNoteHandle,
        updatedNotes,
        setUpdatedNotes,
        toggleEditMenu,
        toggleEditModal,
        openMenu,
        editNoteModal,
        storeFiltered,
        setStoreFiltered,
        showAddTasksModalNotes,
        setShowAddTasksModalNotes,
        getTasks,
        task,
        editTaskModal,
        setEditTaskModal,
        updatedTask,
        setUpdatedTask,
        updateTaskHandle,
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/signup/:id" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/notes" element={<Notes />} />
            <Route path="/dashboard/notes/:id" element={<NotesDetails />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
