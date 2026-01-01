
import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Share2, QrCode, Send, Trash2, CheckCircle2 } from 'lucide-react';
import { ConnectedDevice } from '../types';

interface DeviceManagerProps {
  devices: ConnectedDevice[];
  currentUrl: string;
  onSendTab: (deviceId: string) => void;
  onUnlinkDevice: (deviceId: string) => void;
}

const DeviceManager: React.FC<DeviceManagerProps> = ({ devices, currentUrl, onSendTab, onUnlinkDevice }) => {
  const [showQr, setShowQr] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone size={18} />;
      case 'tablet': return <Tablet size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <h2 className="text-xl font-bold clash text-white mb-1">Device Mesh</h2>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Share & Sync Across Platforms</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        {/* QR Share Section */}
        <section>
          <button 
            onClick={() => setShowQr(!showQr)}
            className={`w-full p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center text-center group ${showQr ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/40'}`}
          >
            {showQr ? (
              <div className="animate-in zoom-in duration-300">
                <div className="w-32 h-32 bg-black mb-4 mx-auto grid grid-cols-6 gap-0.5 p-2">
                   {/* Fake QR Pattern */}
                   {Array.from({ length: 36 }).map((_, i) => (
                     <div key={i} className={`bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                   ))}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest">Scan to Open</p>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-full bg-white/10 mb-3 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  <QrCode size={24} />
                </div>
                <h3 className="text-sm font-bold">Generate QR Code</h3>
                <p className="text-[10px] opacity-60 mt-1 uppercase tracking-wider">Share current page to mobile</p>
              </>
            )}
          </button>
        </section>

        {/* Linked Devices */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <Share2 size={14} className="text-[#D4AF37]" />
             <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Linked Devices</h3>
          </div>
          
          {devices.map(device => (
            <div key={device.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${device.isCurrent ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-black text-white/40'}`}>
                    {getIcon(device.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {device.name}
                      {device.isCurrent && <span className="text-[8px] bg-[#D4AF37] text-black px-1.5 py-0.5 rounded font-bold uppercase">This Device</span>}
                    </h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{device.os} • {device.isCurrent ? 'Online' : 'Last active 2m ago'}</p>
                  </div>
                </div>
                {!device.isCurrent && (
                   <button onClick={() => onUnlinkDevice(device.id)} className="p-2 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={14} />
                   </button>
                )}
              </div>

              {!device.isCurrent && (
                <button 
                  onClick={() => onSendTab(device.id)}
                  className="w-full py-2 bg-white/5 hover:bg-[#D4AF37]/10 text-white/60 hover:text-[#D4AF37] rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  <Send size={12} /> Send Current Tab
                </button>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default DeviceManager;
