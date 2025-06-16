
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onSubmit: (currentInput: string, setCurrentInput: (value: string) => void) => void;
}

export const ChatInput = ({ currentInput, setCurrentInput, onSubmit }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(currentInput, setCurrentInput);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
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
  );
};
