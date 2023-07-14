import React, { useContext, useState } from "react";
// MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// Staff context
import { Context } from "../contexts/Context";

// toastify
import { Delete, Edit } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
// import "react-toastify/dist/ReactToastify.css";
import TransitionsModal from "../components/TransitionsModal";
import { Link } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// columns for properties of staff
const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  {
    id: "img",
    label: "Image",
    minWidth: 100,
  },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "views",
    label: "Views",
    minWidth: 60,
  },
  {
    id: "actractive",
    label: "Actractive",
    minWidth: 60,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 60,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
  },
];

export const Dashboard = () => {
  const [selectedId, setSelectedId] = useState(null);

  // get function from staffContext
  const { news, handleDelete } = useContext(Context);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <TransitionsModal
        staffId={selectedId}
        handleClose={() => setSelectedId(null)}
      />
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
          marginTop={2}
          fontWeight="bold"
        >
          DashBoard
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component={Link} to="/add" variant="contained">
          <AddBoxIcon />
          Add News
        </Button>
      </Container>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
              {news
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((context) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={context.id}
                    >
                      {columns.map((column) => {
                        const value = context[column.id];
                        if (column.id === "Action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div style={{ display: "flex" }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{ marginRight: "8px" }}
                                  startIcon={<Edit />}
                                  onClick={() => setSelectedId(context.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  style={{ marginLeft: "8px" }}
                                  onClick={() => handleDelete(context.id)}
                                  startIcon={<Delete />}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          );
                        }
                        if (column.id === "img") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                src={context.img}
                                alt="Avatar"
                                style={{
                                  width: "150px",
                                  height: "100px",
                                }}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {context.status ? "Active" : "Not Active"}
                            </TableCell>
                          );
                        }
                        if (column.id === "actractive") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {context.actractive ? "Actractive" : "Not Actractive"}
                            </TableCell>
                          );
                        }
                        // if (column.id === "createdAt") {
                        //   const date = new Date(value);
                        //   const formattedDate = `${date.getDate()}/${
                        //     date.getMonth() + 1
                        //   }/${date.getFullYear()}`;
                        //   return (
                        //     <TableCell key={column.id} align={column.align}>
                        //       {formattedDate}
                        //     </TableCell>
                        //   );
                        // }
                        return (
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={news.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
