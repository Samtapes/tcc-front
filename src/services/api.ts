import axios from 'axios';

const api = axios.create({
  // baseURL:'http://localhost:3333',
  baseURL: 'https://conncare-backend.herokuapp.com',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export default api