import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; 


export const getFriends = async () => {
    try {
        const response = await axios.get(`${API_URL}/friends`);
        return response.data;
    } catch (error) {
        console.error('Error fetching friends:', error);
        return [];
    }
};


export const addFriend = async (friend) => {
    try {
        const response = await axios.post(`${API_URL}/add_friends`, friend);
        return response.data;
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
};

export const updateFriend = async (id, friend) => {
    try {
        const response = await axios.put(`${API_URL}/update_friends/${id}`, friend);
        return response.data;
    } catch (error) {
        console.error('Error updating friend:', error);
        throw error;
    }
};


export const deleteFriend = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete_friends/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting friend:', error);
        throw error;
    }
};
