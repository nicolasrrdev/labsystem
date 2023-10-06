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
      return 'This is not a valid email'
    }
    return null
  }

  const usernameValidation = (value) => {
    if (value.length < 3 || value.length > 20) {
      return 'The username must be between 3 and 20 characters'
    }
    return null
  }

  const passwordValidation = (value) => {
    if (value.length < 6 || value.length > 40) {
      return 'The password must be between 6 and 40 characters'
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
        setMessage(response.data.message)
        setSuccessful(true)
      })
      .catch((error) => {
        const resMessage = error.response?.data?.message || error.message || error.toString()
        setSuccessful(false)
        setMessage(resMessage)
      })
  }

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <img src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' alt='profile-img' className='profile-img-card' />

        <form onSubmit={handleRegister}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='username'
            />
            {isSubmitted && usernameValidation(username) && (
              <div className='alert alert-danger'>{usernameValidation(username)}</div>
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
              autoComplete='email'
            />
            {isSubmitted && emailValidation(email) && <div className='alert alert-danger'>{emailValidation(email)}</div>}
          </div>

          <div className='form-group' style={{ marginBottom: '20px' }}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSubmitted && passwordValidation(password) && (
              <div className='alert alert-danger'>{passwordValidation(password)}</div>
            )}
          </div>

          <div className='form-group' style={{ marginBottom: '20px' }}>
            <button type='submit' className='btn btn-primary btn-block'>
              Sign Up
            </button>
          </div>
        </form>

        {message && (
          <div className='form-group'>
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role='alert'>
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register