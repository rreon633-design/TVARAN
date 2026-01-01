
import React from 'react';
import { RefreshCcw, X, ShieldAlert, Zap } from 'lucide-react';

interface SessionRestorePromptProps {
  isStormMode: boolean;
  onRestore: () => void;
  onDiscard: () => void;
}

const SessionRestorePrompt: React.FC<SessionRestorePromptProps> = ({ isStormMode, onRestore, onDiscard }) => {
  const modalBg = isStormMode ? 'bg-[#1E1B4B] border-indigo-900/50' : 'bg-white border-slate-200';
  const textPrimary = isStormMode ? 'text-indigo-100' : 'text-slate-900';
  const textSecondary = isStormMode ? 'text-indigo-400' : 'text-slate-500';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300 px-4">
      <div className={`w-full max-w-md ${modalBg} border rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300`}>
        <div className="p-8 flex flex-col items-center text-center">
          <div className={`w-20 h-20 ${isStormMode ? 'bg-indigo-600/20' : 'bg-indigo-50'} rounded-3xl flex items-center justify-center mb-6 relative group`}>
            <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
            <RefreshCcw size={40} className={`relative ${isStormMode ? 'text-indigo-400' : 'text-indigo-600'} animate-spin-slow`} style={{ animationDuration: '8s' }} />
            <div className="absolute -top-1 -right-1">
              <ShieldAlert size={24} className="text-amber-500 fill-amber-500/20" />
            </div>
          </div>

          <h2 className={`text-2xl font-bold clash ${textPrimary} mb-3 tracking-tight`}>
            Restore Previous Session?
          </h2>
          <p className={`${textSecondary} text-sm leading-relaxed mb-8 max-w-[280px]`}>
            TVARAN encountered an unexpected restart. Would you like to pick up where the storm left off?
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={onRestore}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <Zap size={18} className="fill-current" />
              Restore All Tabs
            </button>
            <button
              onClick={onDiscard}
              className={`w-full py-4 ${isStormMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-slate-100 text-slate-500 border-slate-200'} border rounded-2xl font-bold text-sm transition-all hover:brightness-95 active:scale-[0.98]`}
            >
              Start Fresh
            </button>
          </div>
        </div>
        
        <div className={`px-6 py-4 ${isStormMode ? 'bg-indigo-950/30 border-t border-indigo-900/50' : 'bg-slate-50 border-t border-slate-100'} text-[10px] font-bold uppercase tracking-widest ${textSecondary} flex justify-between items-center`}>
          <span>Session Recovery Active</span>
          <span className="flex items-center gap-1"><ShieldAlert size={10} /> Local Encrypted Backup</span>
        </div>
      </div>
    </div>
  );
};

export default SessionRestorePrompt;
