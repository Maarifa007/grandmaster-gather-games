
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

const PlayerInfoBlock = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-green-700">Welcome, Alex Chen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">♟️ Username</p>
            <p className="font-medium">@AlexC_Speed (Chess.com)</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">🆔 USCF ID</p>
            <p className="font-medium">12345678</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">📈 Blitz Rating</p>
            <p className="font-medium">1630 (Self-reported)</p>
          </div>
          <div className="flex items-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-green-700 border-green-200 hover:bg-green-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Info
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerInfoBlock;
