
import React, { useState } from 'react';
import { Share2, Cast, Copy, QrCode, Mail, MessageSquare, Smartphone, X, Check, Monitor } from 'lucide-react';
import { ConnectedDevice } from '../types';

interface ShareSheetProps {
  isOpen: boolean;
  title: string;
  url: string;
  devices: ConnectedDevice[];
  onClose: () => void;
  onSendToDevice: (deviceId: string) => void;
}

const ShareSheet: React.FC<ShareSheetProps> = ({ isOpen, title, url, devices, onClose, onSendToDevice }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCast = () => {
    alert("Searching for Cast-enabled devices on local network...");
    // Simulation of Presentation API
    setTimeout(() => alert("Connected to Living Room TV (Chromecast)"), 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-[480px] bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
           <div>
              <h3 className="text-sm font-bold text-white mb-1">Share via Tvaran</h3>
              <p className="text-xs text-white/40 truncate max-w-[300px]">{title}</p>
           </div>
           <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
              <X size={16} />
           </button>
        </div>

        <div className="p-6 grid grid-cols-4 gap-4">
           <button onClick={handleCopy} className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                 {copied ? <Check size={24} /> : <Copy size={24} />}
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider group-hover:text-white transition-colors">
                 {copied ? 'Copied' : 'Copy Link'}
              </span>
           </button>

           <button onClick={() => setShowQr(!showQr)} className="flex flex-col items-center gap-3 group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${showQr ? 'bg-white text-black' : 'bg-white/5 text-white/60 group-hover:bg-[#D4AF37] group-hover:text-black'}`}>
                 <QrCode size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider group-hover:text-white transition-colors">QR Code</span>
           </button>

           <button onClick={handleCast} className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                 <Cast size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider group-hover:text-white transition-colors">Cast</span>
           </button>
           
           <button onClick={() => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`)} className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/60 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                 <Mail size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider group-hover:text-white transition-colors">Email</span>
           </button>
        </div>
        
        {showQr && (
           <div className="px-6 pb-6 animate-in zoom-in">
              <div className="bg-white p-4 rounded-2xl mx-auto w-fit">
                 {/* Fake QR */}
                 <div className="w-32 h-32 bg-black grid grid-cols-6 gap-0.5 p-1">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                 </div>
              </div>
              <p className="text-center text-[10px] text-white/40 mt-3 uppercase tracking-widest">Scan with Camera</p>
           </div>
        )}

        <div className="px-6 pb-6 pt-2">
           <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">Send to Device</h4>
           <div className="space-y-2">
              {devices.length > 0 ? devices.filter(d => !d.isCurrent).map(device => (
                 <button 
                   key={device.id} 
                   onClick={() => onSendToDevice(device.id)}
                   className="w-full flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:border-white/20 border border-transparent transition-all group"
                 >
                    <div className="p-2 bg-black rounded-lg text-[#D4AF37]">
                       {device.type === 'mobile' ? <Smartphone size={16} /> : <Monitor size={16} />}
                    </div>
                    <div className="text-left">
                       <p className="text-xs font-bold text-white">{device.name}</p>
                       <p className="text-[9px] text-white/30 uppercase">{device.os} • Active recently</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                       <Check size={16} className="text-[#D4AF37]" />
                    </div>
                 </button>
              )) : (
                <p className="text-xs text-white/20 italic">No other devices linked.</p>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSheet;
