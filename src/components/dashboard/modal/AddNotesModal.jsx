import { addDoc, collection } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../../../config/firebase-config'
import { MainContext } from '../../context/MainContext'
import useCrud from '../../hooks/useCrud'

const AddNotesModal = () => {

  const {showAddModal, setShowAddModal} = useContext(MainContext)

  const {getNotes} = useCrud()
    
  const [notes, setNotes] = useState({
    title: "",
    body: "",
  })

  const notesCollectionRef = collection(db, "notes")
  

  const handleSubmit = async () => {

    if(notes.title && notes.body !== ""){
        try{
            await addDoc(notesCollectionRef, {
                title: notes.title,
                body: notes.body,
                userID: auth?.currentUser?.uid
            }).then((note) => {
                console.log("note added", note.id)
                setShowAddModal(false)
                getNotes()

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
                    <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>}
    </>
  )
}

export default AddNotesModal