
import React, { useState } from 'react';
import { Database, Cloud, Zap, Bell, Server } from 'lucide-react';

type Section = 'storage' | 'workers' | 'background';

const ApplicationPanel: React.FC = () => {
  const [section, setSection] = useState<Section>('storage');

  return (
    <div className="flex h-full">
      <div className="w-48 border-r border-white/10 p-2 text-xs text-white/60 space-y-4 bg-black/20">
         <div>
           <div className="font-bold text-white uppercase tracking-wider mb-2 px-2">Application</div>
           <div 
             onClick={() => setSection('workers')}
             className={`px-2 py-1 flex items-center gap-2 hover:text-white cursor-pointer rounded ${section === 'workers' ? 'bg-white/5 text-[#D4AF37]' : ''}`}
           >
             <Server size={12} /> Service Workers
           </div>
           <div 
             onClick={() => setSection('storage')}
             className={`px-2 py-1 flex items-center gap-2 hover:text-white cursor-pointer rounded ${section === 'storage' ? 'bg-white/5 text-[#D4AF37]' : ''}`}
           >
             <Database size={12} /> Storage
           </div>
         </div>
         
         <div>
           <div className="font-bold text-white uppercase tracking-wider mb-2 px-2">Background Services</div>
           <div 
             onClick={() => setSection('background')}
             className={`px-2 py-1 flex items-center gap-2 hover:text-white cursor-pointer rounded ${section === 'background' ? 'bg-white/5 text-[#D4AF37]' : ''}`}
           >
             <Cloud size={12} /> Background Sync
           </div>
           <div className="px-2 py-1 flex items-center gap-2 hover:text-white cursor-pointer rounded opacity-50">
             <Bell size={12} /> Push Messaging
           </div>
         </div>
      </div>

      <div className="flex-1 p-4 text-xs font-mono overflow-y-auto">
         {section === 'storage' && (
           <table className="w-full text-left text-white/80">
              <thead>
                 <tr className="border-b border-white/10 text-white/40">
                    <th className="pb-2">Key</th>
                    <th className="pb-2">Value</th>
                 </tr>
              </thead>
              <tbody>
                 <tr className="border-b border-white/5">
                    <td className="py-2 text-[#D4AF37]">theme</td>
                    <td className="py-2">"dark"</td>
                 </tr>
                 <tr className="border-b border-white/5">
                    <td className="py-2 text-[#D4AF37]">session_id</td>
                    <td className="py-2">"abc-123-xyz"</td>
                 </tr>
                 <tr className="border-b border-white/5">
                    <td className="py-2 text-[#D4AF37]">webrtc_opt</td>
                    <td className="py-2">true</td>
                 </tr>
              </tbody>
           </table>
         )}

         {section === 'workers' && (
           <div className="space-y-6">
             <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-sm font-bold text-white">sw.js</span>
                 <span className="text-white/40 px-2 py-0.5 bg-white/5 rounded text-[10px]">#8421</span>
               </div>
               <p className="text-white/60 mb-4">Status: <span className="text-emerald-400">Activated and is running</span></p>
               <div className="flex gap-2">
                 <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/80">Update</button>
                 <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/80">Unregister</button>
                 <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/80">Source</button>
               </div>
             </div>
             
             <div className="flex items-center gap-2">
               <input type="checkbox" id="offline" className="rounded bg-black border-white/20" />
               <label htmlFor="offline" className="text-white/80 cursor-pointer">Offline (simulate network disconnect)</label>
             </div>
             <div className="flex items-center gap-2">
               <input type="checkbox" id="update" className="rounded bg-black border-white/20" />
               <label htmlFor="update" className="text-white/80 cursor-pointer">Update on reload</label>
             </div>
           </div>
         )}

         {section === 'background' && (
           <div className="space-y-4">
             <p className="text-white/60 mb-2">Background Sync Events</p>
             <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
               <div className="flex justify-between p-2 bg-white/5 border-b border-white/10 text-white/40">
                 <span>Tag</span>
                 <span>Time</span>
               </div>
               <div className="p-2 flex justify-between hover:bg-white/5">
                 <span className="text-[#D4AF37]">sync-messages</span>
                 <span>12:42:15</span>
               </div>
               <div className="p-2 flex justify-between hover:bg-white/5">
                 <span className="text-[#D4AF37]">update-cache</span>
                 <span>12:45:00</span>
               </div>
             </div>
             <button className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2">
               <Zap size={14} /> Trigger Sync Event
             </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default ApplicationPanel;
