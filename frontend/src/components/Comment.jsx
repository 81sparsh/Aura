import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <Link to={`/profile/${comment?.author?._id}`}>
                      <AvatarImage src={comment?.author?.profilePicture} />
                    </Link>
                    <Link to={`/profile/${comment?.author?._id}`}>
                      <AvatarFallback>
                        <img src={comment?.author?.profilePicture ? '' : '/profile.jpeg'} alt="default" className="w-full h-full object-cover" />
                      </AvatarFallback>
                    </Link>
                </Avatar>
               <Link to={`/profile/${comment?.author?._id}`}>
                   <h1 className='font-bold text-sm'>{comment?.author?.username || 'Unknown'} <span className='font-normal pl-1'>{comment?.text}</span></h1>
               </Link>
            </div>
        </div>
    )
}

export default Comment