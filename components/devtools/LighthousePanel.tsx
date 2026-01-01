
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LighthousePanel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
       <div className="flex items-center gap-4 mb-8">
          {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map(cat => (
             <div key={cat} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xl font-bold text-emerald-500">
                   {Math.floor(Math.random() * 15 + 85)}
                </div>
                <span className="text-[10px] uppercase font-bold text-white/60">{cat}</span>
             </div>
          ))}
       </div>
       <button className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg font-bold uppercase tracking-widest hover:brightness-110 flex items-center gap-2">
          <RefreshCw size={16} /> Run Audit
       </button>
    </div>
  );
};

export default LighthousePanel;
