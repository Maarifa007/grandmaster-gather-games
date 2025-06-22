
import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, Crown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChatBotV2 } from '@/hooks/useChatBotV2';

const ChatBotV2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    currentInput,
    setCurrentInput,
    messagesEndRef,
    isProcessing,
    currentAgent,
    handleOptionClick,
    handleInputSubmit
  } = useChatBotV2();

  // Auto-open chatbot after 4 seconds if not dismissed in this session
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('chatbotDismissed')) {
        setIsOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    if (isOpen) {
      sessionStorage.setItem('chatbotDismissed', 'true');
    }
    setIsOpen(!isOpen);
  };

  const getAgentDisplay = (agent: string) => {
    const agentConfig = {
      registration: { name: 'Registration', icon: '🏆', color: 'bg-blue-500' },
      followup: { name: 'Follow-up', icon: '📧', color: 'bg-green-500' },
      fairplay: { name: 'Setup', icon: '🎯', color: 'bg-purple-500' },
      analytics: { name: 'Analytics', icon: '📊', color: 'bg-orange-500' },
      general: { name: 'General', icon: '🤖', color: 'bg-gray-500' }
    };
    return agentConfig[agent as keyof typeof agentConfig] || agentConfig.general;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-700 hover:bg-green-800 shadow-lg z-50 animate-pulse"
        size="icon"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    );
  }

  const agentInfo = getAgentDisplay(currentAgent);

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-green-700 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-amber-400" />
          <span className="font-bold">BlitzBot</span>
          <Badge variant="secondary" className="text-xs">
            {agentInfo.icon} {agentInfo.name}
          </Badge>
        </div>
        <Button
          onClick={toggleChat}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-600"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <ChatMessages 
        messages={messages}
        onOptionClick={handleOptionClick}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        onSubmit={handleInputSubmit}
        disabled={isProcessing}
      />
      
      {isProcessing && (
        <div className="p-2 text-center text-sm text-gray-500 border-t">
          <span className="animate-pulse">🤖 Thinking...</span>
        </div>
      )}
    </Card>
  );
};

export default ChatBotV2;
