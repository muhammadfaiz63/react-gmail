import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box } from '@mui/material'
import _ from 'lodash'
// project import
import MainCard from 'components/MainCard'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'components/dialogs/ConfirmDialog'

import Table from './Table'
import Form from './Form'

// ==============================|| SAMPLE PAGE ||============================== //
import { UserContext } from 'context'

const UsersPage = () => {
  const navigate = useNavigate()
  // context
  const { getUser, assets, setFilterUsers, updateUser, deleteUser } =
    useContext(UserContext)

  // state
  const [openform, setOpenForm] = useState(false)
  const [submitform, setSubmitForm] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const onDelete = async (row) => {
    setSelectedRow(row)
    setConfirmDelete(true)
  }

  const onUpdate = async (row) => {
    setSelectedRow(row)
    navigate(`/app/assets/form`)
  }

  const handleDelete = async () => {
    deleteUser(selectedRow._id)
    setConfirmDelete(false)
  }

  const handleCreate = async () => {
    setSelectedRow(null)
    navigate(`/app/assets/form`)
  }

  const handleSearch = (value) => {
    var searchQuery = value.toString().toLowerCase()
    let listdata = [
      'name',
      'code',
      'make',
      'model',
      'nameVendor',
      'contactVendor',
    ].map((x, i) => {
      return assets.filter((el) => {
        if (el[x]) {
          return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
        }
      })
    })
    var dataset = _.maxBy(listdata, function (o) {
      return o.length
    })
    console.log('dataset', dataset)
    setFilterUsers(dataset)
  }

  let ignore = false
  useEffect(() => {
    if (!ignore) getUser()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <MainCard
        title='Users'
        actionright={
          <Button variant='contained' color='primary' onClick={handleCreate}>
            Tambah
          </Button>
        }>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Stack direction='row' spacing={2}>
              <TextField
                sx={{ width: 400 }}
                // fullWidth
                onChange={(e) => handleSearch(e.target.value)}
                id='outlined-basic'
                label='Pencarian'
                variant='outlined'
              />
            </Stack>
          </Grid>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Table onUpdate={onUpdate} onDelete={onDelete} />
          </Grid>
        </Grid>
      </MainCard>

      {/* validation delete */}
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        content={
          <Alert severity='error' variant='filled'>
            Yakin untuk menghapus data?
          </Alert>
        }
        title='Konfirmasi'
        actions={
          <>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setConfirmDelete(false)}>
              Batal
            </Button>
            <Button variant='contained' color='error' onClick={handleDelete}>
              Ya
            </Button>
          </>
        }
      />
    </>
  )
}

export default UsersPage
