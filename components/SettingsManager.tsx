
import React from 'react';
import { Battery, FastForward, Video, Network, Home, Activity, Zap, ChevronRight, Trash2, Monitor, LayoutGrid, Image, Bot } from 'lucide-react';
import { BrowserSettings } from '../types';

interface SettingsManagerProps {
  settings?: BrowserSettings;
  onToggleHttpsOnly: () => void;
  onTogglePhishing: () => void;
  onToggleBgThrottling: () => void;
  onTogglePreloading: () => void;
  onToggleDnsPrefetch: () => void;
  onToggleEfficiency: () => void;
  onToggleLazyLoading: () => void;
  onToggleBfCache: () => void;
  onToggleHwMedia: () => void;
  onToggleEnergySaver: () => void;
  onToggleWebRtc: () => void;
  onToggleHomeButton: () => void;
  onSetSleepThreshold: (v: number) => void;
  onSetDiscardThreshold: (v: number) => void;
  onClearData: () => void;
  onNavigate: (url: string) => void;
  onToggleMiniSidebar: () => void;
  onSetBackgroundImage: (url: string) => void;
}

const SettingsManager: React.FC<SettingsManagerProps> = (props) => {
  const { settings, onToggleEnergySaver, onToggleBfCache, onToggleHwMedia, onToggleWebRtc, onToggleHomeButton, onNavigate, onClearData, onToggleMiniSidebar, onSetBackgroundImage } = props;

  if (!settings) return null;

  const SettingToggle = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        <Icon size={14} className="text-[#D4AF37]" />
        <span className="text-xs text-white/80 font-bold">{label}</span>
      </div>
      <button 
        onClick={onClick}
        className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-black transition-all ${active ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
      <section>
        <h3 className="text-[10px] font-bold text-[#D4AF37]/40 uppercase tracking-widest mb-4">Appearance & Layout</h3>
        <div className="space-y-3">
          <SettingToggle icon={LayoutGrid} label="Compact Sidebar" active={settings.miniSidebar} onClick={onToggleMiniSidebar} />
          <SettingToggle icon={Home} label="Show Home Button" active={settings.showHomeButton} onClick={onToggleHomeButton} />
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
             <div className="flex items-center gap-3 text-xs text-white/80 font-bold">
                <Image size={14} className="text-[#D4AF37]" />
                <span>Custom Background URL</span>
             </div>
             <input 
               type="text" 
               className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white/60 focus:border-[#D4AF37]/40 outline-none"
               placeholder="Paste image link..."
               onBlur={(e) => onSetBackgroundImage(e.target.value)}
             />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-[#D4AF37]/40 uppercase tracking-widest mb-4">Performance & Energy</h3>
        <div className="space-y-3">
          <SettingToggle icon={Battery} label="Energy Saver" active={settings.energySaver} onClick={onToggleEnergySaver} />
          <SettingToggle icon={FastForward} label="Back/Forward Cache" active={settings.bfCacheEnabled} onClick={onToggleBfCache} />
          <SettingToggle icon={Video} label="HW A/V Decoding" active={settings.hwMediaDecoding} onClick={onToggleHwMedia} />
          <SettingToggle icon={Network} label="WebRTC Optimization" active={settings.webrtcOptimized} onClick={onToggleWebRtc} />
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-[#D4AF37]/40 uppercase tracking-widest mb-4">Automation</h3>
        <div className="space-y-3">
           <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
             <div className="flex items-center gap-3">
               <Bot size={14} className="text-[#D4AF37]" />
               <div className="flex flex-col">
                 <span className="text-xs text-white/80 font-bold">WebDriver Support</span>
                 <span className="text-[9px] text-white/40">Allow external control (Selenium/Playwright)</span>
               </div>
             </div>
             <button 
               className={`w-10 h-5 rounded-full relative transition-all bg-white/10`}
             >
               <div className={`absolute top-1 w-3 h-3 rounded-full bg-black left-1`} />
             </button>
           </div>
        </div>
      </section>

      <section className="space-y-2">
        <button onClick={() => onNavigate('tvaran://flags')} className="w-full flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 group hover:border-amber-500/60 transition-all text-left">
          <div className="flex items-center gap-3">
            <Zap size={14} className="text-amber-500" />
            <span className="text-xs text-amber-500/80 font-bold">Experimental Flags</span>
          </div>
          <ChevronRight size={14} className="text-amber-500/40" />
        </button>
      </section>

      <section>
        <button onClick={onClearData} className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
          <Trash2 size={14} /> Clear All Data
        </button>
      </section>
    </div>
  );
};

export default SettingsManager;
