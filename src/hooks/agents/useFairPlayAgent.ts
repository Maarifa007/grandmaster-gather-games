
import { AgentContext, AgentResponse } from '@/types/agents';

export const useFairPlayAgent = () => {
  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('zoom') || lowerMessage.includes('setup')) {
      return handleZoomSetup();
    }

    if (lowerMessage.includes('camera') || lowerMessage.includes('screen')) {
      return handleCameraSetup();
    }

    if (lowerMessage.includes('fair play') || lowerMessage.includes('rules')) {
      return handleFairPlayRules();
    }

    if (lowerMessage.includes('mobile') || lowerMessage.includes('phone') || lowerMessage.includes('can i use my phone')) {
      return handleMobileSetup();
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
        "📱 How do I play on mobile?",
        "📷 Camera Setup",
        "⚖️ Fair Play Rules"
      ]
    };
  };

  const handleZoomSetup = (): AgentResponse => {
    return {
      message: "Zoom Setup Guide 🖥️\n\n" +
              "**Desktop Setup:**\n" +
              "1️⃣ Download Zoom desktop app (required)\n" +
              "2️⃣ Test your microphone and camera\n" +
              "3️⃣ Join 10 minutes early for tech check\n" +
              "4️⃣ Share your full screen (not just browser)\n" +
              "5️⃣ Keep camera and game visible throughout\n\n" +
              "**Mobile Setup:**\n" +
              "1️⃣ Join Zoom via mobile app\n" +
              "2️⃣ Tap Share → Screen → Start Broadcast\n" +
              "3️⃣ Your camera stays in floating overlay\n" +
              "4️⃣ Keep camera overlay visible and unobstructed\n\n" +
              "You'll get the Zoom link in your confirmation email!",
      options: [
        "📱 Mobile Setup Details",
        "🎤 Audio/Video Test",
        "🖥️ Desktop Requirements",
        "✅ I'm Ready!"
      ]
    };
  };

  const handleCameraSetup = (): AgentResponse => {
    return {
      message: "Camera & Fair Play Setup 📷\n\n" +
              "**Camera Requirements:**\n" +
              "✅ Show your hands and chess board/screen\n" +
              "✅ Good lighting on your face\n" +
              "✅ Stable camera position\n" +
              "✅ No one else visible in frame\n\n" +
              "**Screen Setup:**\n" +
              "✅ Share your chess platform screen\n" +
              "✅ Keep camera in floating window (mobile)\n" +
              "✅ Both visible to arbiters at all times\n\n" +
              "This ensures fair play for everyone! 🤝",
      options: [
        "💡 Lighting Tips",
        "📱 Mobile Camera Setup",
        "🖥️ Dual Monitor Help",
        "✅ Camera Check Complete"
      ]
    };
  };

  const handleFairPlayRules = (): AgentResponse => {
    return {
      message: "Fair Play Guidelines ⚖️\n\n" +
              "**Strictly Prohibited:**\n" +
              "❌ Chess engines or analysis tools\n" +
              "❌ Getting help from others\n" +
              "❌ Multiple browser tabs/windows\n" +
              "❌ Books, notes, or reference material\n\n" +
              "**Required During Play:**\n" +
              "✅ Camera ON showing hands and face\n" +
              "✅ Screen sharing chess platform\n" +
              "✅ Stay visible in Zoom throughout\n" +
              "✅ Play in quiet, private space\n\n" +
              "**Violations result in immediate disqualification and rating penalties.**",
      options: [
        "📋 Complete Rules PDF",
        "❓ Ask About Specific Situation",
        "✅ I Understand and Agree",
        "🏆 Ready to Play"
      ]
    };
  };

  const handleMobileSetup = (): AgentResponse => {
    return {
      message: "Mobile Tournament Setup 📱\n\n" +
              "**Yes, you can play on your phone!**\n\n" +
              "**Step-by-Step Mobile Setup:**\n" +
              "1️⃣ Join Zoom via mobile app\n" +
              "2️⃣ Tap Share → Screen → Start Broadcast\n" +
              "3️⃣ Your Tornelo screen becomes visible to arbiters\n" +
              "4️⃣ Your camera stays on in a floating overlay\n" +
              "5️⃣ Keep camera overlay unobstructed at all times\n\n" +
              "**Key Points:**\n" +
              "✅ Your game screen is shared\n" +
              "✅ You remain visible via floating camera window\n" +
              "✅ Arbiters can see both your moves and you\n" +
              "⚠️ DON'T cover or hide the camera bubble!\n\n" +
              "**Pro Tips:**\n" +
              "• Use a phone stand for stability\n" +
              "• Ensure good lighting\n" +
              "• Test before tournament starts\n" +
              "• Keep charger handy\n" +
              "• Stable WiFi is essential",
      options: [
        "📱 Single Device Setup",
        "📱📱 Two Device Setup",
        "💡 Mobile Lighting Tips",
        "✅ Mobile Setup Complete"
      ]
    };
  };

  return { processMessage };
};
