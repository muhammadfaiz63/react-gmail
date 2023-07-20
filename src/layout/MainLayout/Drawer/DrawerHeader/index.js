import PropTypes from 'prop-types'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Stack, Typography, Grid } from '@mui/material'
import { drawerWidth } from 'config'

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled'
import Logo from "components/Logo"

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme()

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Grid container sx={{textAlign:'center',justifyContent:'center',mt:5}}>
      <Logo/>
      {/* <Typography sx={{fontSize:24, fontWeight:700, textAlign:'center',color:'#fff'}}>HAKI</Typography> */}
      </Grid>
    </DrawerHeaderStyled>
  )
}

DrawerHeader.propTypes = {
  open: PropTypes.bool,
}

export default DrawerHeader
