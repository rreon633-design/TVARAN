
import React, { useState } from 'react';
import { Search, Key, ShieldCheck, Trash2, Eye, EyeOff, Copy, ExternalLink, Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { PasswordCredential } from '../types';

interface PasswordVaultManagerProps {
  passwords: PasswordCredential[];
  isStormMode: boolean;
  onSetPasswords: (passwords: PasswordCredential[]) => void;
  onNavigate?: (url: string) => void;
}

const PasswordVaultManager: React.FC<PasswordVaultManagerProps> = ({ passwords, isStormMode, onSetPasswords, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const filtered = passwords.filter(p => 
    p.site.toLowerCase().includes(search.toLowerCase()) || 
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    const next = new Set(visibleIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVisibleIds(next);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteEntry = (id: string) => {
    onSetPasswords(passwords.filter(p => p.id !== id));
  };

  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const checkReuse = (pass: string, id: string) => {
    return passwords.some(p => p.password === pass && p.id !== id);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 focus-within:border-[#D4AF37]/40 transition-all mb-3">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search vault..."
            className="bg-transparent border-none outline-none text-xs w-full text-white font-medium placeholder:text-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 px-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
          <Shield size={10} /> Onyx Encryption Active
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-[#D4AF37]/20">
              <Key size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#D4AF37]/40 font-medium uppercase tracking-widest">Vault is Empty</p>
            <p className="text-[10px] text-white/10 mt-2 max-w-[180px]">Passwords saved while browsing will appear in this encrypted enclave.</p>
          </div>
        ) : (
          filtered.map(entry => {
            const strength = getStrength(entry.password);
            const isReused = checkReuse(entry.password, entry.id);
            const strengthColor = strength <= 2 ? 'bg-red-500' : strength <= 4 ? 'bg-amber-500' : 'bg-emerald-500';

            return (
              <div key={entry.id} className={`p-4 rounded-2xl bg-white/5 border transition-all ${entry.isBreached ? 'border-red-500/40 bg-red-500/[0.02]' : 'border-white/5 hover:border-[#D4AF37]/20'}`}>
                <div className="flex items-center justify-between mb-3 group">
                  <div className="flex items-center gap-3 truncate">
                    <div className={`p-2 rounded-lg ${entry.isBreached ? 'bg-red-500/20 text-red-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
                      {entry.isBreached ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">{entry.site}</p>
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-tight">{entry.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onNavigate?.(`https://${entry.site}`)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-[#D4AF37]"><ExternalLink size={14} /></button>
                    <button onClick={() => deleteEntry(entry.id)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {entry.isBreached && (
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                       <AlertTriangle size={12} className="text-red-500" />
                       <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Found in Data Breach</span>
                    </div>
                  )}
                  {isReused && (
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                       <AlertCircle size={12} className="text-amber-500" />
                       <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Password Reused</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 mb-3">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">Strength Score</span>
                      <span className="text-[8px] font-bold uppercase text-white/20 tracking-widest">{strength}/5</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-700 ${strengthColor}`} style={{ width: `${(strength / 5) * 100}%` }} />
                   </div>
                </div>
                
                <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <input 
                    type={visibleIds.has(entry.id) ? "text" : "password"} 
                    value={entry.password} 
                    readOnly
                    className="bg-transparent border-none outline-none text-xs text-white/60 flex-1 font-mono tracking-widest"
                  />
                  <button onClick={() => toggleVisibility(entry.id)} className="text-white/20 hover:text-white transition-colors">
                    {visibleIds.has(entry.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => copyToClipboard(entry.password)} className="text-white/20 hover:text-[#D4AF37] transition-colors">
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PasswordVaultManager;
