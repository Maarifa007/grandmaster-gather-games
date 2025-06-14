
import { Calendar, Clock, Users, Trophy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TournamentCardProps {
  title: string;
  date: string;
  time: string;
  platform: 'Chess.com' | 'Lichess';
  timeControl: string;
  entryFee: number;
  prizePool: number;
  players: number;
  maxPlayers: number;
  charity: string;
}

const TournamentCard = ({
  title,
  date,
  time,
  platform,
  timeControl,
  entryFee,
  prizePool,
  players,
  maxPlayers,
  charity
}: TournamentCardProps) => {
  const platformColor = platform === 'Chess.com' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800';
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${platformColor}`}>
          {platform}
        </span>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{time} • {timeControl}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{players}/{maxPlayers} players</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Trophy className="h-4 w-4 mr-2" />
          <span>Supporting {charity}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Entry Fee</div>
            <div className="text-lg font-bold text-green-700">${entryFee}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Prize Pool</div>
            <div className="text-lg font-bold text-amber-600">${prizePool}</div>
          </div>
        </div>
      </div>
      
      <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
        <ExternalLink className="h-4 w-4 mr-2" />
        Register Now
      </Button>
    </div>
  );
};

export default TournamentCard;
