import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
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
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import Menu from '../src/assets/menu.svg';
import CrearExamen from './components/CrearExamen';
import RealizarRegistro from './components/RealizarRegistro';
import RegistrarPaciente from './components/RegistrarPaciente';
import RevisarPaciente from './components/RevisarPaciente';
import EditarPaciente from './components/EditarPaciente';
import EditarRegistro from './components/EditarRegistro';
import RevisarRegistro from './components/RevisarRegistro';
import TablaExamen from './components/TablaExamen';
import EditarTablaExamen from './components/EditarTablaExamen';
import EliminarTablaExamen from './components/EliminarTablaExamen';

function formatLocationPathname(pathname) {
  return pathname.replace(/([A-Z])/g, ' $1').trim();
}

const App = () => {

  const location = useLocation();
  const formattedLocationPathname = formatLocationPathname(location.pathname.substring(1)) || 'Inicio';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const user = AuthService.getCurrentUser();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
      setShowUserBoard(user.roles.includes('ROLE_USER'));
      // console.log(user.roles)

    }
    const handleLogout = () => {
      AuthService.logout();
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setShowUserBoard(false);
      setCurrentUser(undefined);

    };
    EventBus.on('logout', handleLogout);
    return () => {
      EventBus.remove('logout', handleLogout);
    };
  }, []);

  return (
          <HelmetProvider>
      <div>
        <Helmet>
          <title>{formattedLocationPathname} - Labsystem</title>
        </Helmet>
    
      <div className={`menu-ham ${isMenuOpen ? 'abierto' : ''}`} onClick={toggleMenu}>
        <div className='FaBars-container'>
          <img className='menuSvg' src={Menu} alt='menu' />
        </div>

        <li>
          <Link to={'/Home'}>
            Inicio
          </Link>
        </li>

        {/* {showUserBoard && (
          <li>
            <Link to={'/User'}>
              User Board
            </Link>
          </li>
        )} */}

        {/* {showModeratorBoard && (
          <li>
            <Link to={'/Mod'}>
              Moderator Board
            </Link>
          </li>
        )} */}

        {showAdminBoard && (
        <li>
          <Link to={'/RegistrarPaciente'}>
            Registrar Paciente
          </Link>
        </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/RevisarPaciente'}>
              Revisar Paciente
            </Link>
          </li>
        )}
          
        {showAdminBoard && (
          <li>
            <Link to={'/EditarPaciente'}>
              Editar Paciente
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/CrearExamen'}>
              Crear Examen
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/RealizarRegistro'}>
              Realizar Registro
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/RevisarRegistro'}>
              Revisar Registro
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/RevisarRegistro'}>
              Revisar Registro
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/EditarRegistro'}>
              Editar Registro
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/TablaExamen'}>
              Tabla Examen
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/EditarTablaExamen'}>
              Editar Tabla Examen
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/EliminarTablaExamen'}>
              Eliminar Tabla Examen
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to={'/Admin'}>
              Panel de Administrador
            </Link>
          </li>
        )}

        {!currentUser && (
            <li>
              <Link to={'/Restore'}>
                Restablecer Contraseña
              </Link>
            </li>
        )}
        
        {currentUser ? (
          <>
            <li>
              <Link to={'/Profile'}>
                {/* {currentUser.username} */}
                Perfil
              </Link>
            </li>
            <li>
              <a href='/Login' onClick={() => AuthService.logout()}>
                Salir
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/Login'}>
                Ingresar
              </Link>
            </li>
            <li>
              <Link to={'/Register'}>
                Registrarse
              </Link>
            </li>
          </>
        )}

      </div>

      <div>
        <Routes>

          <Route path='*' element={<Navigate to='/home' />} />
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Profile' element={<Profile />} />

          {currentUser ? (
            <>
              <Route path="/Login" element={<Navigate to="/home" />} />
              <Route path="/Register" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </>
          )}

          {!currentUser && (
            <Route path='/Restore' element={<RestorePasswordRequest />} />
          )}
          {currentUser && (
            <Route path='/Restore' element={<Navigate to='/Home' />} />
          )}

          {!currentUser && (
            <Route path='/reset-password' element={<ResetPasswordForm />} />
          )}
          {currentUser && (
            <Route path='/reset-password' element={<Navigate to='/Home' />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/Admin' element={<BoardAdmin />} />
          )}

          {/* {user && user.roles && user.roles.includes('ROLE_MODERATOR') &&(
            <Route path='/Mod' element={<BoardModerator />} />
          )} */}

          {/* {user && user.roles && user.roles.includes('ROLE_USER') &&(
            <Route path='/User' element={<BoardUser />} />
          )} */}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/RegistrarPaciente' element={<RegistrarPaciente />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/RevisarPaciente' element={<RevisarPaciente />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/EditarPaciente' element={<EditarPaciente />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/CrearExamen' element={<CrearExamen />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/RealizarRegistro' element={<RealizarRegistro />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/RevisarRegistro' element={<RevisarRegistro />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/EditarRegistro' element={<EditarRegistro />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/TablaExamen' element={<TablaExamen />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/EditarTablaExamen' element={<EditarTablaExamen />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/EliminarTablaExamen' element={<EliminarTablaExamen />} />
          )}

        </Routes>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default App;
