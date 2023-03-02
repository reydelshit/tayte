import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../context/MainContext'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase-config'
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
          <h1>hello, {storeFilteredData.firstName}</h1>
        </div>
        <div className='notes__container'>
          {notesStorage && notesStorage.map((note) => {
            return (
              <div className='notes__individual__container' key={note.id}>
                <button onClick={() => toggleEditMenu(note.id)}>edit</button>
                {openMenu.decider && openMenu.id === note.id && 
                <div>
                  <button onClick={() => deleteNote(note.id)}>delete</button>
                  <button onClick={() => toggleEditModal(note.id)}>edit note</button>
                </div>}
                <h1>{note.title}</h1>
                <p>{note.body}</p>
                <span>tags tempo</span>

                  {editNoteModal.decider && editNoteModal.id === note.id && 
                  <div>
                    <input type="text" defaultValue={note.title} onChange={(e) => setUpdatedNotes({
                      ...updatedNotes,
                      title: e.target.value,
                    })}/>
                    <textarea cols="30" rows="10" defaultValue={note.body} onChange={(e) => setUpdatedNotes({
                      ...updatedNotes,
                      body: e.target.value,
                    })}></textarea>
                    <button onClick={() => updateNote(note.id)}>update</button>
                  </div>}
              </div>
            )
          })}
        </div>
      </div>
  )
}

export default Home