import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { MdOutlineEditNote } from 'react-icons/md';

const Menu = ({ deleteNote, toggleMenu, id }) => {
  const { openMenu, toggleEditModal } = useContext(MainContext);
  return (
    <>
      <button className="edit__icon" onClick={() => toggleMenu(id)}>
        <BsThreeDots className="text-xl" />
      </button>
      {openMenu.decider && openMenu.id === id && (
        <div className="flex justify-center items-center flex-col rounded-md absolute right-10 top-12 w-24 h-20 p-2 border-2 bg-violet-100 border-violet-500">
          <button
            className="flex justify-center items-center hover:text-violet-500"
            onClick={() => toggleEditModal(id)}
          >
            <MdOutlineEditNote className="text-xl mr-1" /> edit
          </button>
          <button
            className="flex justify-center items-center hover:text-violet-500"
            onClick={() => deleteNote(id)}
          >
            <BsTrash className="mr-1" /> delete
          </button>
        </div>
      )}
    </>
  );
};

export default Menu;
