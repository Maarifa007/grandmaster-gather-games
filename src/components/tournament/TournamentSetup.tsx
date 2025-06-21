
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, ExternalLink, Monitor, Users, AlertCircle } from 'lucide-react';

interface TournamentSetupProps {
  tournament: {
    name: string;
    date: string;
    time: string;
    zoom_link?: string;
    tornelo_link?: string;
    setup_instructions?: string;
  };
  onSetupComplete: () => void;
}

export const TournamentSetup = ({ tournament, onSetupComplete }: TournamentSetupProps) => {
  const [setupSteps, setSetupSteps] = useState({
    zoomJoined: false,
    torneloChecked: false,
    instructionsRead: false,
  });
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const tournamentDateTime = new Date(`${tournament.date} ${tournament.time}`);
      const now = new Date();
      const difference = tournamentDateTime.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Tournament started!');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [tournament.date, tournament.time]);

  const handleStepComplete = (step: keyof typeof setupSteps) => {
    setSetupSteps(prev => ({ ...prev, [step]: true }));
  };

  const allStepsComplete = Object.values(setupSteps).every(Boolean);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
          <Monitor className="h-6 w-6" />
          Tournament Setup - {tournament.name}
        </CardTitle>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-amber-600" />
          <span className="font-semibold">{timeLeft} until start</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-amber-800">Important Setup Steps</span>
          </div>
          <p className="text-amber-700 text-sm">
            Complete all steps below to ensure a smooth tournament experience
          </p>
        </div>

        {/* Step 1: Join Zoom */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            {setupSteps.zoomJoined ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
            )}
            <div>
              <h3 className="font-semibold">Join Zoom Meeting</h3>
              <p className="text-sm text-gray-600">Join the tournament Zoom call for fair play monitoring</p>
            </div>
          </div>
          <div className="flex gap-2">
            {tournament.zoom_link && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(tournament.zoom_link, '_blank');
                  handleStepComplete('zoomJoined');
                }}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Join Zoom
              </Button>
            )}
          </div>
        </div>

        {/* Step 2: Check Tornelo */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            {setupSteps.torneloChecked ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
            )}
            <div>
              <h3 className="font-semibold">Check Tornelo Pairings</h3>
              <p className="text-sm text-gray-600">View your tournament bracket and pairings</p>
            </div>
          </div>
          <div className="flex gap-2">
            {tournament.tornelo_link && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(tournament.tornelo_link, '_blank');
                  handleStepComplete('torneloChecked');
                }}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Tornelo
              </Button>
            )}
          </div>
        </div>

        {/* Step 3: Read Instructions */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            {setupSteps.instructionsRead ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
            )}
            <div>
              <h3 className="font-semibold">Review Setup Instructions</h3>
              <p className="text-sm text-gray-600">Read the mobile/desktop setup guide</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStepComplete('instructionsRead')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Mark as Read
          </Button>
        </div>

        {tournament.setup_instructions && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Setup Instructions:</h4>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {tournament.setup_instructions}
            </div>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button
            onClick={onSetupComplete}
            disabled={!allStepsComplete}
            className={`px-8 py-3 text-lg ${
              allStepsComplete 
                ? 'bg-green-700 hover:bg-green-800' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {allStepsComplete ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Setup Complete - Ready to Play!
              </>
            ) : (
              'Complete All Steps First'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
