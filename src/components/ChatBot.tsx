
import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useChatBot } from '@/hooks/useChatBot';
import { useChatFlowHandler } from '@/hooks/useChatFlowHandler';
import { ChatMessages } from '@/components/chat/ChatMessages';
import { ChatInput } from '@/components/chat/ChatInput';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    currentInput,
    setCurrentInput,
    currentFlow,
    setCurrentFlow,
    currentStep,
    setCurrentStep,
    userData,
    setUserData,
    messagesEndRef,
    addBotMessage,
    addUserMessage
  } = useChatBot();

  const { handleOptionClick, handleInputSubmit } = useChatFlowHandler({
    currentFlow,
    currentStep,
    userData,
    setCurrentFlow,
    setCurrentStep,
    setUserData,
    addBotMessage,
    addUserMessage
  });

  // Auto-open chatbot after 4 seconds if not dismissed in this session
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('chatbotDismissed')) {
        setIsOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi there! 👋 Want to join a blitz tournament or support chess in schools? I can help.",
        ['🎯 Register for Tournament', '💛 Make a Donation', '👑 View Membership Plans']
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen) {
      // When closing, mark as dismissed for this session
      sessionStorage.setItem('chatbotDismissed', 'true');
    }
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-700 hover:bg-green-800 shadow-lg z-50 animate-pulse"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-green-700 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-amber-400" />
          <span className="font-bold">BlitzBot</span>
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
      />
    </Card>
  );
};

export default ChatBot;
