import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [activeChannels, setActiveChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Mock chat data
  useEffect(() => {
    if (user) {
      // Initialize with mock channels
      const mockChannels = [
        { id: 'general', name: 'General', description: 'General discussion', memberCount: 1234 },
        { id: 'gaming', name: 'Gaming', description: 'Gaming discussions', memberCount: 567 },
        { id: 'anime', name: 'Anime', description: 'Anime discussions', memberCount: 890 },
        { id: 'art', name: 'Art', description: 'Art showcase', memberCount: 345 }
      ];
      setActiveChannels(mockChannels);
      setCurrentChannel(mockChannels[0]);

      // Mock online users
      const mockUsers = [
        { id: 'user1', name: 'AnimeLover23', avatar: 'https://images.pexels.com/photos/9088672/pexels-photo-9088672.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'online' },
        { id: 'user2', name: 'GamerGirl21', avatar: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'online' },
        { id: 'user3', name: 'ArtistPro', avatar: 'https://images.pexels.com/photos/9088672/pexels-photo-9088672.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'away' },
        { id: 'user4', name: 'MusicFan99', avatar: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop', status: 'online' }
      ];
      setOnlineUsers(mockUsers);

      // Mock messages
      const mockMessages = [
        {
          id: 'msg1',
          channelId: 'general',
          userId: 'user1',
          userName: 'AnimeLover23',
          userAvatar: 'https://images.pexels.com/photos/9088672/pexels-photo-9088672.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'Hey everyone! Just finished watching the latest episode of Attack on Titan. What did you think?',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          type: 'text'
        },
        {
          id: 'msg2',
          channelId: 'general',
          userId: 'user2',
          userName: 'GamerGirl21',
          userAvatar: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'OMG it was amazing! The animation quality was incredible 🤩',
          timestamp: new Date(Date.now() - 240000).toISOString(),
          type: 'text'
        },
        {
          id: 'msg3',
          channelId: 'general',
          userId: 'user3',
          userName: 'ArtistPro',
          userAvatar: 'https://images.pexels.com/photos/9088672/pexels-photo-9088672.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'I loved the character development in this episode. The writers really outdid themselves!',
          timestamp: new Date(Date.now() - 180000).toISOString(),
          type: 'text'
        },
        {
          id: 'msg4',
          channelId: 'general',
          userId: 'user4',
          userName: 'MusicFan99',
          userAvatar: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'And the soundtrack! Hans Zimmer\'s work on this series is phenomenal 🎵',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          type: 'text'
        }
      ];
      setMessages(mockMessages);
    }
  }, [user]);

  const sendMessage = (channelId, content, type = 'text') => {
    if (!user || !content.trim()) return;

    const newMessage = {
      id: 'msg-' + Date.now(),
      channelId,
      userId: user.uid,
      userName: user.displayName,
      userAvatar: user.photoURL,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      type
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const getChannelMessages = (channelId) => {
    return messages.filter(msg => msg.channelId === channelId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const joinChannel = (channelId) => {
    const channel = activeChannels.find(ch => ch.id === channelId);
    if (channel) {
      setCurrentChannel(channel);
    }
  };

  const value = {
    messages,
    activeChannels,
    currentChannel,
    onlineUsers,
    sendMessage,
    getChannelMessages,
    joinChannel,
    setCurrentChannel
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};