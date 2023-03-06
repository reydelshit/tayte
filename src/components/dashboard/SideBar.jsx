import React from 'react';

import Logout from './Logout';
import AddNotesButton from './sidebar/AddNotesButton';
import Navigation from './sidebar/Navigation';
import Profile from './sidebar/Profile';

const SideBar = () => {
  return (
    <div className="flex flex-col h-full w-60 border-r-2 border-violet-500">
      <Profile />
      <AddNotesButton />
      <Navigation />
      <Logout />
    </div>
  );
};

export default SideBar;
