
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Trophy, Video, DollarSign, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface OverviewMetrics {
  totalPlayersToday: number;
  activeTournaments: number;
  zoomConfirmedPercent: number;
  payoutsSentToday: number;
  totalUscfFeesOwed: number;
  membershipsSold: number;
}

interface Tournament {
  id: string;
  name: string;
  date: string;
  time_control: string;
  playerCount: number;
  zoomReady: number;
  status: string;
}

interface Player {
  id: string;
  name: string;
  email: string;
  rating: number;
  zoomReady: boolean;
  tournament: string;
  status: string;
  uscfMembershipPurchased: boolean;
  uscfMembershipFee: number;
  gamesCount: number;
  ratingFeeOwed: number;
  totalPaid: number;
}

const AdminDashboard = () => {
  // Fetch overview metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: async (): Promise<OverviewMetrics> => {
      const today = new Date().toISOString().split('T')[0];
      
      // Total players registered today
      const { count: playersToday } = await supabase
        .from('tournament_registrations')
        .select('*', { count: 'exact', head: true })
        .gte('registered_at', `${today}T00:00:00`)
        .lt('registered_at', `${today}T23:59:59`);

      // Active tournaments
      const { count: activeTournaments } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('date', today);

      // Zoom compliance percentage
      const { data: zoomData } = await supabase
        .from('tournament_registrations')
        .select('zoom_ready');
      
      const zoomReadyCount = zoomData?.filter(r => r.zoom_ready).length || 0;
      const totalRegistrations = zoomData?.length || 1;
      const zoomPercent = Math.round((zoomReadyCount / totalRegistrations) * 100);

      // Payouts sent today (using setup_completed as proxy for payout status)
      const { count: payoutsToday } = await supabase
        .from('tournament_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('setup_completed', true)
        .gte('registered_at', `${today}T00:00:00`)
        .lt('registered_at', `${today}T23:59:59`);

      // Total USCF fees owed and memberships sold
      const { data: uscfData } = await supabase
        .from('tournament_registrations')
        .select('rating_fee_owed, uscf_membership_purchased, uscf_membership_fee');
      
      const totalUscfFeesOwed = uscfData?.reduce((sum, reg) => sum + (reg.rating_fee_owed || 0), 0) || 0;
      const membershipsSold = uscfData?.filter(reg => reg.uscf_membership_purchased).length || 0;

      return {
        totalPlayersToday: playersToday || 0,
        activeTournaments: activeTournaments || 0,
        zoomConfirmedPercent: zoomPercent,
        payoutsSentToday: payoutsToday || 0,
        totalUscfFeesOwed: Number(totalUscfFeesOwed.toFixed(2)),
        membershipsSold
      };
    }
  });

  // Fetch tournaments data
  const { data: tournaments, isLoading: tournamentsLoading } = useQuery({
    queryKey: ['admin-tournaments'],
    queryFn: async (): Promise<Tournament[]> => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          name,
          date,
          time_control,
          tournament_registrations!inner(
            id,
            zoom_ready
          )
        `);

      if (error) throw error;

      return data?.map(event => {
        const registrations = event.tournament_registrations || [];
        const zoomReadyCount = registrations.filter((r: any) => r.zoom_ready).length;
        const zoomPercent = registrations.length > 0 ? Math.round((zoomReadyCount / registrations.length) * 100) : 0;
        
        return {
          id: event.id,
          name: event.name,
          date: new Date(event.date).toLocaleDateString(),
          time_control: event.time_control,
          playerCount: registrations.length,
          zoomReady: zoomPercent,
          status: new Date(event.date) > new Date() ? 'Active' : 'Completed'
        };
      }) || [];
    }
  });

  // Fetch players data with USCF tracking
  const { data: players, isLoading: playersLoading } = useQuery({
    queryKey: ['admin-players'],
    queryFn: async (): Promise<Player[]> => {
      const { data, error } = await supabase
        .from('tournament_registrations')
        .select(`
          id,
          email,
          current_rating,
          zoom_ready,
          setup_completed,
          platform_username,
          uscf_membership_purchased,
          uscf_membership_fee,
          games_count,
          rating_fee_owed,
          total_paid,
          events!inner(name)
        `)
        .limit(20);

      if (error) throw error;

      return data?.map(reg => ({
        id: reg.id,
        name: reg.platform_username || reg.email.split('@')[0],
        email: reg.email,
        rating: reg.current_rating || 1200,
        zoomReady: reg.zoom_ready,
        tournament: reg.events?.name || 'Unknown',
        status: reg.setup_completed ? 'Paid' : 'Pending',
        uscfMembershipPurchased: reg.uscf_membership_purchased,
        uscfMembershipFee: reg.uscf_membership_fee || 0,
        gamesCount: reg.games_count || 0,
        ratingFeeOwed: reg.rating_fee_owed || 0,
        totalPaid: reg.total_paid || 15
      })) || [];
    }
  });

  const handleExportTournament = async (tournamentId: string) => {
    console.log('Exporting tournament:', tournamentId);
    // This would integrate with your export endpoint
    // window.open(`/export-tornelo-csv/${tournamentId}`, '_blank');
  };

  if (metricsLoading) {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Players Today
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalPlayersToday || 0}</div>
            <p className="text-xs text-muted-foreground">
              Live from Supabase
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
            <div className="text-2xl font-bold">{metrics?.activeTournaments || 0}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming events
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
            <div className="text-2xl font-bold">{metrics?.zoomConfirmedPercent || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Ready for tournaments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Setups Complete
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.payoutsSentToday || 0}</div>
            <p className="text-xs text-muted-foreground">
              Today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              USCF Fees Owed
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics?.totalUscfFeesOwed || 0}</div>
            <p className="text-xs text-muted-foreground">
              Rating fees to pay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Memberships Sold
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.membershipsSold || 0}</div>
            <p className="text-xs text-muted-foreground">
              USCF memberships
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="players" className="space-y-4">
        <TabsList>
          <TabsTrigger value="players">USCF Player Tracking</TabsTrigger>
          <TabsTrigger value="tournaments">Tournament Management</TabsTrigger>
          <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>USCF Player Management</CardTitle>
              <CardDescription>
                Track USCF memberships, games played, and rating fees owed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {playersLoading ? (
                <div>Loading players...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>USCF Fee Paid</TableHead>
                      <TableHead>Games Count</TableHead>
                      <TableHead>Rating Fee Owed</TableHead>
                      <TableHead>Total Paid</TableHead>
                      <TableHead>Tournament</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players?.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>
                          {player.uscfMembershipPurchased ? (
                            <Badge variant="default">✅ ${player.uscfMembershipFee}</Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>{player.gamesCount}</TableCell>
                        <TableCell>${player.ratingFeeOwed.toFixed(2)}</TableCell>
                        <TableCell>${player.totalPaid.toFixed(2)}</TableCell>
                        <TableCell>{player.tournament}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Overview</CardTitle>
              <CardDescription>
                Manage active and upcoming tournaments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tournamentsLoading ? (
                <div>Loading tournaments...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time Control</TableHead>
                      <TableHead>Players</TableHead>
                      <TableHead>Zoom Ready</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournaments?.map((tournament) => (
                      <TableRow key={tournament.id}>
                        <TableCell className="font-medium">{tournament.name}</TableCell>
                        <TableCell>{tournament.date}</TableCell>
                        <TableCell>{tournament.time_control}</TableCell>
                        <TableCell>{tournament.playerCount}</TableCell>
                        <TableCell>{tournament.zoomReady}%</TableCell>
                        <TableCell>
                          <Badge variant={tournament.status === 'Active' ? 'default' : 'secondary'}>
                            {tournament.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleExportTournament(tournament.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export CSV
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
                  Export USCF Payment Report
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
