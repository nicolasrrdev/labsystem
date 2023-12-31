const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH

class AuthService {
  login(username, password) {
    return fetch(`${API_URL_AUTH}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Credenciales inválidas')
        }
        return response.json()
      })
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem('user', JSON.stringify(data))
        }
        return data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(username, email, password) {
    return fetch(`${API_URL_AUTH}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
    .then(response => {
      return response.json()
    })
  }  

  getCurrentUser() {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) {
        return null
      }
      const user = JSON.parse(userData)
      return user
    } catch (error) {
      console.error('Wrong JSON format')
      return null
    }
  }
}

export default new AuthService()
