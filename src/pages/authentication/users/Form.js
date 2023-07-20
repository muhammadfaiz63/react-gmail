import React, { useEffect, useContext, useState, useRef } from 'react'
import { Grid, TextField, createFilterOptions } from '@mui/material'
import { useForm } from 'react-hook-form'
import QRCode from 'react-qr-code'
import { yupResolver } from '@hookform/resolvers/yup'

// component
import schema from './validation'

// context
import { AssetContext, UploadContext } from 'context'
import StaticVar from 'config/StaticVar'
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

  let { submitform, onClose, editedrows } = props

  // context
  const { createAsset, updateAsset } = useContext(AssetContext)
  const { uploadPhotoUser } = useContext(UploadContext)

  const [id, setId] = useState('')
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errUpload, setErrUpload] = useState(false)
  const [signature, setSignature] = useState('')
  const uploadedImage = useRef(null)

  const onSubmit = async () => {
    let values = getValues()

    let datasend = {
      ...values,
    }

    try {
      if (id) {
        await updateAsset(id, datasend)
      } else {
        await createAsset(datasend)
      }
      await onClose()
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
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append('image', file)

      let res = await uploadPhotoUser(formData)
      setSignature(res.data)
      setErrUpload(false)
    } catch (error) {
      alert(error)
      setErrUpload(true)
    } finally {
      setLoadingUpload(false)
    }
  }

  const filter = createFilterOptions()

  useEffect(() => {
    if (editedrows) {
      setId(editedrows._id)
      setValue('name', editedrows?.name)
      setValue('code', editedrows?.code)
      setValue('make', editedrows?.make)
      setValue('model', editedrows?.model)
      setValue('nameVendor', editedrows?.nameVendor)
      setValue('contactVendor', editedrows?.contactVendor)
    }
  }, [editedrows, register])

  return (
    <form onSubmit={submitform && handleSubmit(onSubmit)} id='my-form'>
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={12} md={2}>
          <Grid container sx={{ pt: 2 }}>
            <QRCode value={id} size={120} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container alignItems='center' spacing={2}>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('name')}
                error={errors?.name}
                helperText={errors?.name && errors.name.message}
                fullWidth
                id='outlined-basic'
                label='Nama'
                variant='outlined'
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('code')}
                error={errors?.code}
                helperText={errors?.code && errors.code.message}
                fullWidth
                id='outlined-basic'
                label='Kode'
                variant='outlined'
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('make')}
                error={errors?.make}
                helperText={errors?.make && errors.make.message}
                fullWidth
                id='outlined-basic'
                label='Brand'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container alignItems='center' spacing={2}>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('nameVendor')}
                error={errors?.nameVendor}
                helperText={errors?.nameVendor && errors.nameVendor.message}
                fullWidth
                id='outlined-basic'
                label='Nama Vendor'
                variant='outlined'
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('contactVendor')}
                error={errors?.contactVendor}
                helperText={
                  errors?.contactVendor && errors.contactVendor.message
                }
                fullWidth
                id='outlined-basic'
                label='Kontak Vendor'
                variant='outlined'
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                autoComplete='off'
                {...register('model')}
                error={errors?.model}
                helperText={errors?.model && errors.model.message}
                fullWidth
                id='outlined-basic'
                label='Model'
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default Form
