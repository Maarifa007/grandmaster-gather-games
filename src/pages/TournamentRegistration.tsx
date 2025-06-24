import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Trophy, Users, CheckCircle, ExternalLink, Monitor } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TournamentSetup } from '@/components/tournament/TournamentSetup';
import ZoomMobileSetupGuide from '@/components/ZoomMobileSetupGuide';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TournamentRegistration = () => {
  const [platform, setPlatform] = useState<string>('');
  const [username, setUsername] = useState('');
  const [uscfId, setUscfId] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [needsUscfMembership, setNeedsUscfMembership] = useState(false);
  const [membershipType, setMembershipType] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [selectedTournamentData, setSelectedTournamentData] = useState<any>(null);
  const { toast } = useToast();

  const tournaments = [
    { 
      id: '1', 
      name: 'Tuesday 3+2 Blitz', 
      time: '7:00PM PT', 
      date: 'March 2nd',
      zoom_link: 'https://zoom.us/j/example123',
      tornelo_link: 'https://tornelo.com/tournament/example',
      setup_instructions: 'Please ensure you have:\n• Stable internet connection\n• Chess.com or Lichess account ready\n• Zoom app installed\n• Screen sharing enabled\n• Quiet environment for fair play'
    },
    { 
      id: '2', 
      name: 'Wednesday 5+0 Blitz', 
      time: '7:00PM PT', 
      date: 'March 3rd',
      zoom_link: 'https://zoom.us/j/example456',
      tornelo_link: 'https://tornelo.com/tournament/example2',
      setup_instructions: 'Tournament setup requirements:\n• Download Zoom desktop app\n• Test your microphone and camera\n• Join 10 minutes early\n• Have your chess platform ready'
    },
    { 
      id: '3', 
      name: 'Thursday 7+5 Blitz', 
      time: '7:00PM PT', 
      date: 'March 4th',
      zoom_link: 'https://zoom.us/j/example789',
      tornelo_link: 'https://tornelo.com/tournament/example3',
      setup_instructions: 'Pre-tournament checklist:\n• Ensure good lighting for camera\n• Close unnecessary applications\n• Have water and snacks ready\n• Disable notifications during play'
    },
    { 
      id: '4', 
      name: 'Friday 3+2 Rapid', 
      time: '8:00PM PT', 
      date: 'March 5th',
      zoom_link: 'https://zoom.us/j/example101',
      tornelo_link: 'https://tornelo.com/tournament/example4',
      setup_instructions: 'Important setup steps:\n• Update your chess platform\n• Test screen sharing functionality\n• Prepare backup internet connection\n• Review fair play guidelines'
    },
  ];

  const membershipFees = {
    adult: 45,
    scholastic: 20
  };

  const calculateTotal = () => {
    const entryFee = 15;
    const membershipFee = needsUscfMembership && membershipType ? membershipFees[membershipType as keyof typeof membershipFees] : 0;
    return entryFee + membershipFee;
  };

  const handlePayment = async () => {
    if (!selectedTournament || !platform || !username || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (needsUscfMembership && !membershipType) {
      toast({
        title: "Missing membership type",
        description: "Please select a membership type",
        variant: "destructive"
      });
      return;
    }

    try {
      const tournamentData = tournaments.find(t => t.id === selectedTournament);
      setSelectedTournamentData(tournamentData);
      
      // Simulate payment processing with new membership data
      const totalAmount = calculateTotal();
      const membershipFee = needsUscfMembership && membershipType ? membershipFees[membershipType as keyof typeof membershipFees] : 0;
      
      console.log('Processing registration with:', {
        platform,
        username,
        email,
        uscfId,
        rating,
        tournament: selectedTournament,
        needsUscfMembership,
        membershipType,
        membershipFee,
        totalPaid: totalAmount
      });
      
      setTimeout(() => {
        setIsRegistered(true);
        toast({
          title: "Registration successful!",
          description: `Payment of $${totalAmount} processed. Check your email for tournament details.`,
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };

  const handleDonation = (amount: string) => {
    setDonationAmount(amount);
    console.log(`Processing donation: $${amount}`);
    toast({
      title: "Thank you for your donation!",
      description: `Your $${amount} donation will help support chess education.`,
    });
  };

  const handleSetupComplete = () => {
    setShowSetup(false);
    toast({
      title: "Setup completed!",
      description: "You're all set for the tournament. Good luck!",
    });
  };

  if (showSetup && selectedTournamentData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <TournamentSetup 
            tournament={selectedTournamentData}
            onSetupComplete={handleSetupComplete}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (isRegistered) {
    const membershipFee = needsUscfMembership && membershipType ? membershipFees[membershipType as keyof typeof membershipFees] : 0;
    const totalPaid = calculateTotal();
    
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
                Tournament links and setup instructions have been sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-4">Registration Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-green-700">Tournament:</span>
                    <span className="font-medium">{selectedTournamentData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Date & Time:</span>
                    <span className="font-medium">{selectedTournamentData?.date} at {selectedTournamentData?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Entry Fee (includes rating fees):</span>
                    <span className="font-medium">$15.00</span>
                  </div>
                  {needsUscfMembership && (
                    <div className="flex justify-between">
                      <span className="text-green-700">USCF Membership ({membershipType}):</span>
                      <span className="font-medium">${membershipFee}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-green-700 font-semibold">Total Paid:</span>
                    <span className="font-bold">${totalPaid}.00</span>
                  </div>
                </div>
                {needsUscfMembership && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      ✅ You purchased a USCF membership. GSCI will submit this to US Chess with your results.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <Button 
                  onClick={() => setShowSetup(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Start Setup
                </Button>
                <ZoomMobileSetupGuide />
                {selectedTournamentData?.zoom_link && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(selectedTournamentData.zoom_link, '_blank')}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Join Zoom
                  </Button>
                )}
                {selectedTournamentData?.tornelo_link && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(selectedTournamentData.tornelo_link, '_blank')}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Tornelo
                  </Button>
                )}
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
            <div className="mt-4 flex justify-center">
              <ZoomMobileSetupGuide 
                trigger={
                  <Button variant="outline" size="sm">
                    📱 Can I play on mobile?
                  </Button>
                }
              />
            </div>
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

              {/* USCF Membership Section */}
              <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="uscf-membership" 
                    checked={needsUscfMembership}
                    onCheckedChange={setNeedsUscfMembership}
                  />
                  <Label htmlFor="uscf-membership" className="text-base font-medium">
                    Do you need to purchase a US Chess Membership?
                  </Label>
                </div>
                
                {needsUscfMembership && (
                  <div className="space-y-3 ml-6">
                    <Label className="text-sm text-gray-700">Select Membership Type:</Label>
                    <RadioGroup value={membershipType} onValueChange={setMembershipType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scholastic" id="scholastic" />
                        <Label htmlFor="scholastic">Scholastic (under 19) - $20</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="adult" id="adult" />
                        <Label htmlFor="adult">Adult - $45</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
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

              {/* Payment Breakdown */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">Entry Fee (includes rating fees):</span>
                    <span className="font-semibold">$15.00</span>
                  </div>
                  {needsUscfMembership && membershipType && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">USCF Membership ({membershipType}):</span>
                      <span className="font-semibold">${membershipFees[membershipType as keyof typeof membershipFees]}.00</span>
                    </div>
                  )}
                  <div className="border-t border-green-300 pt-2 flex justify-between items-center">
                    <span className="text-green-800 font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg">${calculateTotal()}.00</span>
                  </div>
                </div>
                <p className="text-green-700 text-sm mt-2 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  70% goes to prizes – 30% helps fund Chess in Schools!
                </p>
              </div>

              {/* Payment Button */}
              <Button 
                onClick={handlePayment}
                disabled={!platform || !username || !email || !selectedTournament || (needsUscfMembership && !membershipType)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
              >
                Pay with PayPal - ${calculateTotal()}
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
