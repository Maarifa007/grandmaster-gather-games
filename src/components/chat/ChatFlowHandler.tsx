
import React from 'react';

interface ChatFlowHandlerProps {
  currentFlow: 'initial' | 'tournament' | 'donation' | 'membership';
  currentStep: number;
  userData: any;
  setCurrentFlow: (flow: 'initial' | 'tournament' | 'donation' | 'membership') => void;
  setCurrentStep: (step: number) => void;
  setUserData: (data: any) => void;
  addBotMessage: (text: string, options?: string[]) => void;
  addUserMessage: (text: string) => void;
}

export const ChatFlowHandler = ({
  currentFlow,
  currentStep,
  userData,
  setCurrentFlow,
  setCurrentStep,
  setUserData,
  addBotMessage,
  addUserMessage
}: ChatFlowHandlerProps) => {
  
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

  const handleInputSubmit = (currentInput: string, setCurrentInput: (value: string) => void) => {
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

  return { handleOptionClick, handleInputSubmit };
};
