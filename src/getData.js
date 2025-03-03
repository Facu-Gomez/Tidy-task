// src/GetData.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const GetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'your-collection'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setData(items);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Firestore</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.field}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetData;
