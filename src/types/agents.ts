
export interface AgentContext {
  userId?: string;
  tournamentId?: string;
  registrationId?: string;
  conversationHistory: Message[];
  userData: any;
}

export interface AgentResponse {
  message: string;
  options?: string[];
  actions?: AgentAction[];
  nextAgent?: string;
}

export interface AgentAction {
  type: 'redirect' | 'email' | 'webhook' | 'update_db' | 'triggerZoomSetup';
  payload: any;
}

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  options?: string[];
  timestamp: Date;
}

export type AgentType = 'registration' | 'followup' | 'fairplay' | 'analytics' | 'general';
