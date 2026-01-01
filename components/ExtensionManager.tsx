
import React, { useState } from 'react';
import { Puzzle, Box, Download, ToggleLeft, ToggleRight, Trash2, Shield, Code, Globe, Settings, Plus } from 'lucide-react';
import { Extension, InstalledPWA } from '../types';
import IconRenderer from './IconRenderer';

interface ExtensionManagerProps {
  extensions: Extension[];
  installedApps: InstalledPWA[];
  onToggleExtension: (id: string) => void;
  onRemoveExtension: (id: string) => void;
  onLoadUnpacked: () => void;
  onRemoveApp: (id: string) => void;
}

const ExtensionManager: React.FC<ExtensionManagerProps> = ({ 
  extensions, installedApps, onToggleExtension, onRemoveExtension, onLoadUnpacked, onRemoveApp 
}) => {
  const [activeTab, setActiveTab] = useState<'extensions' | 'apps'>('extensions');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
             <h2 className="text-xl font-bold clash text-white">Extensions</h2>
             <Puzzle size={20} className="text-[#D4AF37]" />
           </div>
           <button 
             onClick={onLoadUnpacked}
             className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all flex items-center gap-2"
           >
             <Code size={12} /> Dev Mode
           </button>
        </div>
        
        <div className="flex gap-4 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('extensions')}
            className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'extensions' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-white/40 hover:text-white'}`}
          >
            Add-ons ({extensions.length})
          </button>
          <button 
            onClick={() => setActiveTab('apps')}
            className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'apps' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-white/40 hover:text-white'}`}
          >
            Web Apps ({installedApps.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {activeTab === 'extensions' ? (
          <>
            {extensions.map(ext => (
              <div key={ext.id} className={`p-4 rounded-2xl border transition-all ${ext.enabled ? 'bg-white/5 border-white/5' : 'bg-black border-white/5 opacity-60'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-black border border-white/10 rounded-xl">
                      <IconRenderer name={ext.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{ext.name}</h3>
                        <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/40">{ext.version}</span>
                        {ext.isDev && <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded uppercase font-bold">Unpacked</span>}
                      </div>
                      <p className="text-xs text-white/50 mt-1 line-clamp-2">{ext.description}</p>
                    </div>
                  </div>
                  <button onClick={() => onToggleExtension(ext.id)} className={`transition-colors ${ext.enabled ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                    {ext.enabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>

                {ext.enabled && (
                  <div className="pl-[72px] space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {ext.permissions.map(perm => (
                        <span key={perm} className="text-[9px] bg-black border border-white/5 px-2 py-1 rounded text-white/40 flex items-center gap-1">
                          <Shield size={10} /> {perm}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                      <button className="text-[10px] font-bold text-white/40 hover:text-white flex items-center gap-1.5 transition-colors">
                        <Settings size={12} /> Details
                      </button>
                      <button onClick={() => onRemoveExtension(ext.id)} className="text-[10px] font-bold text-white/40 hover:text-red-500 flex items-center gap-1.5 transition-colors ml-auto">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all flex flex-col items-center gap-2">
              <Plus size={24} />
              <span className="text-xs font-bold uppercase tracking-widest">Open Chrome Web Store</span>
            </button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {installedApps.map(app => (
              <div key={app.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 group transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-black rounded-xl">
                    <IconRenderer name={app.icon} size={20} className="text-[#D4AF37]" />
                  </div>
                  <button onClick={() => onRemoveApp(app.id)} className="p-1.5 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{app.name}</h4>
                <p className="text-[10px] text-white/40 truncate mb-4">{app.url}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 font-bold uppercase tracking-wider">Installed</span>
                  <button className="ml-auto text-white/20 hover:text-white p-1">
                    <Settings size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionManager;
