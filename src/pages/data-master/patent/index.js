import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box, Slider } from '@mui/material'
import _ from 'lodash'
// project import
import MainCard from 'components/MainCard'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'components/dialogs/ConfirmDialog'

import Table from './Table'
import Form from './Form'

// ==============================|| SAMPLE PAGE ||============================== //
import { PatentContext } from 'context'

const PatentPage = () => {
  const navigate = useNavigate()
  // context
  const {
    getPatent,
    patents,
    setFilterPatents,
    deletePatent,
  } = useContext(PatentContext)

  // state
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)

  const onDelete = async (row) => {
    setSelectedRow(row)
    setConfirmDelete(true)
  }

  const onUpdate = async (row) => {
    setSelectedRow(row)
    navigate(`/app/patent/form/${row._id}`)
  }

  const handleDelete = async () => {
    deletePatent(selectedRow._id)
    setConfirmDelete(false)
  }

  const handleCreate = async () => {
    setSelectedRow(null)
    navigate(`/app/patent/form/register`)
  }

  // const handleSearch = (value) => {
  //   var searchQuery = value.toString().toLowerCase()
  //   let listdata = [
  //     'name',
  //     'phone',
  //     'email',
  //     'nik',
  //   ].map((x, i) => {
  //     return patents.filter((el) => {
  //       if (el[x]) {
  //         return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
  //       }
  //     })
  //   })
  //   var dataset = _.maxBy(listdata, function (o) {
  //     return o.length
  //   })
  //   setFilterPatents(dataset)
  // }

  let ignore = false
  useEffect(() => {
    if (!ignore) getPatent()
    return () => {
      ignore = true
    }
  }, [])

  // tombol filter
  const handleSearch = (value) => {
    const searchQuery = value.toString().toLowerCase();
    const filteredPatents = [
      'name',
      'phone',
      'email',
      'nik',
    ].map((x, i) => {
      return patents.filter((el) => {
        if (el[x]) {
          return el[x]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery) !== -1;
        }
        return false;
      });
    });
    const dataset = _.maxBy(filteredPatents, function (o) {
      return o.length;
    });
    setFilterPatents(dataset);
  };

  const [filterValues, setFilterValues] = useState({
    pateningEvent: '',
    referenceNumber: '',
    recordType: '',
    title: '',
    description: '',
    country: '',
    client: '',
    status: '',
});

const handleFilter = () => {
  const filteredPatents = patents.filter((el) => {
      if (
          el.pateningEvent
              .toString()
              .toLowerCase()
              .includes(filterValues.pateningEvent.toLowerCase()) &&
          el.referenceNumber
              .toString()
              .toLowerCase()
              .includes(filterValues.referenceNumber.toLowerCase()) &&
          el.recordType
              .toString()
              .toLowerCase()
              .includes(filterValues.recordType.toLowerCase()) &&
          el.title
              .toString()
              .toLowerCase()
              .includes(filterValues.title.toLowerCase()) &&
          el.description
              .toString()
              .toLowerCase()
              .includes(filterValues.description.toLowerCase()) &&
          el.country
              .toString()
              .toLowerCase()
              .includes(filterValues.country.toLowerCase()) &&
          el.client
              .toString()
              .toLowerCase()
              .includes(filterValues.client.toLowerCase()) &&
          el.status
              .toString()
              .toLowerCase()
              .includes(filterValues.status.toLowerCase())
      ) {
          return true;
      }
      return false;
  });
  setFilterPatents(filteredPatents);
};


  return (
    <>
      <MainCard
        title='Daftar Patent'
        actionright={
          <Button variant='contained' color='primary' onClick={handleCreate}>
            Tambah
          </Button>
        }>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={1} sx={{ border:'1.5px solid black', borderRadius:'14px', padding:2 }}>
              <Stack direction='row' spacing={1} sx={{ justifyContent:'space-between' }}>
              <Stack spacing={1}>
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Patening Event'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          pateningEvent: e.target.value,
                      })
                  }
                  value={filterValues.pateningEvent}
                  />
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Reference Number'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          referenceNumber: e.target.value,
                      })
                  }
                  value={filterValues.referenceNumber}
                  />
                </Stack>
                <Stack spacing={1} sx={{ width:'20%' }} >
                    <TextField
                      type='Date'
                      sx={{ backgroundColor: '#fff' }}
                      label={'Patening Event Date Start'}
                      fullWidth
                      value={dateStart}
                      onChange={(e) => {
                        setDateStart(e.target.value)
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  <TextField
                      type='Date'
                      sx={{ backgroundColor: '#fff' }}
                      label={'Patening Event Date End'}
                      fullWidth
                      value={dateEnd}
                      onChange={(e) => {
                        setDateEnd(e.target.value)
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Record Type'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          recordType: e.target.value,
                      })
                  }
                  value={filterValues.recordType}
                  />
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Title'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          title: e.target.value,
                      })
                  }
                  value={filterValues.title}
                  />
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Description'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          description: e.target.value,
                      })
                  }
                  value={filterValues.description}
                  />
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Country'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          country: e.target.value,
                      })
                  }
                  value={filterValues.country}
                  />
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Client'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          client: e.target.value,
                      })
                  }
                  value={filterValues.client}
                  />
                  <TextField
                    fullWidth
                    // onChange={(e) => handleSearch(e.target.value)}
                    id='outlined-basic'
                    label='Status'
                    variant='outlined'
                    onChange={(e) =>
                      setFilterValues({
                          ...filterValues,
                          status: e.target.value,
                      })
                  }
                  value={filterValues.status}
                  />
                </Stack>
              </Stack>
              <Button variant='contained' size='small' sx={{ width:150 }} onClick={handleFilter}>Apply Filter</Button>
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

export default PatentPage
