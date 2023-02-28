import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { db } from '../../config/firebase-config'
import { MainContext } from '../context/MainContext'


const Home = () => {

  const notesCollectionRef = collection(db, "notes")


  const [notesStorage, setNotesStorage] = useState([])
  const [openMenu, setOpenMenu] = useState(false)

  const [editNoteModal, setEditNoteModal] = useState(false)

  const {storeFilteredData} = useContext(MainContext)

  const [updatedNotes, setUpdatedNotes] = useState({
    title: "",
    body: "",
  })

  const getNotes = async () => {
    try{
      const data = await getDocs(notesCollectionRef)
      const notess = data.docs.map((note) => ({
        ...note.data(), id: note.id
      }))
      setNotesStorage(notess)

      console.log(notesStorage)
    } catch(err){
      console.error(err)
    }
  }

  const deleteNote = async (id) => {
    try{
      const noteDoc = doc(db, "notes", id)
      await deleteDoc(noteDoc)
      console.log('note deleted', id)
    } catch (err){
      console.error(err)
    }
  }

  const updateNote = async (id) => {
    try{
      const noteDoc = doc(db, "notes", id)
      await updateDoc(noteDoc)
    } catch (err){
      console.error(err)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])
  

  return (
      <div className='home__dashboard__container'>
        <div className='greeting__container'>
          <h1>hello, {storeFilteredData.firstName}</h1>
        </div>
        <div className='notes__container'>
          {notesStorage && notesStorage.map((note) => {
            return (
              <div className='notes__individual__container' key={note.id}>
                <button onClick={() => setOpenMenu(!openMenu)}>edit</button>
                {openMenu && 
                <div>
                  <button onClick={() => deleteNote(note.id)}>delete</button>
                  <button onClick={() => setEditNoteModal(!editNoteModal)}>edit note</button>
                </div>}
                <h1>{note.title}</h1>
                <p>{note.body}</p>
                <span>tags tempo</span>

                {editNoteModal && 
                  <div>
                    <input type="text" onChange={(e) => setUpdatedNotes({
                      ...updatedNotes,
                      title: e.target.value,
                    })}/>
                    <input type="text" onChange={(e) => setUpdatedNotes({
                      ...updatedNotes,
                      body: e.target.value,
                    })}/>
                  </div>}
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default Home