import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box, Typography } from '@mui/material'
import _ from 'lodash'
// project import
import MainCard from 'components/MainCard'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'components/dialogs/ConfirmDialog'

import Table from './Table'
import Form from './Form'

// ==============================|| SAMPLE PAGE ||============================== //
import { UserContext } from 'context'
// import Typography from 'themes/overrides/Typography'

const UsersPage = () => {
  const navigate = useNavigate()
  // context
  const {
    getProfile,
    users,
    setFilterUsers,
    deleteUser,
  } = useContext(UserContext)

  // state
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const onDelete = async (row) => {
    setSelectedRow(row)
    setConfirmDelete(true)
  }

  const onUpdate = async (row) => {
    setSelectedRow(row)
    navigate(`/app/users/form/${row._id}`)
  }

  const handleDelete = async () => {
    deleteUser(selectedRow._id)
    setConfirmDelete(false)
  }

  const handleCreate = async () => {
    setSelectedRow(null)
    navigate(`/app/users/form/register`)
  }

  // const handleSearch = (value) => {
  //   var searchQuery = value.toString().toLowerCase()
  //   let listdata = [
  //     'name',
  //     'phone',
  //     'email',
  //     'nik',
  //   ].map((x, i) => {
  //     return users.filter((el) => {
  //       if (el[x]) {
  //         return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
  //       }
  //     })
  //   })
  //   var dataset = _.maxBy(listdata, function (o) {
  //     return o.length
  //   })
  //   setFilterUsers(dataset)
  // }

  const handleSearch = () => {
    let searchQuery = searchValue.toString().toLowerCase()
    let filteredUsers = users.filter((el) =>
      ['name', 'phone', 'email', 'nik'].some((prop) =>
        el[prop]?.toString().toLowerCase().includes(searchQuery)
      )
    )
    setFilterUsers(filteredUsers)
  }

  let ignore = false
  useEffect(() => {
    if (!ignore) getProfile()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <MainCard
        title='Daftar Users'
        actionright={
          <Button variant='contained' color='primary' onClick={handleCreate}>
            Tambah
          </Button>
        }>
        <Grid container spacing={2}  alignItems="center" direction="row" justifyContent="center">
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Stack direction='row' spacing={2}>
              <TextField
                sx={{ width: 400 }}
                // fullWidth
                // onChange={(e) => handleSearch(e.target.value)}
                onChange={(e) => setSearchValue(e.target.value)}
                id='outlined-basic'
                label='Pencarian'
                variant='outlined'
              />
              <Button variant="contained" color="primary" sx={{color: "#fff", bgColor: "#293D4F"}} onClick={handleSearch}>
              Apply Filter
            </Button>
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
