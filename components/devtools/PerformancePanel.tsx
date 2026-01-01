
import React from 'react';
import { Activity } from 'lucide-react';

const PerformancePanel: React.FC = () => {
  return (
    <div className="p-4 text-center text-white/40 flex flex-col items-center justify-center h-full">
      <Activity size={48} className="mb-4 opacity-20" />
      <p className="text-sm font-bold uppercase tracking-widest">Profiling...</p>
      <div className="w-64 h-32 mt-4 bg-white/5 rounded border border-white/10 relative overflow-hidden">
         <div className="absolute inset-0 flex items-end justify-between px-1">
            {Array.from({length: 40}).map((_, i) => (
               <div key={i} className="w-1 bg-emerald-500/40" style={{height: `${Math.random() * 100}%`}} />
            ))}
         </div>
      </div>
    </div>
  );
};

export default PerformancePanel;
