import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatMessage } from '../types';

export const GeminiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: '¡Hola! Soy tu Asesor Académico de la UNA. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre carreras, sedes o qué estudiar según tus intereses.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Lo siento, tuve un problema al procesar tu consulta.',
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ backgroundColor: '#A92624', color: 'white' }}
        aria-label="Abrir asistente virtual"
      >
        <Sparkles size={24} />
        <span className="font-semibold hidden md:inline">Asesor IA</span>
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right border border-gray-200 ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none translate-y-10'}`}
      >
        {/* Header */}
        <div className="p-4 rounded-t-2xl flex justify-between items-center text-white" style={{ backgroundColor: '#A92624' }}>
          <div className="flex items-center gap-2">
            <Bot size={24} />
            <div>
              <h3 className="font-bold text-sm">Asesor Académico UNA</h3>
              <p className="text-xs opacity-90">Potenciado por Gemini AI</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-una-red text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                } ${msg.role === 'user' ? 'bg-[#A92624]' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-una-red focus:ring-1 focus:ring-una-red text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-full bg-una-red text-white hover:bg-una-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: '#A92624' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
