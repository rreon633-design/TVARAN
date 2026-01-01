
import React, { useState } from 'react';
import { Search, Zap, Plus, ArrowRight, X, LayoutGrid, Palette } from 'lucide-react';
import IconRenderer from './IconRenderer';

interface CustomShortcut {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface HomeScreenProps {
  isStormMode: boolean;
  onNavigate: (url: string) => void;
  backgroundImage?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isStormMode, onNavigate, backgroundImage }) => {
  const [query, setQuery] = useState('');
  const [isAddingPortal, setIsAddingPortal] = useState(false);
  
  const [shortcuts, setShortcuts] = useState<CustomShortcut[]>([
    { id: '1', name: 'Google', url: 'https://google.com', icon: 'search' },
    { id: '2', name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { id: '3', name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { id: '4', name: 'Discord', url: 'https://discord.com', icon: 'message-square' },
    { id: '5', name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const url = query.includes('.') ? (query.startsWith('http') ? query : `https://${query}`) : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    onNavigate(url);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#050505] relative overflow-hidden transition-all duration-1000">
      {backgroundImage && (
         <div 
           className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105" 
           style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(0.3) blur(2px)' }} 
         />
      )}
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none opacity-40" />
      
      <div className="max-w-5xl w-full flex flex-col items-center gap-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-8 group cursor-pointer">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl group-hover:blur-3xl transition-all opacity-40" />
            <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center relative border border-[#FFD700]/20 shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-105 transition-transform duration-500">
              <Zap size={56} className="text-black fill-current drop-shadow-md" />
            </div>
          </div>
          <h1 className="text-8xl font-bold clash tracking-tighter text-white">
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">TV</span>
            <span className="text-[#D4AF37]">ARAN</span>
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.8em] text-[#D4AF37]/40 mt-4">The Aurelian Standard</p>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl relative group animate-in slide-in-from-bottom-8 duration-700">
          <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
            <Search size={22} className="text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-all" />
          </div>
          <input 
            type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Engage the storm..."
            className="w-full py-7 px-20 rounded-[2rem] text-xl font-medium bg-black/40 backdrop-blur-xl border border-white/10 text-white focus:border-[#D4AF37]/60 focus:bg-black/60 outline-none transition-all duration-500"
          />
          <button type="submit" className="absolute inset-y-4 right-4 px-6 bg-[#D4AF37] text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg flex items-center gap-2">
            Search <ArrowRight size={14} />
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
          {shortcuts.map((site) => (
            <button key={site.id} onClick={() => onNavigate(site.url)} className="flex flex-col items-center gap-4 group relative">
              <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5">
                <IconRenderer name={site.icon} size={28} className="text-white/20 group-hover:text-[#D4AF37] transition-all" />
              </div>
              <span className="text-[10px] font-bold text-white/20 group-hover:text-[#D4AF37] transition-all uppercase tracking-widest">{site.name}</span>
            </button>
          ))}
          <button onClick={() => setIsAddingPortal(true)} className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 border-dashed border-white/10 bg-transparent transition-all duration-500 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5">
              <Plus size={24} className="text-white/10 group-hover:text-[#D4AF37]" />
            </div>
            <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Add Portal</span>
          </button>
        </div>
        
        <button className="absolute bottom-8 right-8 p-3 rounded-full bg-black/40 border border-white/10 text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all">
           <Palette size={18} />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
