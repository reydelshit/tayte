import React, { useContext, useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

import useUserDetails from '../hooks/useUserDetails';
import { MainContext } from '../context/MainContext';
import SideBar from './dashboard/SideBar';
import AddNotesModal from './modal/AddNotesModal';
import SideBarRight from './dashboard/SideBarRight';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getUserDetails } = useUserDetails();

  const { storeFilteredData, setStoreFilteredData } = useContext(MainContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email !== null) {
          await getUserDetails(user.email).then((userDetails) => {
            setStoreFilteredData(userDetails);
            // console.log(storeFilteredData)
          });
        }
      } else {
        navigate('/');
      }
    });

    return () => {
      listen();
    };
  }, [navigate]);
  return (
    <div className="relative flex h-full w-screen">
      <SideBar />
      <Outlet />
      <SideBarRight />
      <AddNotesModal />
    </div>
  );
};

export default Dashboard;
