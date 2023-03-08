import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';

import Login from './components/Login';
import SignUp from './components/SignUp';

import Home from './components/dashboard/Home';
import Note from './components/dashboard/pages/Note';
import Tasks from './components/dashboard/pages/Tasks';
import NotesDetails from './components/dashboard/pages/NotesDetails';

import { MainContext } from './components/context/MainContext';

import useUserDetails from './components/hooks/useUserDetails';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from './config/firebase-config';

import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function App() {
  // const {signInWithGoogle, signIn, setEmail, setPassword} = useLogin();
  const { storeFilteredData, setStoreFilteredData } = useUserDetails();
  // const { getNotes } = useCrud()

  const [notesStorage, setNotesStorage] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const [storeFiltered, setStoreFiltered] = useState([]);

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

  const updateNote = async (id) => {
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

  const toggleEditModal = (id) => {
    if (id === id) {
      setEditNoteModal({
        id: id,
        decider: !editNoteModal.decider,
      });

      getNotes(id);
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
        showAddModal,
        setShowAddModal,
        notesStorage,
        setNotesStorage,
        getNotes,
        deleteNote,
        updateNote,
        updatedNotes,
        setUpdatedNotes,
        toggleEditMenu,
        toggleEditModal,
        openMenu,
        editNoteModal,
        storeFiltered,
        setStoreFiltered,
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/signup/:id" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/notes" element={<Note />} />
            <Route path="/dashboard/notes/:id" element={<NotesDetails />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
