
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Check, Trash2, Settings } from 'lucide-react';
import Header from '@/components/Header';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'John Doe wants to rent your Power Drill for Jan 25-27',
      time: '2 hours ago',
      read: false,
      urgent: true,
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'You received $40.00 for Circular Saw rental',
      time: '1 day ago',
      read: false,
      urgent: false,
    },
    {
      id: 3,
      type: 'system',
      title: 'Account Verification',
      message: 'Your identity document has been approved',
      time: '2 days ago',
      read: true,
      urgent: false,
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Reminder',
      message: 'Generator rental starts tomorrow at 8:00 AM',
      time: '3 days ago',
      read: true,
      urgent: false,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-8 h-8";
    switch (type) {
      case 'booking':
        return <Bell className={`${iconClass} text-blue-600`} />;
      case 'payment':
        return <Bell className={`${iconClass} text-green-600`} />;
      case 'system':
        return <Bell className={`${iconClass} text-purple-600`} />;
      default:
        return <Bell className={`${iconClass} text-gray-600`} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/user-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} size="sm">
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-6 ${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${notification.urgent ? 'animate-pulse' : ''}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                      {notification.title}
                      {notification.urgent && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Urgent
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className={`${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    {!notification.read && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
