
import React from 'react';
import { Activity, Radio, Mic, Video, Server } from 'lucide-react';

const WebRTCPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
         <Activity size={24} className="text-[#D4AF37]" />
         <h2 className="text-lg font-bold text-white">WebRTC Internals</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
               <Server size={14} /> Signaling State
            </h3>
            <div className="text-2xl font-bold text-emerald-500">STABLE</div>
            <p className="text-[10px] text-white/40 mt-1">RTCPeerConnection ID: PC-8842-Alpha</p>
         </div>
         <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3 flex items-center gap-2">
               <Radio size={14} /> ICE Connection
            </h3>
            <div className="text-2xl font-bold text-emerald-500">CONNECTED</div>
            <p className="text-[10px] text-white/40 mt-1">Transport: UDP / srflx</p>
         </div>
      </div>

      <div className="space-y-4">
         <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <Video size={16} className="text-blue-400" />
                  <span className="text-sm font-bold text-white">Video Inbound (VP9)</span>
               </div>
               <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">Receiving</span>
            </div>
            <div className="p-4 bg-black/40 h-32 relative flex items-end justify-between gap-1">
               {/* Mock Graph */}
               {Array.from({length: 50}).map((_, i) => (
                  <div key={i} className="flex-1 bg-blue-500/40 hover:bg-blue-500 transition-all" style={{height: `${30 + Math.random() * 60}%`}} />
               ))}
               <div className="absolute top-2 right-2 text-xs font-mono text-white/60">2.4 Mbps</div>
            </div>
         </div>

         <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <Mic size={16} className="text-amber-400" />
                  <span className="text-sm font-bold text-white">Audio Outbound (Opus)</span>
               </div>
               <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold uppercase">Sending</span>
            </div>
            <div className="p-4 bg-black/40 h-32 relative flex items-end justify-between gap-1">
               {/* Mock Graph */}
               {Array.from({length: 50}).map((_, i) => (
                  <div key={i} className="flex-1 bg-amber-500/40 hover:bg-amber-500 transition-all" style={{height: `${20 + Math.random() * 40}%`}} />
               ))}
               <div className="absolute top-2 right-2 text-xs font-mono text-white/60">48 kbps</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default WebRTCPanel;
