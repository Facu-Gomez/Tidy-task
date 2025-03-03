import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';

import { db } from '../firebase';

const EditarTareaFacultad = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();


  const getTareasFacultadById = async (id) => {
    const tareafacultad = await getDoc(doc(db, 'tareasfacultad', id));
    if (tareafacultad.exists()) {
      const data = tareafacultad.data();
      setTitulo(data.titulo); 
      setDescripcion(data.descripcion);
    } else {
      console.log('La tarea no existe');
    }
  };

  useEffect(() => {
    getTareasFacultadById(id);
  }, [id]); 

  const update = async (e) => {
    e.preventDefault();
    const tareafacultad = doc(db, "tareasfacultad", id);
    const data = {
      titulo: titulo,
      descripcion: descripcion,
    };
    await updateDoc(tareafacultad, data);
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar tarea para la facultad</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Titulo</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Descripcion</label>
              <input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary'>Actualizar tarea</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarTareaFacultad;
