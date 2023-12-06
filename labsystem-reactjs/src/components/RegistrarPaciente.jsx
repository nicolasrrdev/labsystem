import { useState } from 'react'
import AuthService from '../services/auth.service'
import ModalAlert from './ModalAlert'

const RegistrarPaciente = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

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

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'CEDULA_DE_CIUDADANIA',
    documento: '',
    fechaNacimiento: '',
    email: '',
    genero: 'MASCULINO'
  })

  const [registroExitoso, setRegistroExitoso] = useState(false)

  const currentUser = AuthService.getCurrentUser()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const errorMessages = {
    'Failed to fetch': 'Error: No se pudo establecer conexión con el servidor.',
    'nombres must not be blank': 'Ingrese un Nombre válido',
    'apellidos must not be blank': 'Ingrese un Apellido válido',
    'email inválido': 'Email inválido'
  }
  const handleSubmit1 = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (!formData.nombres || !formData.apellidos || !formData.documento || !formData.fechaNacimiento || !formData.email) {
      setModalAMessage('Por favor, complete todos los campos')
      setIsModalOpen(true)
      setIsSubmitting(false)
      return
    }
    fetch(`${BASE_URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = await response.json()
          const errorMessage = errorResponse.error
          setModalAMessage(errorMessage)
          setIsModalOpen(true)
          throw new Error(errorMessage)
        }
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

  const handleReload = () => {
    window.location.reload()
  }

  const maxDate = new Date().toISOString().split('T')[0]

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
    <div onKeyDown={handleTabKeyPress}>
      <ModalAlert
        message={modalAMessage}
        isOpen={isModalOpen}
        onClose={closeAModal}
      />
    </div>
    <center> <br />
    <h2>Registrar Paciente</h2> <br />
      <form onSubmit={handleSubmit1}>

        <div>
          Nombres:ㅤ
          <input
            type='text'
            name='nombres'
            value={formData.nombres}
            onChange={handleChange}
            maxLength='50'
            pattern='^[A-Za-zñÑáéíóúÁÉÍÓÚ]{3,}[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$'
            title='Ingrese un nombre válido'
          />
        </div> <br />

        <div>
          Apellidos:ㅤ
          <input
            type='text'
            name='apellidos'
            value={formData.apellidos}
            onChange={handleChange}
            maxLength='50'
            pattern='^[A-Za-zñÑáéíóúÁÉÍÓÚ]{3,}[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$'
            title='Ingrese un apellido válido'
          />
        </div> <br />

        <div>
          Tipo de Documento:ㅤ
          <select name='tipoDocumento' value={formData.tipoDocumento} onChange={handleChange}>
            <option value='CEDULA_DE_CIUDADANIA'>Cédula de Ciudadanía</option>
            <option value='CEDULA_DE_EXTRANJERIA'>Cédula de Extranjería</option>
            <option value='PASAPORTE'>Pasaporte</option>
            <option value='REGISTRO_CIVIL'>Registro Civil</option>
            <option value='TARJETA_DE_IDENTIDAD'>Tarjeta de Identidad</option>
          </select>
        </div> <br />
      
        <div>
          Número de Documento:ㅤ
          <input
            type='number'
            name='documento'
            value={formData.documento}
            onChange={handleChange}
            min='0'
            max='2147483647'
            step='1'
          />
        </div> <br />

        <div>
          Correo electrónico:ㅤ
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            autoComplete='email'
          />
        </div> <br />

        <div>
          Fecha de nacimiento:ㅤ
          <input
            type='date'
            name='fechaNacimiento'
            value={formData.fechaNacimiento}
            onChange={handleChange}
            min='1900-01-01'
            max={maxDate}
          />
        </div> <br />

        <div>
          Género:ㅤ
          <select name='genero' value={formData.genero} onChange={handleChange}>
            <option value='MASCULINO'>Masculino</option>
            <option value='FEMENINO'>Femenino</option>
            <option value='OTRO'>Otro</option>
          </select>
        </div>

        <br />
        
        <button type='submit' disabled={isSubmitting}>Enviar</button> <br /> <br />
      </form>
    </center>
    </div>
  )
}

export default RegistrarPaciente
