import React from 'react';

import Logout from './Logout';
import AddNotesButton from '../modal/AddNotesModal';
import Navigation from '../sidebar/Navigation';
import Profile from '../sidebar/Profile';

const SideBar = () => {
  return (
    <div className="flex flex-col h-full w-60 ">
      <Profile />
      <AddNotesButton />
      <Navigation />
      <Logout />
    </div>
  );
};

export default SideBar;
