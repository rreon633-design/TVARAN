
import React from 'react';
import { Zap, AlertCircle, ChevronLeft, ShieldCheck, Microscope } from 'lucide-react';
import { BrowserSettings } from '../../types';

interface ExperimentalFlagsProps {
  settings?: BrowserSettings;
  onUpdateFlag: (id: string) => void;
  onNavigate: (url: string) => void;
}

const ExperimentalFlags: React.FC<ExperimentalFlagsProps> = ({ settings, onUpdateFlag, onNavigate }) => {
  return (
    <div className="w-full h-full bg-[#050505] p-12 overflow-y-auto scrollbar-hide text-white select-none">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-500 text-black rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
               <Microscope size={32} />
             </div>
             <div className="flex flex-col">
               <h1 className="text-4xl font-bold clash tracking-tight">Onyx Lab Prototypes</h1>
               <p className="text-amber-500/60 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Aurelian Research Hub: Alpha Protocol</p>
             </div>
           </div>
           <button 
             onClick={() => onNavigate('tvaran://home')}
             className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2"
           >
             <ChevronLeft size={14} /> Exit Lab
           </button>
        </div>
        
        <div className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-[2.5rem] mb-12 flex gap-6 items-center">
          <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500">
             <AlertCircle size={32} />
          </div>
          <div>
            <p className="text-base font-bold text-white mb-1 uppercase tracking-tight">System Instability Warning</p>
            <p className="text-sm text-white/40 leading-relaxed">Experimental features are highly volatile. Enabling them may lead to memory leaks, browser crashes, or unauthorized data resonance. Proceed with executive oversight.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {settings?.experimentalFlags.map(flag => (
            <div key={flag.id} className={`p-8 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group ${flag.enabled ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/5 border-white/5 hover:border-white/10'}`}>
              <div className="flex-1 pr-8">
                <div className="flex items-center gap-3 mb-2">
                   <h4 className={`text-xl font-bold transition-colors ${flag.enabled ? 'text-amber-500' : 'text-white'}`}>{flag.name}</h4>
                   {flag.enabled && <ShieldCheck size={16} className="text-amber-500" />}
                </div>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{flag.description}</p>
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full">Protocol ID: {flag.id}</span>
              </div>
              <button 
                onClick={() => onUpdateFlag(flag.id)}
                className={`relative px-10 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group/btn ${flag.enabled ? 'bg-amber-500 text-black shadow-[0_10px_30px_rgba(245,158,11,0.2)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                <span className="relative z-10">{flag.enabled ? 'Active' : 'Standby'}</span>
                {flag.enabled && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">Tvaran Engineering Bureau • {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperimentalFlags;
