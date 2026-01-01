
import React, { useState } from 'react';
import { Search, User, Trash2, Plus, Mail, MapPin, Phone } from 'lucide-react';
import { AutofillProfile } from '../types';

interface AutofillManagerProps {
  profiles: AutofillProfile[];
  onSetProfiles: (profiles: AutofillProfile[]) => void;
}

const AutofillManager: React.FC<AutofillManagerProps> = ({ profiles, onSetProfiles }) => {
  const [search, setSearch] = useState('');

  const filtered = profiles.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEntry = (id: string) => {
    onSetProfiles(profiles.filter(p => p.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 focus-within:border-[#D4AF37]/40 transition-all mb-3">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search profiles..."
            className="bg-transparent border-none outline-none text-xs w-full text-white font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">Nexus Profiles</span>
          <button className="text-[10px] font-bold uppercase text-[#D4AF37] hover:brightness-125 flex items-center gap-1">
            <Plus size={12} /> New Profile
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-[#D4AF37]/20">
              <User size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#D4AF37]/40 font-medium uppercase tracking-widest">No Profiles</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div key={entry.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#D4AF37]/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{entry.name}</span>
                  <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">Aurelian Tier</span>
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <Mail size={12} className="text-[#D4AF37]/60" />
                  <span className="truncate">{entry.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <Phone size={12} className="text-[#D4AF37]/60" />
                  <span>{entry.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-white/40">
                  <MapPin size={12} className="text-[#D4AF37]/60 mt-0.5" />
                  <span className="leading-relaxed">{entry.address}, {entry.city}, {entry.country}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AutofillManager;
