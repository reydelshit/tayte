import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase-config'
import Notes from './Notes'
// import { getNotes } from '../getNotes'

const Home = () => {

  const {notesStorage, getNotes, updatedNotes, setUpdatedNotes} = useContext(MainContext)
  const {storeFilteredData} = useContext(MainContext)

  const [editNoteModal, setEditNoteModal] = useState({
    id: null,
    decider: false
  })


  const [openMenu, setOpenMenu] = useState({
    id: null,
    decider: false
  })
  
  useEffect(() => {
    getNotes()
}, [])


  
  const deleteNote = async (id) => {
    try{
      const noteDoc = doc(db, "notes", id)
      await deleteDoc(noteDoc)
      console.log('note deleted', id)
      getNotes();
    } catch (err){
      console.error(err)
    }
  }
  
  const updateNote = async (id) => {
    try{
      const noteDoc = doc(db, "notes", id)
      await updateDoc(noteDoc, {
        title: updatedNotes.title,
        body: updatedNotes.body,
      })
      setEditNoteModal({
        decider: false
      })
  
      getNotes();
    } catch (err){
      console.error(err)
    }
  }
  

  const toggleEditMenu = (id) => {
    if(id === id){
      setOpenMenu({
        id: id,
        decider: !openMenu.decider
      })
    }
  }

  const toggleEditModal = (id) => {
    if(id === id){
      setEditNoteModal({
        id: id,
        decider: !editNoteModal.decider
      })
      getNotes(id)

    }

  }


  return (
      <div className='home__dashboard__container'>
        <div className='greeting__container'>
          <h1>hello, {storeFilteredData.firstName}!</h1>
        </div>

        {/* <button><a href="https://github.com/login/oauth/authorize" target="_blank" rel="noopener noreferrer">connect to github</a></button> */}
       <Notes 
        notesStorage={notesStorage} 
        deleteNote={deleteNote} 
        updatedNotes={updatedNotes} 
        updateNote={updateNote}
        toggleEditMenu={toggleEditMenu} 
        toggleEditModal={toggleEditModal} 
        setUpdatedNotes={setUpdatedNotes} 
        openMenu={openMenu} 
        editNoteModal={editNoteModal}/>
      </div>
  )
}

export default Home