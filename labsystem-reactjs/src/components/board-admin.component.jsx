import { useState, useEffect } from 'react'
import AuthService from '../services/auth.service'

const BoardAdmin = () => {
  const API_URL_USERS = import.meta.env.VITE_API_URL_USERS
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showChangeRoleButton, setShowChangeRoleButton] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [disableInput, setDisableInput] = useState(false)
  const [hasError, setHasError] = useState(false)

  const currentUser = AuthService.getCurrentUser()

  useEffect(() => {
    if (!hasError) {
      fetch(`${API_URL_USERS}id-email-role`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            const sortedUsers = data.sort((a, b) => a[0] - b[0])
            setUsers(sortedUsers)
            setFilteredUsers(sortedUsers)
          } else {
            console.error('No autorizado')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          setDisableInput(true)
          setHasError(true)
        })
    }
  }, [API_URL_USERS, currentUser, hasError])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter((user) =>
        user[1].toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const selectedUserInfo = filteredUsers.find((user) => user[1] === selectedUser)
    const userId = selectedUserInfo[0]
    const roleId = selectedRole
    setIsSubmitting(true)
    fetch(`${API_URL_USERS}${userId}/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.accessToken}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setSubmitStatus(data)
        setShowChangeRoleButton(true)
        if (data.startsWith('Rol actualizado')) {
          console.log('200 OK:', data)
        } else if (data.startsWith('Usuario o rol no encontrados')) {
          console.log('400 Bad Request:', data)
        } else {
          console.warn('Respuesta inesperada del servidor:', data)
          setSubmitStatus('Error al enviar los datos')
        }
      })
      .catch((error) => console.error('Error en la solicitud PUT:', error))
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleReloadPage = () => {
    window.location.reload()
  }

  return (
    <div>
      <center>
        <br />
        <h2>Bienvenido al Panel de Administrador</h2>
        <h3>Cambiar Rol de usuario</h3>
        <br />
        <form onSubmit={handleFormSubmit}>
          <input
            type='text'
            id='buscarUsuario'
            placeholder='Buscar usuario'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={showChangeRoleButton || disableInput}
          />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            id='seleccionarUsuario'
            disabled={submitStatus !== null || disableInput}
          >
            <option value='' disabled>
              Selecciona un usuario
            </option>
            {filteredUsers.map((user) => (
              <option key={user[0]} value={user[1]}>
                {user[1]}
              </option>
            ))}
          </select>
          <br /> <br />
          <select 
            value={selectedRole} 
            onChange={handleRoleChange} 
            id='seleccionarRol'
            disabled={submitStatus !== null || disableInput}
          >
            <option value='' disabled>
              Seleccionar Rol
            </option>
            <option value='1'>Rol Usuario</option>
            <option value='2'>Rol Evaluador</option>
            <option value='3'>Rol Administrador</option>
          </select>
          <br /> <br />
          <button type='submit' disabled={!selectedUser || !selectedRole || submitStatus !== null || isSubmitting || disableInput}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {submitStatus !== null && (
          <div>
            <p>{submitStatus}</p>
          </div>
        )}
        {showChangeRoleButton && (
          <button onClick={handleReloadPage}>Cambiar otro Rol</button>
        )}
      </center>
    </div>
  )
}

export default BoardAdmin
