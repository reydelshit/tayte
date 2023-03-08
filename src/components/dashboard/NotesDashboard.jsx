import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';
import Menu from '../notes/Menu';

import EditModal from '../modal/EditModal';
import Tags from '../notes/Tags';

const Notes = () => {
  const {
    deleteNote,
    toggleEditModal,
    toggleEditMenu,
    storeFiltered,
    notesStorage,
  } = useContext(MainContext);

  return (
    <div className="grid grid-cols-3 p-2 gap-5 mt-10 overflow-x-hidden">
      {storeFiltered &&
        storeFiltered.map((note) => {
          return (
            <div
              className="relative text-start break-words w-80 h-72 p-4 bg-violet-50 rounded-md border-2 border-violet-500"
              key={note.id}
            >
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>{note.dateCreated}</span>
                <Menu
                  id={note.id}
                  toggleMenu={toggleEditMenu}
                  deleteNote={deleteNote}
                  toggleEditModal={toggleEditModal}
                />
              </div>

              <h1 className="text-2xl font-semibold mb-2 hover:text-violet-500">
                <Link to={`/dashboard/notes/${note.id}`}>{note.title}</Link>
              </h1>
              <p className="break-all h-24 my-4">
                {note.body.slice(0, 120)}...
              </p>
              <Tags noteTags={note.tags} />
              <EditModal
                noteID={note.id}
                noteTitle={note.title}
                noteBody={note.body}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Notes;
