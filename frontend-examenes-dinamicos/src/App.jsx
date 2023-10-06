import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './App.css'

import Home from './components/Home'
import CrearExamen from './components/CrearExamen'
import RegistrosEnTablasExamen from './components/RegistrosEnTablasExamen'
import RegistrarPaciente from './components/RegistrarPaciente'
import ListarPacientes from './components/ListarPacientes'
import EditarPaciente from './components/EditarPaciente'
import EditarRegistro from './components/EditarRegistro'
import RevisarRegistros from './components/RevisarRegistros'
import TablaExamen from './components/TablaExamen'

const routeTitles = {
  '/Home': 'Página de inicio',
  '/RegistrarPaciente': 'Registrar Paciente',
  '/ListarPacientes': 'Listar Pacientes',
  '/EditarPaciente': 'Editar Paciente',
  '/CrearExamen': 'Crear Examen',
  '/RegistroEnExamen': 'Realizar Registro',
  '/RevisarRegistros': 'Revisar Registros',
  '/EditarRegistro': 'Editar Registro',
  '/TablaExamen': 'Tabla Examen',
  default: 'Lab Neuro',
}

function App() {

  // const location = useLocation()
  // const handleCrearExamenClick = () => {
  //   if (location.pathname === '/CrearExamen') {
  //     const shouldReload = window.confirm('¿Estás seguro que deseas recargar la página? Los cambios no guardados se perderán.')
  //     if (shouldReload) {
  //       window.location.reload()
  //     }
  //   }
  // }

  const currentPath = window.location.pathname
  const pageTitle = routeTitles[currentPath] || routeTitles.default

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <nav>
          <div>
            <li>
              <Link to={'/Home'}>
                Exámenes de Laboratorio
              </Link>
            </li>
            <li>
              <Link to={'/RegistrarPaciente'}>
                Registar Paciente
              </Link>
            </li>
            <li>
              <Link to={'/ListarPacientes'}>
                Listar Pacientes
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
            {/* <li>
              <Link to={'/CrearExamen'} onClick={handleCrearExamenClick}>
                Crear Examen
              </Link>
            </li>  */}
            <li>
              <Link to={'/RegistroEnExamen'}>
                Realizar Registro
              </Link>
            </li>
            <li>
              <Link to={'/RevisarRegistros'}>
                Revisar Registros
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
        </nav>
        <div>
            <Routes>
              <Route path='*' element={<Navigate to='/Home' />} />
              <Route path='/' element={<Home />} />
              <Route path='/Home' element={<Home />} />
              <Route path='/CrearExamen' element={<CrearExamen />} />
              <Route path='/RegistrarPaciente' element={<RegistrarPaciente />} />
              <Route path='/ListarPacientes' element={<ListarPacientes />} />
              <Route path='/EditarPaciente' element={<EditarPaciente />} />
              <Route path='/RegistroEnExamen' element={<RegistrosEnTablasExamen />} />
              <Route path='/RevisarRegistros' element={<RevisarRegistros />} />
              <Route path='/EditarRegistro' element={<EditarRegistro />} />
              <Route path='/TablaExamen' element={<TablaExamen />} />
            </Routes>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default App
