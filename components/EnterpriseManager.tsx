
import React from 'react';
import { Building2, ShieldCheck, AlertTriangle, FileText, Lock } from 'lucide-react';
import { EnterprisePolicy } from '../types';

interface EnterpriseManagerProps {
  policies: EnterprisePolicy[];
}

const EnterpriseManager: React.FC<EnterpriseManagerProps> = ({ policies }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-blue-950/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <Building2 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold clash text-white">Managed Browser</h2>
            <p className="text-[9px] font-bold text-blue-300/60 uppercase tracking-widest">Tvaran Enterprise</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
          <Lock size={16} className="text-white/40 mt-1" />
          <p className="text-xs text-white/60 leading-relaxed">
            Your browser is managed by your organization. Administrator policies may restrict certain features, extensions, or websites.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Active Policies</h3>
          <div className="space-y-3">
            {policies.map(policy => (
              <div key={policy.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white mb-1 font-mono">{policy.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${policy.level === 'mandatory' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {policy.level}
                    </span>
                    <span className="text-[9px] text-white/20 uppercase">{policy.source}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-white/60 bg-black px-2 py-1 rounded border border-white/10 block mb-1">
                    {policy.value.toString()}
                  </span>
                  <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-emerald-500 uppercase">
                    <ShieldCheck size={10} /> {policy.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
           <button className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">
              <FileText size={12} /> View Policy JSON
           </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseManager;
