import React from 'react';
import { Link } from 'react-router-dom';

const FollowBox = ({ user, isFollowing, onFollowToggle, showFollowButton = true }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
      <Link to={`/profile/${user._id}`}>
        <img
          src={user.profilePicture || '/profile.jpeg'}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/profile/${user._id}`}>
          <div className="font-semibold truncate">{user.username}</div>
        </Link>
        <div className="text-xs text-gray-500 truncate">{user.bio}</div>
      </div>
      {showFollowButton && (
        <button
          onClick={() => onFollowToggle(user._id)}
          className={`px-3 py-1 text-xs rounded font-semibold transition ${
            isFollowing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default FollowBox;