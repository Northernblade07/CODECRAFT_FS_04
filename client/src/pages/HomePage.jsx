import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext.jsx'

const HomePage = () => {
  const { selectedUser} = useContext(ChatContext)

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] sm:px-[10%] sm:py-[5%]">
      <div className={`border border-gray-700 rounded-2xl overflow-hidden h-full grid grid-cols-1 backdrop-blur-xl ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  )
}

export default HomePage