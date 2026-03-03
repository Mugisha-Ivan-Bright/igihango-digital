import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { MessageSquare, Send, Users, Search, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';
import { useElasticScroll } from '../hooks/useElasticScroll';

const Communications = () => {
    const [selectedChat, setSelectedChat] = useState(0);
    const scrollRef = useElasticScroll();

    const conversations = [
        { id: 0, name: 'Mayor of Gasabo', role: 'District Leader', avatar: 'MG', lastMessage: 'Please review the infrastructure report', time: '10 min ago', unread: 3, online: true },
        { id: 1, name: 'Executive Secretary - Remera', role: 'Sector Leader', avatar: 'ES', lastMessage: 'Agricultural survey completed', time: '1 hour ago', unread: 0, online: true },
        { id: 2, name: 'Village Chief - Kimironko', role: 'Cell Leader', avatar: 'VK', lastMessage: 'Community meeting scheduled', time: '2 hours ago', unread: 1, online: false },
        { id: 3, name: 'District Development Team', role: 'Group • 12 members', avatar: 'DT', lastMessage: 'New project proposal shared', time: '3 hours ago', unread: 5, online: false },
    ];

    const messages = [
        { sender: 'Mayor of Gasabo', message: 'Good morning! I need your input on the Q1 development report.', time: '09:30 AM', isOwn: false },
        { sender: 'You', message: "Good morning! I'll review it and send my feedback by end of day.", time: '09:35 AM', isOwn: true },
        { sender: 'Mayor of Gasabo', message: 'Perfect. Also, please check the infrastructure budget allocation.', time: '09:40 AM', isOwn: false },
        { sender: 'You', message: 'Will do. I noticed some discrepancies in the road construction costs.', time: '09:45 AM', isOwn: true },
        { sender: 'Mayor of Gasabo', message: 'Please review the infrastructure report and share your thoughts.', time: '10:15 AM', isOwn: false },
    ];

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Communications" />

                <div className="flex-1 overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="h-full bg-background rounded-xl sm:rounded-2xl shadow-neumorphism overflow-hidden flex flex-col md:flex-row">
                        {/* Conversations List */}
                        <div className="w-full md:w-80 border-r border-gray-200 flex  flex-col">
                            <div className="p-3 sm:p-4 border-b border-gray-200">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        className="w-full px-3 py-2 pl-9 rounded-lg bg-background shadow-neumorphism-inset text-xs sm:text-sm focus:outline-none"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((conv) => (
                                    <div
                                        key={conv.id}
                                        onClick={() => setSelectedChat(conv.id)}
                                        className={`p-3 sm:p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-white/50 ${selectedChat === conv.id ? 'bg-white shadow-neumorphism-sm' : ''
                                            }`}
                                    >
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-neumorphism-sm text-xs sm:text-sm">
                                                    {conv.avatar}
                                                </div>
                                                {conv.online && (
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-success rounded-full border-2 border-background"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                                    <h4 className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{conv.name}</h4>
                                                    <span className="text-[10px] sm:text-xs text-gray-400 ml-2">{conv.time}</span>
                                                </div>
                                                <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">{conv.role}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs sm:text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                                    {conv.unread > 0 && (
                                                        <span className="ml-2 px-1.5 py-0.5 bg-primary text-white text-[10px] rounded-full flex-shrink-0">
                                                            {conv.unread}
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
                        <div className="flex-1 flex  flex-col">
                            {/* Chat Header */}
                            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="relative">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-neumorphism-sm text-xs sm:text-sm">
                                            {conversations[selectedChat].avatar}
                                        </div>
                                        {conversations[selectedChat].online && (
                                            <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-success rounded-full border-2 border-background"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{conversations[selectedChat].name}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-500">{conversations[selectedChat].role}</p>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all">
                                    <Users size={16} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] sm:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                                            <div className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-neumorphism-sm ${msg.isOwn ? 'bg-primary text-white' : 'bg-white'
                                                }`}>
                                                {!msg.isOwn && (
                                                    <p className="text-[10px] sm:text-xs font-semibold mb-0.5 text-primary">{msg.sender}</p>
                                                )}
                                                <p className="text-xs sm:text-sm leading-relaxed">{msg.message}</p>
                                                <p className={`text-[10px] sm:text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-gray-400'}`}>
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-3 sm:p-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center justify-center flex-shrink-0">
                                        <Paperclip size={16} className="text-gray-600" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-inset text-xs sm:text-sm focus:outline-none"
                                    />
                                    <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-background shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center justify-center flex-shrink-0">
                                        <Smile size={16} className="text-gray-600" />
                                    </button>
                                    <button className="px-4 py-2 sm:px-6 sm:py-3 bg-primary text-white rounded-lg sm:rounded-xl shadow-neumorphism-sm hover:shadow-neumorphism transition-all flex items-center gap-2 flex-shrink-0">
                                        <Send size={14} className="sm:w-4 sm:h-4" />
                                        <span className="hidden sm:inline text-sm">Send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communications;
