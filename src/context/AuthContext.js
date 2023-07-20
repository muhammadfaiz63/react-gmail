import React, { useState, createContext, useCallback } from 'react'

import api from '../services/Auth'

export const AuthContext = createContext({})

export default function AuthProvider(props) {
  const [authenticated, setAuthenticated] = useState(localStorage.authtoken)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const signIn = useCallback(async (values) => {
    // try {
    setLoading(true)
    api
      .authLogin(values)
      .then((res) => {
        let resdata = res.data?.data
        console.log(resdata)
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
    window.location.reload()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, logout, authenticated, loading, errorMsg }}
      {...props}
    />
  )
}
