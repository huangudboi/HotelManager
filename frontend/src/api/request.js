import axios from 'axios'
import { setup, checkToken } from './interceptor'

const request = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}:8080/${import.meta.env.VITE_APP_API_VERSION}/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  config:{}
})

setup(request)
checkToken(request)

export default request
