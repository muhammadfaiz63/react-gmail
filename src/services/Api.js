import axios from 'axios'
import { StaticVar } from '../config/index'

// ===> api create
const api = axios.create({
  baseURL: StaticVar.API_SERVICES,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // json: true
})

api.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    config.headers.authtoken = await localStorage?.authtoken

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(undefined, (err) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const status = err.response?.status || 500
  // we can handle global errors here
  switch (status) {
    // authentication (token related issues)
    case 401: {
      break
    }

    // forbidden (permission related issues)
    case 403: {
      break
    }

    // bad request
    case 400: {
      break
    }

    // not found
    case 404: {
      break
    }

    // conflict
    case 409: {
      break
    }

    // unprocessable
    case 422: {
      break
    }

    case 502: {
      break
    }

    default: {
      break
    }
  }

  return Promise.reject(err)
})

// ===> api list function request

// registration
const getRegistration = (data) => api.get(`/registration`, data)

export const apis = {
  getRegistration,
}

export default apis
