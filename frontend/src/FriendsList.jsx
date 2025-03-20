import {React , useEffect , useState} from 'react';
import {deleteFriend, getFriends} from './api';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';


const FriendsList  =()=>{
    const [friends , setFriends] = useState([]);
    useEffect(()=>{
        fetchFriends();

    },[]);

    const fetchFriends = async ()=>{
        try{
            const data = await getFriends();
            setFriends(Array.isArray(data) ? data : []); 
        }
        catch(error){
            console.log("Error in getting friends",error)
            setFriends([]); 
        }

    }
const handleDelete = async (id)=>{
    const confrimDelete = window.confirm("Are you sure you want to delete this friend?");
    if (!confrimDelete){
        return;}
    const s = await deleteFriend(id);
    if (s)
    {
        alert("Friend Deleted")
        fetchFriends();
    }
    
    else{
        alert("Error in deleting friend")
    }
        

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
                                    {friend.imgUrl ? (
                                        <img src={friend.imgUrl} alt="Avatar" width="50" />
                                    ) : (
                                        "No Image"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <button  variant="contained"
                                        color="secondary" onClick={() => handleDelete(friend.id)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>

    </>
);
};


export default FriendsList;
