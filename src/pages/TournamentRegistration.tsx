
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Trophy, Users, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TournamentRegistration = () => {
  const [platform, setPlatform] = useState<string>('');
  const [username, setUsername] = useState('');
  const [uscfId, setUscfId] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [donationAmount, setDonationAmount] = useState<string>('');

  const tournaments = [
    { id: '1', name: 'Tuesday 3+2 Blitz', time: '7:00PM PT', date: 'March 2nd' },
    { id: '2', name: 'Wednesday 5+0 Blitz', time: '7:00PM PT', date: 'March 3rd' },
    { id: '3', name: 'Thursday 7+5 Blitz', time: '7:00PM PT', date: 'March 4th' },
    { id: '4', name: 'Friday 3+2 Rapid', time: '8:00PM PT', date: 'March 5th' },
  ];

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setIsRegistered(true);
    }, 1500);
  };

  const handleDonation = (amount: string) => {
    setDonationAmount(amount);
    // Handle donation processing
    console.log(`Processing donation: $${amount}`);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Registration Confirmed!</CardTitle>
              <CardDescription className="text-lg">
                You'll receive a join link and round instructions via email within 2–3 minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                <p className="text-green-700">
                  Check your email for tournament details and the join link. 
                  Make sure to join 10 minutes before the start time.
                </p>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-amber-600" />
                  Want to support Chess in Prisons, Schools, or Libraries?
                </h3>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDonation('5')}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Donate $5
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDonation('10')}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Donate $10
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDonation('custom')}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Custom Amount
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-green-700" />
              Register for a USCF-Rated Blitz Tournament
            </h1>
            <p className="text-gray-600">Fast registration, secure payment, and instant confirmation</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tournament Registration</CardTitle>
              <CardDescription>
                Fill out the form below to register for an upcoming tournament
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Platform</Label>
                <RadioGroup value={platform} onValueChange={setPlatform}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chess.com" id="chess.com" />
                    <Label htmlFor="chess.com">Chess.com</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lichess" id="lichess" />
                    <Label htmlFor="lichess">Lichess</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">
                  {platform ? `${platform.charAt(0).toUpperCase() + platform.slice(1)} Username` : 'Platform Username'}
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              {/* USCF Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="uscf-id">USCF ID (optional)</Label>
                  <Input
                    id="uscf-id"
                    value={uscfId}
                    onChange={(e) => setUscfId(e.target.value)}
                    placeholder="123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Current Blitz Rating</Label>
                  <Input
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="1500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Tournament Selection */}
              <div className="space-y-2">
                <Label>Select Tournament</Label>
                <Select value={selectedTournament} onValueChange={setSelectedTournament}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name} - {tournament.date} at {tournament.time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Entry Fee Confirmation */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💲</span>
                  <span className="font-semibold text-green-800">Entry Fee: $10</span>
                </div>
                <p className="text-green-700 text-sm flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  70% goes to prizes – 30% helps fund Chess in Schools!
                </p>
              </div>

              {/* Payment Button */}
              <Button 
                onClick={handlePayment}
                disabled={!platform || !username || !email || !selectedTournament}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                Pay with PayPal - $10
              </Button>

              {/* Support Message */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  Join over 2,500 players supporting chess education worldwide
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TournamentRegistration;
