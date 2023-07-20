// material-ui
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#293D4F',
  justifyContent: open ? 'flex-start' : 'center',
  // paddingLeft: theme.spacing(open ? 3 : 0),
}))

export default DrawerHeaderStyled
