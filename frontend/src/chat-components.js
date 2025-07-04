import React, { useState, useEffect, useRef } from 'react';
import { useChat } from './contexts/ChatContext';
import { useAuth } from './contexts/AuthContext';

// Chat Interface Main Component
export const ChatInterface = () => {
  const { user } = useAuth();
  const { 
    currentChannel, 
    activeChannels, 
    onlineUsers, 
    getChannelMessages, 
    sendMessage, 
    joinChannel 
  } = useChat();
  const [message, setMessage] = useState('');
  const [showChannelList, setShowChannelList] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChannel, getChannelMessages(currentChannel?.id || '')]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && currentChannel) {
      sendMessage(currentChannel.id, message);
      setMessage('');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <p>Please log in to access chat</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${showChannelList ? 'block' : 'hidden'} md:block w-64 bg-gray-800 border-r border-gray-700`}>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Channels</h2>
        </div>
        
        <div className="overflow-y-auto">
          {activeChannels.map(channel => (
            <div
              key={channel.id}
              onClick={() => {
                joinChannel(channel.id);
                setShowChannelList(false);
              }}
              className={`p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 ${
                currentChannel?.id === channel.id ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">#</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{channel.name}</h3>
                  <p className="text-gray-400 text-sm">{channel.memberCount} members</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <h3 className="text-white font-medium mb-3">Online Users</h3>
          <div className="space-y-2">
            {onlineUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-6 h-6 bg-gray-600 rounded-full overflow-hidden">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <span className="text-gray-300 text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowChannelList(!showChannelList)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                ☰
              </button>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">#</span>
              </div>
              <div>
                <h2 className="text-white font-bold">{currentChannel?.name || 'Select a channel'}</h2>
                <p className="text-gray-400 text-sm">{currentChannel?.description}</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {currentChannel?.memberCount} members
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChannel && getChannelMessages(currentChannel.id).map(msg => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden flex-shrink-0">
                <img src={msg.userAvatar} alt={msg.userName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium">{msg.userName}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-300">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${currentChannel?.name || 'channel'}`}
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Channel List Component
export const ChannelList = ({ channels, currentChannel, onChannelSelect }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Your Channels</h3>
      <div className="space-y-3">
        {channels.map(channel => (
          <div
            key={channel.id}
            onClick={() => onChannelSelect(channel)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              currentChannel?.id === channel.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">#</span>
              </div>
              <div>
                <h4 className="font-medium">{channel.name}</h4>
                <p className="text-sm opacity-75">{channel.memberCount} members</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Online Users Component
export const OnlineUsersList = ({ users }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Online Now</h3>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
            </div>
            <div>
              <h4 className="text-white font-medium">{user.name}</h4>
              <p className="text-gray-400 text-sm capitalize">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Chat Dashboard Component
export const ChatDashboard = () => {
  const { activeChannels, onlineUsers, joinChannel, currentChannel } = useChat();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Community Chat</h2>
          <p className="text-gray-400">Connect with your community members in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChannelList 
            channels={activeChannels}
            currentChannel={currentChannel}
            onChannelSelect={(channel) => joinChannel(channel.id)}
          />
          <OnlineUsersList users={onlineUsers} />
        </div>

        <div className="mt-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                Create Channel
              </button>
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                Invite Members
              </button>
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Chat Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};