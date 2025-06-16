
import React from 'react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages = ({ messages, onOptionClick, messagesEndRef }: ChatMessagesProps) => {
  return (
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
                    onClick={() => onOptionClick(option)}
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
  );
};
