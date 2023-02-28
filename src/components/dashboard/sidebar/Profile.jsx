import React, { useContext } from 'react'
import { MainContext } from '../../context/MainContext';

const Profile = () => {

    const {storeFilteredData} = useContext(MainContext)
 
  return (
    <div className='sidebar__header'>
      <span>{storeFilteredData.firstName} {storeFilteredData.lastName}</span>
      <p>{storeFilteredData.email}</p>
    </div>
  )
}

export default Profile