import { useState } from 'react'
import { isEmail } from 'validator'
import AuthService from '../services/auth.service'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const emailValidation = (value) => {
    if (!isEmail(value)) {
      return 'Este no es un email válido'
    }
    return null
  }

  const usernameValidation = (value) => {
    if (value.length < 3 || value.length > 20) {
      return 'El nombre de usuario debe ser entre 3 y 20 caracteres'
    }
    if (/\s/.test(value)) {
      return 'El nombre de usuario no puede contener espacios'
    }
    return null
  }

  const passwordValidation = (value) => {
    if (value.length < 8) {
      return 'La contraseña debe ser de la menos 8 caracteres'
    }
    const lowercaseRegex = /[a-z]/
    if (!lowercaseRegex.test(value)) {
      return 'La contraseña de contener por lo menos una minúscula'
    }
    const uppercaseRegex = /[A-Z]/
    if (!uppercaseRegex.test(value)) {
      return 'La contraseña debe contener al menos una mayúscula'
    }
    return null
  }
  
  const handleRegister = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setMessage('')
    setSuccessful(false)
    const usernameError = usernameValidation(username)
    const emailError = emailValidation(email)
    const passwordError = passwordValidation(password)
    if (usernameError || emailError || passwordError) {
      return
    }
    AuthService.register(username, email, password)
    .then((response) => {
      if (response.status === 200) {
        setSuccessful(true)
        setMessage(response.message)
      } if (response.message === 'Registro realizado con éxito. Ya puedes iniciar sesión') {
        setSuccessful(true)
        setMessage(response.message)
      } else {
        setSuccessful(false)
        setMessage(response.message)
      }
    })
    .catch(() => {
      setSuccessful(false)
      setMessage('No se pudo establecer conexión con el servidor')
    })
  }

  return (
    <div>
      <div className='card card-container'>
        <img src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' alt='profile-img' className='profile-img-card' />

        <form onSubmit={handleRegister}>
          <center>
          <div className='form-group'>
            <label htmlFor='username'>Nombre de usuario</label>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='off'
            />
            {isSubmitted && usernameValidation(username) && (
              <div>{usernameValidation(username)}</div>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
            />
            {isSubmitted && emailValidation(email) && <div>{emailValidation(email)}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '20px' }}>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
            />
            {isSubmitted && passwordValidation(password) && (
              <div>{passwordValidation(password)}</div>
            )}
          </div>

          <div className='form-group' style={{ marginBottom: '20px' }}>
            <button type='submit'>
              Registrarse
            </button>
          </div>
          </center>
        </form>
        {message && (
          <div className='form-group'>
            <div>
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
