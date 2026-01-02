import React, { useState } from 'react';
import { ArrowUp, ArrowDown, X, Search } from 'lucide-react';

interface FindBarProps {
  onClose: () => void;
}

const FindBar: React.FC<FindBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [matchIndex, setMatchIndex] = useState(0);
  const totalMatches = query.length > 0 ? 3 : 0; // Mock matches

  return (
    <div className="absolute top-3 right-8 z-[60] flex items-center gap-1 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl p-1 animate-in slide-in-from-top-2">
      <div className="flex items-center gap-2 px-2 border-r border-white/10">
        <Search size={14} className="text-white/40" />
        <input 
          type="text" 
          autoFocus
          placeholder="Find..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-white w-48 placeholder:text-white/20"
        />
        <span className="text-xs text-white/40 font-mono w-12 text-center">
          {query ? `${matchIndex + 1}/${totalMatches}` : '0/0'}
        </span>
      </div>
      
      <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded">
        <ArrowUp size={16} />
      </button>
      <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded">
        <ArrowDown size={16} />
      </button>
      <button onClick={onClose} className="p-1.5 text-white/60 hover:text-red-400 hover:bg-white/10 rounded ml-1">
        <X size={16} />
      </button>
    </div>
  );
};

export default FindBar;