
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

    if (lowerMessage.includes('mobile') || lowerMessage.includes('phone')) {
      return handleMobileSetup();
    }

    return {
      message: "I'll help you get tournament-ready! 🎯\n\n" +
              "I can help with:\n" +
              "🖥️ Zoom setup and screen sharing\n" +
              "📱 Camera positioning and lighting\n" +
              "⚖️ Fair play guidelines\n" +
              "📲 Mobile device setup\n\n" +
              "What do you need help with?",
      options: [
        "🖥️ Zoom Setup Guide",
        "📷 Camera Setup",
        "⚖️ Fair Play Rules",
        "📱 Mobile Setup"
      ]
    };
  };

  const handleZoomSetup = (): AgentResponse => {
    return {
      message: "Zoom Setup Guide 🖥️\n\n" +
              "**Required Steps:**\n" +
              "1️⃣ Download Zoom desktop app (mobile works too)\n" +
              "2️⃣ Test your microphone and camera\n" +
              "3️⃣ Join 10 minutes early for tech check\n" +
              "4️⃣ Enable screen sharing permissions\n" +
              "5️⃣ Close unnecessary apps and notifications\n\n" +
              "**Important:** You'll get the Zoom link in your confirmation email!",
      options: [
        "📱 Mobile Zoom Setup",
        "🎤 Audio/Video Test",
        "🖥️ Screen Sharing Help",
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
              "✅ Keep camera in floating window\n" +
              "✅ Both visible to arbiters\n\n" +
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
              "**Setup Options:**\n" +
              "🔹 **Option 1:** Phone for Zoom + Tablet for chess\n" +
              "🔹 **Option 2:** Single device with split screen\n\n" +
              "**Best Practice Setup:**\n" +
              "1️⃣ Position phone to show hands + chess screen\n" +
              "2️⃣ Use phone tripod or stable surface\n" +
              "3️⃣ Keep Zoom camera floating over chess app\n" +
              "4️⃣ Ensure good lighting and stable wifi\n\n" +
              "**Pro Tip:** Desktop is easier, but mobile works great with proper setup!",
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
