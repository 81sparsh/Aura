import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetSuggestedUsers = () => {
    const url = import.meta.env.VITE_URL || 'http://localhost:5000';
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                console.log('Fetching suggested users from:', `${url}/api/v1/user/suggested`);
                const res = await axios.get(`${url}/api/v1/user/suggested`, { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (res.data.success) { 
                    console.log('Suggested users fetched successfully:', res.data.users);
                    dispatch(setSuggestedUsers(res.data.users));
                }
            } catch (error) {
                console.error('Error fetching suggested users:', error);
                if (error.response?.status === 401) {
                    console.error('Authentication failed - user not logged in');
                }
            }
        }
        fetchSuggestedUsers();
    }, []);
};
export default useGetSuggestedUsers;