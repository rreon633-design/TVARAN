
import React from 'react';
import { X, ExternalLink, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { WebPanel as WebPanelType } from '../types';

interface WebPanelProps {
  panel: WebPanelType;
  onClose: () => void;
}

const WebPanel: React.FC<WebPanelProps> = ({ panel, onClose }) => {
  return (
    <div className="w-96 h-full bg-[#0a0a0a] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300 shadow-2xl relative z-40">
      <div className="p-4 border-b border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
            {panel.icon === 'sparkles' && <RefreshCw size={16} />}
            {panel.icon === 'message-square' && <ExternalLink size={16} />}
            {panel.icon === 'calendar' && <ExternalLink size={16} />}
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-widest">{panel.name}</span>
        </div>
        <div className="flex items-center gap-1">
           <button className="p-2 text-white/20 hover:text-white"><ChevronLeft size={16}/></button>
           <button className="p-2 text-white/20 hover:text-white"><ChevronRight size={16}/></button>
           <button onClick={onClose} className="p-2 text-white/20 hover:text-red-400 ml-2 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black flex flex-col items-center justify-center text-center p-12 select-none">
         <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/20">
            <ExternalLink size={32} />
         </div>
         <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tighter">{panel.name} Instance</h3>
         <p className="text-xs text-white/30 leading-relaxed uppercase tracking-widest">Neural connection to {new URL(panel.url).hostname} pending local containerization...</p>
         <button className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white/40 uppercase hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all">Launch Web Worker</button>
      </div>
    </div>
  );
};

export default WebPanel;
