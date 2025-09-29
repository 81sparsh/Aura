import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog';
import SearchBox from './SearchBox';
import { clearLikeNotifications, clearMessageNotifications } from '@/redux/rtnSlice';
// import Explore from './components/explore'; // Adjust path if needed

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification = [], messageNotification = [] } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [messagePopoverOpen, setMessagePopoverOpen] = useState(false);
    const url = import.meta.env.VITE_URL || 'http://localhost:5000';

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${url}/api/v1/user/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        }
        else if( textType === "Explore"){
            navigate("/explore");
        
        } else if (textType === 'Messages') {
            navigate("/chat");
        } else if (textType === 'Search') {
            setSearchOpen(true); // Open the modal
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>  <img src={user?.profilePicture ? '' : '/profile.jpeg'} alt="default" className="w-full h-full object-cover" /></AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <img src="/Aura1.png" alt="Aura Logo" className="w-40 h-30 mx-auto mb-2" />
                <h1 className='my-8 pl-3 font-bold text-xl'>Aura++</h1>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            if (item.text === "Notifications") {
                                return (
                                    <Popover open={notificationOpen} onOpenChange={(open)=>{ setNotificationOpen(open); if(open===true){ dispatch(clearLikeNotifications()); } }} key={index}>
                                        <PopoverTrigger asChild>
                                            <div
                                                onClick={() => setNotificationOpen(true)}
                                                className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                                            >
                                                {item.icon}
                                                <span>{item.text}</span>
                                                <Button
                                                    size='icon'
                                                    className={`rounded-full h-5 w-5 absolute bottom-6 left-6 ${likeNotification.length > 0 ? 'bg-red-600 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-300 text-gray-700'}`}
                                                >
                                                    {likeNotification.length}
                                                </Button>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-72">
                                            <div className='max-h-80 overflow-y-auto'>
                                                {likeNotification.length === 0 ? (
                                                    <p className='text-sm text-gray-500'>No new notifications</p>
                                                ) : (
                                                    likeNotification.map((notification, idx) => (
                                                        <div key={`${notification.userId || 'u'}-${notification.postId || 'p'}-${idx}`} className='flex items-center gap-2 my-2'>
                                                            <Avatar>
                                                                <AvatarImage src={notification.userDetails?.profilePicture || undefined} />
                                                                <AvatarFallback>
                                                                    <img src='/profile.jpeg' alt="default" className="w-full h-full object-cover" />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            }

                            // Message popover
                            if (item.text === "Messages") {
                                return (
                                    <Popover open={messagePopoverOpen} onOpenChange={(open)=>{ setMessagePopoverOpen(open); if(open===true){ dispatch(clearMessageNotifications()); } }} key={index}>
                                        <PopoverTrigger asChild>
                                            <div
                                                onMouseEnter={() => setMessagePopoverOpen(true)}
                                                onMouseLeave={() => setMessagePopoverOpen(false)}
                                                onClick={() => sidebarHandler(item.text)}
                                                className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'
                                            >
                                                {item.icon}
                                                <span>{item.text}</span>
                                                <Button
                                                    size='icon'
                                                    className={`rounded-full h-5 w-5 absolute bottom-6 left-6 ${messageNotification.length > 0 ? 'bg-blue-600 hover:bg-blue-600' : 'bg-gray-300 hover:bg-gray-300 text-gray-700'}`}
                                                >
                                                    {messageNotification.length}
                                                </Button>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-72">
                                            <div className='max-h-80 overflow-y-auto'>
                                                {messageNotification.length === 0 ? (
                                                    <p className='text-sm text-gray-500'>No new messages</p>
                                                ) : (
                                                    messageNotification.map((msg, idx) => (
                                                        <div key={`${msg.userId || 'u'}-${idx}`} className='flex items-center gap-2 my-2'>
                                                            <Avatar>
                                                                <AvatarImage src={msg.userDetails?.profilePicture || '/profile.jpeg'} />
                                                                <AvatarFallback>
                                                                    <img src='/profile.jpeg' alt="default" className="w-full h-full object-cover" />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <p className='text-sm'><span className='font-bold'>{msg.userDetails?.username}</span> sent you a message</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            }

                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />

            {/* Search Modal */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="max-w-md w-full p-0 rounded-xl shadow-2xl bg-white border border-gray-200">
                    <SearchBox />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LeftSidebar

// socketio.on('messageNotification', (notifications) => {
//   dispatch(setMessageNotification(notifications));
// });