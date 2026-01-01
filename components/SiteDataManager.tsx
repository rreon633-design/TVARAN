
import React, { useState } from 'react';
import { Search, Database, Trash2, Globe, Cookie, HardDrive, Clock } from 'lucide-react';
import { SiteStorageEntry } from '../types';

interface SiteDataManagerProps {
  storage: SiteStorageEntry[];
  onClearSiteData: (origin: string) => void;
}

const SiteDataManager: React.FC<SiteDataManagerProps> = ({ storage, onClearSiteData }) => {
  const [search, setSearch] = useState('');

  const filtered = storage.filter(s => s.origin.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 focus-within:border-[#D4AF37]/40 transition-all mb-3">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search site data..."
            className="bg-transparent border-none outline-none text-xs w-full text-white font-medium placeholder:text-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 px-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
          <Database size={10} /> Onyx Storage Enclave
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-[#D4AF37]/20">
              <Database size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#D4AF37]/40 font-medium uppercase tracking-widest">No site data found</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div key={entry.origin} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#D4AF37]/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 truncate">
                  <div className="p-2 rounded-lg bg-black border border-white/5">
                    <Globe size={14} className="text-[#D4AF37]" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block truncate">{entry.origin}</span>
                    <div className="flex items-center gap-2 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                       <Clock size={8} /> 
                       <span>Last active: {new Date(entry.lastAccessed).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onClearSiteData(entry.origin)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                    <Cookie size={12} className="text-[#D4AF37]/40" />
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold text-white/20 uppercase">Cookies</span>
                       <span className="text-[10px] font-bold text-white">{entry.cookies} items</span>
                    </div>
                 </div>
                 <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                    <HardDrive size={12} className="text-[#D4AF37]/40" />
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold text-white/20 uppercase">Storage</span>
                       <span className="text-[10px] font-bold text-white">{entry.localStorage}</span>
                    </div>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SiteDataManager;
