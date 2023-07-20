import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project import
// import FirebaseSocial from "./FirebaseSocial"
import AnimateButton from 'components/@extended/AnimateButton'

// assets
import { Visibility, VisibilityOff } from '@mui/icons-material'

// ============================|| FIREBASE - LOGIN ||============================ //

// context
import { AuthContext } from '../../../context/index'

const AuthLogin = () => {
  // context
  const { signIn, errorMsg, setErrorMsg } = useContext(AuthContext)

  const [checked, setChecked] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  console.log('errorMsg', errorMsg)

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            // .string("Must be a valid username")
            .max(255)
            .required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('run here')
          setStatus({ success: false })
          setSubmitting(false)

          try {
            console.log(values)
            await signIn(values)
          } catch (err) {
            console.log('err', err)
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={0.5}></Grid>
                <Grid item xs={11}>
                  <Stack spacing={2} >
                    <TextField
                      //  size= 'large'
                      id='username-login'
                      // type="email"
                      value={values.username}
                      name='username'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='Email'
                      InputLabelProps={{
                        style: { color: 'green' },
                      }}
                      fullWidth
                      error={Boolean(touched.username && errors.username)}
                      sx={{
                        '& .MuiInputBase-input': {
                          height: '3vh',
                          color: '#672D78',
                          fontSize: '18px',
                        },
                        borderRadius: '5px',
                        backgroundColor: '#fff',
                      }}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-username-login'>
                        {errors.username}
                      </FormHelperText>
                    )}

                    <TextField
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id='-password-login'
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name='password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              sx={{ backgroundColor: '#fff' }}
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      placeholder='Password'
                      sx={{
                        '& .MuiInputBase-input': {
                          height: '3vh',
                          color: '#293D4F',
                          fontSize: '18px',
                        },
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                      }}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-password-login'>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>

                  <Stack direction='row' spacing={2} sx={{ mt: 2, justifyContent:'center' }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size='large'
                        type='submit'
                        variant='outlined'
                        sx={{
                          '&.MuiButton-outlined': {
                            backgroundColor: '#fff',
                            color: '#293D4F',
                            width: 150,
                            borderRadius: '10px',
                          },
                        }}>
                        Lupa Password
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size='large'
                          type='submit'
                          variant='outlined'
                          sx={{
                            '&.MuiButton-outlined': {
                              backgroundColor: '#293D4F',
                              color: '#fff',
                              width: 150,
                              borderRadius: '10px',
                            },
                          }}>
                          Masuk
                        </Button>
                      </AnimateButton>
                    {/* <Box
                      sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'end',
                        pr: 1,
                      }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size='large'
                          type='submit'
                          variant='outlined'
                          sx={{
                            '&.MuiButton-outlined': {
                              backgroundColor: '#fff',
                              color: '#293D4F',
                              width: '100%',
                              // ml: 8,
                              borderRadius: '10px',
                            },
                          }}>
                          Lupa Password
                        </Button>
                      </AnimateButton>
                    </Box>
                    <Box sx={{ width: '50%', pl: 1 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size='large'
                          type='submit'
                          variant='outlined'
                          sx={{
                            '&.MuiButton-outlined': {
                              backgroundColor: '#293D4F',
                              color: '#fff',
                              width: '80%',
                              borderRadius: '10px',
                            },
                          }}>
                          Masuk
                        </Button>
                      </AnimateButton>
                    </Box> */}
                  </Stack>
                </Grid>
                <Grid item xs={0.5}></Grid>
              </Grid>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default AuthLogin
