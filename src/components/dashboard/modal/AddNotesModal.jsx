import { addDoc, collection, Firestore } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../../config/firebase-config';
import { MainContext } from '../../context/MainContext';

const AddNotesModal = () => {
  const { showAddModal, setShowAddModal, getNotes } = useContext(MainContext);

  const [tags, setTags] = useState(' ');
  const [notes, setNotes] = useState({
    title: '',
    body: '',
    tags: [],
  });

  const notesCollectionRef = collection(db, 'notes');

  const handleSubmit = async () => {
    if (notes.title && notes.body !== '') {
      const currentDate = new Date();
      try {
        await addDoc(notesCollectionRef, {
          title: notes.title,
          body: notes.body,
          tags: notes.tags,
          userID: auth?.currentUser?.uid,
          dateCreated: currentDate.toDateString(),
        }).then((note) => {
          console.log('note added', note.id);
          setShowAddModal(false);
          setNotes({
            title: '',
            body: '',
            tags: [],
          });
          getNotes();
        });

        console.log(auth.currentUser);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('textfield must not be empty');
    }
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      setNotes({
        ...notes,
        tags: [...notes.tags, tags],
      });
      console.log(tags);
      setTags('');
    }
  };

  const cancelButton = () => {
    setShowAddModal(false);
  };

  return (
    <>
      {showAddModal && (
        <div className="absolute grid items-center place-content-center p-5 h-full w-full border-2 ">
          <div className="flex flex-col items-center justify-center w-[40rem] h-[35rem] border-2 border-violet-500 bg-violet-50">
            <h1 className="mb-5 font-bold text-2xl text-violet-500">
              Add notes
            </h1>
            <input
              className="w-4/5 h-12 rounded-md outline-none pl-2 mb-5 border-2 border-violet-500"
              type="text"
              name="title"
              placeholder="Input title"
              onChange={(e) =>
                setNotes({
                  ...notes,
                  title: e.target.value,
                })
              }
              required
            />
            <textarea
              className="w-4/5 h-60 mb-5 rounded-md outline-none p-2 border-2 border-violet-500 text-xs"
              cols="30"
              rows="10"
              onChange={(e) =>
                setNotes({
                  ...notes,
                  body: e.target.value,
                })
              }
              required
            ></textarea>
            <span>{notes.tags.join(' ')}</span>
            <input
              placeholder="tags"
              className="w-48 h-10 rounded-md outline-none pl-2 mb-5 border-2 border-violet-500"
              type="text"
              value={tags}
              onKeyDown={handleInput}
              onChange={(e) => setTags(e.target.value)}
            />

            <div>
              <button
                className="button !bg-red-500 mr-2"
                onClick={cancelButton}
              >
                Cancel
              </button>
              <button className="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNotesModal;
