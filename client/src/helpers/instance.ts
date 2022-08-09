import axios from 'axios'

export const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://cubicle-backend.herokuapp.com/api'

export const instance = axios.create({ baseURL: SERVER_URL })
