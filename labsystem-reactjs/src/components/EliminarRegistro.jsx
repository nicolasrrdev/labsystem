import { useEffect, useRef, useState } from 'react'
import AuthService from '../services/auth.service'
import ModalAlert from './ModalAlert'

const EliminarRegistro = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [tableName, setTableName] = useState('')
  const [examList, setExamList] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [nombreTabla, setNombreTabla] = useState('')
  const [nombreTabla2, setNombreTabla2] = useState('')
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [jsonData, setJsonData] = useState([])
  const [registroDate, setRegistroDate] = useState('')
  const [idSeleccionado2, setIdSeleccionado2] = useState('')
  const [registroExitoso2, setRegistroExitoso2] = useState(false)

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
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pacientes`, {
          headers: {
            'Authorization': `Bearer ${accessTokenRef.current}`,
          },
        })
        const data = await response.json()
        setPacientes(data)
        setFilteredPacientes(data)
      } catch (error) {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor')
        setIsModalOpen(true)
        console.error(error)
      }
    }
    fetchData()
  }, [BASE_URL, accessTokenRef])

  useEffect(() => {
    if (pacienteSeleccionado) {
      fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setInfoPaciente(data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, pacienteSeleccionado, accessTokenRef])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/exam/${nombreTabla2}/paciente/${pacienteSeleccionado}`, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          return Promise.reject('No hay registros disponibles')
        }
        return response.json()
      })
      .then((response) => {        
        setJsonData(response)
        setRegistroExitoso(true)
        setSubmitted(true)
      })
      .catch((error) => {
        if (error === 'No hay registros disponibles') {
          setModalAMessage('No hay registros disponibles')
          setIsModalOpen(true)
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
          setIsModalOpen(true)
          console.error(error)
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const isButtonDisabled = pacienteSeleccionado === ''
  const isButtonDisabled2 = registroDate === ''

  useEffect(() => {
    fetch(`${BASE_URL}/api/examen/nombreExamen`, {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setExamList(data.nombres_examenes)
        setNombreTabla(data.nombres_tablas)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, accessTokenRef])

  const handleExamSelection = (e) => {
    const selectedIndex = e.target.selectedIndex
    setTableName(e.target.value)
    setNombreTabla2(nombreTabla[selectedIndex - 1])
  }

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/examen/${nombreTabla2}/tiposCampos`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2, accessTokenRef])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2, accessTokenRef])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/numFields`, {
        headers: {
          'Authorization': `Bearer ${accessTokenRef.current}`,
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2, accessTokenRef])

  const handleSubmit2 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/exam/${nombreTabla2}/delete/${idSeleccionado2}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al enviar los datos')
        }
        setRegistroExitoso(false)
        setRegistroExitoso2(true)
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
        } else {
          setModalAMessage(error.message)
        }
        setIsModalOpen(true)
        console.error(error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }
  
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
    setRegistroDate(e.target.value)
    const idSeleccionado = e.target.selectedOptions[0].getAttribute('data-id')
    setIdSeleccionado2(idSeleccionado)
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
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Eliminar Registro</h2>
            <form onSubmit={handleSubmit1}>
              <div>
                <label htmlFor='tableName'>Seleccione un examen:ㅤ</label>
                <select
                  id='tableName'
                  name='tableName'
                  value={tableName}
                  onChange={handleExamSelection}
                  required
                >
                  {examList && examList.length > 0 ? (
                    <>
                      <option value=''>Seleccione un examen</option>
                      {examList.map((examen, index) => (
                        <option key={index} value={examen}>
                          {examen}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value='' disabled>No hay exámenes disponibles</option>
                  )}
                </select>
              </div>
              <div>
                <br />
                Seleccione un paciente:ㅤ
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
              <button type='submit' disabled={isButtonDisabled || isSubmitting}>
                Continuar
              </button>
            </form>
          </div>
        </center>
      )}
      {registroExitoso && (
        <center>
        <form onSubmit={handleSubmit2}>
        <div>
          <br />
          <h2>Eliminar Registro</h2>
          <div>
            <p>Registros en: {tableName}</p>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <label htmlFor='registroDate'>Seleccione un registro:ㅤ</label> <br />
            <select
              id='registroDate'
              name='registroDate'
              value={registroDate}
              onChange={handleRegistroSeleccionado}
              required
            >
              <option value=''>Seleccione un registro</option>
              {jsonData
              .sort((a, b) => {
                const fechaA = new Date(a.fecha_registro)
                const fechaB = new Date(b.fecha_registro)
                return fechaA - fechaB
              })
              .reverse()
              .map((seleccion, index) => (
                <option key={index} value={seleccion.fecha_registro} data-id={seleccion.id}>
                  {new Date(seleccion.fecha_registro).toLocaleString('es-ES')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
          <button type='submit' disabled={isButtonDisabled2 || isSubmitting}>
            Eliminar Registro
          </button>
        </form>
        <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
        </center>
      )}
      {registroExitoso2 && (
        <center>
          <div>
            <br />
            <h3>Registro eliminado con éxito.</h3>
            <br />
            <button onClick={handleReloadPage}>Eliminar otro registro</button>
          </div>
        </center>
      )}
    </div>
  )
}

export default EliminarRegistro
