import React, { useState } from 'react';
import '../../App.css';
import { useAuth } from '../../context/authContext';  // Importamos el AuthContext
import Navbar from '../Navbar.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const FormsFirebase = () => {
  const auth = useAuth();
  const { register, login, loginWithGoogle } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(email, password);
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setError('');  // Limpiar error cuando se cambia entre formularios
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(emailRegister, passwordRegister);
      } else {
        await login(email, password);
      }
    } catch (err) {
      // Verificamos el tipo de error y mostramos un mensaje más específico
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Esa cuenta no existe. Por favor, regístrate.');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta. Por favor, revisa tu contraseña.');
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no es válido. Por favor, revisa el formato.');
          break;
        case 'auth/email-already-in-use':
          setError('Este correo electrónico ya está en uso. Intenta con otro.');
          break;
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil. Usa al menos 6 caracteres.');
          break;
        default:
          setError('Ocurrió un error. Intenta nuevamente.');
          break;
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Ocurrió un error con el inicio de sesión de Google.');
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      <Navbar />
      <div className='body-form'>
        <div className={`container ${isRegister ? 'right-panel-active' : ''}`}>
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
              <h1>Crear cuenta</h1>
              <div className="social-container">
                <button type="button" onClick={handleGoogleLogin} className="social">
                  <i className="fab fa-google-plus-g"></i>
                </button>
              </div>
              <span>O usa tu e-mail para el registro</span>
              <input
                type="email"
                placeholder="Email"
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
                required
              />
              <button type="submit">Registrarse</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
              <h1>Iniciá sesión</h1>
              <div className="social-container">
                <button type="button" onClick={handleGoogleLogin} className="social">
                  <i className="fab fa-google-plus-g"></i>
                </button>
              </div>
              <span>o usa tu propia cuenta</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Bienvenido de nuevo!</h1>
                <p>Para mantenerte conectado, por favor iniciá sesión con tus datos</p>
                <button className="ghost" onClick={toggleForm}>Iniciar sesión</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hola, amig@!</h1>
                <p>Registrate con nosotros y empezá a organizarte fácil y sencillamente</p>
                <button className="ghost" onClick={toggleForm}>Registrarse</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mostrar error si lo hay */}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default FormsFirebase;
