import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthService from './services/auth.service'
import Login from './components/login.component'
import Register from './components/register.component'
import Home from './components/home.component'
import Profile from './components/profile.component'
// import BoardUser from './components/board-user.component'
// import BoardModerator from './components/board-moderator.component'
import BoardAdmin from './components/board-admin.component'
import RestorePasswordRequest from './components/RestorePasswordRequest'
import ResetPasswordForm from './components/ResetPasswordForm'
import EventBus from './common/EventBus'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './App.css'
import Menu from '../src/assets/menu.svg'
import CrearExamen from './components/CrearExamen'
import RealizarRegistro from './components/RealizarRegistro'
import RegistrarPaciente from './components/RegistrarPaciente'
import RevisarPaciente from './components/RevisarPaciente'
import EditarPaciente from './components/EditarPaciente'
import EditarRegistro from './components/EditarRegistro'
import EliminarRegistro from './components/EliminarRegistro'
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

  const [showAdminBoard, setShowAdminBoard] = useState(false)
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showEvaluadorBoard, setShowEvaluadorBoard] = useState(false)
  // const [showUserBoard, setShowUserBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)

  const user = AuthService.getCurrentUser()

  const navigate = useNavigate()
  const handleLinkClick = (targetPath) => {
    const currentPath = window.location.pathname
    if (currentPath === targetPath) {
      window.location.reload()
    } else {
      navigate(targetPath)
    }
  }

  const [hasOverflow, setHasOverflow] = useState(false)
  const handleOverflowChange = () => {
    const menuHam = document.querySelector('.menu-ham')
    if (menuHam) {
      setHasOverflow(menuHam.scrollWidth > menuHam.clientWidth)
    }
  }
  useEffect(() => {
    handleOverflowChange()
    window.addEventListener('resize', handleOverflowChange)
    return () => {
      window.removeEventListener('resize', handleOverflowChange)
    }
  }, [])

  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
      // setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowEvaluadorBoard(user.roles.includes('ROLE_EVALUADOR'))
      // setShowUserBoard(user.roles.includes('ROLE_USER'))
      // console.log(user.roles)
    }
    const handleLogout = () => {
      AuthService.logout()
      setShowAdminBoard(false)
      // setShowModeratorBoard(false)
      setShowEvaluadorBoard(false)
      // setShowUserBoard(false)
      setCurrentUser(undefined)
    }
    EventBus.on('logout', handleLogout)
    return () => {
      EventBus.remove('logout', handleLogout)
    }
  }, [])

  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload()
    }
    window.addEventListener('popstate', handlePopstate)
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  return (

      <HelmetProvider>
        <div>
          <Helmet>
            <title>{formattedLocationPathname} - Labsystem</title>
          </Helmet>
          
      
        <div className={`menu-ham ${isMenuOpen ? 'abierto' : ''} ${hasOverflow ? 'overflow' : ''}`} onClick={toggleMenu}>
          <div className='FaBars-container'>
            <img className='menuSvg' src={Menu} alt='menu' />
          </div>

          <li>
            <Link to='/labsystem/Home' onClick={() => handleLinkClick('/labsystem/Home')}>
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

          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/RegistrarPaciente' onClick={() => handleLinkClick('/labsystem/RegistrarPaciente')}>
                Registrar Paciente
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/RevisarPaciente' onClick={() => handleLinkClick('/labsystem/RevisarPaciente')}>
                Revisar Paciente
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/EditarPaciente' onClick={() => handleLinkClick('/labsystem/EditarPaciente')}>
                Editar Paciente
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/CrearExamen' onClick={() => handleLinkClick('/labsystem/CrearExamen')}>
                Crear Examen
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/RealizarRegistro' onClick={() => handleLinkClick('/labsystem/RealizarRegistro')}>
                Realizar Registro
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/RevisarRegistro' onClick={() => handleLinkClick('/labsystem/RevisarRegistro')}>
                Revisar Registro
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/EditarRegistro' onClick={() => handleLinkClick('/labsystem/EditarRegistro')}>
                Editar Registro
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/TablaExamen' onClick={() => handleLinkClick('/labsystem/TablaExamen')}>
                Tabla Examen
              </Link>
            </li>
          )}
          {showEvaluadorBoard && (
            <li>
              <Link to='/labsystem/EditarTablaExamen' onClick={() => handleLinkClick('/labsystem/EditarTablaExamen')}>
                Editar Tabla Examen
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li>
              <Link to='/labsystem/RegistrarPaciente' onClick={() => handleLinkClick('/labsystem/RegistrarPaciente')}>
                Registrar Paciente
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/RevisarPaciente' onClick={() => handleLinkClick('/labsystem/RevisarPaciente')}>
                Revisar Paciente
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/EditarPaciente' onClick={() => handleLinkClick('/labsystem/EditarPaciente')}>
                Editar Paciente
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/CrearExamen' onClick={() => handleLinkClick('/labsystem/CrearExamen')}>
                Crear Examen
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/RealizarRegistro' onClick={() => handleLinkClick('/labsystem/RealizarRegistro')}>
                Realizar Registro
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/RevisarRegistro' onClick={() => handleLinkClick('/labsystem/RevisarRegistro')}>
                Revisar Registro
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/EditarRegistro' onClick={() => handleLinkClick('/labsystem/EditarRegistro')}>
                Editar Registro
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/EliminarRegistro' onClick={() => handleLinkClick('/labsystem/EliminarRegistro')}>
                Eliminar Registro
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/TablaExamen' onClick={() => handleLinkClick('/labsystem/TablaExamen')}>
                Tabla Examen
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/EditarTablaExamen' onClick={() => handleLinkClick('/labsystem/EditarTablaExamen')}>
                Editar Tabla Examen
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/EliminarTablaExamen' onClick={() => handleLinkClick('/labsystem/EliminarTablaExamen')}>
                Eliminar Tabla Examen
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li>
              <Link to='/labsystem/Admin' onClick={() => handleLinkClick('/labsystem/Admin')}>
                Panel de Administrador
              </Link>
            </li>
          )}

          {!currentUser && (
              <li>
                <Link to='/labsystem/Restore' onClick={() => handleLinkClick('/labsystem/Restore')}>
                  Restablecer Contraseña
                </Link>
              </li>
          )}
          
          {currentUser ? (
            <>
              <li>
                <Link to='/labsystem/Profile' onClick={() => handleLinkClick('/labsystem/Profile')}>
                  {/* {currentUser.username} */}
                  Perfil
                </Link>
              </li>
              <li>
                <a href='/labsystem/Login' onClick={(e) => { handleLinkClick('/labsystem/Login'); AuthService.logout(); window.location.reload(); e.preventDefault(); }}>
                  Salir
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/labsystem/Login' onClick={() => handleLinkClick('/labsystem/Login')}>
                  Ingresar
                </Link>
              </li>
              <li>
                <Link to='/labsystem/Register' onClick={() => handleLinkClick('/labsystem/Register')}>
                  Registrarse
                </Link>
              </li>
            </>
          )}

        </div>

        <Routes>

          <Route path='*' element={<Navigate to='/labsystem/Home' />} />
          {/* <Route path='/labsystem/' element={<Home />} /> */}
          <Route path='/labsystem/Home' element={<Home />} />
          <Route path='/labsystem/Profile' element={<Profile />} />

          {currentUser ? (
            <>
              <Route path='/labsystem/Login' element={<Navigate to='/labsystem/Home' />} />
              <Route path='/labsystem/Register' element={<Navigate to='/labsystem/Home' />} />
            </>
          ) : (
            <>
              <Route path='/labsystem/Login' element={<Login />} />
              <Route path='/labsystem/Register' element={<Register />} />
            </>
          )}

          {!currentUser && (
            <Route path='/labsystem/Restore' element={<RestorePasswordRequest />} />
          )}
          {currentUser && (
            <Route path='/labsystem/Restore' element={<Navigate to='/labsystem/Home' />} />
          )}

          {!currentUser && (
            <Route path='/labsystem/reset-password' element={<ResetPasswordForm />} />
          )}
          {currentUser && (
            <Route path='/labsystem/reset-password' element={<Navigate to='/labsystem/Home' />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/labsystem/Admin' element={<BoardAdmin />} />
          )}

          {/* {user && user.roles && user.roles.includes('ROLE_MODERATOR') &&(
            <Route path='/Mod' element={<BoardModerator />} />
          )} */}

          {/* {user && user.roles && user.roles.includes('ROLE_USER') &&(
            <Route path='/User' element={<BoardUser />} />
          )} */}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/RegistrarPaciente' element={<RegistrarPaciente />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/RevisarPaciente' element={<RevisarPaciente />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/EditarPaciente' element={<EditarPaciente />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/CrearExamen' element={<CrearExamen />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/RealizarRegistro' element={<RealizarRegistro />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/RevisarRegistro' element={<RevisarRegistro />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/EditarRegistro' element={<EditarRegistro />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/labsystem/EliminarRegistro' element={<EliminarRegistro />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/TablaExamen' element={<TablaExamen />} />
          )}

          {user && user.roles && (user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_EVALUADOR')) &&(
            <Route path='/labsystem/EditarTablaExamen' element={<EditarTablaExamen />} />
          )}

          {user && user.roles && user.roles.includes('ROLE_ADMIN') &&(
            <Route path='/labsystem/EliminarTablaExamen' element={<EliminarTablaExamen />} />
          )}

        </Routes>

        </div>
      </HelmetProvider>

  )

}

export default App
