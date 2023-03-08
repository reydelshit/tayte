import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { MainContext } from '../../context/MainContext';
import EditModal from '../modal/EditModal';
import Menu from '../notes/Menu';
import Tags from '../notes/Tags';

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
    <div className="w-full border-2 flex flex-col justify-center items-center border-violet-500">
      <div className="flex justify-center flex-col items-start relative p-2 border-2 w-4/6  h-4/6 border-violet-400">
        <div className="absolute left-0 p-2 top-0 flex flex-row-reverse justify-between w-full border-2 border-violet-500">
          <Menu deleteNote={deleteNote} toggleMenu={toggleEditMenu} id={id} />
          <span>{noteDetails.dateCreated}</span>
        </div>

        <h1 className="text-4xl font-bold mb-5">{noteDetails.title}</h1>
        <p className="text-start">{noteDetails.body}</p>

        <Tags noteTags={noteDetails.tags} />

        <EditModal
          noteID={id}
          noteTitle={noteDetails.title}
          noteBody={noteDetails.body}
        />
      </div>
    </div>
  );
};

export default NotesDetails;
