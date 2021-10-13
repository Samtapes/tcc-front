import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3333'
  // baseURL: 'https://conncare-backend.herokuapp.com'
})

export default api