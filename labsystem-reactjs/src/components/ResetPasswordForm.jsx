import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const ResetPasswordForm = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [inputDisabled, setInputDisabled] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (
      message === 'La contraseña ha sido modificada con éxito' ||
      message === 'El token no es válido' ||
      message === 'El token ha expirado' ||
      message === 'Failed to fetch'
    ) {
      setInputDisabled(true)
    }
  }, [message])
  
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const isPasswordValid = () => {
    let isValid = true
    let errorMessage = ''
    if (newPassword.length < 8) {
      isValid = false
      errorMessage = 'La contraseña debe tener al menos 8 caracteres'
    } else if (!/[a-z]/.test(newPassword)) {
      isValid = false
      errorMessage = 'La contraseña debe contener al menos una letra minúscula'
    } else if (!/[A-Z]/.test(newPassword)) {
      isValid = false
      errorMessage = 'La contraseña debe contener al menos una letra mayúscula'
    }
    setMessage(errorMessage)
    return isValid
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleResetPassword()
    }
  }

  const handleResetPassword = async () => {
    try {
      if (!isPasswordValid()) {
        return
      }
      setMessage('Enviando...')
      setInputDisabled(true)

      const response = await fetch(`${BASE_URL}/reset-password/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      })  
      if (!response.ok) {
        const errorData = await response.json()
        setMessage(errorData.error || 'Error al restablecer la contraseña')
      } else {
        const data = await response.json()
        setMessage(data.message)
      }
    } catch (error) {
      setMessage(error.message || 'Error al restablecer la contraseña')
    } finally {
      setInputDisabled(false)
    }
  }
  
  return (
    <div>
      <center>
        <br />
        <h2>Restablecer Contraseña</h2>
        <br />
        <form>
          <label>
          <input type='text' autoComplete='username' name='username' style={{ display: 'none' }} aria-hidden='true' />
            Nueva Contraseña:ㅤ
            <input
              type='password'
              value={newPassword}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              disabled={inputDisabled}
              autoComplete='new-password'
              id='password-input'
            />
          </label>
          <br />
          <button type='button' onClick={handleResetPassword} disabled={inputDisabled}>
            Restablecer Contraseña
          </button>
        </form>
        <br /> <br />
        {message && <p>{message}</p>}
      </center>
    </div>
  )
  
}

export default ResetPasswordForm
