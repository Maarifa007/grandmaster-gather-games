
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Users, FileText, Loader2 } from 'lucide-react';
import { downloadTorneloCSV } from '@/utils/torneloExport';
import { useToast } from '@/hooks/use-toast';

interface TorneloExportCardProps {
  tournament: {
    id: string;
    name: string;
    date: string;
    registrationCount?: number;
  };
}

export const TorneloExportCard = ({ tournament }: TorneloExportCardProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await downloadTorneloCSV(tournament.id, tournament.name);
      toast({
        title: "Export successful!",
        description: `Player list for ${tournament.name} has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{tournament.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {tournament.date}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{tournament.registrationCount || 0} registered players</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            disabled={isExporting || (tournament.registrationCount || 0) === 0}
            size="sm"
            className="flex-1"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export to Tornelo
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // This could open a preview modal or navigate to a detailed view
              console.log('View registrations for:', tournament.id);
            }}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 border-t pt-2">
          CSV format ready for Tornelo import
        </div>
      </CardContent>
    </Card>
  );
};
