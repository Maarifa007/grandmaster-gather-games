
import { AgentContext, AgentResponse } from '@/types/agents';
import { supabase } from '@/integrations/supabase/client';

export const useFollowUpAgent = () => {
  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('reminder') || lowerMessage.includes('notification')) {
      return await handleReminderSetup(context);
    }

    if (lowerMessage.includes('confirmation') || lowerMessage.includes('email')) {
      return await handleConfirmationStatus(context);
    }

    if (lowerMessage.includes('schedule') || lowerMessage.includes('when')) {
      return await handleScheduleInfo(context);
    }

    return {
      message: "I help with tournament follow-up and reminders! 📧\n\n" +
              "I can:\n" +
              "• Send tournament reminders\n" +
              "• Confirm your registration status\n" +
              "• Provide schedule updates\n" +
              "• Help with pre-tournament setup\n\n" +
              "What would you like help with?",
      options: [
        "🔔 Set Up Reminders",
        "✅ Check Registration Status",
        "📅 Tournament Schedule",
        "⚙️ Pre-Tournament Setup"
      ]
    };
  };

  const handleReminderSetup = async (context: AgentContext): Promise<AgentResponse> => {
    return {
      message: "I'll set up tournament reminders for you! 🔔\n\n" +
              "You'll receive:\n" +
              "✅ Confirmation email immediately\n" +
              "✅ Setup reminder 24 hours before\n" +
              "✅ Final reminder 30 minutes before\n" +
              "✅ Zoom link and bracket information\n\n" +
              "Your reminders are now active!",
      options: [
        "📧 Update Email Preferences",
        "📱 Add to Calendar",
        "🏆 View Tournament Details"
      ],
      actions: [
        {
          type: 'email',
          payload: {
            type: 'reminder_setup',
            userId: context.userId
          }
        }
      ]
    };
  };

  const handleConfirmationStatus = async (context: AgentContext): Promise<AgentResponse> => {
    if (!context.registrationId) {
      return {
        message: "I don't see any active registrations for you. Would you like to register for a tournament?",
        options: ["🏆 Register Now", "❓ Check Different Email"]
      };
    }

    try {
      const { data: registration } = await supabase
        .from('tournament_registrations')
        .select(`
          *,
          events (name, date, time_control)
        `)
        .eq('id', context.registrationId)
        .single();

      if (registration) {
        return {
          message: `✅ Registration Confirmed!\n\n` +
                  `Tournament: ${registration.events.name}\n` +
                  `Date: ${registration.events.date}\n` +
                  `Platform: ${registration.platform}\n` +
                  `Username: ${registration.platform_username}\n` +
                  `Setup Status: ${registration.setup_completed ? '✅ Complete' : '⏳ Pending'}\n\n` +
                  `Everything looks good for your tournament!`,
          options: [
            "🔧 Complete Setup",
            "✏️ Update Details",
            "📧 Resend Confirmation"
          ]
        };
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    }

    return {
      message: "I couldn't find your registration details. Let me help you check or register.",
      options: ["🔍 Search by Email", "🏆 New Registration"]
    };
  };

  const handleScheduleInfo = async (context: AgentContext): Promise<AgentResponse> => {
    try {
      const { data: tournaments } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(7);

      if (tournaments && tournaments.length > 0) {
        const scheduleText = tournaments.map(t => 
          `📅 ${t.name}\n   ${t.date} • ${t.time_control} • ${t.location}`
        ).join('\n\n');

        return {
          message: `Here's the upcoming tournament schedule:\n\n${scheduleText}\n\n` +
                  `All tournaments are USCF-rated with cash prizes!`,
          options: [
            "🏆 Register for Tournament",
            "📧 Subscribe to Updates",
            "⏰ Add to Calendar"
          ]
        };
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
    }

    return {
      message: "I'm having trouble loading the schedule right now. Please check our website for the latest tournament information.",
      options: ["🌐 Visit Website", "🔄 Try Again"]
    };
  };

  return { processMessage };
};
