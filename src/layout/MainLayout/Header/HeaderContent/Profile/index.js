import PropTypes from 'prop-types'
import { useRef, useState, useContext } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material'

// project import
import MainCard from 'components/MainCard'
import Transitions from 'components/extended/Transitions'
import ProfileTab from './ProfileTab'

// context
import { AuthContext } from '../../../../../context/index'

// assets
import {
  LogoutOutlined,
} from '@ant-design/icons'

// logo

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme()

  let user = JSON.parse(localStorage.getItem('profile'))

  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    logout()
    // logout
  }

  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const iconBackColorOpen = 'grey.300'

  function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value?.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name) {
    let lsplit = name.split(' ')
    let child =
      lsplit.length > 1
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : name.substr(0, 2)

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        float: 'right',
        display: 'flex',
      }}>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          align: 'center',
        }}>
        {/* <Typography sx={{fontSize:40, fontWeight:700, textAlign:'center',color:'#fff'}}>HAKI</Typography> */}
      </Box>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
        }}
        aria-label='open profile'
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}>
        <Stack direction='row' spacing={2} alignItems='center' sx={{ p: 0.5 }}>
          <Avatar {...stringAvatar(`${user?.name}`)} />
          <Typography variant='subtitle1'>{user?.name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}>
        {({ TransitionProps }) => (
          <Transitions type='fade' in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250,
                  },
                }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent='space-between'
                        alignItems='center'>
                        <Grid item>
                          <Stack
                            direction='row'
                            spacing={1.25}
                            alignItems='center'>
                            <Avatar
                              alt='profile user'
                              sx={{
                                width: 32,
                                height: 32,
                              }}
                            />
                            <Stack>
                              <Typography variant='h6'>
                                {
                                  JSON.parse(localStorage.getItem('profile'))
                                    ?.user?.name
                                }
                              </Typography>
                              <Typography variant='body2' color='textSecondary'>
                                {
                                  JSON.parse(localStorage.getItem('profile'))
                                    ?.user?.username
                                }
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton
                            size='large'
                            color='secondary'
                            onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <ProfileTab handleLogout={handleLogout} />
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  )
}

export default Profile
