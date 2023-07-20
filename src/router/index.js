import { useContext } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './Routes'

import { AuthContext } from '../context/index'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { authenticated } = useContext(AuthContext)

  const isLoggedIn = localStorage.getItem('token')

  const routing = useRoutes(routes(authenticated))

  return <>{routing}</>
}
