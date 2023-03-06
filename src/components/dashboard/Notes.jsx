import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import Menu from './notes/Menu';

import EditModal from './modal/EditModal';

const Notes = (props) => {
  const { deleteNote, toggleEditModal, toggleEditMenu, editNoteModal } =
    useContext(MainContext);

  const { notesStorage } = props;

  // const getRandomColor = () => {
  //   const letters = '0123456789ABCDEF';
  //   let colors = '#';
  //   for (let i = 0; i < 6; i++) {
  //     colors += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return colors;
  // };

  const getRandomColor = () => {
    const colors = [
      {
        bg: 'bg-red-200',
        text: 'text-red-700',
      },
      {
        bg: 'bg-yellow-200',
        text: 'text-yellow-700',
      },
      {
        bg: 'bg-green-200',
        text: 'text-green-700',
      },
      {
        bg: 'bg-blue-200',
        text: 'text-blue-700',
      },
      {
        bg: 'bg-indigo-200',
        text: 'text-indigo-700',
      },
      {
        bg: 'bg-purple-200',
        text: 'text-purple-700',
      },
      {
        bg: 'bg-pink-200',
        text: 'text-pink-700',
      },
      {
        bg: 'bg-gray-200',
        text: 'text-gray-700',
      },
      {
        bg: 'bg-orange-200',
        text: 'text-orange-700',
      },
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
  };

  return (
    <div className="grid grid-cols-4 p-2 gap-2">
      {notesStorage &&
        notesStorage.map((note) => {
          return (
            <div
              className="text-start break-words w-80 h-72 p-4 bg-violet-50 rounded-md border-2 border-violet-500"
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
                  const randomColor = getRandomColor();
                  return (
                    <span
                      className={`${randomColor.bg} px-4 py-2 rounded-md text-xs mr-2 font-semibold ${randomColor.text}`}
                      key={index}
                    >
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
