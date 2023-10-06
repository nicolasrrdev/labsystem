import { useState, useEffect } from 'react'
import ModalAlert from "./ModalAlert"

const ListarPacientes = () => {
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAMessage, setModalAMessage] = useState('')
  const closeAModal = () => {
    setIsModalOpen(false)
  }

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
    setSubmitted(true)
  }

  const isButtonDisabled = pacienteSeleccionado === ''

  const handleReload = () => {
    window.location.reload()
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
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Listar Pacientes</h2><br />
            {isModalOpen && (
              <ModalAlert message={modalAMessage} onClose={closeAModal} />
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='searchInput'
                  placeholder='Buscar paciente'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <select name='paciente' value={pacienteSeleccionado} onChange={handlePacienteSeleccionado}>
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
        <div>
          <center>
            <br />
            <h2>Información del Paciente</h2>
            <br />
              <div>
                <p>Nombres: {infoPaciente.nombres}</p>
                <p>Apellidos: {infoPaciente.apellidos}</p>
                <p>Tipo de documento: {infoPaciente.tipoDocumento}</p>
                <p>Número del documento: {infoPaciente.documento}</p>
                <p>Fecha de nacimiento: {infoPaciente.fechaNacimiento}</p>
                <p>Edad: {edad}</p>
                <p>Email: {infoPaciente.email}</p>
                <p>Género: {infoPaciente.genero}</p>
              </div>
            <br />
            <button onClick={handleReload}>Volver</button>
          </center>
        </div>
      )}
    </div>
  )
}

export default ListarPacientes