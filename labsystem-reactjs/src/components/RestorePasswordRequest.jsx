import { useState } from 'react'

const RestorePasswordRequest = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleRequest()
    }
  }

  const handleRequest = async () => {
    if (!email.trim()) {
      setMessage('Por favor, completa la entrada')
      return
    }
    setIsSubmitting(true)
    setMessage('Enviando...')
    setInputDisabled(true)
    try {
      const response = await fetch(`${BASE_URL}/reset-password/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error en la solicitud:', errorData)
        setMessage(errorData.error || 'Error desconocido')
        setInputDisabled(false)
      } else {
        const data = await response.json()
        console.log('Respuesta del servidor:', data)
        setMessage('Se ha enviado un correo para restaurar la contraseña. Revisa tu correo')
        setInputDisabled(true)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message || 'Error desconocido')
      setMessage(error.message || 'Error al enviar la solicitud')
      setInputDisabled(false)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <center>
      <br /> <h2>Solicitar Restablecimiento de Contraseña</h2>
      <br /> <label>
        Correo Electrónico:ㅤ
        <input 
          type='email' 
          value={email} 
          onChange={handleEmailChange} 
          onKeyDown={handleKeyDown}
          disabled={inputDisabled}
          required
          id='email-input'
        />
      </label>
      <br /> 
      <button 
        onClick={handleRequest} 
        disabled={ isSubmitting || message === 'Se ha enviado un correo para restaurar la contraseña. Revisa tu correo' || message === 'Failed to fetch' }
      >
        Solicitar Restablecimiento
      </button> <br /> <br /> 
      <p>{message}</p>
      </center>
    </div>
  )

}

export default RestorePasswordRequest
