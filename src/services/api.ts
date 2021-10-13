import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PUBLIC_URL ? 'https://conncare-backend.herokuapp.com' : 'http://localhost:3333'
})

export default api