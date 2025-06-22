
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

    if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('how do i use zoom') || lowerMessage.includes('can i use my phone')) {
      return handleMobileZoomSetup();
    }

    if (lowerMessage.includes('zoom setup') || lowerMessage.includes('zoom help')) {
      return handleZoomSetupHelp();
    }

    return {
      message: "I help with tournament follow-up and setup! 📧\n\n" +
              "I can:\n" +
              "• Send tournament reminders\n" +
              "• Help with Zoom setup (mobile & desktop)\n" +
              "• Confirm your registration status\n" +
              "• Provide schedule updates\n" +
              "• Guide you through mobile setup\n\n" +
              "What would you like help with?",
      options: [
        "🔔 Set Up Reminders",
        "📱 Mobile Zoom Setup",
        "✅ Check Registration Status",
        "📅 Tournament Schedule"
      ]
    };
  };

  const handleMobileZoomSetup = (): AgentResponse => {
    return {
      message: "Mobile Zoom Setup Guide 📱\n\n" +
              "**Great news! You can absolutely play on your phone!**\n\n" +
              "**Quick Setup Steps:**\n" +
              "1️⃣ Join Zoom via the mobile app\n" +
              "2️⃣ Tap **Share → Screen → Start Broadcast**\n" +
              "3️⃣ Your chess game screen is now visible\n" +
              "4️⃣ Your camera overlay stays floating on top\n" +
              "5️⃣ Keep that camera bubble visible!\n\n" +
              "**Why This Works:**\n" +
              "✅ Arbiters see your game moves\n" +
              "✅ Arbiters see you via floating camera\n" +
              "✅ Fair play monitoring is maintained\n\n" +
              "**Important:** Don't cover or minimize the camera overlay - that's how arbiters verify fair play!",
      options: [
        "📱 Detailed Mobile Guide",
        "💡 Mobile Pro Tips",
        "🔧 Troubleshooting",
        "✅ I'm Ready for Mobile Play"
      ]
    };
  };

  const handleZoomSetupHelp = (): AgentResponse => {
    return {
      message: "Zoom Setup Help 🖥️📱\n\n" +
              "**Desktop Setup:**\n" +
              "1️⃣ Download Zoom desktop app\n" +
              "2️⃣ Test camera and microphone\n" +
              "3️⃣ Share full screen (not just browser)\n" +
              "4️⃣ Keep camera window visible\n\n" +
              "**Mobile Setup:**\n" +
              "1️⃣ Use Zoom mobile app\n" +
              "2️⃣ Enable screen sharing permissions\n" +
              "3️⃣ Share screen → Start broadcast\n" +
              "4️⃣ Camera overlay remains active\n\n" +
              "**Both platforms work great for tournaments!**",
      options: [
        "📱 Focus on Mobile Setup",
        "💻 Focus on Desktop Setup",
        "🎯 Fair Play Requirements",
        "✅ Setup Complete"
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
              "✅ Zoom link and bracket information\n" +
              "✅ Mobile setup guide if needed\n\n" +
              "Your reminders are now active!",
      options: [
        "📧 Update Email Preferences",
        "📱 Mobile Setup Guide",
        "📅 Add to Calendar",
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
                  `Setup Status: ${registration.setup_completed ? '✅ Complete' : '⏳ Pending'}\n` +
                  `Zoom Ready: ${registration.zoom_ready ? '✅ Yes' : '⏳ Not yet'}\n\n` +
                  `Everything looks good for your tournament!`,
          options: [
            "🔧 Complete Setup",
            "📱 Mobile Setup Guide",
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
                  `All tournaments support both desktop and mobile play!\n` +
                  `All tournaments are USCF-rated with cash prizes!`,
          options: [
            "🏆 Register for Tournament",
            "📱 Mobile Setup Help",
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
