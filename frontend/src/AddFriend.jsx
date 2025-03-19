import { useEffect } from "react";
import { useState } from "react";
import {
    TextField,
    Button,
    Paper,
    Typography,
 
    Box,
    MenuItem
} from '@mui/material';
import { addFriend } from "./api";

const AddFriendForm = ({onAddFriend}) => {
    const [friendData, setFriendData]=useState({
        name: '',
        role: '',
        description: '',
        gender:''
    });

    const handleChange= (e)=>{
        setFriendData({...friendData , [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!friendData.name || !friendData.role || !friendData.description || !friendData.gender) {
            alert('All Fields Are Required');
            return;
        }
    
        try {
            const response = await addFriend(friendData);  // ✅ Await API response
            if (response) {
                alert("Friend added successfully");
                onAddFriend();  // ✅ Refresh the list
                setFriendData({ name: '', role: '', description: '', gender: '' });  // ✅ Reset form
            } else {
                alert("Failed to add friend");
            }
        } catch (error) {
            console.error("Error adding friend:", error);
            alert("Something went wrong!");
        }
    };
    

    return (
        <Paper>
            <Typography>
                Add Friend
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                fullWidth
                label="Name"
                name="name"
                value={friendData.name}
                onChange={handleChange}
                margin="normal"/>
                <TextField
                fullWidth
                label="Role"
                name="role"
                value={friendData.role}
                onChange={handleChange}
                margin="normal"/>
                <TextField
                fullWidth
                label="Description"
                name="description"
                value={friendData.description}
                onChange={handleChange}
                margin="normal"/>
                <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={friendData.gender}
                onChange={handleChange}
                margin="normal">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                <Box>
                    <Button type="submit" variant="contained" color="primary">Add Friend</Button>
                </Box>
            </form>
        </Paper>

    );
};

export default AddFriendForm;