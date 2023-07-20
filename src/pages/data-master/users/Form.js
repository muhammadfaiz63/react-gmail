import React, { useEffect, useContext, useState, useRef } from 'react'
import {
  Grid,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../../assets/images/icons/approval.png'
import { Link } from 'react-router-dom'
import StaticVar from 'config/StaticVar'
import { AddAPhoto } from '@mui/icons-material'
// component
import schema from './validation'

// context
import { ArrowBackIosNew } from '@mui/icons-material'
import { UserContext,UploadContext } from 'context/index'
function Form(props) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  let { id } = useParams()
  const { getProfile,roles,getRoles,updateUserProfile,createUser } =
    useContext(UserContext)
  
  const { uploadPhoto } = useContext(UploadContext)
  const [role, setRole] = useState(null)
  const [errUpload, setErrUpload] = useState(false)
  const [photo, setPhoto] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [loadingUpload, setLoadingUpload] = useState(false)
  const uploadedImage = useRef(null)
  const createby = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()
  // context
  
  const onSubmit = async () => {
    let values = getValues()

    let datasend = {
      ...values,
      user:{
        ...values?.user,
        phone: values.phone,
        email: values.email,
        role: roles.filter(item=>item._id === role)[0],
      },
      photo,
      role: roles.filter(item=>item._id === role)[0],
      birthDate,
      gender 
    }
    try {
      if (id !== 'register') {
        await updateUserProfile(values?.user?._id, datasend)
      } else {
        await createUser({...datasend,
          username:"",
          password:""})
      }
      await navigate(`/app/users`)
    } catch (err) {
      alert(err)
    }
  }

  const handleUpload = async (e) => {
    setLoadingUpload(true)
    try {
      let reader = new FileReader()
      let file = e.target.files[0]
      // setDocumentFile(file)
      reader.onloadend = async () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        const dateNow = Date.now()
        const datapost = {
          rootfile: `repo/img/assets/${createby?._id}/`,
          filename: `asset-${dateNow}.png`,
          filedata: base64String,
        }

        let res = await uploadPhoto(datapost)
        setPhoto(res.data)
        setErrUpload(false)
      }
      reader.readAsDataURL(file)
      reader.onabort = () => {
        setLoadingUpload(false)
      }
    } catch (error) {
      alert(error)
      setErrUpload(true)
    } finally {
      setLoadingUpload(false)
    }
  }

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      if (id !== 'register') {
        const fetctData = async () => {
          const editedrows = await getProfile({id:id})
          const response = await editedrows.data[0]
          setValue('user', response?.user)
          setValue('name', response?.name)
          setRole(response?.user?.role?._id)
          setValue('email', response?.user?.email)
          setValue('phone', response?.user?.phone)
          setValue('nik', response?.nik)
          setValue('birthPlace', response?.birthPlace)
          setValue('address', response?.address)
          setBirthDate(response?.birthDate)
          setGender(response?.gender)
          setPhoto(response?.photo)
        }
        fetctData()
      }
      
      getRoles()
    }
  }, [ignore, register])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
        }}>
        <Grid container direction='row'>
          <Grid item xs={4} sx={{ height: '70px' }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton
                component={Link}
                to='/app/users'
                sx={{
                  fontSize: '0.2rem',
                  backgroundColor: '#2F80ED',
                  borderRadius: '100%',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    borderRadius: '100%',
                  },
                  color: '#fff',
                }}>
                <ArrowBackIosNew />
              </IconButton>
              <Typography sx={{ fontSize: '15px' }}>Kembali</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ height: '70px' }}
            justifyContent='center'
            align='center'>
            <Box sx={{ display: 'flex' }} justifyContent='center'>
              <Box component={'img'} src={logo} sx={{ width: '50px' }} />
              <Typography sx={{ fontSize: '30px', color: '#555555' }}>
                {id !== 'register' ? 'Edit ' : 'Tambahkan '} Users
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'end', height: '70px' }}>
            <Box direction='column' sx={{ width: '20vw' }}></Box>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)} id='my-form'>
          <Grid container>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Nama</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Nama'}
                    fullWidth
                    {...register('name')}
                    error={errors?.name}
                    helperText={errors?.name && errors.name.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Role</Typography>
                  <Select
                    fullWidth
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={role}
                    defaultValue={role}
                    label='role'
                    onChange={(e) =>
                      setRole(e.target.value)
                    }>
                    {roles.map((item, key) => (
                      <MenuItem value={item._id} key={key}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Email</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Email'}
                    fullWidth
                    {...register('email')}
                    error={errors?.email}
                    helperText={errors?.email && errors.email.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Phone</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Phone'}
                    fullWidth
                    {...register('phone')}
                    error={errors?.phone}
                    helperText={errors?.phone && errors.phone.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={6} sx={{mt:2}}>
                  <Typography>Foto</Typography>
                  <Button
                    variant='contained'
                    position='absolute'
                    component='label'
                    fullWidth
                    sx={{
                      height: '35vh',
                      background: '#D9D9D9',
                      '&:hover': { background: '#D9D9D9' },
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    {photo ? (
                      <img
                        src={StaticVar.API_SERVICES + '/upload/' + photo}
                        style={{
                          width: '100%',
                          height: '35vh',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <>
                        <AddAPhoto sx={{ fontSize: '50px', color: '#293D4F' }} />
                        <Typography
                          sx={{
                            textAlign: 'center',
                            color: '#293D4F',
                            fontStyle: 'italic',
                          }}>
                          Unggah Foto
                        </Typography>
                      </>
                    )}
                    <input
                      type='file'
                      draggable='true'
                      hidden
                      accept='image/*'
                      ref={uploadedImage}
                      onChange={handleUpload}
                      onClick={(e) => (e.target.value = null)}
                    />
                  </Button>
                </Grid>
                <Grid item xs={6} md={6} sx={{mt:2}}>
                  <div style={{marginBottom:10}}>
                  <Typography>NIK</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    placeholder={'NIK'}
                    fullWidth
                    {...register('nik')}
                    error={errors?.nik}
                    helperText={errors?.nik && errors.nik.message}
                  />
                  </div>
                  <div style={{marginBottom:10}}>
                  <Typography>Jenis Kelamin</Typography>
                  <Select
                    fullWidth
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={gender}
                    label='Jenis Kelamin'
                    onChange={(e) =>
                      setGender(e.target.value)
                    }>
                    {[{label:"Laki-laki",value:'L'},{label:"Perempuan",value:"P"}].map((item, key) => (
                      <MenuItem value={item.value} key={key}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  </div>
                  <div style={{marginBottom:10}}> 
                  <Typography>Tempat Lahir</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    placeholder={'Tempat Lahir'}
                    fullWidth
                    {...register('birthPlace')}
                    error={errors?.birthPlace}
                    helperText={errors?.birthPlace && errors.birthPlace.message}
                  />
                  </div>
                  <div style={{marginBottom:10}}> 
                    <Typography>Tempat Lahir</Typography>
                    <TextField
                      type='Date'
                      sx={{ backgroundColor: '#fff' }}
                      size={'small'}
                      placeholder={'Tanggal Lahir'}
                      fullWidth
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value)
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography>Alamat</Typography>
              <TextField
                sx={{ backgroundColor: '#fff' }}
                placeholder={'Alamat'}
                rows={2}
                multiline
                fullWidth
                {...register('address')}
                error={errors?.address}
                helperText={errors?.address && errors.address.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent='center' mt={4} spacing={2}>
                <Button
                  variant={'outlined'}
                  size={'large'}
                  sx={{
                    width: '18vw',
                    mr: 2,
                  }}
                  component={Link}
                  to='/app/users'>
                  Kembali
                </Button>
                <Button
                  variant={'contained'}
                  size={'large'}
                  sx={{
                    width: '18vw',
                  }}
                  onClick={onSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default Form
