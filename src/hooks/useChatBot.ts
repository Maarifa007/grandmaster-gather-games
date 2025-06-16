
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  timestamp: Date;
}

interface UserData {
  platform?: 'chess.com' | 'lichess';
  username?: string;
  uscfId?: string;
  rating?: string;
  email?: string;
}

export const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentFlow, setCurrentFlow] = useState<'initial' | 'tournament' | 'donation' | 'membership'>('initial');
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      isBot: true,
      options,
      timestamp: new Date(),
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

  const resetChat = () => {
    setCurrentFlow('initial');
    setCurrentStep(0);
    setUserData({});
  };

  return {
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
    addUserMessage,
    resetChat
  };
};
