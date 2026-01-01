
import React, { useState } from 'react';
import { Search, Download, CheckCircle2, FileText, ExternalLink, Trash2, XCircle, ShieldCheck, ShieldAlert, Loader2, Play, Pause, X } from 'lucide-react';
import { DownloadItem } from '../types';

interface DownloadManagerProps {
  downloads: DownloadItem[];
  isStormMode: boolean;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  onCancel?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ downloads, isStormMode, onPause, onResume, onCancel, onRemove }) => {
  const [search, setSearch] = useState('');

  const filteredDownloads = downloads.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const textSecondary = isStormMode ? 'text-[#D4AF37]/40' : 'text-slate-500';
  const sidebarBorder = isStormMode ? 'border-white/5' : 'border-slate-200';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`p-4 border-b ${sidebarBorder} bg-black/20`}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isStormMode ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-50 border-slate-200 text-slate-500'} focus-within:border-[#D4AF37]/40 transition-all mb-3`}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search transfers..."
            className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-white/20 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${textSecondary}`}>
            {filteredDownloads.filter(d => d.status === 'downloading').length} Active Transfers
          </span>
          <button className={`text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40 hover:text-[#D4AF37] flex items-center gap-1 transition-colors`}>
            <Trash2 size={10} /> Purge Completed
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {filteredDownloads.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
             <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-[#D4AF37]/20`}>
                <Download size={32} strokeWidth={1.5} />
             </div>
             <p className={`text-sm font-medium text-[#D4AF37]/40 uppercase tracking-widest`}>No active transfers</p>
             <p className={`text-[10px] mt-2 text-white/10 uppercase tracking-tighter`}>Local transfer hub ready</p>
          </div>
        ) : (
          filteredDownloads.map((dl) => (
            <div 
              key={dl.id}
              className={`p-4 rounded-2xl border group transition-all bg-white/5 border-white/5 hover:border-[#D4AF37]/20 ${dl.status === 'cancelled' ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl transition-colors ${
                  dl.status === 'completed' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : dl.status === 'failed' || dl.status === 'cancelled'
                    ? 'bg-red-500/10 text-red-500'
                    : dl.status === 'paused'
                    ? 'bg-amber-500/10 text-amber-500'
                    : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                }`}>
                  {dl.status === 'completed' ? (
                    <CheckCircle2 size={18} />
                  ) : dl.status === 'failed' || dl.status === 'cancelled' ? (
                    <XCircle size={18} />
                  ) : dl.status === 'scanning' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : dl.status === 'paused' ? (
                    <Pause size={18} />
                  ) : (
                    <Download size={18} className="animate-bounce" style={{animationDuration: '2s'}} />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`text-sm font-bold truncate text-white`}>{dl.name}</p>
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] ${textSecondary} font-bold uppercase`}>{dl.size}</span>
                     {dl.reputation && (
                        <div className={`flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest ${dl.reputation === 'safe' ? 'text-emerald-500' : 'text-red-500'}`}>
                           {dl.reputation === 'safe' ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                           {dl.reputation}
                        </div>
                     )}
                     <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter ml-auto">
                        {dl.status}
                     </span>
                  </div>
                </div>
              </div>
              
              {(dl.status === 'downloading' || dl.status === 'scanning' || dl.status === 'paused') && (
                <div className="space-y-1.5 mb-4">
                  <div className={`w-full h-1 bg-white/5 rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full transition-all duration-500 ${
                        dl.status === 'scanning' ? 'bg-amber-500 animate-pulse w-full' : 
                        dl.status === 'paused' ? 'bg-white/20' :
                        'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
                      }`} 
                      style={{ width: dl.status === 'scanning' ? '100%' : `${dl.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60">
                    <span className="flex items-center gap-1">{dl.status === 'scanning' ? 'Onyx Reputation Check...' : dl.status === 'paused' ? 'Transfer Halted' : 'Transferring Bitstream...'}</span>
                    {dl.status !== 'scanning' && <span>{dl.progress}%</span>}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                 <div className="flex gap-2">
                    {dl.status === 'downloading' && (
                       <button 
                         onClick={() => onPause?.(dl.id)}
                         className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all"
                       >
                          <Pause size={10} /> Pause
                       </button>
                    )}
                    {dl.status === 'paused' && (
                       <button 
                         onClick={() => onResume?.(dl.id)}
                         className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] rounded-lg text-[9px] font-bold uppercase tracking-widest text-black transition-all"
                       >
                          <Play size={10} /> Resume
                       </button>
                    )}
                    {(dl.status === 'downloading' || dl.status === 'paused') && (
                       <button 
                         onClick={() => onCancel?.(dl.id)}
                         className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white transition-all"
                       >
                          <X size={10} /> Cancel
                       </button>
                    )}
                    {dl.status === 'completed' && (
                       <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                          Open File
                       </button>
                    )}
                 </div>
                 <div className="flex items-center gap-1">
                    <button 
                      onClick={() => onRemove?.(dl.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-colors"
                      title="Remove from List"
                    >
                       <Trash2 size={12} />
                    </button>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DownloadManager;
