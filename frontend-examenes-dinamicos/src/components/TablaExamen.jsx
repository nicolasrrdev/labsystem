import { useState, useEffect } from 'react'
import '../styles/TablaExamen.css'
import axios from 'axios'

const TablaExamen = () => {

  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [registroExitoso, setRegistroExitoso] = useState(false)

  const titlesArray = [
    'FCRST Recuerdo libre ensayo 1',
    'FCRST Recuerdo facilitado ensayo 1',
    'FCRST Recuerdo libre ensayo 2'
  ]

  const defaultInputValues = titlesArray.reduce((acc, title, index) => {
    acc[`campo${index + 1}`] = ''
    return acc
  }, {})

  const [inputValues, setInputValues] = useState(defaultInputValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const enviarDatos = () => {
    const dataArray = Object.values(inputValues)
    axios
    .post(`http://localhost:8085/api/tabla-examen/insertar/${pacienteSeleccionado}`, dataArray)
    .then((response) => {
      // console.log(response.data)
      setRegistroExitoso(true)
    })
    .catch((error) => {
      window.alert('Ha ocurrido un error')
      console.error(error)
    })
  }

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
    setSubmitted(true)
  }

  const isButtonDisabled = pacienteSeleccionado === ''

  const handleReload = () => {
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

  if (registroExitoso) {
    return (
      <div>
        <center>
          <br />
          <h2>Registro realizado con éxito</h2>
          <br />
          <button onClick={handleReload}>Realizar un Nuevo Registro</button>
        </center>
      </div>
    )
  }

  return (
    <div>
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Tabla Examen</h2><br />
            <form onSubmit={handleSubmit}>
              <div>
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
      {submitted && (
        <center>
          <div>
            <h5>Estudio de un marcador cognitivo preclínico para la detección temprana de la Enfermedad Alzheimer en adultos mayores del sur colombiano Huila, Caquetá BPIN: 20200001000011 RESUMEN DE LOS PUNTAJES DE LAS PRUEBAS</h5>
            {/* <p>Nombre: ____________________ Fecha de evaluación: ______</p> */}
            <p>Paciente: {infoPaciente.nombres + ' ' + infoPaciente.apellidos}</p>
            <table>
              <tbody>
                {titlesArray.map((title, index) => (
                  <tr key={index}>
                    <td dangerouslySetInnerHTML={{ __html: title }}></td>
                    <td>
                      <input
                        type='text'
                        className='input-no-borders'
                        name={`campo${index + 1}`}
                        value={inputValues[`campo${index + 1}`]}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            < br /> <button onClick={enviarDatos}>Enviar Datos</button>
          </div>
        </center>
      )}

    </div>
  )
}

export default TablaExamen
//&nbsp