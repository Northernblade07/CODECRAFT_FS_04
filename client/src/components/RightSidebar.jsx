import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets.js'
import { ChatContext } from '../../context/ChatContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image))
  }, [messages])

  return selectedUser && (
    <div className="bg-[#121212] text-white w-full overflow-y-auto p-5 max-md:hidden">
      <div className="flex flex-col items-center">
        <img src={selectedUser?.profilePic || assets.avatar_icon} className="w-24 h-24 rounded-full mb-3" />
        <h1 className="text-xl font-semibold">{selectedUser.fullName}</h1>
        <p className="text-sm text-gray-400">{selectedUser.bio}</p>
        {onlineUsers?.includes(selectedUser._id) && <p className="text-green-400 text-xs mt-1">Online</p>}
      </div>

      <hr className="my-4 border-gray-600" />

      <div>
        <p className="text-sm mb-2 text-gray-300">Media</p>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
          {msgImages.map((img, i) => (
            <img key={i} src={img} onClick={() => window.open(img)} className="rounded-lg cursor-pointer hover:opacity-90" />
          ))}
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full bg-gradient-to-r from-gray-600 to-gray-800  py-2 rounded-full text-sm text-white hover:opacity-90 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default RightSidebar