
import React from 'react';
import { Tab } from '../types';
import { Globe, Cpu, HardDrive } from 'lucide-react';

interface TabPreviewProps {
  tab: Tab;
  position: 'left' | 'right';
}

const TabPreview: React.FC<TabPreviewProps> = ({ tab, position }) => {
  const leftPos = position === 'right' ? 'left-full ml-4' : 'left-full ml-2';

  return (
    <div className={`absolute ${leftPos} top-0 z-[100] w-64 bg-black/90 border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none overflow-hidden`}>
      <div className="h-32 bg-gradient-to-br from-white/5 to-transparent relative flex items-center justify-center">
         <Globe size={40} className="text-white/10" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
         <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-black/60 border border-white/10">
               <img src={`https://www.google.com/s2/favicons?domain=${new URL(tab.url.startsWith('tvaran') ? 'https://tvaran.io' : tab.url).hostname}&sz=32`} alt="" className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-widest truncate max-w-[160px]">{tab.title}</span>
         </div>
      </div>
      <div className="p-4 space-y-3">
         <p className="text-[10px] text-white/40 truncate font-mono">{tab.url}</p>
         <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
               <Cpu size={12} className="text-[#D4AF37]" />
               <div className="flex flex-col">
                  <span className="text-[8px] text-white/20 uppercase">CPU</span>
                  <span className="text-[10px] font-bold text-white">{tab.cpuUsage?.toFixed(1)}%</span>
               </div>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
               <HardDrive size={12} className="text-[#D4AF37]" />
               <div className="flex flex-col">
                  <span className="text-[8px] text-white/20 uppercase">RAM</span>
                  <span className="text-[10px] font-bold text-white">{tab.memoryUsage} MB</span>
               </div>
            </div>
         </div>
         {tab.isSleeping && (
            <div className="flex items-center gap-2 py-1 px-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
               <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">Hibernating Instance</span>
            </div>
         )}
      </div>
    </div>
  );
};

export default TabPreview;
