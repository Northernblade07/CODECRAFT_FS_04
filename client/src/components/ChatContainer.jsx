import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets.js'
import { formatMessageTime } from '../lib/utils.js'
import { ChatContext } from '../../context/ChatContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import {Send, SendIcon} from 'lucide-react'
const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()
    const [input, setInput] = useState('')

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (input.trim() === "") return
        await sendMessage({ text: input.trim() })
        setInput("")
    }

    const handleSendImage = async (e) => {
        const file = e.target.files[0]
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Select an image file")
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) getMessages(selectedUser._id)
    }, [selectedUser, getMessages])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return selectedUser ? (
        <div className="h-full relative bg-[#121212] text-white overflow-hidden flex flex-col border-x border-gray-700 ">
            {/* Header */}
            <div className="flex items-center gap-3 py-4 px-6 border-b border-gray-700 bg-[#33353f]">
                <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 h-8 rounded-full" />
                <p className="flex-1 text-base font-medium flex items-center gap-2">
                    {selectedUser.fullName}
                    {onlineUsers?.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500" />}
                </p>
                <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden w-6 cursor-pointer" />
                <img src={assets.help_icon} alt="" className="hidden md:block w-5" />
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-5 overflow-y-scroll custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
                        {msg.image ? (
                            <img src={msg.image} alt="" className="max-w-[240px] rounded-lg shadow-lg border border-gray-600" />
                        ) : (
                            <p className={`max-w-[250px] text-sm p-3 rounded-xl shadow-md ${
                                msg.senderId === authUser._id
                                    ? 'bg-[#4a5568] text-white rounded-br-none'
                                    : 'bg-[#2d3748] text-gray-100 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </p>
                        )}
                        <div className="text-xs text-gray-500 text-center">
                            <img
                                src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                                alt=""
                                className="w-7 h-7 rounded-full mx-auto"
                            />
                            <p>{formatMessageTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-700 bg-[#18191d] flex items-center gap-3">
                <div className="flex-1 flex items-center bg-[#2d2f3a] px-4 py-2 rounded-full">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
                        type="text"
                        placeholder="Type a message..."
                        className="bg-transparent text-sm text-white placeholder-gray-400 flex-1 outline-none"
                    />
                    <input onChange={handleSendImage} type="file" id="image" accept="image/png, image/jpeg" hidden />
                    <label htmlFor="image">
                        <img src={assets.gallery_icon} alt="Gallery" className="w-5 h-5 cursor-pointer ml-2" />
                    </label>
                </div>
                <button onClick={handleSendMessage} >
                {/* <img src={assets.send_button} alt="Send" className="w-7 h-7 cursor-pointer" /> */}
                <Send/>
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-[#121212] border border-gray-700 max-md:hidden">
            <img src={'/logo.png'} className="size-50 mb-3" alt="Logo" />
            <p className="text-lg text-white">Chat anytime, anywhere</p>
        </div>
    )
}

export default ChatContainer
