import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function BasicTable(props) {
	let { headers, tablebody, width, sxhead, sx } = props
	let checklast = headers?.length - 1

	return (
		// <TableContainer>
		<Table
			aria-label="simple table"
			sx={sx}
			// sx={{ minWidth: "65vh" }}
		>
			<TableHead>
				<TableRow>
					{headers?.map((x, index) => (
						<TableCell
							align={checklast === index ? "right" : "left"}
							sx={sxhead}
						>
							{x}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>{tablebody}</TableBody>
		</Table>
		// </TableContainer>
	)
}
