import { Tab, Tabs, TextField, Button, Grid, Card } from "@mui/material";
import { useState } from "react";
import UserList from "./UserList";
import UserCartList from "./UserCartList";
import CreateUserDialog from "./CreateUserDialog";
import { useDeleteUserMutation } from "./Api";
// import { Title } from "@mui/icons-material";
import { useAuth } from "../../auth/AuthContext";

export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [deleteUser] = useDeleteUserMutation();
  const { logout } = useAuth();
  const handleOpenModal = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (user: UserType) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDelete = (id: string) => {
    deleteUser(id)
      .unwrap()
      .then((response: any) => {
        console.log("User updated:", response);
      })
      .catch((error) => console.error("Update error:", error));
  };

  return (
    <Card sx={{ width: "100vw", maxWidth: "1200px", margin: "auto", padding: 2, marginTop: 3 }}>
      {/* Top Section with Tabs (Left) & Search + Button (Right) */}
      <Grid container alignItems="center" spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={6}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="User List" />
            <Tab label="User Cart List" />
          </Tabs>
        </Grid>

        <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <TextField
              label="Search..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ boxShadow: "none" }}
              onClick={handleOpenModal}
            >
              Create User
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              sx={{ boxShadow: "none" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Tab Content */}
      {tabValue === 0 && (
        <UserList
          searchQuery={searchQuery}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handleDelete}
        />
      )}
      {tabValue === 1 && (
        <UserCartList
          searchQuery={searchQuery}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handleDelete}
        />
      )}

      <CreateUserDialog open={openModal} onClose={handleCloseModal} editingUser={editingUser} />
    </Card>
  );
};

export default Dashboard;
