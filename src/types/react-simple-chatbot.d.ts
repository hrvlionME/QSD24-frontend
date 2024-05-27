declare module 'react-simple-chatbot' {
    import * as React from 'react';
  
    interface Step {
      id: string;
      message?: string;
      trigger?: string;
      user?: boolean;
      [key: string]: any;
    }
  
    interface ChatBotProps {
      steps: Step[];
      [key: string]: any;
    }
  
    const ChatBot: React.FC<ChatBotProps>;
  
    export default ChatBot;
  }