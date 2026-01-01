
import React, { useState } from 'react';
import { Search, Trash2, X, Globe, Clock, ExternalLink } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryManagerProps {
  history: HistoryItem[];
  isStormMode: boolean;
  onNavigate: (url: string) => void;
  onDeleteHistoryItem?: (id: string) => void;
  onClearHistory?: () => void;
}

const HistoryManager: React.FC<HistoryManagerProps> = ({ history, isStormMode, onNavigate, onDeleteHistoryItem, onClearHistory }) => {
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(h => 
    h.title.toLowerCase().includes(search.toLowerCase()) || 
    h.url.toLowerCase().includes(search.toLowerCase())
  );

  const textSecondary = isStormMode ? 'text-[#D4AF37]/40' : 'text-slate-500';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`p-4 border-b ${isStormMode ? 'border-white/5' : 'border-slate-200'} bg-black/20`}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isStormMode ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-500'} focus-within:border-[#D4AF37]/40 transition-all mb-3`}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search chronicle..."
            className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-white/20 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textSecondary}`}>
             Chronicle Data
          </span>
          {onClearHistory && (
            <button 
              onClick={onClearHistory}
              className={`text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors`}
            >
              <Trash2 size={10} /> Wipe All
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
        {filteredHistory.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-white/10">
                <Globe size={32} strokeWidth={1.5} />
             </div>
             <p className={`text-sm font-bold uppercase tracking-widest text-white/20`}>No chronicle entries</p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div 
              key={item.id}
              className={`p-3 rounded-xl border border-white/5 bg-white/[0.02] transition-all group hover:border-[#D4AF37]/20`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-white/40">
                   <Globe size={14} />
                </div>
                <div 
                  className="flex flex-col overflow-hidden flex-1 cursor-pointer"
                  onClick={() => onNavigate(item.url)}
                >
                  <span className={`text-xs font-bold truncate text-white`}>{item.title}</span>
                  <div className="flex items-center gap-2">
                     <span className={`text-[9px] truncate text-white/20 font-medium`}>{item.url}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => onDeleteHistoryItem?.(item.id)}
                     className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-500"
                     title="Remove Entry"
                   >
                      <X size={14} />
                   </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-bold text-white/10 uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 </div>
                 <button 
                   onClick={() => onNavigate(item.url)}
                   className="text-[8px] font-bold uppercase tracking-widest text-[#D4AF37]/40 hover:text-[#D4AF37] transition-all"
                 >
                    Restore View
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryManager;
