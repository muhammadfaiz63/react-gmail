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

// auth
const authLogin = (data) => api.post(`/auth/login`, data)
const getUser = (data) => api.get(`/users/user`, data)
const getProfile = (data) => api.get(`/users/profile`, data)
const getRoles = (data) => api.get(`/users/role`, data)
const createUser = (data) => api.post(`/users/user/register`, data)
const updateUser = (data) => api.patch(`/users/user/update`, data)
const updateUserProfile = (id,data) => api.put(`/users/user/change/` + id, data)
const deleteUser = (id) => api.delete(`/users/user/` + id)
const deleteTemporaryUser = (id) => api.patch(`/users/user/delete/` + id)

export const apis = {
  authLogin,
  getUser,
  getRoles,
  getProfile,
  createUser,
  updateUser,
  deleteUser,
  updateUserProfile,
  deleteTemporaryUser,
}

export default apis
