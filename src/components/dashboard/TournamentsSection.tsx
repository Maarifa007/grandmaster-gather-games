
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, FileText } from 'lucide-react';

const TournamentsSection = () => {
  const upcomingTournaments = [
    {
      id: 1,
      name: 'Thursday 7/5 Blitz',
      date: 'June 15',
      time: '7:00PM PT',
      platform: 'Chess.com',
      status: 'confirmed'
    }
  ];

  const pastTournaments = [
    {
      id: 1,
      date: '06/10',
      name: 'Wednesday Blitz',
      timeControl: '5/0',
      players: 28,
      rank: 4,
      gscrChange: '+14',
      hasDispute: true
    },
    {
      id: 2,
      date: '06/09',
      name: 'Tuesday Blitz',
      timeControl: '3/2',
      players: 32,
      rank: 7,
      gscrChange: '-5',
      hasDispute: false
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upcoming Tournaments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-700">🗓️ Upcoming Tournaments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingTournaments.map((tournament) => (
            <div key={tournament.id} className="border rounded-lg p-4 bg-green-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{tournament.name}</h3>
                  <p className="text-sm text-gray-600">
                    {tournament.date} – {tournament.time}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  ✅ Confirmed
                </span>
              </div>
              <div className="space-y-2">
                <Button size="sm" className="bg-green-700 hover:bg-green-800">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open {tournament.platform} Arena
                </Button>
                <p className="text-sm text-gray-600">
                  📧 Join instructions sent to your email
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Past Tournaments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-700">🕹️ Past Tournaments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pastTournaments.map((tournament) => (
            <div key={tournament.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">
                    {tournament.date} – {tournament.name} – {tournament.timeControl}
                  </h3>
                  <p className="text-sm text-gray-600">{tournament.players} Players</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    ➤ Final Rank: <span className="font-semibold">{tournament.rank}th</span> | 
                    GSCR: <span className={`font-semibold ${tournament.gscrChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {tournament.gscrChange} pts
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    View Crosstable
                  </Button>
                  {tournament.hasDispute && (
                    <Button variant="outline" size="sm" className="text-orange-600 border-orange-200">
                      Submit Dispute
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentsSection;
