import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Avatar,
  IconButton,
  Card,
  Grid,
} from "@mui/material";
import { useUserListsQuery } from "./Api";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { UserType } from "./Dashboard";

const UserList = ({
  searchQuery,
  handleOpenEdit,
  handleDelete,
}: {
  searchQuery: string;
  handleOpenEdit: (data: UserType) => void;
  handleDelete: (id: string) => void;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: users } = useUserListsQuery(page);

  console.log("users ", users);

  useEffect(() => {
    // setPage(users?.page);
    // setRowsPerPage(users?.per_page);
  }, [users]);

  // Filter rows based on search query
  const filteredRows = users?.data?.filter((row: any) =>
    row?.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <Grid item xs={12}>
      {/* <Item> */}
      {/* <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2 }}
            /> */}
      <TableContainer>
        <Table sx={{ boxShadow: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    <Avatar
                      src={row?.avatar}
                      alt={row?.first_name}
                      sx={{ width: 60, height: 60, margin: "auto", marginBottom: 1 }}
                    />
                  </TableCell>
                  <TableCell>{row?.email}</TableCell>
                  <TableCell>{row?.first_name}</TableCell>
                  <TableCell>{row?.last_name}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => handleOpenEdit(row)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users?.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Item> */}
    </Grid>
  );
};

export default UserList;
