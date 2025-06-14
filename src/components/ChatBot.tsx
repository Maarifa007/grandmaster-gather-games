
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "👋 Welcome to the Global Speed Chess Initiative! Ready to play in tonight's rated blitz tournament — or support chess in schools and prisons?",
        ['🎯 Register for Tournament', '💛 Make a Donation', '👑 View Membership Plans']
      );
    }
  }, [isOpen]);

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

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    if (currentFlow === 'initial') {
      if (option.includes('Tournament')) {
        setCurrentFlow('tournament');
        setCurrentStep(0);
        addBotMessage(
          "🎯 Let's get you signed up! Which platform would you like to play on today?",
          ['Chess.com', 'Lichess']
        );
      } else if (option.includes('Donation')) {
        setCurrentFlow('donation');
        addBotMessage(
          "Would you like to make a tax-deductible donation to support our mission? Even $5 helps us run programs in hospitals, prisons, and libraries.",
          ['Donate $5', 'Donate $10', 'Donate Custom Amount', 'Skip for now']
        );
      } else if (option.includes('Membership')) {
        setCurrentFlow('membership');
        addBotMessage(
          "Want to save on entry fees? Check out our Monthly Pass options:\n\n🎟️ BlitzPass – $25/month = 10 tourneys\n👑 Unlimited – $60/month = all-access + invite-only events",
          ['View BlitzPass Details', 'View Unlimited Details', 'Back to Main Menu']
        );
      }
    } else if (currentFlow === 'tournament') {
      handleTournamentFlow(option);
    } else if (currentFlow === 'donation') {
      handleDonationFlow(option);
    } else if (currentFlow === 'membership') {
      handleMembershipFlow(option);
    }
  };

  const handleTournamentFlow = (option: string) => {
    switch (currentStep) {
      case 0: // Platform selection
        setUserData(prev => ({ ...prev, platform: option.toLowerCase() as 'chess.com' | 'lichess' }));
        setCurrentStep(1);
        addBotMessage(`Awesome! What's your username on ${option}?`);
        break;
      case 2: // USCF ID
        if (option === 'I have a USCF ID') {
          addBotMessage("Please enter your USCF ID:");
        } else {
          setCurrentStep(3);
          addBotMessage("What's your current blitz rating? (Chess.com, Lichess, or USCF)");
        }
        break;
      default:
        break;
    }
  };

  const handleDonationFlow = (option: string) => {
    if (option.includes('$')) {
      addBotMessage(
        "💌 Thank you for supporting the Global Speed Chess Initiative. Every blitz game you fund brings chess to someone who needs it. ♟️\n\nWould you also like to register for today's tournament?",
        ['Yes, register me!', 'Maybe later']
      );
    } else if (option === 'Skip for now') {
      addBotMessage(
        "No problem! Would you like to register for today's tournament instead?",
        ['Yes, let\'s play!', 'Just browsing']
      );
    }
  };

  const handleMembershipFlow = (option: string) => {
    if (option.includes('BlitzPass')) {
      addBotMessage(
        "🎟️ BlitzPass Details:\n• $25/month\n• 10 tournament entries\n• Save $75 compared to individual entries\n• Cancel anytime",
        ['Sign Up for BlitzPass', 'Back to Options']
      );
    } else if (option.includes('Unlimited')) {
      addBotMessage(
        "👑 Unlimited Details:\n• $60/month\n• All tournament access\n• Exclusive invite-only events\n• Priority support\n• Cancel anytime",
        ['Sign Up for Unlimited', 'Back to Options']
      );
    } else if (option === 'Back to Main Menu') {
      setCurrentFlow('initial');
      setCurrentStep(0);
      addBotMessage(
        "What would you like to do?",
        ['🎯 Register for Tournament', '💛 Make a Donation', '👑 View Membership Plans']
      );
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    addUserMessage(currentInput);
    
    if (currentFlow === 'tournament') {
      switch (currentStep) {
        case 1: // Username
          setUserData(prev => ({ ...prev, username: currentInput }));
          setCurrentStep(2);
          addBotMessage(
            "Great. Do you have a USCF ID so we can rate your games officially? (If not, you can still play – we'll use a provisional rating.)",
            ['I have a USCF ID', 'Skip USCF ID']
          );
          break;
        case 2: // USCF ID input
          setUserData(prev => ({ ...prev, uscfId: currentInput }));
          setCurrentStep(3);
          addBotMessage("What's your current blitz rating? (Chess.com, Lichess, or USCF)");
          break;
        case 3: // Rating
          setUserData(prev => ({ ...prev, rating: currentInput }));
          setCurrentStep(4);
          addBotMessage("Perfect. Please confirm your email so we can send the join link and pairings.");
          break;
        case 4: // Email
          setUserData(prev => ({ ...prev, email: currentInput }));
          setCurrentStep(5);
          addBotMessage(
            "Entry fee is $10 for today's tournament.\n🪙 Proceeds go toward cash prizes and building real chess cafés in underserved communities.\n\n✅ Click below to complete payment:",
            ['💳 Pay with PayPal']
          );
          break;
        default:
          break;
      }
    }
    
    setCurrentInput('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-700 hover:bg-green-800 shadow-lg z-50"
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
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-green-700 text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              {message.options && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start border-green-200 text-green-700 hover:bg-green-50"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleInputSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-green-700 hover:bg-green-800">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ChatBot;
