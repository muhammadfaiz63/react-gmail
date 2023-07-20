// material-ui
import { Box, IconButton, Link, useMediaQuery } from '@mui/material'
import { GithubOutlined } from '@ant-design/icons'

import Profile from './Profile'

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return <>{!matchesXs && <Profile />}</>
}

export default HeaderContent
