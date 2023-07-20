import React, { useContext, useState } from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Stack,
  TablePagination,
  Typography,
  Tooltip,
} from '@mui/material'
import { EditOutlined, DeleteOutlined, BellOutlined } from '@ant-design/icons'
import DescriptionIcon from '@mui/icons-material/Description';
import _ from 'lodash'

// membuat format tanggal
import moment from 'moment'

import { tableContainer, tableXS } from './Style'
import TableHead from './TableHead'

import { ReportContext } from 'context'

function DetailTable(props) {
  // context
  const { filterReports } = useContext(ReportContext)

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }


  return (
    <>
      <TableContainer sx={tableContainer}>
        <Table stickyHeader sx={tableXS} aria-label='simple table'>
          <TableHead />
          {filterReports?.length ? (
            <TableBody>
              {_.sortBy(filterReports, ['_id'])
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                      <TableCell
                        component='th'
                        id={row._id}
                        scope='row'
                        align='left'>
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{moment(row.tanggal).format('DD-MM-YYYY mm:ss')}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.namaPemohon}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.namaMerek}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.alamat}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.negara}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.telepon}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row.dataKelas}</Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Stack
                          spacing={1}
                          direction='row'
                          justifyContent='flex-end'>
                          <IconButton
                            onClick={() => props.onDetail(row)}
                            sx={{
                              color: '#000000',
                            }}>
                            <DescriptionIcon />
                          </IconButton>
                          {/* <IconButton
                            onClick={() => props.onDelete(row)}
                            sx={{
                              color: '#e91e63',
                            }}>
                            <DeleteOutlined />
                          </IconButton>
                          <IconButton
                            onClick={() => props.onDelete(row)}
                            sx={{
                              color: '#8b8000',
                            }}>
                            <BellOutlined />
                          </IconButton> */}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          ) : (
            <TableBody>
              <TableCell colSpan={9} align='center'>
                Data Kosong
              </TableCell>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        component='div'
        count={filterReports?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default DetailTable
