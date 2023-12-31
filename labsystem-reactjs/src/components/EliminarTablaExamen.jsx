import { useState, useEffect, useRef } from 'react'
import ModalAlert from './ModalAlert'
import AuthService from '../services/auth.service'

const EliminarTablaExamen = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [initialPage, setInitialPage] = useState(true)
  const [submitted1, setSubmitted1] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [tablaExamenData, setTablaExamenData] = useState([])
  const [registroSeleccionado, setRegistroSeleccionado] = useState()
  const [dataId, setDataId] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAMessage, setModalAMessage] = useState('')
  const closeAModal = () => {
    setIsModalOpen(false)
  }
  const handleTabKeyPress = (e) => {
    if (isModalOpen && e.key === 'Tab') {
      e.preventDefault()
    }
  }
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentUser = AuthService.getCurrentUser()

  const accessTokenRef = useRef(currentUser.accessToken)
  
  useEffect(() => {
    fetch(`${BASE_URL}/pacientes`, {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPacientes(response)
        setFilteredPacientes(response)
      })
      .catch((error) => {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
        setIsModalOpen(true)
        console.error(error)
      })
  }, [BASE_URL, accessTokenRef])

  useEffect(() => {
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`, {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setInfoPaciente(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, pacienteSeleccionado, accessTokenRef])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/api/tabla_examen/por_paciente/${pacienteSeleccionado}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      })
      // console.log(pacienteSeleccionado)
      if (response.ok) {
        const data = await response.json()
        // console.log('Datos recibidos:', data)
        setTablaExamenData(data)
        setSubmitted1(true)
        setInitialPage(false)
      } else if (response.status === 404) {
        throw new Error('No se encontró el registro')
      } else {
        throw new Error('Ha ocurrido un error inesperado')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const isButtonDisabled = pacienteSeleccionado === ''
  const handleReloadPage = () => {
    window.location.reload()
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPacientes, setFilteredPacientes] = useState(pacientes)
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    if (Array.isArray(pacientes)) {
      const filtered = newSearchTerm === ''
        ? pacientes
        : pacientes.filter((paciente) =>
            `${paciente.nombres} ${paciente.apellidos}`.toLowerCase().includes(newSearchTerm.toLowerCase())
          )
      setFilteredPacientes(filtered)
    }
  }

  const handleRegistroSeleccionado = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const selectedTimestamp = e.target.value
    const selectedId = selectedOption.dataset.id
    if (selectedTimestamp === '') {
      setRegistroSeleccionado(undefined)
    } else {
      setRegistroSeleccionado(selectedTimestamp)
    }
    setDataId(selectedId)
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
  
    if (!registroSeleccionado || !dataId) {
      return
    }
  
    setIsSubmitting(true)
  
    fetch(`${BASE_URL}/api/tabla_examen/${dataId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('No se encontró el registro')
        }
        if (response.status === 500) {
          throw new Error('Ha ocurrido un error inesperado')
        }
      })
      .then(() => {
        setSubmitted1(false)
        setRegistroExitoso(true)
      })
      .catch((error) => {
        if (error.message === 'No se encontró el registro') {
          setModalAMessage('No se encontró el registro')
        } else if (error.message === 'Ha ocurrido un error inesperado') {
          setModalAMessage('Ha ocurrido un error inesperado')
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
          console.error(error)
        }
        setIsModalOpen(true)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  if (registroExitoso) {
    return (
      <div>
        <center>
          <br />
          <h2>Registro eliminado con éxito</h2>
          <br />
          <button onClick={handleReloadPage}>Eliminar otro Registro</button>
        </center>
      </div>
    )
  }

  return (
    <div>
      <div onKeyDown={handleTabKeyPress}>
        <ModalAlert
          message={modalAMessage}
          isOpen={isModalOpen}
          onClose={closeAModal}
        />
      </div>
      {initialPage && (
        <center>
          <div>
            <br />
            <h2>Eliminar Tabla de Datos y Exámenes</h2> <br />
            <form onSubmit={handleSubmit1}>
              <div>
                <input
                  name='buscarPaciente'
                  type='text'
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select name='paciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
                  <option value=''>Seleccione un paciente</option>
                  {filteredPacientes && filteredPacientes.length > 0
                    ? filteredPacientes
                        .sort((a, b) => a.nombres.localeCompare(b.nombres))
                        .map((paciente) => (
                          <option key={paciente.id} value={paciente.id}>
                            {paciente.nombres} {paciente.apellidos}
                          </option>
                        ))
                    : <option value='' disabled>No hay pacientes disponibles</option>
                  }
                </select>
              </div>
              <br />
              <button type='submit' disabled={isButtonDisabled || isSubmitting}>Continuar</button>
            </form>
          </div>
        </center>
      )}
      {submitted1 && (
        <center>
          <div>
            <br />
            <h2>Eliminar Tabla de Datos y Exámenes</h2>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form onSubmit={handleSubmit2}>
              <label className='labelFontSize' htmlFor='timestampSelect'>Registro: </label>
              <select id='timestampSelect' onChange={handleRegistroSeleccionado}>
                <option value=''>Seleccione un registro</option>
                {tablaExamenData
                  .filter(item => item.pacienteId === parseInt(pacienteSeleccionado))
                  .sort((a, b) => new Date(b.timestampColumn) - new Date(a.timestampColumn))
                  .map(item => (
                    <option key={item.timestampColumn} value={item.timestampColumn} data-id={item.id}>
                      {new Date(item.timestampColumn).toLocaleString()}
                    </option>
                  ))}
              </select>
              <br /> <br />
              <button type='submit' disabled={registroSeleccionado === undefined || isSubmitting}>Eliminar</button>
              <br /> <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br />
            </form>
          </div> <br />
        </center>
      )}
    </div>
  )
}

export default EliminarTablaExamen
