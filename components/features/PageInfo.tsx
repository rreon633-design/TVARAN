import React, { useState } from 'react';
import { ShieldCheck, Lock, Globe, Settings, Cookie, Mic, Camera, MapPin, X, ChevronRight } from 'lucide-react';

interface PageInfoProps {
  url: string;
  onClose: () => void;
}

const PageInfo: React.FC<PageInfoProps> = ({ url, onClose }) => {
  const hostname = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;

  return (
    <div className="absolute top-12 left-4 z-[90] w-80 bg-[#121212] border border-white/10 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="p-4 border-b border-white/5 flex items-start justify-between bg-black/20">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
              <Lock size={20} />
           </div>
           <div>
              <h3 className="text-sm font-bold text-white">Connection is secure</h3>
              <p className="text-[10px] text-white/40 mt-0.5">Certificate is valid and trusted.</p>
           </div>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white"><X size={16} /></button>
      </div>

      <div className="p-2 space-y-1">
         <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors text-left">
            <div className="flex items-center gap-3">
               <ShieldCheck size={16} className="text-white/60 group-hover:text-emerald-500" />
               <div>
                  <div className="text-xs font-bold text-white">Permissions</div>
                  <div className="text-[9px] text-white/40">Camera, Microphone</div>
               </div>
            </div>
            <ChevronRight size={14} className="text-white/20" />
         </button>

         <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors text-left">
            <div className="flex items-center gap-3">
               <Cookie size={16} className="text-white/60 group-hover:text-[#D4AF37]" />
               <div>
                  <div className="text-xs font-bold text-white">Cookies and Site Data</div>
                  <div className="text-[9px] text-white/40">14 cookies in use</div>
               </div>
            </div>
            <ChevronRight size={14} className="text-white/20" />
         </button>
      </div>

      <div className="bg-white/5 p-4 border-t border-white/5">
         <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-3">Site Settings</h4>
         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-white/60 text-xs">
                  <MapPin size={14} /> Location
               </div>
               <select className="bg-black border border-white/10 rounded text-[10px] text-white px-2 py-1 outline-none">
                  <option>Ask (Default)</option>
                  <option>Allow</option>
                  <option>Block</option>
               </select>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Camera size={14} /> Camera
               </div>
               <select className="bg-black border border-white/10 rounded text-[10px] text-white px-2 py-1 outline-none">
                  <option>Block</option>
                  <option>Ask</option>
                  <option>Allow</option>
               </select>
            </div>
         </div>
         <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase text-white transition-colors">
            <Settings size={12} /> Site Settings
         </button>
      </div>
    </div>
  );
};

export default PageInfo;