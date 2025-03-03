import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/authContext'; 

const CrearTareaLaburo = () => {
      const [titulo, setTitulo] = useState('');
      const [descripcion, setDescripcion] = useState('');
      const [fechaDeEntrega, setFechaDeEntrega] = useState(''); 
      const [estado, setEstado] = useState(false);
      const { user } = useAuth(); 
      const navigate = useNavigate();

      const tareasLaburoCollection = collection(db, "tareaslaburo");

      const storeLaburo = async (e) => {
          e.preventDefault();
          
          if (user) {
            console.log("Guardando en:", tareasLaburoCollection.path);
            await addDoc(tareasLaburoCollection, {
              titulo: titulo,
              descripcion: descripcion,
              fechaDeEntrega: new Date(fechaDeEntrega), 
              estado: estado,
              userId: user.uid 
            });
            navigate('/');
          } else {
            console.log("No se puede crear tarea sin usuario autenticado");
          }
        };

        return (
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <h1>Crear tarea para el trabajo</h1>
                  <form onSubmit={storeLaburo}>
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
                    <div className='mb-3'>
                      <label className='form-label'>Fecha de Entrega</label>
                      <input
                        value={fechaDeEntrega}
                        onChange={(e) => setFechaDeEntrega(e.target.value)}
                        type="date" 
                        className='form-control'
                      />
                    </div>
                    <button type='submit' className='btn btn-primary'>Crear tarea</button>
                  </form>
                </div>
              </div>
            </div>
          );
}

export default CrearTareaLaburo;