import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    AuthService.login(username, password)
      .then(() => {
        navigate('/profile')
        window.location.reload()
      })
      .catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      })
  }

  return (

    <div className='col-md-12'>
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete='username'
            />
          </div>

          <div className='form-group' style={{ marginBottom: '20px' }}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && (
                <div className='alert alert-danger' role='alert'>
                  {message}
                </div>
              )}
          <div className='form-group'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
              )}
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  )

}

export default Login