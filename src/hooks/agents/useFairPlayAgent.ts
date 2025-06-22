
import { AgentContext, AgentResponse } from '@/types/agents';

export const useFairPlayAgent = () => {
  const handleZoomQuestion = (message: string): AgentResponse | null => {
    const lower = message.toLowerCase();

    if (lower.includes("zoom") || lower.includes("camera") || lower.includes("phone") || lower.includes("mobile") || lower.includes("desktop")) {
      if (lower.includes("phone") || lower.includes("mobile")) {
        return {
          message: "📱 Mobile Setup:\n1. Join Zoom via the app.\n2. Tap Share → Screen → Start Broadcast.\n3. Your Tornelo screen is now visible.\n4. Your camera stays on in a floating overlay.\n✅ Don't cover the camera bubble!",
          options: [
            "✅ Mobile Setup Complete",
            "💻 Switch to Desktop Setup", 
            "❓ More Mobile Tips",
            "🎯 Fair Play Rules"
          ]
        };
      }

      if (lower.includes("desktop") || lower.includes("laptop")) {
        return {
          message: "💻 Desktop Setup:\n1. Join Zoom via desktop app.\n2. Turn on your webcam.\n3. Share your full screen.\n4. Keep your face and desk visible.\n✅ Don't minimize Zoom.",
          options: [
            "✅ Desktop Setup Complete",
            "📱 Switch to Mobile Setup",
            "🎤 Audio/Video Test",
            "🎯 Fair Play Rules"
          ]
        };
      }

      return {
        message: "Are you on mobile or desktop?\n\nReply with 'Mobile' or 'Desktop' and I'll walk you through the setup.",
        options: [
          "📱 Mobile Setup",
          "💻 Desktop Setup",
          "❓ What's the difference?",
          "🎯 Fair Play Rules"
        ]
      };
    }

    return null;
  };

  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    // First check for specific Zoom questions
    const zoomResponse = handleZoomQuestion(message);
    if (zoomResponse) {
      return zoomResponse;
    }

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('setup complete') || lowerMessage.includes('ready')) {
      return handleSetupComplete();
    }

    if (lowerMessage.includes('fair play') || lowerMessage.includes('rules')) {
      return handleFairPlayRules();
    }

    if (lowerMessage.includes('tips') || lowerMessage.includes('help')) {
      return handleProTips();
    }

    return {
      message: "I'll help you get tournament-ready! 🎯\n\n" +
              "I can help with:\n" +
              "🖥️ Zoom setup and screen sharing\n" +
              "📱 Mobile device setup and camera\n" +
              "⚖️ Fair play guidelines\n" +
              "📲 Camera positioning and lighting\n\n" +
              "What do you need help with?",
      options: [
        "🖥️ Zoom Setup Guide",
        "📱 Mobile Setup",
        "📷 Camera Setup",
        "⚖️ Fair Play Rules"
      ]
    };
  };

  const handleSetupComplete = (): AgentResponse => {
    return {
      message: "Excellent! 🎉 You're all set for tournament play!\n\n" +
              "**Quick Checklist:**\n" +
              "✅ Zoom app installed and tested\n" +
              "✅ Camera and microphone working\n" +
              "✅ Screen sharing enabled\n" +
              "✅ Good lighting and stable setup\n" +
              "✅ Fair play rules understood\n\n" +
              "You'll receive your tournament links via email. Good luck! 🏆",
      options: [
        "🏆 I'm Ready to Play!",
        "📧 Resend Tournament Links",
        "📱 Mobile Backup Setup",
        "❓ Last-Minute Questions"
      ]
    };
  };

  const handleFairPlayRules = (): AgentResponse => {
    return {
      message: "🎯 GSCI Tournament Rules - Fair Play Guidelines\n\n" +
              "**Strictly Prohibited:**\n" +
              "❌ Chess engines or analysis tools\n" +
              "❌ Getting help from others\n" +
              "❌ Multiple browser tabs/windows\n" +
              "❌ Books, notes, or reference material\n\n" +
              "**Required During Play:**\n" +
              "✅ Camera ON showing hands and face\n" +
              "✅ Screen sharing your chess platform\n" +
              "✅ Stay visible in Zoom throughout\n" +
              "✅ Play in quiet, private space\n" +
              "✅ Keep camera overlay unobstructed (mobile)\n\n" +
              "**Violations result in immediate disqualification and rating penalties.**",
      options: [
        "✅ I Understand and Agree",
        "📱 Mobile Fair Play Setup",
        "💻 Desktop Fair Play Setup",
        "🏆 Ready to Play"
      ]
    };
  };

  const handleProTips = (): AgentResponse => {
    return {
      message: "💡 Pro Tips for Tournament Success\n\n" +
              "**Mobile Players:**\n" +
              "• Use a phone stand for stability\n" +
              "• Keep charger handy\n" +
              "• Test screen sharing beforehand\n" +
              "• Pin your camera overlay visible\n" +
              "• Use good lighting on your face\n\n" +
              "**Desktop Players:**\n" +
              "• Close unnecessary apps\n" +
              "• Use wired internet if possible\n" +
              "• Position camera to show hands\n" +
              "• Test full screen sharing\n" +
              "• Have backup mobile device ready\n\n" +
              "**Everyone:**\n" +
              "• Join 10 minutes early\n" +
              "• Test audio/video first\n" +
              "• Keep water nearby\n" +
              "• Disable notifications",
      options: [
        "📱 Mobile Specific Tips",
        "💻 Desktop Specific Tips",
        "✅ I'm Prepared",
        "🔧 Technical Troubleshooting"
      ]
    };
  };

  return { processMessage };
};
