
import React from 'react';
import { RefreshCw, Cloud, Lock, CreditCard, History, BookMarked, Key, Puzzle, Layout } from 'lucide-react';
import { SyncConfig } from '../types';

interface SyncManagerProps {
  config: SyncConfig;
  onToggleSync: (key: keyof SyncConfig) => void;
  onSyncNow: () => void;
}

const SyncManager: React.FC<SyncManagerProps> = ({ config, onToggleSync, onSyncNow }) => {
  const SyncToggle = ({ label, icon: Icon, active, field }: { label: string, icon: any, active: boolean, field: keyof SyncConfig }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-black text-white/20'}`}>
          <Icon size={16} />
        </div>
        <span className="text-xs font-bold text-white/80">{label}</span>
      </div>
      <button 
        onClick={() => onToggleSync(field)}
        className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-black transition-all ${active ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-2">
           <h2 className="text-xl font-bold clash text-white">Storm Cloud</h2>
           <Cloud size={20} className="text-[#D4AF37]" />
        </div>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">End-to-End Encrypted Sync</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#D4AF37] mb-1">Last Synced</p>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
              {new Date(config.lastSynced).toLocaleString()}
            </p>
          </div>
          <button 
            onClick={onSyncNow}
            className="p-3 rounded-xl bg-[#D4AF37] text-black hover:bg-[#FFD700] transition-colors shadow-lg shadow-[#D4AF37]/20"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-1">Data Types</h3>
          <SyncToggle label="Passwords & Vault" icon={Key} active={config.passwords} field="passwords" />
          <SyncToggle label="Payment Methods" icon={CreditCard} active={config.payments} field="payments" />
          <SyncToggle label="Autofill Profiles" icon={Lock} active={config.autofill} field="autofill" />
          <SyncToggle label="Bookmarks" icon={BookMarked} active={config.bookmarks} field="bookmarks" />
          <SyncToggle label="Browsing History" icon={History} active={config.history} field="history" />
          <SyncToggle label="Extensions" icon={Puzzle} active={config.extensions} field="extensions" />
          <SyncToggle label="Open Tabs" icon={Layout} active={config.openTabs} field="openTabs" />
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <p className="text-[10px] text-white/30 leading-relaxed">
            Your data is encrypted locally before being transmitted. Not even Tvaran engineers can access your vault.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyncManager;
