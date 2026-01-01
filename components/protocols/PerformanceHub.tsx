
import React, { useMemo } from 'react';
import { Zap, Cpu, HardDrive, Monitor, ShieldCheck, Clock, Wind, Flame, Activity, ChevronLeft, Bot, Box } from 'lucide-react';
import { Tab, BrowserSettings } from '../../types';

interface PerformanceHubProps {
  tabs: Tab[];
  settings?: BrowserSettings;
  onNavigate: (url: string) => void;
}

const PerformanceHub: React.FC<PerformanceHubProps> = ({ tabs, settings, onNavigate }) => {
  const stats = useMemo(() => {
    const totalCpu = tabs.reduce((a, b) => a + (b.isActive ? 1.5 : b.isSleeping ? 0.05 : 0.2), 2);
    const totalMem = tabs.reduce((a, b) => a + (b.isDiscarded ? 5 : b.isSleeping ? 25 : 120), 450);
    return { cpu: totalCpu, mem: totalMem };
  }, [tabs]);

  return (
    <div className="w-full h-full bg-[#050505] p-12 overflow-y-auto scrollbar-hide text-white select-none">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold clash tracking-tight flex items-center gap-4">
              Performance Hub <Zap size={32} className="text-[#D4AF37] fill-[#D4AF37]/20" />
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Storm Diagnostics: {stats.cpu.toFixed(1)}% Load</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block">Neural State</span>
              <span className="text-lg font-bold font-mono">STABLE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:border-[#D4AF37]/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Cpu size={80} />
            </div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Process Load</p>
            <p className="text-4xl font-bold tracking-tighter">{stats.cpu.toFixed(1)}%</p>
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" style={{ width: `${Math.min(stats.cpu * 5, 100)}%` }} />
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:border-[#D4AF37]/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <HardDrive size={80} />
            </div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Memory Index</p>
            <p className="text-4xl font-bold tracking-tighter">{(stats.mem / 1024).toFixed(2)} GB</p>
            <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: '35%' }} />
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:border-[#D4AF37]/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Monitor size={80} />
            </div>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Graphics API</p>
            <p className="text-4xl font-bold tracking-tighter">WebGPU</p>
            <div className="flex items-center gap-2 mt-6 text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
              <ShieldCheck size={14} /> Accelerated Pipeline
            </div>
          </div>
        </div>

        {/* Graphics Details */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-black border border-white/5 rounded-xl text-white/60">
                 <Box size={20} />
              </div>
              <div>
                 <p className="text-sm font-bold text-white">Graphics Adapter</p>
                 <p className="text-[10px] text-white/40 uppercase tracking-wider">Apple M2 Pro • Metal Backend</p>
              </div>
           </div>
           <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                 <span className="text-[10px] font-bold text-white/20 uppercase">WASM Support</span>
                 <span className="text-[10px] font-bold text-emerald-500">ENABLED</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                 <span className="text-[10px] font-bold text-white/20 uppercase">Simd.js</span>
                 <span className="text-[10px] font-bold text-emerald-500">ENABLED</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Lifecycle Management</h3>
            <div className="space-y-4">
              {[
                { icon: Clock, label: 'Sleeping Instances', count: tabs.filter(t => t.isSleeping && !t.isDiscarded).length, desc: 'Frozen process tree' },
                { icon: Wind, label: 'Memory Reclamation', count: tabs.filter(t => t.isDiscarded).length, desc: 'Garbage collection status' },
                { icon: Bot, label: 'Automation Driver', count: 'IDLE', desc: 'WebDriver / Selenium' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-black border border-white/5 rounded-xl text-[#D4AF37]">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-[#D4AF37]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-[2.5rem] p-10 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Resource Analytics</h3>
              <Activity size={20} className="text-[#D4AF37]" />
            </div>
            <div className="space-y-10 flex-1">
              <div className="relative pt-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                  <span className="text-white/40">Onyx Optimization</span>
                  <span className="text-emerald-500">94.2% Efficiency</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: '94%' }} />
                </div>
              </div>
              
              <div className="mt-auto p-6 bg-[#D4AF37]/5 rounded-3xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-4 mb-3">
                   <div className="p-2 bg-[#D4AF37] text-black rounded-lg">
                      <Zap size={16} />
                   </div>
                   <p className="text-xs font-bold text-white uppercase tracking-widest">Aurelian Core Status</p>
                </div>
                <p className="text-[10px] text-[#D4AF37]/60 leading-relaxed uppercase tracking-tight font-medium">
                  The local engine is currently prioritizing foreground responsiveness by throttling background telemetry. Energy consumption is minimal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('tvaran://home')}
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-[#D4AF37] transition-all mx-auto pt-10 group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Terminate Diagnostics
        </button>
      </div>
    </div>
  );
};

export default PerformanceHub;
