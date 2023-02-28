import React from 'react'

import Logout from './Logout'
import AddNotesButton from './sidebar/AddNotesButton'
import Navigation from './sidebar/Navigation'
import Profile from './sidebar/Profile'

const SideBar = () => {
  return (
    <div className='sidebar__container'>
      <Profile/>
      <AddNotesButton />
      <Navigation />
      <Logout />
    </div>
  )
}

export default SideBar