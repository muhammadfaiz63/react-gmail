import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function BasicTable(props) {
  let { header, tablebody } = props
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {header?.map((x) => (
              <TableCell
                sx={{ backgroundColor: '#293D4F', color: '#fff' }}
                align={x === 'Aksi' ? 'right' : 'left'}>
                {x}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tablebody}</TableBody>
      </Table>
    </TableContainer>
  )
}
