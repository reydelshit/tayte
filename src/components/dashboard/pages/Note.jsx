import React from 'react';
import { useParams } from 'react-router-dom';

const Notes = () => {
  const { id } = useParams();

  return <div className="notes__dashboard__container">Notes</div>;
};

export default Notes;
