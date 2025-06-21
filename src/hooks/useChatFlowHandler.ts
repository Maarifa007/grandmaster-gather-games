
import { useEffect } from 'react';

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

export const useChatFlowHandler = ({
  currentFlow,
  currentStep,
  userData,
  setCurrentFlow,
  setCurrentStep,
  setUserData,
  addBotMessage,
  addUserMessage
}: ChatFlowHandlerProps) => {

  useEffect(() => {
    if (currentFlow === 'initial' && currentStep === 0) {
      // Initial greeting with tournament focus
      addBotMessage(
        "Hi there! 👋 Want to join a blitz tournament or support chess in schools? I can help.",
        [
          "🏆 Register for Tournament",
          "💝 Make a Donation", 
          "📱 Get Tournament Setup Help",
          "❓ General Questions"
        ]
      );
      setCurrentStep(1);
    }
  }, [currentFlow, currentStep]);

  const handleTournamentSetupFlow = () => {
    addBotMessage(
      "Ready to play? 🎯 Let me help you get set up for your tournament!\n\n" +
      "Here's what you need to do:\n" +
      "✅ Join the Zoom call for fair play monitoring\n" +
      "✅ Check your Tornelo bracket for pairings\n" +
      "✅ Test your screen sharing\n" +
      "✅ Ensure stable internet connection\n\n" +
      "Would you like specific help with any of these steps?",
      [
        "🖥️ Zoom Setup Help",
        "📊 How to Use Tornelo", 
        "⚡ Technical Requirements",
        "🎮 Fair Play Guidelines"
      ]
    );
  };

  const handleTournamentFlow = () => {
    addBotMessage(
      "Excellent! 🏆 I'll help you register for our upcoming USCF-rated tournaments.\n\n" +
      "We have several tournaments coming up:\n" +
      "• Tuesday 3+2 Blitz (7:00PM PT)\n" +
      "• Wednesday 5+0 Blitz (7:00PM PT)\n" +
      "• Thursday 7+5 Blitz (7:00PM PT)\n" +
      "• Friday 3+2 Rapid (8:00PM PT)\n\n" +
      "Each tournament has a $10 entry fee - 70% goes to prizes and 30% supports chess education!",
      [
        "📝 Start Registration",
        "📅 See Full Schedule",
        "💰 Prize Information",
        "❓ Tournament Rules"
      ]
    );
  };

  const handleDonationFlow = () => {
    addBotMessage(
      "Thank you for wanting to support chess education! 💝\n\n" +
      "Your donation helps us bring chess to:\n" +
      "• Schools and educational programs\n" +
      "• Prison rehabilitation programs\n" +
      "• Public libraries\n" +
      "• Underserved communities\n\n" +
      "Every dollar makes a difference in a young person's life!",
      [
        "💵 Donate $5",
        "💵 Donate $10", 
        "💵 Donate $25",
        "💰 Custom Amount"
      ]
    );
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    switch (option) {
      case "🏆 Register for Tournament":
        setCurrentFlow('tournament');
        setCurrentStep(0);
        handleTournamentFlow();
        break;
        
      case "💝 Make a Donation":
        setCurrentFlow('donation'); 
        setCurrentStep(0);
        handleDonationFlow();
        break;
        
      case "📱 Get Tournament Setup Help":
        handleTournamentSetupFlow();
        break;
        
      case "📝 Start Registration":
        addBotMessage(
          "Perfect! Let me redirect you to our registration page where you can:\n\n" +
          "✅ Choose your tournament\n" +
          "✅ Enter your chess platform details\n" +
          "✅ Complete secure payment\n" +
          "✅ Get instant confirmation with Zoom & Tornelo links\n\n" +
          "Ready to register?",
          ["🚀 Go to Registration", "❓ More Questions First"]
        );
        break;
        
      case "🚀 Go to Registration":
        window.location.href = '/register';
        break;
        
      case "🖥️ Zoom Setup Help":
        addBotMessage(
          "Zoom Setup Guide 🖥️\n\n" +
          "1. Download Zoom desktop app (required for screen sharing)\n" +
          "2. Test your microphone and camera\n" +
          "3. Join the meeting 10 minutes early\n" +
          "4. Enable 'Share Screen' permission\n" +
          "5. Close unnecessary apps to avoid distractions\n\n" +
          "The Zoom link will be in your confirmation email after registration!",
          ["✅ Got it, thanks!", "❓ More Technical Help"]
        );
        break;
        
      case "📊 How to Use Tornelo":
        addBotMessage(
          "Tornelo Tournament Guide 📊\n\n" +
          "Tornelo is our tournament management system where you can:\n" +
          "• View your pairings and bracket\n" +
          "• See round start times\n" +
          "• Check standings and results\n" +
          "• Access tournament announcements\n\n" +
          "You'll get your Tornelo link after registration - bookmark it for easy access!",
          ["✅ Understood!", "🏆 Ready to Register"]
        );
        break;
        
      default:
        addBotMessage(
          "I'm here to help! Is there anything else you'd like to know about our tournaments or chess education programs?",
          [
            "🏆 Tournament Info",
            "💝 Donation Options", 
            "📱 Technical Support",
            "📞 Contact Us"
          ]
        );
    }
  };

  const handleInputSubmit = (currentInput: string, setCurrentInput: (value: string) => void) => {
    if (currentInput.trim()) {
      addUserMessage(currentInput);
      addBotMessage(
        "Thanks for your message! I'm here to help with tournament registration and chess education support.",
        [
          "🏆 Register for Tournament",
          "💝 Make a Donation", 
          "📱 Get Tournament Setup Help"
        ]
      );
      setCurrentInput('');
    }
  };

  return {
    handleOptionClick,
    handleInputSubmit
  };
};
