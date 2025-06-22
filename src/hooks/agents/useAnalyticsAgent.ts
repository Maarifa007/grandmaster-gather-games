
import { AgentContext, AgentResponse } from '@/types/agents';
import { supabase } from '@/integrations/supabase/client';

export const useAnalyticsAgent = () => {
  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('gscr') || lowerMessage.includes('rating')) {
      return await handleGSCRAnalysis(context);
    }

    if (lowerMessage.includes('stats') || lowerMessage.includes('performance')) {
      return await handlePerformanceStats(context);
    }

    if (lowerMessage.includes('tournament') || lowerMessage.includes('history')) {
      return await handleTournamentHistory(context);
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return await handleRecommendations(context);
    }

    return {
      message: "I'll analyze your tournament performance! 📊\n\n" +
              "I can show you:\n" +
              "📈 Your GSCR (Global Speed Chess Rating) trend\n" +
              "🏆 Tournament performance statistics\n" +
              "📋 Game history and analysis\n" +
              "🎯 Personalized recommendations\n\n" +
              "What would you like to see?",
      options: [
        "📈 My GSCR Rating",
        "🏆 Tournament Stats",
        "📋 Recent Games",
        "🎯 Get Recommendations"
      ]
    };
  };

  const handleGSCRAnalysis = async (context: AgentContext): Promise<AgentResponse> => {
    if (!context.userId) {
      return {
        message: "I'd love to show your GSCR analysis, but I need you to be logged in first!",
        options: ["🔐 Sign In", "❓ What is GSCR?"]
      };
    }

    try {
      const { data: user } = await supabase
        .from('users')
        .select('gscr, name')
        .eq('id', context.userId)
        .single();

      const { data: recentGames } = await supabase
        .from('games')
        .select('rating_before, rating_after, result, timestamp')
        .eq('user_id', context.userId)
        .order('timestamp', { ascending: false })
        .limit(10);

      if (user) {
        const currentGSCR = user.gscr || 1200;
        const ratingChange = recentGames && recentGames.length > 0 
          ? currentGSCR - (recentGames[recentGames.length - 1]?.rating_before || currentGSCR)
          : 0;
        
        const winRate = recentGames 
          ? Math.round((recentGames.filter(g => g.result === 'W').length / recentGames.length) * 100)
          : 0;

        return {
          message: `📈 GSCR Analysis for ${user.name}\n\n` +
                  `Current GSCR: **${currentGSCR}**\n` +
                  `Recent Change: ${ratingChange >= 0 ? '+' : ''}${ratingChange}\n` +
                  `Win Rate (Last 10): ${winRate}%\n\n` +
                  `🎯 **Rating Insights:**\n` +
                  `${getRatingInsights(currentGSCR, ratingChange, winRate)}`,
          options: [
            "📊 View Detailed Chart",
            "🏆 Compare to Others",
            "🎯 Get Improvement Tips",
            "📈 Rating History"
          ]
        };
      }
    } catch (error) {
      console.error('Error fetching GSCR data:', error);
    }

    return {
      message: "I couldn't load your GSCR data right now. Let me help you get started with tournaments to build your rating!",
      options: ["🏆 Join Tournament", "❓ Learn About GSCR"]
    };
  };

  const handlePerformanceStats = async (context: AgentContext): Promise<AgentResponse> => {
    if (!context.userId) {
      return {
        message: "Sign in to see your tournament performance statistics!",
        options: ["🔐 Sign In", "👀 View Sample Stats"]
      };
    }

    try {
      const { data: games } = await supabase
        .from('games')
        .select(`
          *,
          events (name, time_control, date)
        `)
        .eq('user_id', context.userId)
        .order('timestamp', { ascending: false })
        .limit(20);

      if (games && games.length > 0) {
        const totalGames = games.length;
        const wins = games.filter(g => g.result === 'W').length;
        const draws = games.filter(g => g.result === 'D').length;
        const losses = games.filter(g => g.result === 'L').length;
        
        const winRate = Math.round((wins / totalGames) * 100);
        const avgRatingChange = Math.round(
          games.reduce((sum, g) => sum + (g.rating_after - g.rating_before), 0) / totalGames
        );

        return {
          message: `🏆 Tournament Performance (Last ${totalGames} games)\n\n` +
                  `**Record:** ${wins}W-${losses}L-${draws}D (${winRate}% win rate)\n` +
                  `**Avg Rating Change:** ${avgRatingChange >= 0 ? '+' : ''}${avgRatingChange}\n` +
                  `**Tournaments Played:** ${new Set(games.map(g => g.event_id)).size}\n\n` +
                  `**Recent Form:** ${getRecentForm(games.slice(0, 5))}\n\n` +
                  `${getPerformanceInsights(winRate, avgRatingChange)}`,
          options: [
            "📈 Rating Progression",
            "🎯 Time Control Analysis",
            "🏆 Tournament Breakdown",
            "📊 Opponent Analysis"
          ]
        };
      }
    } catch (error) {
      console.error('Error fetching performance stats:', error);
    }

    return {
      message: "No tournament games found yet. Ready to start building your stats?",
      options: ["🏆 Register for Tournament", "📚 Learn Tournament Strategy"]
    };
  };

  const handleTournamentHistory = async (context: AgentContext): Promise<AgentResponse> => {
    try {
      const { data: registrations } = await supabase
        .from('tournament_registrations')
        .select(`
          *,
          events (name, date, time_control)
        `)
        .eq('user_id', context.userId)
        .order('registered_at', { ascending: false })
        .limit(10);

      if (registrations && registrations.length > 0) {
        const historyText = registrations.map(r => 
          `🏆 ${r.events.name}\n   📅 ${r.events.date} • Rating: ${r.current_rating} • Status: ${r.setup_completed ? '✅' : '⏳'}`
        ).join('\n\n');

        return {
          message: `📋 Your Tournament History\n\n${historyText}\n\n` +
                  `Total Tournaments: ${registrations.length}`,
          options: [
            "📊 Detailed Results",
            "🏆 Register for Next",
            "📈 Rating Progression",
            "🎯 Performance Analysis"
          ]
        };
      }
    } catch (error) {
      console.error('Error fetching tournament history:', error);
    }

    return {
      message: "No tournament history found yet. Let's get you registered for your first tournament!",
      options: ["🏆 Register Now", "📚 Tournament Guide"]
    };
  };

  const handleRecommendations = async (context: AgentContext): Promise<AgentResponse> => {
    if (!context.userId) {
      return {
        message: "I can give you general recommendations, or personalized ones if you sign in!",
        options: ["🔐 Sign In for Personal Tips", "📚 General Tournament Tips"]
      };
    }

    try {
      const { data: user } = await supabase
        .from('users')
        .select('gscr')
        .eq('id', context.userId)
        .single();

      const { data: recentGames } = await supabase
        .from('games')
        .select('result, rating_after, rating_before')
        .eq('user_id', context.userId)
        .order('timestamp', { ascending: false })
        .limit(5);

      if (user && recentGames) {
        const currentRating = user.gscr || 1200;
        const recentForm = getRecentForm(recentGames);
        const recommendations = getPersonalizedRecommendations(currentRating, recentGames);

        return {
          message: `🎯 Personalized Recommendations\n\n` +
                  `**Based on your GSCR ${currentRating} and recent form (${recentForm}):**\n\n` +
                  `${recommendations}`,
          options: [
            "🏆 Register Recommended Tournament",
            "📚 Study Materials",
            "🎯 Training Schedule",
            "👥 Find Practice Partners"
          ]
        };
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }

    return {
      message: "Here are some general recommendations to improve your tournament play!",
      options: ["📚 Study Tips", "🏆 Tournament Strategy", "⏰ Practice Schedule"]
    };
  };

  const getRatingInsights = (rating: number, change: number, winRate: number): string => {
    if (rating < 1200) {
      return "Focus on basic tactics and endgames. You're building a solid foundation!";
    } else if (rating < 1600) {
      return "Great progress! Work on opening principles and tactical patterns.";
    } else if (rating < 2000) {
      return "Strong player! Focus on positional understanding and time management.";
    } else {
      return "Expert level! Consider teaching others and playing in prestigious events.";
    }
  };

  const getRecentForm = (games: any[]): string => {
    return games.map(g => {
      if (g.result === 'W') return '🟢';
      if (g.result === 'D') return '🟡';
      return '🔴';
    }).join('');
  };

  const getPerformanceInsights = (winRate: number, avgChange: number): string => {
    if (winRate >= 70) {
      return "🔥 **Excellent form!** Consider playing stronger opponents or longer time controls.";
    } else if (winRate >= 50) {
      return "📈 **Solid performance!** You're improving steadily. Keep it up!";
    } else {
      return "💪 **Room for growth!** Focus on tactics training and analyzing your games.";
    }
  };

  const getPersonalizedRecommendations = (rating: number, games: any[]): string => {
    const recommendations = [];
    
    if (rating < 1400) {
      recommendations.push("🎯 **Tournaments:** Start with 3+2 or 5+0 formats for tactical practice");
      recommendations.push("📚 **Study:** Focus on basic tactics (pins, f orks, skewers)");
    } else if (rating < 1800) {
      recommendations.push("🎯 **Tournaments:** Try 7+5 or 10+0 for positional play development");
      recommendations.push("📚 **Study:** Work on opening principles and endgame basics");
    } else {
      recommendations.push("🎯 **Tournaments:** All formats suitable - consider our weekend specials");
      recommendations.push("📚 **Study:** Advanced positional concepts and time management");
    }

    const winRate = games.length > 0 ? (games.filter(g => g.result === 'W').length / games.length) * 100 : 50;
    if (winRate < 40) {
      recommendations.push("⚡ **Priority:** Slow down and double-check moves before playing");
    }

    return recommendations.join('\n');
  };

  return { processMessage };
};
