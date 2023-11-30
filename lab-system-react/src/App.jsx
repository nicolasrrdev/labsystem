import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component';

import RestorePasswordRequest from './components/RestorePasswordRequest';
import ResetPasswordForm from './components/ResetPasswordForm';

import EventBus from './common/EventBus';


import { Helmet, HelmetProvider } from 'react-helmet-async'
import './App.css'
import Menu from '../src/assets/menu.svg'

import Inicio from './components/Inicio'
import CrearExamen from './components/CrearExamen'
import RealizarRegistro from './components/RealizarRegistro'
import RegistrarPaciente from './components/RegistrarPaciente'
import RevisarPaciente from './components/RevisarPaciente'
import EditarPaciente from './components/EditarPaciente'
import EditarRegistro from './components/EditarRegistro'
import RevisarRegistro from './components/RevisarRegistro'
import TablaExamen from './components/TablaExamen'
import EditarTablaExamen from './components/EditarTablaExamen'
import EliminarTablaExamen from './components/EliminarTablaExamen'

function formatLocationPathname(pathname) {
  return pathname.replace(/([A-Z])/g, ' $1').trim()
}

const App = () => {

  const location = useLocation()
  const formattedLocationPathname = formatLocationPathname(location.pathname.substring(1)) || 'Inicio'
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
  }

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showRestore, setShowRestore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
      setShowRestore(!user); // Se muestra si no hay usuario logeado
      console.log(user.roles);
    }

    const handleLogout = () => {
      AuthService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setCurrentUser(undefined);
      setShowRestore(true); // Se muestra después de cerrar sesión
    };

    EventBus.on('logout', handleLogout);

    return () => {
      EventBus.remove('logout', handleLogout);
    };
  }, []);

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          Sistema de Información Lab Neuro
        </Link>

        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Board
              </Link>
            </li>
          )}

          {!currentUser && (
            <li className='nav-item'>
              <Link to={'/restore'} className='nav-link'>
                Restore Password
              </Link>
            </li>
          )}

          {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={() => navigate('/')}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/register'} className='nav-link'>
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user' element={<BoardUser />} />
          <Route path='/mod' element={<BoardModerator />} />
          <Route path='/admin' element={<BoardAdmin />} />

          <Route path='/restore' element={<RestorePasswordRequest />} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />

          {currentUser && <Route path='/restore' element={<Navigate to='/home' />} />}
        </Routes>
      </div>

      <HelmetProvider>
      <div>
        <Helmet>
          <title>{formattedLocationPathname} - Lab System</title>
        </Helmet>
        <div className={`menu-ham ${isMenuOpen ? 'abierto' : ''}`} onClick={toggleMenu}>
          <div className='FaBars-container'>
            <img className='menuSvg' src={Menu} alt='menu' />
          </div>
          <li>
            <Link to={'/Inicio'}>
              Exámenes de Laboratorio
            </Link>
          </li>
          <li>
            <Link to={'/RegistrarPaciente'}>
              Registrar Paciente
            </Link>
          </li>
          <li>
            <Link to={'/RevisarPaciente'}>
              Revisar Paciente
            </Link>
          </li>
          <li>
            <Link to={'/EditarPaciente'}>
              Editar Paciente
            </Link>
          </li>
          <li>
            <Link to={'/CrearExamen'}>
              Crear Examen
            </Link>
          </li>
          <li>
            <Link to={'/RealizarRegistro'}>
              Realizar Registro
            </Link>
          </li>
          <li>
            <Link to={'/RevisarRegistro'}>
              Revisar Registro
            </Link>
          </li>
          <li>
            <Link to={'/EditarRegistro'}>
              Editar Registro
            </Link>
          </li>
          <li>
            <Link to={'/TablaExamen'}>
              Tabla de Datos y Exámenes
            </Link>
          </li>
          <li>
            <Link to={'/EditarTablaExamen'}>
              Editar Tabla de Datos y Exámenes
            </Link>
          </li>
          <li>
            <Link to={'/EliminarTablaExamen'}>
              Eliminar Tabla de Datos y Exámenes
            </Link>
          </li>
          </div>
        <div>
            <Routes>
              <Route path='*' element={<Navigate to='/Inicio' />} />
              <Route path='/' element={<Inicio />} />
              <Route path='/Inicio' element={<Inicio />} />
              <Route path='/RegistrarPaciente' element={<RegistrarPaciente />} />
              <Route path='/RevisarPaciente' element={<RevisarPaciente />} />
              <Route path='/EditarPaciente' element={<EditarPaciente />} />
              <Route path='/CrearExamen' element={<CrearExamen />} />
              <Route path='/RealizarRegistro' element={<RealizarRegistro />} />
              <Route path='/RevisarRegistro' element={<RevisarRegistro />} />
              <Route path='/EditarRegistro' element={<EditarRegistro />} />
              <Route path='/TablaExamen' element={<TablaExamen />} />
              <Route path='/EditarTablaExamen' element={<EditarTablaExamen />} />
              <Route path='/EliminarTablaExamen' element={<EliminarTablaExamen />} />
            </Routes>
        </div>
      </div>
     </HelmetProvider>
     
    </div>
  );
};

export default App;
