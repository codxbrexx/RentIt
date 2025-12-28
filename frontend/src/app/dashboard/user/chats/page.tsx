"use client";

import { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";

export default function ChatsPage() {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);

    const chats = [
        {
            id: 1,
            name: "Rohit Sharma",
            avatar: "R",
            lastMessage: "Is the property available for next month?",
            time: "2m ago",
            unread: 2,
            online: true,
            property: "Luxury Beach House"
        },
        {
            id: 2,
            name: "Priya Singh",
            avatar: "P",
            lastMessage: "Okay, I will confirm the booking tomorrow.",
            time: "1h ago",
            unread: 0,
            online: false,
            property: "Sony A7III Camera Kit"
        }
    ];

    const messages = [
        { id: 1, text: "Hi, I am interested in your property 'Luxury Beach House'.", sender: "me", time: "10:30 AM" },
        { id: 2, text: "Hello! Ideally, yes. What dates are you looking for?", sender: "them", time: "10:32 AM" },
        { id: 3, text: "I need it for the first week of Jan.", sender: "me", time: "10:33 AM" },
        { id: 4, text: "Is the property available for next month?", sender: "them", time: "10:35 AM" } // Matching last message
    ];

    return (
        <div className="h-[calc(100vh-140px)] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex overflow-hidden">

            {/* Sidebar List */}
            <div className={`w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4FD8]"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800/50 ${selectedChat === chat.id ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
                        >
                            <div className="flex gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                                        {chat.avatar}
                                    </div>
                                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">{chat.name}</h3>
                                        <span className="text-xs text-slate-500">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate mb-1">{chat.lastMessage}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 truncate max-w-[120px]">
                                            {chat.property}
                                        </span>
                                        {chat.unread > 0 && (
                                            <span className="ml-auto w-5 h-5 bg-[#1F4FD8] text-white text-xs flex items-center justify-center rounded-full">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {selectedChat ? (
                <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSelectedChat(null)} className="md:hidden text-slate-500 hover:text-slate-700">
                                Back
                            </button>
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                R
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Rohit Sharma</h3>
                                <p className="text-xs text-green-500 font-medium">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
                                <Video className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'me'
                                        ? 'bg-[#1F4FD8] text-white rounded-tr-none'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                                    }`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-[#1F4FD8] dark:text-white"
                            />
                            <button className="p-3 bg-[#1F4FD8] text-white rounded-xl hover:bg-[#1845b8] active:scale-95 transition-all">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 hidden md:flex flex-col items-center justify-center text-slate-400">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <p className="font-medium">Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
}
