
import React from 'react';
import { Shield, Activity, Battery, RefreshCw, Clock, Ghost, Cpu } from 'lucide-react';
import { Tab } from '../types';

interface StatusBarProps {
  isUpdating: boolean;
  energySaver: boolean;
  isStormMode: boolean;
  tabs: Tab[];
  version: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ isUpdating, energySaver, isStormMode, tabs, version }) => {
  const avgCpu = Math.floor(tabs.reduce((a, b) => a + (b.cpuUsage || 0), 0) / 10);
  const hibernatingCount = tabs.filter(t => t.isSleeping && !t.isDiscarded).length;

  return (
    <div className="fixed bottom-0 left-64 right-0 h-6 bg-black/90 backdrop-blur border-t border-white/10 flex items-center justify-between px-4 text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold z-40 select-none">
      <div className="flex gap-4">
        <span className="flex items-center gap-1">
          <Shield size={10} /> Status: {isUpdating ? 'Updating...' : 'Gold'}
        </span>
        <span className="flex items-center gap-1">
          <Activity size={10} /> {avgCpu}%
        </span>
        {hibernatingCount > 0 && (
          <span className="flex items-center gap-1 text-white/40">
            <Clock size={10} /> {hibernatingCount} Idle
          </span>
        )}
        {energySaver && (
          <span className="flex items-center gap-1 text-emerald-400">
            <Battery size={10} /> Energy Saver
          </span>
        )}
        {isUpdating && (
          <span className="flex items-center gap-1 text-[#D4AF37] animate-pulse">
            <RefreshCw size={10} className="animate-spin" /> System Optimization
          </span>
        )}
      </div>
      <div className="flex gap-4">
        {isStormMode && (
          <span className="text-[#FFD700] flex items-center gap-1 animate-pulse">
            <Ghost size={10} /> Ghost Mode
          </span>
        )}
        <span>{version}</span>
      </div>
    </div>
  );
};

export default StatusBar;
