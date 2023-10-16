import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const EditarRegistro = () => {
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
  const [registroExitoso3, setRegistroExitoso3] = useState(false)

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
          if (response.status === 404) {
            throw new Error('Hubo en error al obtener este registro')
          }
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
        if (error.message === 'Hubo en error al obtener este registro') {
          setModalAMessage('Hubo en error al obtener este registro');
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.');
        }
        setIsModalOpen(true);
        console.error(error);
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
        if (campoTipos[key] !== undefined) {
        const tipo = campoTipos[key]
        const campoNombre = key
        const valor = inputs[campoNombre] || ''
        let inputComponent
        if (tipo === 'character varying') {
          inputComponent = (
            <input
              type='text'
              id={campoNombre}
              name={campoNombre}
              value={valor}
              onChange={handleInputChange}
              maxLength = {255}
            />
          )
        } else if (tipo === 'numeric') {
          inputComponent = (
            <input
              type='number'
              id={campoNombre}
              name={campoNombre}
              value={valor}
              onChange={handleInputChange}
              min = {-999999999}
              max = {999999999}
            />
          )
        }
        campos.push(
          <div key={campoNombre} >
            <label htmlFor={campoNombre} style={{ marginRight: '15px' }}>
              {campoData[campoNombre.split('_tipo')[0]] || campoNombre}
            </label>
            {inputComponent}
          </div>
        )        
      }
    }
    return campos
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }

  const handleSubmit3 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/exam/${nombreTabla2}/update/${idSeleccionado2}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Hubo un error al enviar los datos')
        }
        setRegistroExitoso2(false)
        setRegistroExitoso3(true)
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

  return (
    <div>
    {isModalOpen && (
      <ModalAlert message={modalAMessage} onClose={closeAModal} />
    )}
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Editar Registro</h2>
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
                  name='buscarPaciente'
                  type='text'
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select name='seleccionePaciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
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
          <h2>Editar Registro</h2>
          <br />
          <div>
            <p>Registros en: {tableName}</p>
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
        <form onSubmit={handleSubmit3}>
        <div>
          <br />
          <h2>Editar Registro</h2>
          <br />
          <div>
            <p>Registros en: {tableName}</p>
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            {renderCamposDinamicos()}
          </div>
        </div>
        <br />
        <button type='submit' disabled={isButtonDisabled2 || isSubmitting}>
            Editar Registro
          </button>
        </form>
        <br /> <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
        </center>
      )}

      {registroExitoso3 && (
          <center>
            <div>
              <br />
              <h3>Registro actualizado con éxito.</h3>
              <br />
              <button onClick={handleReloadPage}>Realizar un nuevo registro</button>
            </div>
          </center>
        )}

    </div>
  )
}

export default EditarRegistro