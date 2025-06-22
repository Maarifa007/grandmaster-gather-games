
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, Calendar, Star, Settings } from 'lucide-react';

const Dashboard = () => {
  // Mock user data - in real app, this would come from Supabase
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    gscr: 1523,
    uscfId: "12345678",
    joinDate: "January 2024"
  };

  const recentTournaments = [
    {
      name: "Tuesday Blitz Arena",
      date: "June 18, 2024",
      result: "3rd Place",
      rating: 1520,
      change: +15
    },
    {
      name: "Friday Rapid",
      date: "June 14, 2024", 
      result: "7th Place",
      rating: 1505,
      change: +8
    }
  ];

  const upcomingEvents = [
    {
      name: "Weekend Blitz Championship",
      date: "June 29, 2024",
      time: "2:00 PM EST",
      status: "Registered"
    },
    {
      name: "Tuesday Arena",
      date: "July 2, 2024",
      time: "7:00 PM EST", 
      status: "Open"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData.name}!</h1>
              <p className="text-muted-foreground">Here's your tournament dashboard</p>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Player Info Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current GSCR</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.gscr}</div>
                <p className="text-xs text-muted-foreground">
                  +23 this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tournaments Played</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Tournament</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2d</div>
                <p className="text-xs text-muted-foreground">
                  Weekend Blitz
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Tournament Results</CardTitle>
                    <CardDescription>Your latest tournament performances</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTournaments.map((tournament, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{tournament.name}</p>
                          <p className="text-sm text-muted-foreground">{tournament.date}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant="outline">{tournament.result}</Badge>
                          <p className="text-sm font-medium text-green-600">
                            +{tournament.change} GSCR
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Tournaments you can join</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                        </div>
                        <div className="text-right">
                          {event.status === 'Registered' ? (
                            <Badge>Registered</Badge>
                          ) : (
                            <Button size="sm">Register</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tournaments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament History</CardTitle>
                  <CardDescription>Complete record of your tournament participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTournaments.map((tournament, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar>
                          <AvatarFallback>
                            <Trophy className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{tournament.name}</p>
                          <p className="text-sm text-muted-foreground">{tournament.date}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant="outline">{tournament.result}</Badge>
                          <p className="text-sm">Rating: {tournament.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>GSCR Progress</CardTitle>
                  <CardDescription>Your rating progression over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Rating</span>
                      <span className="text-sm text-muted-foreground">{userData.gscr}/2000</span>
                    </div>
                    <Progress value={(userData.gscr / 2000) * 100} className="w-full" />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">+58</p>
                      <p className="text-sm text-muted-foreground">This Month</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">1480</p>
                      <p className="text-sm text-muted-foreground">Peak Rating</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">67%</p>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Player Profile</CardTitle>
                  <CardDescription>Your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-sm text-muted-foreground">{userData.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">USCF ID</label>
                      <p className="text-sm text-muted-foreground">{userData.uscfId}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Member Since</label>
                      <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button>Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
