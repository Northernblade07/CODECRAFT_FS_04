import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { ChatContext } from '../../context/ChatContext.jsx'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const filteredUsers = input ? users.filter(user => user.fullName.toLowerCase().includes(input.toLowerCase())) : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers,getUsers])

  return (
    <div className={`bg-[#121212] h-full p-5 text-white overflow-y-auto ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={'/logo.png'} alt="logo" className="w-20" />
          <div className="relative group">
            <img src={assets.menu_icon} alt="menu" className="w-5 cursor-pointer" />
            <div className="absolute top-full right-0 mt-1 w-32 p-3 bg-[#1e1e2f] text-sm rounded shadow-lg hidden group-hover:block">
              <p onClick={() => navigate('/profile')} className="cursor-pointer mb-2">Edit Profile</p>
              <hr className="border-gray-600 my-1" />
              <p onClick={logout} className="cursor-pointer text-red-400">Logout</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 mt-5 rounded-full flex items-center px-4 py-2">
          <img src={assets.search_icon} alt="search" className="w-4 opacity-70" />
          <input
            onChange={e => setInput(e.target.value)}
            className="ml-2 bg-transparent outline-none text-sm placeholder-gray-400 flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user, i) => (
          <div key={i} onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition ${selectedUser?._id === user._id ? 'bg-gray-700' : ''}`}>
            <img src={user.profilePic || assets.avatar_icon} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className={`text-xs ${onlineUsers?.includes(user._id) ? 'text-green-400' : 'text-gray-500'}`}>
                {onlineUsers?.includes(user._id) ? 'Online' : 'Offline'}
              </p>
            </div>
            {unseenMessages[user._id] > 0 && (
              <div className="ml-auto bg-gray-500 text-xs w-5 h-5 flex justify-center items-center rounded-full">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar