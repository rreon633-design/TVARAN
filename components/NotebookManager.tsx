
import React, { useState } from 'react';
import { Search, BookMarked, Trash2, ExternalLink, Copy, Clock, Globe } from 'lucide-react';
import { NotebookEntry } from '../types';

interface NotebookManagerProps {
  entries: NotebookEntry[];
  onSetEntries: (entries: NotebookEntry[]) => void;
  onNavigate?: (url: string) => void;
}

const NotebookManager: React.FC<NotebookManagerProps> = ({ entries, onSetEntries, onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = entries.filter(e => 
    e.text.toLowerCase().includes(search.toLowerCase()) || 
    e.pageTitle.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEntry = (id: string) => {
    onSetEntries(entries.filter(e => e.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 focus-within:border-[#D4AF37]/40 transition-all mb-3">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search notebook..."
            className="bg-transparent border-none outline-none text-xs w-full text-white font-medium placeholder:text-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 px-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
          <BookMarked size={10} /> Storm Notebook Active
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-[#D4AF37]/20">
              <BookMarked size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#D4AF37]/40 font-medium uppercase tracking-widest">Notebook is Empty</p>
            <p className="text-[10px] text-white/10 mt-2 max-w-[180px]">Highlight text on any page to automatically save snippets here.</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div key={entry.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 max-w-[70%]">
                  <div className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Globe size={12} />
                  </div>
                  <span className="text-[10px] font-bold text-white/40 truncate">{entry.pageTitle}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onNavigate?.(entry.pageUrl)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-[#D4AF37]"><ExternalLink size={14} /></button>
                  <button onClick={() => copyToClipboard(entry.text)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-[#D4AF37]"><Copy size={14} /></button>
                  <button onClick={() => deleteEntry(entry.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              
              <p className="text-xs text-white/80 leading-relaxed font-medium line-clamp-4 bg-black/40 p-3 rounded-xl border border-white/5 mb-3 italic">
                "{entry.text}"
              </p>

              <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
                <Clock size={10} />
                <span>Saved {new Date(entry.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotebookManager;
