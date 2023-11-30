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
        let resMessage = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        if (resMessage === 'Failed to fetch') {
          resMessage = 'No se pudo establecer conexión con el servidor.'
        }
        setLoading(false)
        setMessage(resMessage)
      })
  }

  return (

    <div>
      <div className='card card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />
        <form onSubmit={handleLogin}>
          <center>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className='form-control'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete='off'
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
              autoComplete='off'
            />
          </div>
              {message && (
              <div>
               {/* <div style={{ color: 'red' }}> */}
                {message} <br /> <br />
              </div>
              )}
          <div className='form-group'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {loading && (
                <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
              )}
              <span>Ingresar</span>
            </button>
          </div>
          </center>
        </form>
      </div>
    </div>

  )

}

export default Login