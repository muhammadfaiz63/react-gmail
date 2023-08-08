import React, { useState, createContext, useCallback } from 'react'
import { googleLogout } from '@react-oauth/google';
import api from '../services/Auth'

export const AuthContext = createContext({})

export default function AuthProvider(props) {
  const [authenticated, setAuthenticated] = useState(localStorage.authtoken)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const checkAuth = (resdata) =>{
    if (resdata !== null) {
      localStorage.setItem('authtoken', resdata?.user?.token)
      localStorage.setItem('profile', JSON.stringify(resdata))
      localStorage.setItem('user', JSON.stringify(resdata.user))
      setAuthenticated(true)
      setLoading(false)
      window.location.reload()
    } else {
      setAuthenticated(false)
      setLoading(false)
    }
  }

  const signIn = useCallback(async (values) => {
    // try {
    setLoading(true)
    api
      .authLogin(values)
      .then((res) => {
        let resdata = res.data?.data
        checkAuth(resdata)
      })
      .catch((error) => {
        let response = error?.response?.data?.message
        setErrorMsg(response)
        setAuthenticated(false)
        setLoading(false)
      })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('authtoken')
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
    googleLogout();
    window.location.reload()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, logout, authenticated, loading, errorMsg,checkAuth }}
      {...props}
    />
  )
}
