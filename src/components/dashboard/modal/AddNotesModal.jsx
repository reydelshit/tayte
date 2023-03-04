import { addDoc, collection } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../../../config/firebase-config'
import { MainContext } from '../../context/MainContext'

const AddNotesModal = () => {

  const {showAddModal, setShowAddModal, getNotes} = useContext(MainContext)

  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState({
    title: "",
    body: "",
    tags: []
  })

  const notesCollectionRef = collection(db, "notes")
  

  const handleSubmit = async () => {

    if(notes.title && notes.body !== ""){
        try{
            await addDoc(notesCollectionRef, {
                title: notes.title,
                body: notes.body,
                tags: notes.tags,
                userID: auth?.currentUser?.uid
            }).then((note) => {
                console.log("note added", note.id)
                setShowAddModal(false)
                setNotes({
                    title: "",
                    body: "",
                    tags: []
                })
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

  const handleInput = (e) => {
    if(e.key === "Enter"){
        setNotes({
            ...notes,
            tags: [...notes.tags, tags]
        })
        console.log(tags)
        setTags('')
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
                    <input type="text" value={tags} onKeyDown={handleInput} onChange={(e) => setTags(e.target.value)}/>
                    
                    <button onClick={cancelButton}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>}
    </>
  )
}

export default AddNotesModal