import React, { useState, useEffect, useContext, useRef } from 'react'
import ReactDOMServer from 'react-dom/server';

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box, Slider, InputBase, Paper, IconButton, Dialog, DialogContent, DialogActions, Typography, Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import meterai from '../../../assets/images/materai.png'
import ttd from '../../../assets/images/ttd.png'

import _ from 'lodash'
// project import
import MainCard from 'components/MainCard'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from 'components/dialogs/ConfirmDialog'

import Table from './Table'
import Form from './Form'

// print
import html2pdf from 'html2pdf.js';

// ==============================|| SAMPLE PAGE ||============================== //
import { ReportContext } from 'context'

const ReportPage = () => {
  const navigate = useNavigate()
  // context
  const {
    getReport,
    reports,
    setFilterReports,
    deleteReport,
  } = useContext(ReportContext)

  // state
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const [confirmDetail, setConfirmDetail] = useState(false)
  
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [searchValue, setSearchValue] = useState('');

  const { filterReports } = useContext(ReportContext);
  const report = filterReports?.[0];

  // membuat tombol print
  const dialogRef = useRef(null);

  const onDelete = async (row) => {
    setSelectedRow(row)
    setConfirmDelete(true)
  }

  const onUpdate = async (row) => {
    setSelectedRow(row)
    navigate(`/app/report/form/${row._id}`)
  }

  const handleDelete = async () => {
    deleteReport(selectedRow._id)
    setConfirmDelete(false)
  }

  const handleCreate = async () => {
    setSelectedRow(null)
    navigate(`/app/report/form/register`)
  }

  const onDetail = async (row) => {
    const selectedReport = filterReports.find((report) => report._id === row._id);
    setSelectedRow(selectedReport)
    setConfirmDetail(true)
  }

  // fungsi search
  // const handleSearch = (value) => {
  //   var searchQuery = value.toString().toLowerCase()
  //   let listdata = [
  //     'name',
  //     'phone',
  //     'email',
  //     'nik',
  //   ].map((x, i) => {
  //     return reports.filter((el) => {
  //       if (el[x]) {
  //         return el[x].toString().toLowerCase().indexOf(searchQuery) !== -1
  //       }
  //     })
  //   })
  //   var dataset = _.maxBy(listdata, function (o) {
  //     return o.length
  //   })
  //   setFilterReports(dataset)
  // }


  // search
  const handleSearch = (value) => {
    setSearchValue(value);
    const searchQuery = value.toLowerCase();
  
    const filteredReports = reports.filter((el) => {
      return (
        el.namaPemohon?.toString().toLowerCase().includes(searchQuery) ||
        el.namaMerek?.toString().toLowerCase().includes(searchQuery) ||
        el.alamat?.toString().toLowerCase().includes(searchQuery) ||
        el.negara?.toString().toLowerCase().includes(searchQuery) ||
        el.telepon?.toString().toLowerCase().includes(searchQuery) ||
        el.dataKelas?.toString().toLowerCase().includes(searchQuery)
      );
    });
  
    setFilterReports(filteredReports);
  };

  
  let ignore = false
  useEffect(() => {
    if (!ignore) getReport()
    return () => {
      ignore = true
    }
  }, [])

  // print

  const handlePrint = () => {
    const contentToPrint = ReactDOMServer.renderToString(
      <DialogContent>
        <Typography sx={{ fontSize: '10px' }}>
          Keputusan Direktur Jenderal Kekayaan Intelektual <br/>
          Nomor : HKI-02.HI.06.01 Tahun 2017 <br/>
          Tentang : Formulir Permohonan Merek <br/>
          Tanggal : 03 Maret 2017
          <Divider sx={{pt: 2, borderColor: 'black'}} />
        </Typography>
        <Typography>
          Merek:
        </Typography>
        <Box sx={{ border: '1px solid grey', width: 400, height: 200, margin: '0 auto'}}>
          <Grid container direction="column" justifyContent="space-between" alignItems="center" height="100%">
            <Grid item>
              <Typography sx={{ textAlign: 'center' }}>Label merek</Typography>
            </Grid>

            <Grid item>
              <Typography>{selectedRow?.namaMerek}</Typography>
            </Grid>
            
            <Grid item>
              <Typography>{selectedRow?.field2}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography pt={2}>
          Yang diajukan untuk permohonan pendaftaran merek oleh: 
        </Typography>
        <Grid container alignItems="center" pt={1}>
          <Grid item>
            <Typography>Nama Pemohon :  </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: 'bold', ml: 0.2 }}>{selectedRow?.namaPemohon}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex" pt={1}>
          <Grid item>
            <Typography>Alamat :</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: 'bold' }}>
              {selectedRow?.alamat}
            </Typography>
          </Grid>
        </Grid>

        <Typography pt={1}>
          Dengan ini menyatakan bahwa merek tersebut merupakan milik pemohon dan tidak meniru merek milik pihak lain.
        </Typography>

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={meterai} alt="Meterai" style={{ width: 200, height: 200 }} />
          </Grid>
          <Grid item>
            <img src={ttd} alt="Tanda Tangan" style={{ width: 200, height: 200 }} />
          </Grid>
        </Grid>
      </DialogContent>
    );

    const opt = {
      filename: 'report.pdf',
      margin: [10, 10, 10, 10],
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(contentToPrint).save();
  };

  return (
    <>
      <MainCard
        title='Report'
        actionright={
          <>
          <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, bgcolor: '#D9D9D9' }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                 <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Paper>
          {/* <Button variant='contained' color='primary' onClick={handleCreate}>
            Tambah
          </Button> */}
          </>
        }>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Table onUpdate={onUpdate} onDelete={onDelete} onDetail={onDetail} />
          </Grid>
        </Grid>
      </MainCard>

      {/* validation delete */}
      {/* <ConfirmDialog
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
        sx={{
          width: '519px',
          height: '705px',
        }}
      /> */}
      <Dialog
        open={confirmDetail}
        onClose={() => setConfirmDetail(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: '519px',
            height: '705px',
          },
        }}
        ref={dialogRef}
      >
        <DialogContent>
        <Typography sx={{ fontSize: '10px' }}>
          Keputusan Direktur Jenderal Kekayaan Intelektual <br/>
          Nomor : HKI-02.HI.06.01 Tahun 2017 <br/>
          Tentang : Formulir Permohonan Merek <br/>
          Tanggal : 03 Maret 2017
          <Divider sx={{pt: 2, borderColor: 'black'}} />
        </Typography>
        <Typography>
          Merek:
        </Typography>
        <Box sx={{ border: '1px solid grey', width: 400, height: 200, margin: '0 auto'}}>
          <Grid container direction="column" justifyContent="space-between" alignItems="center" height="100%">
            <Grid item>
              <Typography sx={{ textAlign: 'center' }}>Label merek</Typography>
            </Grid>

            <Grid item >
              <Typography>{selectedRow?.namaMerek}</Typography>
           </Grid>
            
            <Grid item >
              <Typography>{selectedRow?.field2}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography pt={2}>
          Yang diajukan untuk permohonan pendaftaran merek oleh : 
        </Typography>
         <Grid container alignItems="center" pt={1} >
          <Grid item>
            <Typography>Nama Pemohon :</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: 'bold', ml: 0.2 }}>{selectedRow?.namaPemohon}</Typography>
          </Grid>
        </Grid>
         <Grid container direction="row" justifyContent="flex" pt={1} >
          <Grid item>
            <Typography>Alamat :</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: 'bold', }}>
              {selectedRow?.alamat}
            </Typography>
          </Grid>
        </Grid>

        <Typography pt={1} >
          Dengan ini menyatakan bahwa merek tersebut merupakan milik pemohon dan tidak meniru merek milik pihak lain.
        </Typography>

        <Grid container direction="row" justifyContent="space-between"  alignItems="center">
            <Grid item>
              <Box component={'img'} src={meterai} sx={{width: 150, height: 150}} />
            </Grid>

            <Grid itrm>
              <Box component={'img'} src={ttd} sx={{width: 150, height: 150}} />
            </Grid>

        </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setConfirmDetail(false)}
          >
            Oke
          </Button>
          {/* <Button variant='contained' color='error' onClick={handleDelete}>
            Ya
          </Button> */}
          <Button
            variant='contained'
            color='primary'
            onClick={handlePrint}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReportPage
