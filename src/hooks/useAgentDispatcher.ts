
import { useState } from 'react';
import { AgentType, AgentContext, AgentResponse } from '@/types/agents';
import { useRegistrationAgent } from '@/hooks/agents/useRegistrationAgent';
import { useFollowUpAgent } from '@/hooks/agents/useFollowUpAgent';
import { useFairPlayAgent } from '@/hooks/agents/useFairPlayAgent';
import { useAnalyticsAgent } from '@/hooks/agents/useAnalyticsAgent';

export const useAgentDispatcher = () => {
  const [currentAgent, setCurrentAgent] = useState<AgentType>('general');
  
  const registrationAgent = useRegistrationAgent();
  const followUpAgent = useFollowUpAgent();
  const fairPlayAgent = useFairPlayAgent();
  const analyticsAgent = useAnalyticsAgent();

  const determineAgent = (message: string): AgentType => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('register') || lowerMessage.includes('tournament') || lowerMessage.includes('sign up')) {
      return 'registration';
    }
    
    if (lowerMessage.includes('zoom') || lowerMessage.includes('setup') || lowerMessage.includes('camera') || lowerMessage.includes('fair play')) {
      return 'fairplay';
    }
    
    if (lowerMessage.includes('rating') || lowerMessage.includes('gscr') || lowerMessage.includes('analytics') || lowerMessage.includes('stats')) {
      return 'analytics';
    }
    
    if (lowerMessage.includes('reminder') || lowerMessage.includes('email') || lowerMessage.includes('confirmation')) {
      return 'followup';
    }
    
    return 'general';
  };

  const processMessage = async (message: string, context: AgentContext): Promise<AgentResponse> => {
    const agentType = determineAgent(message);
    setCurrentAgent(agentType);

    switch (agentType) {
      case 'registration':
        return await registrationAgent.processMessage(message, context);
      case 'followup':
        return await followUpAgent.processMessage(message, context);
      case 'fairplay':
        return await fairPlayAgent.processMessage(message, context);
      case 'analytics':
        return await analyticsAgent.processMessage(message, context);
      default:
        return {
          message: "I'm here to help with tournament registration, setup, analytics, or general questions. What would you like to know?",
          options: [
            "🏆 Register for Tournament",
            "📱 Zoom Setup Help",
            "📊 View My Stats",
            "📧 Tournament Reminders"
          ]
        };
    }
  };

  return {
    currentAgent,
    processMessage,
    setCurrentAgent
  };
};
