
import { useState, useRef, useEffect } from 'react';
import { useAgentDispatcher } from '@/hooks/useAgentDispatcher';
import { AgentContext } from '@/types/agents';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  timestamp: Date;
  agent?: string;
}

export const useChatBotV2 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { processMessage, currentAgent } = useAgentDispatcher();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, options?: string[], agent?: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      isBot: true,
      options,
      timestamp: new Date(),
      agent
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleMessage = async (message: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    addUserMessage(message);

    try {
      const context: AgentContext = {
        conversationHistory: messages,
        userData: {}
      };

      const response = await processMessage(message, context);
      
      addBotMessage(response.message, response.options, currentAgent);
      
      // Handle any actions
      if (response.actions) {
        response.actions.forEach(action => {
          if (action.type === 'redirect') {
            setTimeout(() => {
              window.location.href = action.payload;
            }, 1000);
          }
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
      addBotMessage(
        "I apologize, but I'm having trouble right now. Please try again or visit our registration page directly.",
        ["🚀 Go to Registration", "🔄 Try Again"]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleMessage(option);
  };

  const handleInputSubmit = (input: string, setInput: (value: string) => void) => {
    if (input.trim()) {
      handleMessage(input.trim());
      setInput('');
    }
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        "Hi! I'm BlitzBot 🤖 - your tournament assistant!\n\n" +
        "I'm powered by specialized AI agents that can help you with:\n" +
        "🏆 Tournament registration and setup\n" +
        "📊 Performance analytics and GSCR tracking\n" +
        "🎯 Fair play guidelines and Zoom setup\n" +
        "📧 Tournament reminders and follow-up\n\n" +
        "What can I help you with today?",
        [
          "🏆 Register for Tournament",
          "📊 View My Stats", 
          "🎯 Setup Help",
          "📧 Tournament Reminders"
        ],
        'general'
      );
    }
  }, []);

  return {
    messages,
    currentInput,
    setCurrentInput,
    messagesEndRef,
    isProcessing,
    currentAgent,
    handleOptionClick,
    handleInputSubmit
  };
};
