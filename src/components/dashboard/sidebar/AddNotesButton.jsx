import React, { useContext, useState } from 'react'
import { MainContext } from '../../context/MainContext'

const AddNotes = () => {

  const {showAddModal, setShowAddModal} = useContext(MainContext)
  
  return (
    <button onClick={() => setShowAddModal(!showAddModal)} className='sidebar__addnotes'>AddNotes</button>
  )
}

export default AddNotes