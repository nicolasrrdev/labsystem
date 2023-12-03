import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const RevisarPaciente = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [infoPaciente, setInfoPaciente] = useState([])
  const [fechaFormateada, setFechaFormateada] = useState('')

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
      .then((data) => {
        setInfoPaciente(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [BASE_URL, pacienteSeleccionado])

  const handlePacienteSeleccionado = (e) => {
    setPacienteSeleccionado(e.target.value)
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    fetch(`${BASE_URL}/pacientes`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Cannot read properties of undefined (reading 'split')")
        }
        const partesFecha = infoPaciente.fechaNacimiento.split('-')
        const fechaFormateada2 = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
        setFechaFormateada(fechaFormateada2)
        setSubmitted(true)
      })
      .catch((error) => {
        if (error.message === "Cannot read properties of undefined (reading 'split')") {
          setModalAMessage('Hubo en error al obtener la información de este paciente')
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
  
  return (
    <div>
      {!submitted && (
        <center>
          <div>
            <br />
            <h2>Revisar Paciente</h2><br />
            <div onKeyDown={handleTabKeyPress}>
              <ModalAlert
                message={modalAMessage}
                isOpen={isModalOpen}
                onClose={closeAModal}
              />
            </div>
            <form onSubmit={handleSubmit1}>
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
              <button type='submit' disabled={isButtonDisabled || isSubmitting}>
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
              <div className='infoPacient'>
                <p>Nombres: {infoPaciente.nombres}</p>
                <p>Apellidos: {infoPaciente.apellidos}</p>
                <p>Tipo de documento: {mapaTipoDocumento[infoPaciente.tipoDocumento]}</p>
                <p>Documento: {infoPaciente.documento}</p>
                <p>Fecha de nacimiento: {fechaFormateada}</p>
                <p>Edad: {edad}</p>
                <p>Email: {infoPaciente.email}</p>
                <p>Género: {mapaGenero[infoPaciente.genero]}</p> 
              </div>
              <br />
            <button className='btnVolv' onClick={handleReload}>Volver</button> <br /> <br />
          </center>
        </div>
      )}
    </div>
  )
}

export default RevisarPaciente
