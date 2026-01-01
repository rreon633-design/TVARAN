
import React from 'react';
import { ShieldOff, ShieldAlert } from 'lucide-react';

interface SecurityAlertProps {
  type: 'ssl' | 'blocked';
  url: string;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
  onShowCert?: () => void;
}

const SecurityAlert: React.FC<SecurityAlertProps> = ({ type, url, onGoHome, onNavigate, onShowCert }) => {
  const isSsl = type === 'ssl';
  const siteUrl = new URL(url).searchParams.get('site') || 'the target site';

  return (
    <div className="w-full h-full bg-red-950/20 flex flex-col items-center justify-center p-20 text-center animate-in fade-in duration-700">
      <div className="w-32 h-32 bg-red-500/10 rounded-[3rem] flex items-center justify-center mb-8 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
        {isSsl ? <ShieldOff size={56} className="text-red-500" /> : <ShieldAlert size={56} className="text-red-500" />}
      </div>
      
      <h1 className="text-5xl font-bold clash mb-6 tracking-tighter text-white uppercase">
        {isSsl ? 'Connection Not Private' : 'Threat Detected'}
      </h1>
      
      <p className="max-w-xl leading-relaxed text-base text-red-200/60 font-medium">
        {isSsl 
          ? `Attackers might be trying to steal your information from ${siteUrl}. TVARAN's Onyx engine detected a suspicious certificate signature.`
          : `TVARAN's Onyx Defense engine has identified ${siteUrl} as a security risk. Phishing, malware, or credential harvesting has been flagged.`
        }
      </p>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <button 
            onClick={onGoHome}
            className="px-10 py-5 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-red-600/20"
          >
            Back to Safety
          </button>
          {!isSsl && (
            <button 
              onClick={() => onNavigate(url.replace('tvaran://blocked?site=', ''))}
              className="px-8 py-4 bg-white/5 text-white/40 rounded-2xl font-bold uppercase tracking-widest hover:text-white transition-all border border-white/10"
            >
              Continue (Risk)
            </button>
          )}
        </div>
        {isSsl && onShowCert && (
          <button 
            onClick={onShowCert}
            className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] hover:text-[#D4AF37] transition-all"
          >
            Inspect Rogue Certificate
          </button>
        )}
      </div>
    </div>
  );
};

export default SecurityAlert;
