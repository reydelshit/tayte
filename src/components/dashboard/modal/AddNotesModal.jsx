import { addDoc, collection } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { auth, db } from '../../../config/firebase-config'
import { MainContext } from '../../context/MainContext'

const AddNotesModal = () => {

  const {showAddModal, setShowAddModal, getNotes} = useContext(MainContext)
    
  const [notes, setNotes] = useState({
    title: "",
    body: "",
  })

  const notesCollectionRef = collection(db, "notes")


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(notes.title && notes.body !== ""){
        try{
            await addDoc(notesCollectionRef, {
                title: notes.title,
                body: notes.body,
                userID: auth?.currentUser?.uid
            }).then((note) => {
                console.log("note added", note.id)
                setShowAddModal(false)
                getNotes();
            })
    
            console.log(auth.currentUser)
        } catch(err){
            console.error(err)
        }
    } else {
        console.log('textfield must not be empty')
    }

  }

  const cancelButton = () => {
    setShowAddModal(false)
  }
    
  return (
    <>{showAddModal && 
        <div className='addnotes__modal'>
            <div className='addnotes__modal__container'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='title' placeholder='Input title' 
                        onChange={(e) => setNotes({
                            ...notes,
                            title: e.target.value
                        })} required/>
                    <textarea cols="30" rows="10" 
                        onChange={(e) => setNotes({
                            ...notes,
                            body: e.target.value
                        })} required>
                    </textarea>
                    
                    <button onClick={cancelButton}>Cancel</button>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>}
    </>
  )
}

export default AddNotesModal