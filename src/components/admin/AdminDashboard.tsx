
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Trophy, Video, DollarSign, Download } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - in real app, this would come from Supabase
  const overviewMetrics = {
    totalPlayersToday: 42,
    activeTournaments: 3,
    zoomConfirmedPercent: 87,
    payoutsSentToday: 12
  };

  const tournaments = [
    {
      name: "Tuesday Blitz Arena",
      date: "June 25, 2024",
      format: "Swiss",
      players: 32,
      zoomReady: 85,
      status: "Active"
    },
    {
      name: "Friday Rapid Quads",
      date: "June 28, 2024", 
      format: "Quads",
      players: 16,
      zoomReady: 90,
      status: "Registration"
    },
    {
      name: "Weekend Blitz",
      date: "June 29, 2024",
      format: "Swiss",
      players: 28,
      zoomReady: 78,
      status: "Setup"
    }
  ];

  const players = [
    {
      name: "Jane Doe",
      rating: 1523,
      zoomReady: true,
      tournament: "Blitz Arena",
      status: "Paid"
    },
    {
      name: "John Smith", 
      rating: 1801,
      zoomReady: false,
      tournament: "Blitz Quads",
      status: "Pending"
    },
    {
      name: "Alice Johnson",
      rating: 1645,
      zoomReady: true,
      tournament: "Weekend Blitz",
      status: "Paid"
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Players Registered Today
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.totalPlayersToday}</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tournaments
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeTournaments}</div>
            <p className="text-xs text-muted-foreground">
              2 ending this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Zoom Confirmed
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.zoomConfirmedPercent}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Payouts Sent Today
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.payoutsSentToday}</div>
            <p className="text-xs text-muted-foreground">
              $1,240 total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tournaments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tournaments">Tournament Management</TabsTrigger>
          <TabsTrigger value="players">Player Details</TabsTrigger>
          <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="tournaments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Overview</CardTitle>
              <CardDescription>
                Manage active and upcoming tournaments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Zoom Ready</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments.map((tournament, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{tournament.name}</TableCell>
                      <TableCell>{tournament.date}</TableCell>
                      <TableCell>{tournament.format}</TableCell>
                      <TableCell>{tournament.players}</TableCell>
                      <TableCell>{tournament.zoomReady}%</TableCell>
                      <TableCell>
                        <Badge variant={tournament.status === 'Active' ? 'default' : 'secondary'}>
                          {tournament.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Player Management</CardTitle>
              <CardDescription>
                View and manage registered players
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Zoom Ready</TableHead>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell>{player.rating}</TableCell>
                      <TableCell>
                        {player.zoomReady ? (
                          <Badge variant="default">✅ Ready</Badge>
                        ) : (
                          <Badge variant="destructive">❌ Not Ready</Badge>
                        )}
                      </TableCell>
                      <TableCell>{player.tournament}</TableCell>
                      <TableCell>
                        <Badge variant={player.status === 'Paid' ? 'default' : 'secondary'}>
                          {player.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Tools</CardTitle>
                <CardDescription>Export data for external use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Player List for Tornelo
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Tournament Results
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  View Camera Checks
                </Button>
                <Button variant="outline" className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Mark Payouts Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
