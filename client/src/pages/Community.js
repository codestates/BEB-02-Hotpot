import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "id", label: "", width: 50 },
  { id: "title", label: "제목", minWidth: 400 },
  { id: "writtenby", label: "작성자", width: 120 },
  {
    id: "createdat",
    label: "작성일",
    width: 120,
  },
  { id: "viewed", label: "조회", width: 50 },
];

function createData(id, title, writtenby, createdat, viewed) {
  return { id, title, writtenby, createdat, viewed };
}

const rows = [
  createData("1", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("2", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("3", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("4", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("5", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("6", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("7", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("8", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("9", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("10", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("11", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("12", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("13", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("14", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("15", "Hotpot community", "마라탕", "2022.02.23", "123"),
  createData("16", "Hotpot community", "마라탕", "2022.02.23", "123"),
];

export default function Community() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <h3>커뮤니티 페이지</h3>
      <Link to="/write">
        <button>글쓰기</button>
      </Link>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
