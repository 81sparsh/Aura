import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { setAuthUser, setSuggestedUsers } from '@/redux/authSlice';

const SuggestedUsers = () => {
    const dispatch = useDispatch();
    const url = process.env.URL || 'http://localhost:5000';
    const { suggestedUsers = [], user: authUser } = useSelector(store => store.auth);

    const handleFollow = async (targetUserId) => {
        try {
            const res = await axios.post(`${url}/api/v1/user/followorunfollow/${targetUserId}`, {}, { withCredentials: true });
            if (res.data.success) {
                const isNowFollowing = res.data.type === 'followed';

                const updatedAuthUser = {
                    ...authUser,
                    following: isNowFollowing
                        ? [...(authUser?.following || []), targetUserId]
                        : (authUser?.following || []).filter(id => String(id) !== String(targetUserId))
                };
                dispatch(setAuthUser(updatedAuthUser));

                // Optimistically remove followed user from suggestions
                if (isNowFollowing) {
                    const remaining = suggestedUsers.filter(u => u._id !== targetUserId);
                    dispatch(setSuggestedUsers(remaining));
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Failed to update follow state');
        }
    }
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((suggested) => {
                    return (
                        <div key={suggested._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${suggested?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={suggested?.profilePicture} alt="post_image" />
                                        <AvatarFallback>  <img src={suggested?.profilePicture ? '' : '/profile.jpeg'} alt="default" className="w-full h-full object-cover" /></AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${suggested?._id}`}>{suggested?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{suggested?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span onClick={() => handleFollow(suggested?._id)} className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers
