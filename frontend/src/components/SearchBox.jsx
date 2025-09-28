import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBox = ({ closeSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState({});
  const { user } = useSelector(store => store.auth);

  // Fetch all users on mount or when query is cleared
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/user/search?query=`, { withCredentials: true });
        setResults(res.data.users || []);
        const followingMap = {};
        (res.data.users || []).forEach(u => {
          followingMap[u._id] = user?.following?.includes(u._id);
        });
        setFollowing(followingMap);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    if (query.trim() === '') {
      fetchUsers();
    }
  }, [query, user]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      // Results will be set by useEffect
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/user/search?query=${encodeURIComponent(value)}`, { withCredentials: true });
      setResults(res.data.users || []);
      const followingMap = {};
      (res.data.users || []).forEach(u => {
        followingMap[u._id] = user?.following?.includes(u._id);
      });
      setFollowing(followingMap);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (targetUserId) => {
    try {
      await axios.post(`http://localhost:5000/api/v1/user/followorunfollow/${targetUserId}`, {}, { withCredentials: true });
      setFollowing(prev => ({ ...prev, [targetUserId]: !prev[targetUserId] }));
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition"
      />
      {/* Results Dropdown */}
      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
        {loading && <div className="p-4 text-center text-gray-400">Searching...</div>}
        {!loading && results.length === 0 && (
          <div className="p-4 text-center text-gray-400">No results found</div>
        )}
        {!loading && results.map(userResult => (
          <div
            key={userResult._id}
            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition"
          >
            <Link
              to={`/profile/${userResult._id}`}
              onClick={closeSearch}
            >
              <img src={userResult.profilePicture || '/profile.jpeg'} alt="profile" className="w-8 h-8 rounded-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                to={`/profile/${userResult._id}`}
                onClick={closeSearch}
              >
                <div className="font-semibold truncate">{userResult.username}</div>
              </Link>
              <div className="text-xs text-gray-500 truncate">{userResult.bio}</div>
            </div>
            {userResult._id !== user?._id && (
              <button
                onClick={() => handleFollow(userResult._id)}
                className={`px-3 py-1 text-xs rounded font-semibold transition ${
                  following[userResult._id]
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {following[userResult._id] ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;