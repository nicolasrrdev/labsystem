import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const RealizarRegistro = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [tableName, setTableName] = useState('')
  const [examList, setExamList] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [nombreTabla, setNombreTabla] = useState('')
  const [nombreTabla2, setNombreTabla2] = useState('')
  const [tiposCampos, setTiposCampos] = useState('')
  const [nombreCampos, setNombreCampos] = useState('')
  const [numeroCampos, setNumeroCampos] = useState('')
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])

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
    fetch(`${BASE_URL}/pacientes`)
      .then((response) => {
        if (response.ok) {
          setSubmitted(true)
        }})
      .catch((error) => {
        setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
        setIsModalOpen(true)
        console.error('Fetch error:', error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const isButtonDisabled = pacienteSeleccionado === ''

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
        .then((data) => setTiposCampos(data))
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}`)
        .then((response) => response.json())
        .then((data) => setNombreCampos(data))
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/numFields`)
        .then((response) => response.json())
        .then((data) => setNumeroCampos(data))
        .catch((error) => {
          console.error(error)
        })
    }
  }, [BASE_URL, nombreTabla2])

  const handleSubmit2 = (e) => {
    e.preventDefault()
    const isEmptyInput = Object.values(e.target.elements).some((element) => {
      return element.tagName === 'INPUT' && element.value.trim() === ''
    })
    setIsSubmitting(true)
    if (isEmptyInput) {
      setModalAMessage('Por favor, complete todos los campos')
      setIsModalOpen(true)
      setIsSubmitting(false)
      return
    }
    const dataToSend = {
      paciente_id: infoPaciente.id,
    }
    Array.from({ length: Object.values(numeroCampos)[0] }).map((_, index) => {
      const campo = `campo${index + 1}`
      const campoTipo = `${campo}_tipo`
      const inputType = tiposCampos[campoTipo]
      const inputValue = e.target.elements[campo].value
      dataToSend[campoTipo] = inputType === 'character varying' ? inputValue : parseFloat(inputValue)
    })
    fetch(`${BASE_URL}/api/insertData/${nombreTabla2}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al enviar los datos')
        }
        setRegistroExitoso(true)
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

  return (
    <div>
      {isModalOpen && (
        <ModalAlert message={modalAMessage} onClose={closeAModal} />
      )}
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Realizar Registro</h2>
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
      {submitted && !registroExitoso && (
        <center>
          <div>
            <br />
            <h2>Realizar Registro</h2>
            <br />
            <p>Examen seleccionado: {tableName}</p>
            <p>Paciente seleccionado: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <form  onSubmit={handleSubmit2}>

              {Array.from({ length: Object.values(numeroCampos)[0] }, (_, index) => {
                const campo = `campo${index + 1}`
                const campoTipo = `${campo}_tipo`
                const inputType = tiposCampos[campoTipo] === 'character varying' ? 'text' : 'number'
                let maxLength = null
                let min = null
                let max = null

                if (inputType === 'text') {
                  maxLength = 255
                } else if (inputType === 'number') {
                  min = -999999999
                  max = 999999999
                }
            
                return (
                  <div key={campo}>
                    <label htmlFor={campo}>{nombreCampos[campo]}:ㅤ</label>
                    <input
                      type={inputType}
                      id={campo}
                      name={campo}
                      step='any'
                      maxLength={maxLength}
                      min={min}
                      max={max}
                    />
                  </div>
                )
              })} <br />
              <button type='submit' disabled={isSubmitting || isSubmitting}>Enviar</button>
              
            </form>
            <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
          </div>
        </center>
      )}
        {registroExitoso && (
          <center>
            <div>
              <br />
              <h3>Registro realizado con éxito.</h3>
              <br />
              <button onClick={handleReloadPage}>Realizar un nuevo registro</button>
            </div>
          </center>
        )}
    </div>
  )
}

export default RealizarRegistro