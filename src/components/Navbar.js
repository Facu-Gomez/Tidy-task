import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { authContext } from '../context/authContext'; // Importar el AuthContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(authContext); // Obtener el usuario y la función logout desde el contexto

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid navbar-container">
        <Link to="/" className="navbar-brand">
          Tidy Task
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleMenu}>
                Inicio
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link user-greeting">
                    Hola, {user.displayName || user.email}!
                  </span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-logout ms-3" onClick={logout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/auth" className="nav-link btn btn-login ms-3" onClick={toggleMenu}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
