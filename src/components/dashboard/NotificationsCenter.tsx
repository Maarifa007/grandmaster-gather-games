
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const NotificationsCenter = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: '✅',
      message: "You're confirmed for tonight's Blitz!",
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'achievement',
      icon: '🏆',
      message: "You finished 3rd in yesterday's Quads",
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'announcement',
      icon: '📢',
      message: "New weekend tournament added! Register now",
      time: '2 days ago'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-700 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          🔔 Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <span className="text-lg">{notification.icon}</span>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsCenter;
