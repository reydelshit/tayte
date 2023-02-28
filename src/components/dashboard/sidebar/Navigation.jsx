import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='sidebar__navlinks'>
      <input type="text" placeholder='Search..'/>
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard/notes">Notes</Link>
      <Link to="/dashboard/tasks">Tasks</Link>
    </div>
  )
}

export default Navigation