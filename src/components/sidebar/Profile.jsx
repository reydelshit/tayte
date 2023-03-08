import React, { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const Profile = () => {
  const { storeFilteredData } = useContext(MainContext);

  return (
    <div className="grid justify-center items-center place-content-center border-b-2 border-b-violet-500 p-2 h-24">
      <span className="text-2xl font-bold inline-block text-violet-500">
        {storeFilteredData.firstName} {storeFilteredData.lastName}
      </span>
      <p className="text-xs">{storeFilteredData.email}</p>
    </div>
  );
};

export default Profile;
