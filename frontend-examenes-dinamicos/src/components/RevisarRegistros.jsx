import { useState, useEffect } from 'react'
import axios from 'axios'
import ModalAlert from './ModalAlert'

const RevisarRegistros = () => {
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
    fetch('http://localhost:8085/pacientes')
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
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8085/pacientes/${pacienteSeleccionado}`)
      .then((response) => response.json())
      .then((data) => setInfoPaciente(data))
      .catch((error) => {
        console.error(error)
      })
  }, [pacienteSeleccionado])

  const handlePacienteSeleccionado = (event) => {
    setPacienteSeleccionado(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8085/api/exam/${nombreTabla2}/paciente/${pacienteSeleccionado}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          await response.json()
          setModalAMessage('No hay registros disponibles')
          setIsModalOpen(true)
        }
        const jsonData = await response.json()
        setJsonData(jsonData)
      })
      .then(() => {
        setRegistroExitoso(true)
        setSubmitted(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const isButtonDisabled = pacienteSeleccionado === ''
  const isButtonDisabled2 = registroDate === ''

  useEffect(() => {
    axios
      .get('http://localhost:8085/api/examen/nombreExamen')
      .then((response) => {
        setExamList(response.data.nombres_examenes)
        setNombreTabla(response.data.nombres_tablas)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleExamSelection = (e) => {
    const selectedIndex = e.target.selectedIndex
    setTableName(e.target.value)
    setNombreTabla2(nombreTabla[selectedIndex - 1])
  }

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`http://localhost:8085/api/examen/${nombreTabla2}/tiposCampos`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`http://localhost:8085/api/exam/${nombreTabla2}`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`http://localhost:8085/api/exam/${nombreTabla2}/numFields`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        })
    }
  }, [nombreTabla2])

  const handleSubmit2 = (e) => {
    e.preventDefault()
    axios
      .get(`http://localhost:8085/api/examen/${nombreTabla2}/tiposCampos`)
      .then((response) => {
        setCampoTipos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get(`http://localhost:8085/api/exam/${nombreTabla2}/record/${idSeleccionado2}`)
      .then((response) => {
        setInputs(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get(`http://localhost:8085/api/exam/${nombreTabla2}/record/1`)
      .then((response) => {
        const campoData = response.data
        setCampoData(campoData)
      })
      .catch((error) => {
        console.error(error)
      })
    setRegistroExitoso2(true)
    setRegistroExitoso(false)
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
            <label htmlFor={campoNombre} style={{ marginRight: '5px' }}>
              {campoData[campoNombre.split('_tipo')[0]] || campoNombre}{':'}
            </label>
            <span>{valor}</span>
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
            <h2>Revisar Registros</h2>
            <br />
            <form onSubmit={handleSubmit}>
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
              <button type='submit' disabled={isButtonDisabled}>
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
          <h2>Revisar Registros</h2>
          <br />
          <div>
            <p>Nombre del examen: {tableName}</p>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            
            <label>Seleccione un registro:ㅤ</label>
            <select
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
              .map((seleccion, index) => (
                <option key={index} value={seleccion.fecha_registro} data-id={seleccion.id}>
                  {new Date(seleccion.fecha_registro).toLocaleString('es-ES')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
          <button type='submit' disabled={isButtonDisabled2}>
            Continuar
          </button>
        </form>
        <br /> <button onClick={handleReloadPage}>Volver</button>
        </center>
      )}

      {registroExitoso2 && (
        <center>
        <div>
          <br />
          <h2>Revisar Registros</h2>
          <br />
          <div>
            <p>Registros en: {tableName}</p>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            {renderCamposDinamicos()}
          </div>
        </div>
        <br />
        <button onClick={handleReloadPage}>Volver</button>
        </center>
      )}

    </div>
  )
}

export default RevisarRegistros