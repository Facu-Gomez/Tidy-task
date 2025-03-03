import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddData = () => {
  const [data, setData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'your-collection'), {
        field: data,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={data} 
        onChange={(e) => setData(e.target.value)} 
        placeholder="Enter data"
      />
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddData;