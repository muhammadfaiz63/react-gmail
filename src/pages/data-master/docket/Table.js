import React, { useContext, useState } from "react";
import { Table, TableContainer, TableBody, TableRow, TableCell, IconButton, Stack, TablePagination, Typography, Tooltip } from "@mui/material";
import { EditOutlined, DeleteOutlined, BellOutlined } from "@ant-design/icons";
import _ from "lodash";

import { tableContainer, tableXS } from "./Style";
import TableHead from "./TableHead";

import { DocketContext } from "context";

function DetailTable(props) {
  // context
  const { filterDockets } = useContext(DocketContext);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={tableContainer}>
        <Table stickyHeader sx={tableXS} aria-label="simple table">
          <TableHead />
          {filterDockets?.length ? (
            <TableBody>
              {_.sortBy(filterDockets, ["_id"])
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell component="th" id={row._id} scope="row" align="left">
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.docketingEvent}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.docketingEventDate}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.referenceNumber}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.recordType}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.title}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.description}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.country}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.client}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography>{row.status}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack spacing={1} direction="row" justifyContent="flex-end">
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
                          <IconButton
                            onClick={() => props.onDelete(row)}
                            sx={{
                              color: "#8b8000",
                            }}
                          >
                            <BellOutlined />
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
      <TablePagination rowsPerPageOptions={[10, 25, 50, 100, 200]} component="div" count={filterDockets?.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </>
  );
}

export default DetailTable;
