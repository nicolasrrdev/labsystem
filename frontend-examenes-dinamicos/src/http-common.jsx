import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085/api',
  headers: {
    'Content-type': 'application/json'
  }
})

export default axiosInstance