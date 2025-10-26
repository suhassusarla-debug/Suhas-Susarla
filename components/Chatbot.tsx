import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { INDIAN_STATES } from '../constants';
import { CloseIcon, SendIcon, ChatbotIcon } from './icons';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm your Torista travel planner. Which state or UT would you like to know more about?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // This should not be null in a real app, but for this example we assume API_KEY is set.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      return null; // Or render an error message
  }
  const ai = new GoogleGenAI({ apiKey });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const normalizedInput = currentInput.trim().toLowerCase();
    const stateData = INDIAN_STATES.find(s => s.name.toLowerCase() === normalizedInput);

    if (!stateData) {
      const botMessage = { sender: 'bot' as const, text: "Sorry, I couldn't find that state. Please enter a valid Indian state or union territory name." };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      return;
    }

    const touristPlaces = stateData.topTouristPlaces.map(p => p.name).join(', ');
    const prompt = `
      For the state of ${stateData.name} in India, considering its top 10 tourist places (${touristPlaces}), please provide the following information in a clear and concise format:
      1. A realistic estimate for the number of days required to comfortably visit all these places.
      2. A simple, point-to-point list of approximate road distances in kilometers between these places, arranged in a logical travel itinerary. For example: "Place A to Place B: X km".
      Keep the response friendly, easy to read, and formatted with line breaks for a travel planner.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      const botMessage = { sender: 'bot' as const, text: response.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage = { sender: 'bot' as const, text: "Sorry, I'm having trouble getting that information right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-full max-w-sm h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl z-20 animate-fade-in">
      <header className="flex items-center justify-between p-4 bg-indigo-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <ChatbotIcon className="h-7 w-7" />
          <h2 className="font-bold text-lg">Travel Planner</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white">
          <CloseIcon className="h-6 w-6" />
        </button>
      </header>
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                <div className="max-w-xs p-3 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t bg-white rounded-b-2xl">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Kerala"
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;