import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#293D4F',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export { StyledTableRow, StyledTableCell }

export default function CustomizedTables({ headers, rows, tablebody, sxhead }) {
  let lastelement = headers[headers?.length - 1]
  const [lastItem] = headers.slice(-1)
  let checklast = headers?.length - 1
  return (
    // <TableContainer component={Paper}>
    <Table fullWidth aria-label='customized table' size='small' padding='none'>
      <TableHead>
        <TableRow>
          {headers.map((x, index) => (
            <StyledTableCell
              key={index}
              padding='none'
              sx={sxhead}
              align={checklast === index ? 'right' : 'left'}
              // align={x === "Aksi" ? "right" : "left"}
            >
              {x}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{tablebody}</TableBody>
    </Table>
    // </TableContainer>
  )
}
