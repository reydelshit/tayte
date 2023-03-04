import React from 'react'

const Notes = (props) => {

   const {notesStorage, deleteNote, updatedNotes, updateNote, toggleEditMenu, toggleEditModal, setUpdatedNotes, openMenu, editNoteModal} = props 
  
   return (
    <div className='notes__container'>
    {notesStorage && notesStorage.map((note) => {
      return (
        <div className='notes__individual__container' key={note.id}>
            <div className='notes__individual__header'>
                <span>{note.dateCreated}</span>
                <button className='edit__icon' onClick={() => toggleEditMenu(note.id)}>...</button>
                    {openMenu.decider && openMenu.id === note.id && 
                    <div className='notes__individual__header__togglemenu'>
                        <button onClick={() => deleteNote(note.id)}>delete</button>
                        <button onClick={() => toggleEditModal(note.id)}>edit note</button>
                    </div>}
            </div>

            <h1>{note.title}</h1>
            <p>{note.body.slice(0, 120)}...</p>
                {note.tags && note.tags.map((tag, index) => {
                return (
                    <span key={index}>{tag} </span>
                )
                })}
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
  )
}

export default Notes