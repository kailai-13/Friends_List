import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import FriendsList from "./FriendsList";
import AddFriendForm from "./AddFriend";
import { getFriends } from "./api";

function App() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const data = await getFriends();
      setFriends(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const handleAddFriend = () => {
    fetchFriends(); // Reload the friends list after adding a new friend
  };

  return (
    <Container>
      <AddFriendForm onAddFriend={handleAddFriend} /> {/* ✅ Pass callback */}
      <FriendsList friends={friends} />
    </Container>
  );
}

export default App;
