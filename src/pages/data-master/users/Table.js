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
  Button,
  Grid,
  TextField,
} from '@mui/material'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import _ from 'lodash'
import FormDialog from 'components/dialogs/FormDialog'

import { tableContainer, tableXS } from './Style'
import TableHead from './TableHead'

import { UserContext } from 'context'

function DetailTable(props) {
  // context
  const { filterUsers,updateUser } = useContext(UserContext)

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [action, setAction] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [values, setValues] = useState('')
  const [dialog, setDialog] = useState(false)

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpen = async (event) => {
    await setValues(event)
    setDialog(true)
    setAction(event?.user?.username && event?.user?.password ? "edit" : "create")
  }

  const handleSubmit = async () => {
    try {
      await updateUser({...values,user:{...values.user,username, password}, username, password})
      setDialog(false)
      setValues('')
    } catch (err) {
      alert(err)
    }
  }


  return (
    <>
      <TableContainer sx={tableContainer}>
        <Table stickyHeader sx={tableXS} aria-label="simple table">
          <TableHead />
          {filterUsers?.length ? (
            <TableBody>
              {_.sortBy(filterUsers, ["_id"])
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell
                        component="th"
                        id={row._id}
                        scope="row"
                        align="left"
                      >
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row?.name}</Typography>
                        <Typography>
                          {row?.gender ? "Laki-laki" : "Perempuan"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row?.phone}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row?.email}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row?.user?.role?.name}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          spacing={1}
                          direction="row"
                          justifyContent="flex-end"
                        >
                          <Button
                            onClick={() => handleOpen(row)}
                            color={
                              row?.user?.username && row?.user?.password
                                ? "warning"
                                : "info"
                            }
                            variant="contained"
                          >
                            {row?.user?.username && row?.user?.password
                              ? "Ubah Akun"
                              : "Buat Akun"}
                          </Button>
                          <IconButton
                            onClick={() => props.onUpdate(row)}
                            sx={{
                              color: "#03a9f4",
                            }}
                          >
                            <EditOutlined />
                          </IconButton>
                          <IconButton
                            onClick={() => props.onDelete(row)}
                            sx={{
                              color: "#e91e63",
                            }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableBody>
              <TableCell colSpan={11} align="center">
                Data Kosong
              </TableCell>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
        component="div"
        count={filterUsers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FormDialog
        title={action === "edit" ? "Ubah Akun" : "Buat Akun"}
        open={dialog}
        onClose={() => setDialog(false)}
        content={
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography>Username</Typography>
                <TextField
                  sx={{ backgroundColor: "#fff" }}
                  size={"small"}
                  placeholder={"username"}
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Password</Typography>
                <TextField
                  sx={{ backgroundColor: "#fff" }}
                  size={"small"}
                  placeholder={"Password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </>
        }
        actions={
          <Grid container spacing={2} justifyContent="flex-end">
            <Button
              color={"grey"}
              sx={{ mr: 1, bgcolor: "gray", color: "#fff" }}
              variant="contained"
              onClick={() => setDialog(false)}
            >
              Cancel
            </Button>
            <Button
              color={"success"}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        }
      />
    </>
  );
}

export default DetailTable
