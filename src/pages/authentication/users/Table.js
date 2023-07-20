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
} from '@mui/material'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import _ from 'lodash'

import { tableContainer, tableXS } from './Style'
import moment from 'moment'
import TableHead from './TableHead'

import { UserContext } from 'context'

function DetailTable(props) {
  // context
  const { filterUsers } = useContext(UserContext)

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
          {filterUsers?.length ? (
            <TableBody>
              {_.sortBy(filterUsers, ['_id'])
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
                        <Typography>{row?.code}</Typography>
                        <Typography>{row?.name}</Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography>{row?.nameVendor}</Typography>
                        <Typography>{row?.contactVendor}</Typography>
                      </TableCell>
                      <TableCell align='center'>{row?.make}</TableCell>
                      <TableCell align='center'>{row?.model}</TableCell>
                      <TableCell align='center'>{row?.status}</TableCell>
                      <TableCell align='right'>
                        <Stack
                          spacing={1}
                          direction='row'
                          justifyContent='flex-end'>
                          <IconButton
                            onClick={() => props.onUpdate(row)}
                            sx={{
                              color: '#03a9f4',
                            }}>
                            <EditOutlined />
                          </IconButton>
                          <IconButton
                            onClick={() => props.onDelete(row)}
                            sx={{
                              color: '#e91e63',
                            }}>
                            <DeleteOutlined />
                          </IconButton>
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
        count={filterUsers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default DetailTable
