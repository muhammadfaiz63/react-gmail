import React, { useEffect, useContext, useState, useRef } from 'react'
import {
  Grid,
  createFilterOptions,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  RadioGroup,
  IconButton,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '../../../assets/images/icons/approval.png'
import { Link } from 'react-router-dom'
// component
import schema from './validation'

 // ditambahkan
import { PatentContext } from '../../../context/PatentContext';

// context
import { ArrowBackIosNew } from '@mui/icons-material'
function Form(props) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  let { id } = useParams()

// ditambahlan
  const patentContext = useContext(PatentContext);
  const { createPatent, updatePatent, detailPatent, getPatent} = patentContext;
  const [pateningEventDate, setBirthDate] = useState('')
  

  const navigate = useNavigate()
  // context
  
  // membuat tombol tambah

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      if (id !== 'register') {
        const fetctData = async () => {
          const editedrows = await getPatent({_id:id})
          const response = await editedrows.data[0]
          setValue('pateningEvent', response?.pateningEvent)
          setBirthDate(response?.pateningEventDate)
          setValue('referenceNumber', response?.referenceNumber)
          setValue('recordType', response?.recordType)
          setValue('title', response?.title)
          setValue('description', response?.description)
          setValue('country', response?.country)
          setValue('client', response?.client)
          setValue('status', response?.status)
          setValue('email', response?.email)
          // setBirthDate(response?.birthDate)
          // setGender(response?.gender)
          // setPhoto(response?.photo)
        }
        fetctData()
      }
      
      getPatent()
    }
  }, [ignore, register])


  // membuat tombol tambah
  const onSubmit = async () => {
    let values = getValues()

    let datasend = {
      ...values,
      pateningEvent: values.pateningEvent,
      referenceNumber: values.referenceNumber,
      recordType: values.recordType,
      title: values.title,
      description: values.description,
      country: values.country,
      client: values.client,
      status: values.status,
      email: values.email,
      pateningEventDate
      
    }
    try {
      if (id !== 'register') {
        await updatePatent(id, datasend)
      } else {
        await createPatent({...datasend,
          username:"",
          password:""})
      }
      await navigate(`/app/report`)
    } catch (err) {
      alert(err)
    }
  }


  // tombol submit
  // const onSubmit = async () => {
  //   let values = getValues()

  //   let datasend = {
  //     ...values,
  //     user:{
  //       ...values?.user,
  //       phone: values.phone,
  //       email: values.email,
  //       role: roles.filter(item=>item._id === role)[0],
  //     },
  //     photo,
  //     role: roles.filter(item=>item._id === role)[0],
  //     birthDate,
  //     gender 
  //   }
  //   try {
  //     if (id !== 'register') {
  //       await updateUserProfile(values?.user?._id, datasend)
  //     } else {
  //       await createUser({...datasend,
  //         username:"",
  //         password:""})
  //     }
  //     await navigate(`/app/users`)
  //   } catch (err) {
  //     alert(err)
  //   }
  // }



  


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
                to='/app/report'
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
                {id !== 'register' ? 'Edit ' : 'Tambahkan '} Patent
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
                  <Typography>Patening Event</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Patening Event'}
                    fullWidth
                    // {...register('code')}
                    // error={errors?.code}
                    // helperText={errors?.code && errors.code.message}

                    {...register('pateningEvent')}
                    error={errors?.pateningEvent}
                    helperText={errors?.pateningEvent && errors.pateningEvent.message}

                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                <div style={{marginBottom:10}}> 
                    <Typography>Patening Event Date</Typography>
                    <TextField
                      type='Date'
                      sx={{ backgroundColor: '#fff' }}
                      size={'small'}
                      placeholder={'Tanggal Lahir'}
                      fullWidth
                      value={pateningEventDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value)
                      }}
                    />
                  </div>
                   </Grid>
                   </Grid>
                </Grid>
              <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Reference Number</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Reference Number'}
                    fullWidth
                    // {...register('name')}
                    // error={errors?.name}
                    // helperText={errors?.name && errors.name.message}

                    {...register('referenceNumber')}
                    error={errors?.referenceNumber}
                    helperText={errors?.referenceNumber && errors.referenceNumber.message}

                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Record Type</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Record Type'}
                    fullWidth
                    // {...register('type')}
                    // error={errors?.type}
                    // helperText={errors?.type && errors.type.message}

                    {...register('recordType')}
                    error={errors?.recordType}
                    helperText={errors?.recordType && errors.recordType.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Title</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Title'}
                    fullWidth
                    // {...register('namePIC')}
                    // error={errors?.namePIC}
                    // helperText={errors?.namePIC && errors.namePIC.message}

                    {...register('title')}
                    error={errors?.title}
                    helperText={errors?.title && errors.title.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Description</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Description'}
                    fullWidth
                    // {...register('contactPIC')}
                    // error={errors?.contactPIC}
                    // helperText={errors?.contactPIC && errors.contactPIC.message}

                    {...register('description')}
                    error={errors?.description}
                    helperText={errors?.description && errors.description.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Country</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Country'}
                    fullWidth

                    {...register('country')}
                    error={errors?.country}
                    helperText={errors?.country && errors.country.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Client</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Client'}
                    fullWidth

                    {...register('client')}
                    error={errors?.client}
                    helperText={errors?.client && errors.client.message}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Status</Typography>
                  <TextField
                    sx={{ backgroundColor: '#fff' }}
                    size={'small'}
                    placeholder={'Status'}
                    fullWidth

                    {...register('status')}
                    error={errors?.status}
                    helperText={errors?.status && errors.status.message}
                  />
                </Grid>
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
              </Grid>
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
                  to='/app/patent'>
                  Kembali
                </Button>
                <Button
                  variant={'contained'}
                  size={'large'}
                  sx={{
                    width: '18vw',
                  }}
                  onClick={onSubmit}
                  // type="submit"
                  >
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
