import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/authContext'; // Importa el contexto de autenticación
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Navbar from './Navbar';

const MySwal = withReactContent(Swal);

const TareaLaburo = () => {
    const [tareaslaburo, setTareasLaburo] = useState([]);
      const { user } = useAuth(); // Accedemos al usuario autenticado
    
    const getTareasLaburo = async () => {
      if (user) {
        // Creamos una query para obtener solo las tareas del usuario actual
        const q = query(collection(db, "tareaslaburo"), where("userId", "==", user.uid));
        const data = await getDocs(q);

        setTareasLaburo(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    };

    const deleteTareasLaburo = async (id) => {
        const tareaDoc = doc(db, "tareaslaburo", id);
        await deleteDoc(tareaDoc);
        getTareasLaburo();
      };

    const confirmDelete = (id) => {
        Swal.fire({
          title: "Estas segur@?",
          text: "La tarea no se puede restaurar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Borrar tarea"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTareasLaburo(id);
            Swal.fire({
              title: "Tarea borrada!",
              text: "Tu tarea ha sido borrada con exito",
              icon: "success"
            });
          }
        });
      };
    
     useEffect(() => {
        getTareasLaburo();
      }, [user]);
    
      return (
        <div>
          <Navbar />
        <div className='task-list'>
          <h1>Tareas para el trabajo</h1>
    
          <div className="row">
            {tareaslaburo.map((tarealaburo) => (
              <div className="col-md-4" key={tarealaburo.id}>
                <div className="task-card mb-5">
                  <div className="card-header mb-2 mt-2">
                    {tarealaburo.estado ? "Completada" : "Pendiente"}
                  </div>
                  <div className="card-body mb-1">
                    <h2 className="card-title mb-2">{tarealaburo.titulo}</h2>
                    <p className="card-text mb-3">{tarealaburo.descripcion}</p>
                    <div className='task-actions mb-3'>
                      <Link to={`/editar/${tarealaburo.id}`} className='btn btn-light'>Editar tarea</Link>
                      <button onClick={() => { confirmDelete(tarealaburo.id) }} className='btn btn-danger'>Borrar</button>
                    </div>
                  </div>
                  <div className="task-due-date mt-2">
                    {tarealaburo['fechaDeEntrega']?.toDate().toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mb-3 col-md-12">
              <Link to='/crearlaburo' className='btn btn-secondary'>Crear tarea</Link>
            </div>
          </div>
        </div>
        </div>
      );
}

export default TareaLaburo