
import React from 'react';

interface ReaderModeViewProps {
  title: string;
}

const ReaderModeView: React.FC<ReaderModeViewProps> = ({ title }) => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] text-white/80 overflow-y-auto px-24 py-20 scrollbar-hide">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/20" />
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em]">Reader Console</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/20" />
        </div>
        <h1 className="clash text-5xl font-bold mb-10 leading-tight tracking-tighter text-white">{title}</h1>
        <div className="space-y-8 text-xl leading-relaxed font-serif opacity-70">
          <p>You are viewing this content through the **Aurelian Luminance** layer. Every element is stripped of noise, leaving only the essential data stream.</p>
          <p>TVARAN's local engine continues to index and protect your session in the background. Your neural focus remains uninterrupted.</p>
          <p>The Storm is rising. Data sovereignty is not just a feature; it's a fundamental human right. TVARAN empowers you to reclaim your digital identity through local intelligence.</p>
        </div>
      </div>
    </div>
  );
};

export default ReaderModeView;
