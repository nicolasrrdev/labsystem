import { useState } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
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

function formatLocationPathname(pathname) {
  return pathname.replace(/([A-Z])/g, ' $1').trim()
}

function App() {
  
  const location = useLocation()
  const formattedLocationPathname = formatLocationPathname(location.pathname.substring(1)) || 'Inicio'
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
  }
  
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{formattedLocationPathname} - Lab System</title>
        </Helmet>
        <div className={`menu-ham ${isMenuOpen ? 'abierto' : ''}`} onClick={toggleMenu}>
          <div className="FaBars-container">
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
              Tabla Examen
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
            </Routes>
        </div>
      </div>
     </HelmetProvider>
  )
}

export default App