import React, { useContext,useEffect } from 'react'
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
  SvgIcon 
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

import { AuthContext } from '../../../context/index'
import AnimateButton from 'components/extended/AnimateButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ReactComponent as LogoGoogle} from '../../../assets/images/google.svg'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const AuthLogin = () => {
  // context
  const { signIn, checkAuth,errorMsg, setErrorMsg } = useContext(AuthContext)

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSignOut = () => {
    // Perform the sign-out action using the Google One Tap API
    // google.accounts.id.disableAutoSelect();
    // google.accounts.id.prompt();
  };

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
                  <Stack direction='row' spacing={2} sx={{ mt:2,mb: 2, justifyContent:'center' }}>
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
                  </Stack>
                  <Grid container justifyContent="center"> 
                  <AnimateButton>
                  <GoogleLogin
                    size="large"
                    width={150}
                    onSuccess={credentialResponse => {
                      var decoded = jwt_decode(credentialResponse?.credential);
                      let profile = {
                        ...decoded,
                        user : {
                          name:decoded?.name,
                          email:decoded?.email,
                          token:credentialResponse?.credential
                        }
                      }
                      // console.log(profile)
                      checkAuth(profile);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    useOneTap
                  />
                  </AnimateButton>
                  </Grid>
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
