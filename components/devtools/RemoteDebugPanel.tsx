
import React, { useState } from 'react';
import { Smartphone, Monitor, Cast, RefreshCw, Usb, Wifi, Terminal } from 'lucide-react';

const RemoteDebugPanel: React.FC = () => {
  const [targetIp, setTargetIp] = useState('192.168.1.42:9222');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="flex h-full bg-[#0c0c0c]">
      <div className="w-64 border-r border-white/10 p-4 space-y-6">
         <div>
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Connection</h3>
            <div className="space-y-2">
               <label className="flex items-center gap-2 p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 cursor-pointer">
                  <Usb size={16} className="text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">USB Devices</span>
               </label>
               <label className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 cursor-pointer">
                  <Wifi size={16} className="text-white/60" />
                  <span className="text-xs font-bold text-white/60">Network Targets</span>
               </label>
            </div>
         </div>

         <div>
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Manual Connect</h3>
            <div className="flex gap-2">
               <input 
                 type="text" 
                 value={targetIp}
                 onChange={(e) => setTargetIp(e.target.value)}
                 className="flex-1 bg-black border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-[#D4AF37]"
               />
               <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white hover:text-[#D4AF37]">Connect</button>
            </div>
         </div>
      </div>

      <div className="flex-1 p-8">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
               <Cast size={24} className="text-[#D4AF37]" /> Remote Targets
            </h2>
            <button 
               onClick={handleScan}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 ${isScanning ? 'opacity-50' : ''}`}
            >
               <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} /> Scan
            </button>
         </div>

         <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:border-[#D4AF37]/30 transition-all">
               <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white/40">
                  <Smartphone size={24} />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2">
                     <h3 className="text-sm font-bold text-white">Pixel 8 Pro</h3>
                     <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-bold">Connected</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Chrome 118.0.5993.80 • Android 14</p>
               </div>
               <button className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:brightness-110">
                  Inspect
               </button>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:border-[#D4AF37]/30 transition-all opacity-60">
               <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white/40">
                  <Monitor size={24} />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2">
                     <h3 className="text-sm font-bold text-white">Local Node.js</h3>
                     <span className="text-[9px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded border border-white/10 uppercase font-bold">Offline</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">localhost:9229</p>
               </div>
               <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/20">
                  Retry
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RemoteDebugPanel;
