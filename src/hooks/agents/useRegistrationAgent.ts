
import { AgentContext, AgentResponse } from '@/types/agents';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useRegistrationAgent = () => {
  const { toast } = useToast();

  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const lowerMessage = message.toLowerCase();

    // Handle tournament selection
    if (lowerMessage.includes('tournament') || lowerMessage.includes('register')) {
      return await handleTournamentSelection(context);
    }

    // Handle rating input
    if (lowerMessage.includes('rating') || /\d{3,4}/.test(message)) {
      return await handleRatingInput(message, context);
    }

    // Handle platform selection
    if (lowerMessage.includes('chess.com') || lowerMessage.includes('lichess')) {
      return await handlePlatformSelection(message, context);
    }

    // Default registration flow
    return {
      message: "I'll help you register for a tournament! 🏆\n\nFirst, let me get some information about you:",
      options: [
        "📝 Start Registration Process",
        "📅 View Available Tournaments",
        "❓ Registration Requirements"
      ]
    };
  };

  const handleTournamentSelection = async (context: AgentContext): Promise<AgentResponse> => {
    try {
      const { data: tournaments, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(5);

      if (error) throw error;

      if (!tournaments || tournaments.length === 0) {
        return {
          message: "No upcoming tournaments are currently available. Please check back soon!",
          options: ["🔔 Notify Me When Available"]
        };
      }

      const tournamentOptions = tournaments.map(t => 
        `🎯 ${t.name} - ${t.date} (${t.time_control})`
      );

      return {
        message: "Here are our upcoming USCF-rated tournaments:\n\n" +
                tournaments.map(t => `• ${t.name} - ${t.date} at ${t.time_control}`).join('\n') +
                "\n\nWhich tournament interests you?",
        options: tournamentOptions
      };
    } catch (error) {
      return {
        message: "I'm having trouble loading tournaments right now. Let me redirect you to our registration page.",
        options: ["🚀 Go to Registration Page"],
        actions: [{ type: 'redirect', payload: '/register' }]
      };
    }
  };

  const handleRatingInput = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const ratingMatch = message.match(/\d{3,4}/);
    const rating = ratingMatch ? parseInt(ratingMatch[0]) : null;

    if (!rating || rating < 100 || rating > 3000) {
      return {
        message: "Please provide a valid rating between 100-3000. You can use your:\n\n" +
                "• USCF Blitz Rating\n" +
                "• Chess.com Blitz Rating\n" +
                "• Lichess Blitz Rating\n\n" +
                "What's your current blitz rating?",
        options: []
      };
    }

    // Recommend tournaments based on rating
    const recommendations = getRecommendedTournaments(rating);
    
    return {
      message: `Great! With a ${rating} rating, I recommend these tournaments:\n\n${recommendations}\n\nReady to continue with registration?`,
      options: [
        "✅ Continue Registration",
        "📊 Tell Me More About Ratings",
        "🏆 See All Tournaments"
      ]
    };
  };

  const handlePlatformSelection = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const platform = message.toLowerCase().includes('chess.com') ? 'chess.com' : 'lichess';
    
    return {
      message: `Perfect! You'll be playing on ${platform}. 🎮\n\n` +
              `Make sure you have:\n` +
              `✅ Active ${platform} account\n` +
              `✅ Stable internet connection\n` +
              `✅ Zoom app installed\n\n` +
              `What's your ${platform} username?`,
      options: []
    };
  };

  const getRecommendedTournaments = (rating: number): string => {
    if (rating < 1200) {
      return "• Tuesday 3+2 Blitz (Great for improving tactics)\n• Friday 3+2 Rapid (More time to think)";
    } else if (rating < 1800) {
      return "• Wednesday 5+0 Blitz (Classic time control)\n• Thursday 7+5 Blitz (Slight increment)";
    } else {
      return "• All tournaments (You're ready for any format!)\n• Consider our weekend special events";
    }
  };

  return { processMessage };
};
