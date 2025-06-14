
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

const FinancialSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-700">💰 Your Tournament Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-700">12</p>
            <p className="text-sm text-gray-600">Total Events Played</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$285</p>
            <p className="text-sm text-gray-600">Total Winnings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">$35</p>
            <p className="text-sm text-gray-600">Total Donated</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Free Tier</p>
            <Button size="sm" className="mt-1 bg-yellow-600 hover:bg-yellow-700">
              <Crown className="h-4 w-4 mr-1" />
              Upgrade to BlitzPass
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
