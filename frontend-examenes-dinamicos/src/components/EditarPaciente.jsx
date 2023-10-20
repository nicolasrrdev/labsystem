import { useState, useEffect } from 'react'
import ModalAlert from './ModalAlert'

const EditarPacientes = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('')

  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')
  const [documento, setDocumento] = useState('')
  const [email, setEmail] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')  
  const [genero, setGenero] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [registroExitoso, setRegistroExitoso] = useState(false)

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
      .then((data) => {
        setNombres(data.nombres)
        setApellidos(data.apellidos)
        setTipoDocumento(data.tipoDocumento)
        setDocumento(data.documento)
        setEmail(data.email)
        setFechaNacimiento(data.fechaNacimiento)
        setGenero(data.genero)
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
    setSubmitted(true)
    pacientes.find(
      (paciente) => paciente.id === parseInt(pacienteSeleccionado)
    )
  }

  const isButtonDisabled = pacienteSeleccionado === ''

  const handleReload = () => {
    window.location.reload()
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

  const errorMessages = {
    'Failed to fetch': 'Error: No se pudo establecer conexión con el servidor.',
    'nombres must not be blank': 'Ingrese un Nombre válido',
    'apellidos must not be blank': 'Ingrese un Apellido válido',
    'email inválido': 'Email inválido'
  }
  const handleSubmit2 = (e) => {
    e.preventDefault()
    const updatedData = {
      nombres: nombres,
      apellidos: apellidos,
      tipoDocumento: tipoDocumento,
      documento: documento,
      email: email,
      fechaNacimiento: fechaNacimiento,
      genero: genero
    }
    setIsSubmitting(true)
    if (!updatedData.nombres || !updatedData.apellidos || !updatedData.documento || !updatedData.fechaNacimiento || !updatedData.email) {
      setModalAMessage('Por favor, complete todos los campos')
      setIsModalOpen(true)
      setIsSubmitting(false)
      return
    }
    fetch(`${BASE_URL}/pacientes/${pacienteSeleccionado}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = await response.json()
          const errorMessage = errorResponse.error
          setModalAMessage(errorMessage)
          setIsModalOpen(true)
          throw new Error(errorMessage)
        }
        return response.text()
      })
      .then(() => {
        setRegistroExitoso(true)
      })
      .catch((error) => {
        const errorMessage = errorMessages[error.message] || error.message
        setModalAMessage(errorMessage)
        setIsModalOpen(true)
        console.error('Error: ', error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const maxDate = new Date().toISOString().split('T')[0]

  if (registroExitoso) {
    return (
      <div>
        <center>
          <br />
          <h2>Paciente editado con éxito.</h2>
          <br />
          <button onClick={handleReload}>Editar Registro de otro Paciente</button>
        </center>
      </div>
    )
  }

  return (
    <div>
      {isModalOpen && (
        <ModalAlert message={modalAMessage} onClose={closeAModal} />
      )}
      <center>
      {!submitted && (
          <div>
            <br />
            <h2>Editar Paciente</h2> <br />
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
              <button type='submit' disabled={isButtonDisabled}>
                Continuar
              </button>
            </form>
          </div>
      )}
      </center>
      {submitted && (
        <div>
          <center> 
          <br />
          <h2>Editar Paciente</h2> <br />
          <form onSubmit={handleSubmit2}>
            Nombres:ㅤ
            <input
              type='text'
              name='nombres'
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              maxLength='50'
              pattern='^[A-Za-zñÑáéíóúÁÉÍÓÚ]{3,}[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$'
              title='Ingrese un nombre válido'
            /> <br /> <br />
            Apellidos:ㅤ
            <input
              type='text'
              name='apellidos'
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              maxLength='50'
              pattern='^[A-Za-zñÑáéíóúÁÉÍÓÚ]{3,}[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$'
              title='Ingrese un apellido válido'
            /> <br /> <br />
            Tipo de Documento:ㅤ
            <select
            name='tipoDocumento'
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}>
              <option value='CEDULA_DE_CIUDADANIA'>Cédula de Ciudadanía</option>
              <option value='CEDULA_DE_EXTRANJERIA'>Cédula de Extranjería</option>
              <option value='PASAPORTE'>Pasaporte</option>
              <option value='REGISTRO_CIVIL'>Registro Civil</option>
              <option value='TARJETA_DE_IDENTIDAD'>Tarjeta de Identidad</option>
            </select>  <br /> <br />
            Número de Documento:ㅤ
            <input
              type='number'
              name='documento'
              value={documento}
              min='0'
              max='2147483647'
              step='1'
              onChange={(e) => setDocumento(e.target.value)}
            /> <br /> <br />
            Correo electrónico:ㅤ
            <input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size='30'
              autoComplete='email'
            /> <br /> <br />
            Fecha de nacimiento:ㅤ
            <input
              type='date'
              name='fechaNacimiento'
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              min='1900-01-01'
              max={maxDate}
            /> <br /> <br />
            Género:ㅤ
            <select
            name='genero'
            value={genero} 
            onChange={(e) => setGenero(e.target.value)}>
              <option value='MASCULINO'>Masculino</option>
              <option value='FEMENINO'>Femenino</option>
              <option value='OTRO'>Otro</option>
            </select> <br /> <br />
            <button type='submit' disabled={isSubmitting}>Enviar</button>
          </form>
          <br /> <button className='btnVolv' onClick={handleReload}>Volver</button> <br /> <br />
          </center>
        </div>
      )}
    </div>
  )
}

export default EditarPacientes