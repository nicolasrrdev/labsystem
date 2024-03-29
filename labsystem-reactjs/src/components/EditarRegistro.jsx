import { useEffect, useRef, useState } from 'react'
import AuthService from '../services/auth.service'
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

  const [fechaFormateada, setFechaFormateada] = useState('')
  const [titlesArray, setTitlesArray] = useState([])
  const [inputsArray, setInputsArray] = useState([])

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
        const partesFecha = infoPaciente.fechaNacimiento.split('-')
        const fechaFormateada2 = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
        setFechaFormateada(fechaFormateada2)
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
    const requests = [
      fetch(`${BASE_URL}/api/examen/${nombreTabla2}/tiposCampos`, {
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      }),
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/record/${idSeleccionado2}`, {
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      }),
      fetch(`${BASE_URL}/api/exam/${nombreTabla2}/record/1`, {
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      }),
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
        const titlesArray2 = Object.keys(campoDataResponse)
          .filter(key => key.startsWith('campo') && !key.endsWith('_tipo'))
          .map(key => campoDataResponse[key])
        setTitlesArray(titlesArray2)
        const inputsArray2 = Object.keys(inputsResponse)
          .filter(key => key.endsWith('_tipo'))
          .map(key => inputsResponse[key])
        setInputsArray(inputsArray2)
      })
      .catch((error) => {
        if (error.message === 'Hubo en error al obtener este registro') {
          setModalAMessage('Hubo en error al obtener este registro')
        } else {
          setModalAMessage('Error: No se pudo establecer conexión con el servidor.')
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
            />
          )
        } else if (tipo === 'date') {
          inputComponent = (
            <input
              type='date'
              id={campoNombre}
              name={campoNombre}
              value={valor}
              onChange={handleInputChange}
              min='1900-01-01'
            />
          )
        } else if (tipo === 'integer') {
          inputComponent = (
            <input
              type='number'
              id={campoNombre}
              name={campoNombre}
              value={valor}
              onChange={handleInputChange}
              min={0}
              step={1}
              max={999999999}
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
    const camposVacios = Object.values(inputs).some((valor) => valor === '')
    if (camposVacios) {
      setModalAMessage('Por favor, completa todos los campos antes de enviar el formulario')
      setIsModalOpen(true)
      return
    }
    setIsSubmitting(true)
    fetch(`${BASE_URL}/api/exam/${nombreTabla2}/update/${idSeleccionado2}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
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

  const mapaTipoDocumento = {
    CEDULA_DE_CIUDADANIA: 'Cédula de Ciudadanía',
    CEDULA_DE_EXTRANJERIA: 'Cédula de Extranjeria',
    PASAPORTE: 'Pasaporte',
    REGISTRO_CIVIL: 'Registro Civil',
    TARJETA_DE_IDENTIDAD: 'Tarjeta de Identidad'
  }
  const mapaGenero = {
    MASCULINO: 'Masculino',
    FEMENINO: 'Femenino',
    OTRO: 'Otro',
  }

  const fechaNacimiento = new Date(infoPaciente.fechaNacimiento)
  const fechaActual = new Date()
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }

  const downloadCSV = () => {
    const pacienteInfo = `${infoPaciente.nombres + ' ' + infoPaciente.apellidos};${mapaTipoDocumento[infoPaciente.tipoDocumento]};${infoPaciente.documento};${fechaFormateada};${edad};${infoPaciente.email};${mapaGenero[infoPaciente.genero]};`
    const csvContent = `Nombre;Tipo Documento;Documento;Fecha de nacimiento;Edad;Email;Género;${titlesArray.join(';')}\n${pacienteInfo}${inputsArray.join(';')};`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'datos.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
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
            <h2>Editar Registro</h2>
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
          <h2>Editar Registro</h2>
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
            <div>
              <p>Registros en: {tableName}</p>
              <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
              {renderCamposDinamicos()}
            </div>
          </div>
          <br /> <button type='submit' disabled={isButtonDisabled2 || isSubmitting}>
            Editar Registro
          </button>
        </form>
        <h6>{`*Para una correcta visualización de los datos en Excel: Data -> Get Data -> From File -> From Text/CSV -> Abrir el archivo File Origin: UTF-8 Delimiter: Semicolon -> Load`}</h6>
        <button className='downloadData' onClick={downloadCSV}>Descargar Datos</button> <br /> <br />
        <button className='btnVolv' onClick={handleReloadPage}>Volver</button> <br /> <br />
        </center>
      )}
      {registroExitoso3 && (
          <center>
            <div>
              <br />
              <h3>Registro actualizado con éxito.</h3>
              <br />
              <button onClick={handleReloadPage}>Editar otro registro</button>
            </div>
          </center>
      )}
    </div>
  )
}

export default EditarRegistro
