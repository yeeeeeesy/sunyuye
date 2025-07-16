import { apiRequest } from './queryClient';

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
}

export async function sendChatMessage(message: string, sessionId: string): Promise<string> {
  try {
    const response = await apiRequest('POST', '/api/chat', {
      message,
      sessionId
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat service error:', error);
    throw new Error('Failed to send chat message');
  }
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
