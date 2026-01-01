
import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { chatWithCortex } from '../services/geminiService';

interface CortexChatProps {
  initialMessages: { role: string; text: string }[];
}

const CortexChat: React.FC<CortexChatProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages.length > 0 ? initialMessages : [{ role: 'model', text: 'Local Cortex initialized. Awaiting executive directives.' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    const response = await chatWithCortex(userMsg, messages.map(m => ({ role: m.role as any, parts: [{ text: m.text }] })));
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' ? 'bg-[#D4AF37] text-black rounded-br-none font-bold' : 'bg-white/5 text-white/80 border border-white/5 rounded-bl-none'
            }`}>{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 text-[#D4AF37] px-4 py-2 rounded-2xl text-xs animate-pulse flex items-center gap-2 border border-white/5">
              <RefreshCw size={12} className="animate-spin" /> Cortex Processing...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-white/5">
        <div className="relative">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} placeholder="Inquire..." className="w-full bg-white/5 text-white border-white/10 text-sm rounded-xl px-4 py-3 pr-12 border focus:outline-none focus:border-[#D4AF37]/40 resize-none min-h-[50px] shadow-inner transition-all" rows={1} />
          <button onClick={handleSend} className="absolute right-3 bottom-3 p-2 text-[#D4AF37] hover:scale-110 transition-all"><Send size={18} /></button>
        </div>
      </div>
    </>
  );
};

export default CortexChat;
