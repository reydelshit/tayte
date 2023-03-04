import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Dashboard from './components/Dashboard'

import Login from "./components/Login"
import SignUp from './components/SignUp'

import Home from './components/dashboard/Home'
import Notes from "./components/dashboard/pages/Notes"
import Tasks from "./components/dashboard/pages/Tasks"

import { MainContext } from './components/context/MainContext'

import useUserDetails from './components/hooks/useUserDetails'
import { auth, db } from './config/firebase-config'
import { getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'

function App() {

  // const {signInWithGoogle, signIn, setEmail, setPassword} = useLogin();
  const {storeFilteredData, setStoreFilteredData} = useUserDetails();
  // const { getNotes } = useCrud()

  const [notesStorage, setNotesStorage] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const [updatedNotes, setUpdatedNotes] = useState({
    title: "",
    body: "",
  })


  useEffect(() => {

    const checkIfLoggedIn = auth.onAuthStateChanged(user => {
      if(user){
        navigate("/dashboard")
      } else {
        navigate("/")
      }
    })

    return () => {
      checkIfLoggedIn()
    }
  }, [])

  const signIn = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
      if(!auth?.currentUser){
        navigate("/");
      } else {
        navigate("/dashboard")
      }

    } catch(err){
      console.error(err)
    }
  }



  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleAuth)

      const user = auth.currentUser;
        navigate(`/dashboard/signup/${user.uid}`)

    } catch (err){
      console.error(err)
    }
  }

  const notesCollectionRef = collection(db, "notes")

  
    
  const getNotes = async (id) => {
    try{
      const data = await getDocs(notesCollectionRef)
      const notess = data.docs.map((note) => ({
        ...note.data(), id: note.id
      }))

      if(auth?.currentUser?.uid){
        const filteredNotes = notess.filter(
          (note) => note.userID === auth?.currentUser?.uid
        );
    
      const currentNote = filteredNotes.find((note) => note.id === id)
  
      if(currentNote){
        setUpdatedNotes({
          title: currentNote.title,
          body: currentNote.body,
        });
      }

        console.log(filteredNotes)
        setNotesStorage(filteredNotes)
      }


    } catch(err){
      console.error(err)
    }
  }



  return (
    <MainContext.Provider value={{
    signInWithGoogle, signIn, setEmail, setPassword, 
    storeFilteredData, setStoreFilteredData, showAddModal, 
    setShowAddModal, notesStorage, setNotesStorage, getNotes, updatedNotes, setUpdatedNotes}}>
      <div className='main__container'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/dashboard/signup/:id' element={<SignUp />}/>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard' element={<Home />}/>
            <Route path='/dashboard/notes' element={<Notes />}/>
            <Route path='/dashboard/tasks' element={<Tasks />}/>
          </Route>
        </Routes>
      </div>
    </MainContext.Provider>

  )
}

export default App
