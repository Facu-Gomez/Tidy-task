import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { AuthProvider } from './context/authContext';
import FormsFirebase from './components/user/FormsFirebase';
import Home from './components/Home';


import CrearTareaFacultad from './components/CrearTareaFacultad';
import EditarTareaFacultad from './components/EditarTareaFacultad';
import TareaFacultad from './components/TareaFacultad';
import TareaLaburo from './components/TareaLaburo';
import CrearTareaLaburo from './components/CrearTareaLaburo';

import { BrowserRouter, Route, Routes} from 'react-router-dom';


const App = () => {

  return (
    <AuthProvider>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home /> } />
          <Route path='/crear' element = {<CrearTareaFacultad/> } />
          <Route path='/editar/:id' element = {<EditarTareaFacultad/> } />
          <Route path='/tareas' element = {<TareaFacultad/> } />
          <Route path='/tareaslaburo' element = {<TareaLaburo/> } />
          <Route path='/crearlaburo' element = {<CrearTareaLaburo/> } />
          <Route path='/auth' element={<FormsFirebase />} /> 
        </Routes>
      </BrowserRouter>


    </div>
    </AuthProvider>
  );
};

export default App;
