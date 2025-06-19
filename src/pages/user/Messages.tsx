
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MessageCircle, Send, User } from 'lucide-react';
import Header from '@/components/Header';

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Is the drill still available for this weekend?',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Thank you for the quick delivery!',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      lastMessage: 'Can we extend the rental period?',
      time: '2 days ago',
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hi! I\'m interested in renting your power drill.',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      message: 'Hello! Yes, it\'s available. When do you need it?',
      time: '10:45 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'John Doe',
      message: 'Is the drill still available for this weekend?',
      time: '11:00 AM',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/user-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Chat with renters and equipment owners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Conversations</h3>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage === conversation.id
                      ? 'bg-blue-100 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMessage(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{conversation.name}</p>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{conversation.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col h-96">
            <div className="p-4 border-b">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-600">About: Power Drill Rental</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
