import { useState, useEffect } from 'react'
import axios from 'axios'

const EditarRegistro = () => {
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
  
  useEffect(() => {
    fetch('http://localhost:8085/pacientes')
      .then((response) => response.json())
      .then((data) => {
        setPacientes(data)
        setFilteredPacientes(data)
      })
      .catch((error) => {
        window.alert('Ha ocurrido un error')
        console.error(error)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8085/pacientes/${pacienteSeleccionado}`)
      .then((response) => response.json())
      .then((data) => setInfoPaciente(data))
      .catch((error) => {
        window.alert('Ha ocurrido un error')
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
          window.alert('No hay registros disponibles')
        }
        const jsonData = await response.json()
        setJsonData(jsonData)
      })
      .then((data) => {
        setRegistroExitoso(true)
        setSubmitted(true)
      })
      .catch((error) => {
        window.alert('Ha ocurrido un error')
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
        window.alert('Ha ocurrido un error')
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
          window.alert('Ha ocurrido un error')
          console.error(error)
        })
    }
  }, [nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`http://localhost:8085/api/exam/${nombreTabla2}`)
        .then((response) => response.json())
        .catch((error) => {
          window.alert('Ha ocurrido un error')
          console.error(error)
        })
    }
  }, [nombreTabla2])

  useEffect(() => {
    if (nombreTabla2) {
      fetch(`http://localhost:8085/api/exam/${nombreTabla2}/numFields`)
        .then((response) => response.json())
        .catch((error) => {
          window.alert('Ha ocurrido un error')
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
        window.alert('Ha ocurrido un error')
        console.error(error)
      })
    axios
      .get(`http://localhost:8085/api/exam/${nombreTabla2}/record/${idSeleccionado2}`)
      .then((response) => {
        setInputs(response.data)
      })
      .catch((error) => {
        window.alert('Ha ocurrido un error')
        console.error(error)
      })
    axios
      .get(`http://localhost:8085/api/exam/${nombreTabla2}/record/1`)
      .then((response) => {
        const campoData = response.data
        setCampoData(campoData)
      })
      .catch((error) => {
        window.alert('Ha ocurrido un error')
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

  const handleSubmit3 = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:8085/api/exam/${nombreTabla2}/update/${idSeleccionado2}`, inputs)
      .then((response) => {
        if (response.data.message === 'Registro actualizado con éxito') {
          setRegistroExitoso2(false)
          setRegistroExitoso3(true)
        }
      })
      .catch((error) => {
        window.alert('Ha ocurrido un error')
        console.error(error)
      })
  }

  const renderCamposDinamicos = () => {
    const campos = []
    for (const key in campoTipos) {
      if (campoTipos.hasOwnProperty(key)) {
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

  return (
    <div>

      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Editar Registro</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label>Seleccione un examen:ㅤ</label>
                <select
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
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
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
          <h2>Editar Registro</h2>
          <br />
          <div>
            <p>Registros en: {tableName}</p>
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
          <button type='submit'>
            Actualizar Registro
          </button>
        </form>
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