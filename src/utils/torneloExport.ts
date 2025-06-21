
import { supabase } from '@/integrations/supabase/client';

export interface TournamentRegistration {
  id: string;
  platform_username: string;
  platform: string;
  current_rating: number;
  uscf_id?: string;
  email: string;
}

export const generateTorneloCSV = async (tournamentId: string): Promise<string> => {
  const { data: registrations, error } = await supabase
    .from('tournament_registrations')
    .select('*')
    .eq('tournament_id', tournamentId);

  if (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }

  if (!registrations || registrations.length === 0) {
    return 'No registrations found';
  }

  // CSV headers for Tornelo import
  const headers = [
    'Name',
    'Rating',
    'Platform',
    'USCF ID',
    'Email'
  ];

  // Convert registrations to CSV format
  const csvRows = registrations.map(reg => [
    reg.platform_username,
    reg.current_rating || 'Unrated',
    reg.platform,
    reg.uscf_id || '',
    reg.email
  ]);

  // Combine headers and data
  const allRows = [headers, ...csvRows];
  
  // Convert to CSV string
  return allRows
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
};

export const downloadTorneloCSV = async (tournamentId: string, tournamentName: string) => {
  try {
    const csvContent = await generateTorneloCSV(tournamentId);
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${tournamentName.replace(/\s+/g, '_')}_players.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error;
  }
};
