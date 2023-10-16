import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const RevisarRegistros = () => {
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
  const [campoTipos, setCampoTipos] = useState({})
  const [inputs, setInputs] = useState({})
  const [campoData, setCampoData] = useState({})

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAMessage, setModalAMessage] = useState('')
  const closeAModal = () => {
    setIsModalOpen(false)
  }
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetch(`${BASE_URL}/pacientes`)
      .then((response) => response.json())
      .then((data) => {
        setPacientes(data)
        setFilteredPacientes(data)
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
      .then((data) => setInfoPaciente(data))
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, pacienteSeleccionado])

  const handlePacienteSeleccionado = (event) => {
    setPacienteSeleccionado(event.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/exam/${nombreTabla2}/paciente/${pacienteSeleccionado}`)
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
    fetch(`${BASE_URL}/api/examen/nombreExamen`)
      .then(response => response.json())
      .then(data => {
        setExamList(data.nombres_examenes)
        setNombreTabla(data.nombres_tablas)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL])

  const handleExamSelection = (e) => {
    const selectedIndex = e.target.selectedIndex
    setTableName(e.target.value)
    setNombreTabla2(nombreTabla[selectedIndex - 1])
  }

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/examen/${nombreTabla2}/tiposCampos`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/numFields`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  const handleSubmit2 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const requests = [
      fetch(`${BASE_URL}/api/examen/${nombreTabla2}/tiposCampos`),
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/record/${idSeleccionado2}`),
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/record/1`),
    ]
    Promise.all(requests)
      .then((responses) => {
        return Promise.all(responses.map(response => {
          return response.json()
        }))
      })
      .then(([campoTiposResponse, inputsResponse, campoDataResponse]) => {
        setCampoTipos(campoTiposResponse)
        setInputs(inputsResponse)
        setCampoData(campoDataResponse)
  
        setRegistroExitoso(false)
        setRegistroExitoso2(true)
      })
      .catch((error) => {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
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
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value
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
    setRegistroDate(e.target.value)
    const idSeleccionado = e.target.selectedOptions[0].getAttribute('data-id')
    setIdSeleccionado2(idSeleccionado)
  }

  const renderCamposDinamicos = () => {
    const campos = []
    for (const key in campoTipos) {
      if (Object.prototype.hasOwnProperty.call(campoTipos, key)) {
        const campoNombre = key
        const valor = inputs[campoNombre] || ''
        campos.push(
          <div key={campoNombre}>
            <div style={{ marginRight: '5px' }}>
              {campoData[campoNombre.split('_tipo')[0]] || campoNombre}{':'} <span>{valor}</span>
            </div>
          </div>
        )
      }
    }
    return campos
  }
    
  return (
    <div>
      {isModalOpen && (
        <ModalAlert message={modalAMessage} onClose={closeAModal} />
      )}
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Revisar Registro</h2>
            <br />
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
                  <option value=''>Seleccione un examen</option>
                  {examList.map((examen, index) => (
                    <option key={index} value={examen}>
                      {examen}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <br />
                
                Seleccione un paciente:ㅤ
                <input
                  type='text'
                  name='pacOpc'
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select value={pacienteSeleccionado} name='pacSel' onChange={handlePacienteSeleccionado}>
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
          <h2>Revisar Registro</h2>
          <br />
          <div>
            <p>Nombre del examen: {tableName}</p>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            
            <label htmlFor='registroDate'>Seleccione un registro:ㅤ</label>
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
            Continuar
          </button>
        </form>
        <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
        </center>
      )}

      {registroExitoso2 && (
        <center>
        <div>
          <br />
          <h2>Revisar Registro</h2>
          <br />
          <div>
            <p><b>Nombre del Examen: </b>{tableName}</p>
            <p><b>Paciente: </b>{infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <p><b>Información registrada:</b></p>
            {renderCamposDinamicos()}
          </div>
        </div>
        <br />
        <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
        </center>
      )}

    </div>
  )
}

export default RevisarRegistros