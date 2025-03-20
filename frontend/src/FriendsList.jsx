import { React, useEffect, useState } from "react";
import { deleteFriend, getFriends, updateFriend } from "./api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const data = await getFriends();
      setFriends(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error in getting friends", error);
      setFriends([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this friend?");
    if (!confirmDelete) return;

    const success = await deleteFriend(id);
    if (success) {
      alert("Friend Deleted");
      fetchFriends();
    } else {
      alert("Error in deleting friend");
    }
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleEditClick = (friend) => {
    setSelectedFriend(friend);
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    setSelectedFriend({ ...selectedFriend, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    if (!selectedFriend) return;

    const result = await updateFriend(selectedFriend.id, selectedFriend);
    if (result) {
      alert("Friend updated successfully");
      setFriends(friends.map((friend) => (friend.id === selectedFriend.id ? selectedFriend : friend)));
      fetchFriends(); // Refresh the list
    } else {
      alert("Failed to update friend");
    }
    setOpenEdit(false);
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        FRIENDS OF ME
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>ROLE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>GENDER</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell>{friend.name}</TableCell>
                <TableCell>{friend.role}</TableCell>
                <TableCell>{friend.description}</TableCell>
                <TableCell>{friend.gender}</TableCell>
                <TableCell>
                  {friend.imgUrl ? <img src={friend.imgUrl} alt="Avatar" width="50" /> : "No Image"}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(friend)} style={{ marginRight: 5 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(friend.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Friend Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Friend</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={selectedFriend?.name || ""} onChange={handleEditChange} fullWidth />
          <TextField label="Role" name="role" value={selectedFriend?.role || ""} onChange={handleEditChange} fullWidth />
          <TextField label="Description" name="description" value={selectedFriend?.description || ""} onChange={handleEditChange} fullWidth />
          <TextField label="Gender" name="gender" value={selectedFriend?.gender || ""} onChange={handleEditChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FriendsList;
