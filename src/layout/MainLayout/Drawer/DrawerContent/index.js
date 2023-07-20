import PropTypes from "prop-types"

import { useContext } from 'react'

import { AuthContext } from '../../../../context/index'

// project import
// import NavCard from './NavCard';
import Navigation from './Navigation'
import SimpleBar from 'components/third-party/SimpleBar'

//material ui
import {
  Stack,
  Avatar,
  Box,
  Typography,
  Button} from '@mui/material'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {

  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    logout()
    // logout
  }

  return(
  <SimpleBar
    sx={{
      backgroundColor: '#293D4F',
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}>
    <Navigation />
    <Stack sx={{mt:5}}>
    </Stack>
    {/* <NavCard /> */}
    
  </SimpleBar>
)
}

DrawerContent.propTypes = {
  handleLogout: PropTypes.func
}
export default DrawerContent
