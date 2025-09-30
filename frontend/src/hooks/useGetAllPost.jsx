import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllPost = () => {
    const url = import.meta.env.VITE_URL || 'http://localhost:5000';
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                console.log('Fetching posts from:', `${url}/api/v1/post/all`);
                const res = await axios.get(`${url}/api/v1/post/all`, { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (res.data.success) {
                    console.log('Posts fetched successfully:', res.data.posts);
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                if (error.response?.status === 401) {
                    console.error('Authentication failed - user not logged in');
                }
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;