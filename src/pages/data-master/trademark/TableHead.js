import { TableCell, TableHead, TableRow } from '@mui/material'
import PropTypes from 'prop-types'

import { headCells } from './header'

export default function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ backgroundColor: '#293D4F', color: '#fff' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
}
