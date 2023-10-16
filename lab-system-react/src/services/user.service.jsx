const API_URL_TEST = import.meta.env.VITE_API_URL_TEST
import authHeader from './auth-header'

class UserService {
  getPublicContent() {
    return fetch(`${API_URL_TEST}all`)
  }

  getUserBoard() {
    return fetch(`${API_URL_TEST}user`, { headers: authHeader() })
  }

  getModeratorBoard() {
    return fetch(`${API_URL_TEST}mod`, { headers: authHeader() })
  }

  getAdminBoard() {
    return fetch(`${API_URL_TEST}admin`, { headers: authHeader() })
  }
}

export default new UserService()