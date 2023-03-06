import { getDocs, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../config/firebase-config';

const useUserDetails = () => {
  const [storeFilteredData, setStoreFilteredData] = useState([]);

  const userDetailsRef = collection(db, 'user');

  const getUserDetails = async (email) => {
    const data = await getDocs(userDetailsRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const user = filteredData.find((doc) => doc.email === email);
    return user;
    // console.log(storeFilteredData)
  };

  return { storeFilteredData, getUserDetails, setStoreFilteredData };
};

export default useUserDetails;
