import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/authContext'; // Importa el contexto de autenticación
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Navbar from './Navbar';

const MySwal = withReactContent(Swal);

const TareaFacultad = () => {
  const [tareasfacultad, setTareas] = useState([]);
  const { user } = useAuth(); // Accedemos al usuario autenticado

  const getTareasFacultad = async () => {
    if (user) {
      // Creamos una query para obtener solo las tareas del usuario actual
      const q = query(collection(db, "tareasfacultad"), where("userId", "==", user.uid));
      const data = await getDocs(q);

      setTareas(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  const deleteTareasFacultad = async (id) => {
    const tareaDoc = doc(db, "tareasfacultad", id);
    await deleteDoc(tareaDoc);
    getTareasFacultad();
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
        deleteTareasFacultad(id);
        Swal.fire({
          title: "Tarea borrada!",
          text: "Tu tarea ha sido borrada con exito",
          icon: "success"
        });
      }
    });
  };

  useEffect(() => {
    getTareasFacultad();
  }, [user]); // Escuchar cambios en el usuario autenticado

  return (
    <div>
      <Navbar />
    <div className='task-list'>
      <h1>Tareas para la facultad</h1>

      <div className="row">
        {tareasfacultad.map((tareafacultad) => (
          <div className="col-md-4" key={tareafacultad.id}>
            <div className="task-card mb-5">
              <div className="card-header mb-2 mt-2">
                {tareafacultad.estado ? "Completada" : "Pendiente"}
              </div>
              <div className="card-body mb-1">
                <h2 className="card-title mb-2">{tareafacultad.titulo}</h2>
                <p className="card-text mb-3">{tareafacultad.descripcion}</p>
                <div className='task-actions mb-3'>
                  <Link to={`/editar/${tareafacultad.id}`} className='btn btn-light'>Editar tarea</Link>
                  <button onClick={() => { confirmDelete(tareafacultad.id) }} className='btn btn-danger'>Borrar</button>
                </div>
              </div>
              <div className="task-due-date mt-2">
                {tareafacultad['fechaDeEntrega']?.toDate().toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mb-3 col-md-12">
          <Link to='/crear' className='btn btn-secondary'>Crear tarea</Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TareaFacultad;
