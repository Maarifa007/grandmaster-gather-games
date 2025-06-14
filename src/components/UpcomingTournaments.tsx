
import TournamentCard from './TournamentCard';

const UpcomingTournaments = () => {
  const tournaments = [
    {
      title: "Weekend Blitz Championship",
      date: "Saturday, Dec 16",
      time: "2:00 PM EST",
      platform: "Chess.com" as const,
      timeControl: "3+2",
      entryFee: 15,
      prizePool: 500,
      players: 47,
      maxPlayers: 64,
      charity: "Children's Hospital Network"
    },
    {
      title: "Holiday Speed Arena",
      date: "Sunday, Dec 17",
      time: "7:00 PM EST",
      platform: "Lichess" as const,
      timeControl: "5+3",
      entryFee: 10,
      prizePool: 320,
      players: 23,
      maxPlayers: 32,
      charity: "Public Library Foundation"
    },
    {
      title: "Global Rapid Open",
      date: "Monday, Dec 18",
      time: "6:00 PM EST",
      platform: "Chess.com" as const,
      timeControl: "10+5",
      entryFee: 25,
      prizePool: 800,
      players: 61,
      maxPlayers: 128,
      charity: "Youth Chess Development"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Tournaments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our next USCF-rated tournaments and compete for prizes while supporting great causes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;
