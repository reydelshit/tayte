import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../config/firebase-config';
import { MainContext } from '../../context/MainContext';
import EditModal from '../modal/EditModal';
import Menu from '../notes/Menu';

const NotesDetails = () => {
  const { id } = useParams();

  const { deleteNote, toggleEditModal, toggleEditMenu, openMenu } =
    useContext(MainContext);

  const [noteDetails, setNoteDetails] = useState([]);

  useEffect(() => {
    const getNote = async () => {
      try {
        const docRef = doc(db, 'notes', id);
        const noteDetails = await getDoc(docRef);

        if (noteDetails.exists()) {
          setNoteDetails(noteDetails.data());
        } else {
          console.log('wala');
        }
      } catch (err) {
        console.error(err);
      }
    };

    getNote();
  }, []);

  return (
    <div className="notedetails__container">
      <Menu deleteNote={deleteNote} toggleMenu={toggleEditMenu} id={id} />
      <span>{noteDetails.dateCreated}</span>
      <h1>{noteDetails.title}</h1>
      <p>{noteDetails.body}</p>

      <span>{noteDetails.tags}</span>

      <EditModal
        noteID={id}
        noteTitle={noteDetails.title}
        noteBody={noteDetails.body}
      />
    </div>
  );
};

export default NotesDetails;
