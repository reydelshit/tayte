import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { auth, db } from '../../config/firebase-config'


const useCrud = () => {

    const notesCollectionRef = collection(db, "notes")
    const [notesStorage, setNotesStorage] = useState([])
    const [editNoteModal, setEditNoteModal] = useState({
      id: null,
      decider: false
    })
    const [updatedNotes, setUpdatedNotes] = useState({
      title: "",
      body: "",
    })

    
    const getNotes = async (id) => {
      try{
        const data = await getDocs(notesCollectionRef)
        const notess = data.docs.map((note) => ({
          ...note.data(), id: note.id
        }))
    
        const filteredNotes = notess.filter(
          (note) => note.userID === auth.currentUser.uid
        );
    
        setNotesStorage(filteredNotes)
    
        const currentNote = filteredNotes.find((note) => note.id === id)
    
        if(currentNote){
          setUpdatedNotes({
            title: currentNote.title,
            body: currentNote.body,
          });
        }
    
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
    

    return {getNotes, deleteNote, updateNote, editNoteModal, notesStorage, setEditNoteModal, updatedNotes}
}

export default useCrud
