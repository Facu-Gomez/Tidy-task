import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext.jsx';
import '../App.css';
import Navbar from './Navbar.js';

const Home = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      alert('Debes iniciar sesión para acceder a esta página.');
    }
  };

  return (
    <div className="home color-palette">
      <Navbar />
      <header className="home-header text-center">
        <h1>Bienvenido a Tidy Task</h1>
        <p>Organiza tus tareas de manera eficiente y productiva</p>
        <Link to="/auth" className="btn btn-main btn-lg">
          Comienza ahora
        </Link>
      </header>

      <section className="features container-home mt-5">
        <div className="row">
          <div className="col-md-4 text-center">
            <i className="fas fa-check-circle fa-3x"></i>
            <h3>Organización Eficiente</h3>
            <p>Administra tus tareas y proyectos de forma clara y sencilla.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-calendar-alt fa-3x"></i>
            <h3>Calendario Integrado</h3>
            <p>Planifica tu tiempo y nunca te olvides de una fecha importante.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-users fa-3x"></i>
            <h3>Colaboración Fácil</h3>
            <p>Trabaja en equipo y comparte tus tareas con otros usuarios.</p>
          </div>
        </div>
      </section>

      <section className="cards-section d-flex justify-content-center align-items-center flex-column mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6 d-flex justify-content-center">
      <div className="card cute-card mx-auto" onClick={() => handleCardClick('/tareas')}>
        <div className="card-body text-center">
          <h5 className="card-title">Gestionar Tareas</h5>
          <p className="card-text">Accede a la gestión de tus tareas de facultad.</p>
          <Link to={"/tareas"} className='btn btn-main'>
            Ver tareas de la facultad
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-6 d-flex justify-content-center mt-3 mt-md-0">
      <div className="card cute-card mx-auto" onClick={() => handleCardClick('/tareaslaburo')}>
        <div className="card-body text-center">
          <h5 className="card-title">Gestionar Tareas</h5>
          <p className="card-text">Presiona aquí para ver las tareas del trabajo.</p>
          <button className="btn btn-secondary">Ver tareas del trabajo</button>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="cta-section text-center mt-5">
        <h2>¿Listo para mejorar tu productividad?</h2>
        <Link to="/auth" className="btn btn-main btn-lg mt-3">
          Regístrate Gratis
        </Link>
      </section>

      <footer className="footer mt-5 py-3 text-center">
        <p>© 2024 Tidy Task. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
