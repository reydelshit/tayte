import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import Menu from './notes/Menu';

import EditModal from './modal/EditModal';

const Notes = (props) => {
  const { deleteNote, toggleEditModal, toggleEditMenu, editNoteModal } =
    useContext(MainContext);

  const { notesStorage } = props;

  const getRandomColor = () => {
    const colors = [
      'red',
      'yellow',
      'green',
      'blue',
      'indigo',
      'purple',
      'pink',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex gap-2 border-2 border-violet-500">
      {notesStorage &&
        notesStorage.map((note) => {
          return (
            <div
              className="text-start break-words w-80 h-72 p-4 border-2 border-violet-500"
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

              <h1 className="text-2xl font-semibold mb-2">
                <Link to={`/dashboard/notes/${note.id}`}>{note.title}</Link>
              </h1>
              <p className="break-all mb-5">{note.body.slice(0, 120)}...</p>
              {note.tags &&
                note.tags.map((tag, index) => {
                  return (
                    <span className={`bg-${getRandomColor()}-400`} key={index}>
                      {tag}{' '}
                    </span>
                  );
                })}

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
