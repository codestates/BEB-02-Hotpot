import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "title", label: "제목", width: 400 },
  { id: "writtenby", label: "작성자", width: 120 },
  {
    id: "createdat",
    label: "작성일",
    width: 120,
  },
  { id: "viewed", label: "조회", width: 50, align: "center" },
];

export default function Community() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function reqData() {
      await axios
        .get("http://localhost:8888/")
        .then((res) => {
          let _rows = res.data.map((data) => ({
            title: data.title,
            writtenby: data.username,
            content: data.content,
            createdat: data.date,
            viewed: data.viewed,
            id: data._id,
          }));
          setRows(rows.concat(_rows));
        })
        .catch((e) => console.log(e));
    }
    reqData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function increaseview(info) {
    await axios
      .put("http://localhost:8888/", { data: info })
      .then()
      .catch((e) => console.log(e));
  }

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
                  style={{ width: column.width }}
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
                      return column.id == "title" ? (
                        <Link
                          to={`/content/${row.id}`}
                          state={{ data: row }}
                          onClick={() => increaseview(row)}
                        >
                          <TableCell
                            key={column.id}
                            align={column.align}
                            width={850}
                          >
                            {value}
                          </TableCell>
                        </Link>
                      ) : (
                        <TableCell key={column.id} align={column.align}>
                          {value}
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
