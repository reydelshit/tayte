import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const Menu = ({ deleteNote, toggleMenu, id }) => {
  const { openMenu, toggleEditModal } = useContext(MainContext);
  return (
    <>
      <button className="edit__icon" onClick={() => toggleMenu(id)}>
        ...
      </button>
      {openMenu.decider && openMenu.id === id && (
        <div className="grid place-content-center rounded-md absolute right-10 top-12 w-24 h-20 p-2 border-2 bg-violet-100 border-violet-500">
          <button onClick={() => toggleEditModal(id)}>edit note</button>
          <button onClick={() => deleteNote(id)}>delete</button>
        </div>
      )}
    </>
  );
};

export default Menu;
