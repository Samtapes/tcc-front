import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV ? 'http://localhost:3333' : 'https://conncare-backend.herokuapp.com'
})

export default api