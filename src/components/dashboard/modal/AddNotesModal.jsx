import React, { useContext, useState } from 'react'
import { MainContext } from '../../context/MainContext'

import { db,auth } from '../../../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const AddNotesModal = () => {

  const {showAddModal, setShowAddModal} = useContext(MainContext)

  const [notes, setNotes] = useState({
    title: "",
    body: "",
  })


  const noteCollectionRef = collection(db, "notes")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(notes.title && notes.body !== ""){
        try{
            await addDoc(noteCollectionRef, {
                title: notes.title,
                body: notes.body,
                userID: auth?.currentUser?.uid
            }).then((note) => {
                console.log("note added", note.id)
                setShowAddModal(false)
                
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