
import React, { useState } from 'react';
import { Activity, Cpu, HardDrive, Trash2, Globe, Monitor, Zap, Server, ShieldCheck } from 'lucide-react';
import { Tab } from '../types';

interface TaskManagerProps {
  tabs: Tab[];
  onCloseTab: (id: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tabs, onCloseTab }) => {
  const [search, setSearch] = useState('');

  const filtered = tabs.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  // Simulated System Processes
  const sysProcesses = [
    { name: 'Aurelian Onyx Engine', type: 'Core', cpu: 0.4, memory: 142 },
    { name: 'Local Cortex AI', type: 'Service', cpu: 1.2, memory: 520 },
    { name: 'Storm Shield DNS', type: 'Network', cpu: 0.1, memory: 24 }
  ];

  const totalCpu = sysProcesses.reduce((a, b) => a + b.cpu, 0) + tabs.reduce((a, b) => a + (b.cpuUsage || 0), 0);
  const totalMem = sysProcesses.reduce((a, b) => a + b.memory, 0) + tabs.reduce((a, b) => a + (b.memoryUsage || 0), 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="grid grid-cols-2 gap-2 mb-4">
           <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                 <Cpu size={12} className="text-[#D4AF37]" />
                 <span className="text-[9px] font-bold text-white/30 uppercase">Total CPU</span>
              </div>
              <p className="text-lg font-bold text-white tracking-tight">{totalCpu.toFixed(1)}%</p>
           </div>
           <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                 <HardDrive size={12} className="text-[#D4AF37]" />
                 <span className="text-[9px] font-bold text-white/30 uppercase">Total RAM</span>
              </div>
              <p className="text-lg font-bold text-white tracking-tight">{(totalMem / 1024).toFixed(2)} GB</p>
           </div>
        </div>
        <div className="flex items-center gap-3 px-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
          <Activity size={10} /> Active Process Registry
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <section className="space-y-2">
           <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] px-1">System Core</h4>
           {sysProcesses.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-between group">
                 <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black border border-white/5">
                       {p.type === 'Core' ? <Zap size={14} className="text-[#D4AF37]" /> : <Server size={14} className="text-[#D4AF37]" />}
                    </div>
                    <div>
                       <p className="text-[11px] font-bold text-white leading-none mb-1">{p.name}</p>
                       <p className="text-[9px] font-bold text-[#D4AF37]/60 uppercase">{p.type}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white">{p.cpu.toFixed(1)}%</p>
                    <p className="text-[9px] text-white/30">{p.memory} MB</p>
                 </div>
              </div>
           ))}
        </section>

        <section className="space-y-2">
           <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] px-1">Web Instances</h4>
           {filtered.map(tab => (
              <div key={tab.id} className={`p-3 rounded-xl bg-white/5 border transition-all ${tab.isDiscarded ? 'opacity-40 border-white/5' : 'border-white/5 hover:border-[#D4AF37]/20'} flex items-center justify-between group`}>
                 <div className="flex items-center gap-3 truncate flex-1">
                    <div className="p-2 rounded-lg bg-black border border-white/5">
                       <Globe size={14} className={tab.isActive ? "text-[#D4AF37]" : "text-white/20"} />
                    </div>
                    <div className="truncate">
                       <p className="text-[11px] font-bold text-white truncate">{tab.title}</p>
                       <p className="text-[9px] font-bold text-white/20 uppercase truncate">
                          {tab.isDiscarded ? 'Discarded' : tab.isSleeping ? 'Hibernating' : 'Active Render'}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="text-right whitespace-nowrap">
                       <p className="text-[10px] font-bold text-white">{(tab.cpuUsage || 0).toFixed(1)}%</p>
                       <p className="text-[9px] text-white/30">{(tab.memoryUsage || 0).toFixed(0)} MB</p>
                    </div>
                    {!tab.isActive && (
                      <button 
                        onClick={() => onCloseTab(tab.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Trash2 size={12} />
                      </button>
                    )}
                 </div>
              </div>
           ))}
        </section>
      </div>
    </div>
  );
};

export default TaskManager;
