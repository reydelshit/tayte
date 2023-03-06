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
        <div className="notes__individual__header__togglemenu">
          <button onClick={() => deleteNote(id)}>delete</button>
          <button onClick={() => toggleEditModal(id)}>edit note</button>
        </div>
      )}
    </>
  );
};

export default Menu;
