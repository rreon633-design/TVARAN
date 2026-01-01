
import React, { useState } from 'react';
import { Trash2, X, History, Cookie, Database, Clock } from 'lucide-react';

interface ClearBrowsingDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: (options: { history: boolean; cookies: boolean; cache: boolean; timeRange: string }) => void;
}

const ClearBrowsingDataDialog: React.FC<ClearBrowsingDataDialogProps> = ({ isOpen, onClose, onClear }) => {
  const [history, setHistory] = useState(true);
  const [cookies, setCookies] = useState(true);
  const [cache, setCache] = useState(true);
  const [timeRange, setTimeRange] = useState('last_hour');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[480px] bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
              <Trash2 size={20} />
            </div>
            <h2 className="text-lg font-bold text-white clash tracking-wide">Clear Browsing Data</h2>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest ml-1">Time Range</label>
            <div className="relative">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]/60 appearance-none cursor-pointer"
              >
                <option value="last_hour" className="bg-[#121212]">Last hour</option>
                <option value="last_24" className="bg-[#121212]">Last 24 hours</option>
                <option value="last_7" className="bg-[#121212]">Last 7 days</option>
                <option value="last_4" className="bg-[#121212]">Last 4 weeks</option>
                <option value="all" className="bg-[#121212]">All time</option>
              </select>
              <Clock size={16} className="absolute right-4 top-3.5 text-white/20 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <History size={18} className="text-white/60 group-hover:text-[#D4AF37]" />
                <div>
                  <div className="text-sm font-bold text-white">Browsing history</div>
                  <div className="text-xs text-white/40">Clears history and autocompletions</div>
                </div>
              </div>
              <input type="checkbox" checked={history} onChange={(e) => setHistory(e.target.checked)} className="accent-[#D4AF37] w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Cookie size={18} className="text-white/60 group-hover:text-[#D4AF37]" />
                <div>
                  <div className="text-sm font-bold text-white">Cookies and other site data</div>
                  <div className="text-xs text-white/40">Signs you out of most sites</div>
                </div>
              </div>
              <input type="checkbox" checked={cookies} onChange={(e) => setCookies(e.target.checked)} className="accent-[#D4AF37] w-4 h-4" />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Database size={18} className="text-white/60 group-hover:text-[#D4AF37]" />
                <div>
                  <div className="text-sm font-bold text-white">Cached images and files</div>
                  <div className="text-xs text-white/40">Frees up less than 320 MB</div>
                </div>
              </div>
              <input type="checkbox" checked={cache} onChange={(e) => setCache(e.target.checked)} className="accent-[#D4AF37] w-4 h-4" />
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-white/5 bg-black/20 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white transition-all">Cancel</button>
          <button onClick={() => onClear({ history, cookies, cache, timeRange })} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-900/20">Clear Data</button>
        </div>
      </div>
    </div>
  );
};

export default ClearBrowsingDataDialog;
