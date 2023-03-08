import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const EditModal = ({ noteID, noteTitle, noteBody }) => {
  const { updatedNotes, updateNote, setUpdatedNotes, editNoteModal } =
    useContext(MainContext);
  return (
    <>
      {editNoteModal.decider && editNoteModal.id === noteID && (
        <div>
          <input
            type="text"
            defaultValue={noteTitle}
            onChange={(e) =>
              setUpdatedNotes({
                ...updatedNotes,
                title: e.target.value,
              })
            }
          />
          <textarea
            cols="30"
            rows="10"
            defaultValue={noteBody}
            onChange={(e) =>
              setUpdatedNotes({
                ...updatedNotes,
                body: e.target.value,
              })
            }
          ></textarea>
          <button onClick={() => updateNote(note.id)}>update</button>
        </div>
      )}
    </>
  );
};

export default EditModal;
