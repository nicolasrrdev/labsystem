import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

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
  
  useEffect(() => {
    fetch(`${BASE_URL}/pacientes`)
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
  }, [BASE_URL])

  useEffect(() => {
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`)
      .then((response) => response.json())
      .then((response) => {
        setInfoPaciente(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, pacienteSeleccionado])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const errorMessages = {
    '404': 'No se encontraron registros',
    '404-2': 'No se encontraron registros',
    '500': 'Ha ocurrido un error inesperado',
    'default': 'Error: No se pudo establecer conexión con el servidor'
  }
  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const fetchAllData = fetch(`${BASE_URL}/api/tabla_examen/get/all`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('404')
        }
        if (response.status === 500) {
          throw new Error('500')
        }
        return response.json()
      })
    const fetchSpecificData = fetch(`${BASE_URL}/api/tabla_examen/get/timestamp/${pacienteSeleccionado}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('404-2')
        }
      })
    Promise.all([fetchAllData, fetchSpecificData])
      .then(([allData]) => {
        setTablaExamenData(allData)
        setInitialPage(false)
        setSubmitted1(true)
      })
      .catch((error) => {
        setModalAMessage(errorMessages[error.message] || errorMessages.default)
        setIsModalOpen(true)
        console.error(error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
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
    if (newSearchTerm === '') {
      setFilteredPacientes(pacientes)
    } else {
      const filtered = pacientes.filter((paciente) =>
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
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/tabla_examen/delete/${dataId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
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
                <select name='seleccionarPaciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
                  <option value=''>Seleccione un paciente</option>
                  {filteredPacientes
                    .sort((a, b) => a.nombres.localeCompare(b.nombres))
                    .map((paciente) => (
                      <option key={paciente.id} value={paciente.id}>
                        {paciente.nombres} {paciente.apellidos}
                      </option>
                  ))}
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
          <div> <br />
            <h2>Eliminar Tabla de Datos y Exámenes</h2> <br />
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form onSubmit={handleSubmit2}>
              <label className='labelFontSize' htmlFor='timestampSelect'>Registro: </label>
              <select id='timestampSelect' onChange={handleRegistroSeleccionado}>
                <option value=''>Seleccione un registro</option>
                {tablaExamenData
                  .filter(item => item.paciente_id === pacienteSeleccionado)
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(item => (
                    <option key={item.timestamp} value={item.timestamp} data-id={item.id}>
                      {new Date(item.timestamp).toLocaleString()}
                    </option>
                  ))}
              </select>
              <br /> <br />
              <button type='submit' disabled={registroSeleccionado === undefined || isSubmitting}>Continuar</button>
              <br /> <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br />
            </form>
          </div> <br />
        </center>
      )}
    </div>
  )
}

export default EliminarTablaExamen