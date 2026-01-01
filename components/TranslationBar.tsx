
import React, { useState } from 'react';
import { Languages, X, Check, Loader2, RefreshCcw } from 'lucide-react';
import { translatePage } from '../services/geminiService';

interface TranslationBarProps {
  onClose: () => void;
  pageTitle: string;
}

const TranslationBar: React.FC<TranslationBarProps> = ({ onClose, pageTitle }) => {
  const [status, setStatus] = useState<'idle' | 'translating' | 'done'>('idle');
  const [targetLang, setTargetLang] = useState('English');
  const [translatedTitle, setTranslatedTitle] = useState(pageTitle);

  const handleTranslate = async () => {
    setStatus('translating');
    const result = await translatePage(pageTitle, targetLang);
    if (result) {
      setTranslatedTitle(result);
      setStatus('done');
    }
  };

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Sanskrit'];

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 z-[80] flex items-center gap-4 px-6 py-3 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300">
      <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
        <Languages size={18} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-[#D4AF37]/60 uppercase tracking-widest">Aurelian Translator</span>
        <div className="flex items-center gap-2">
          {status === 'done' ? (
            <span className="text-xs text-white font-medium italic">"{translatedTitle}"</span>
          ) : (
            <span className="text-xs text-white/40">Translate current view?</span>
          )}
        </div>
      </div>

      <div className="h-8 w-px bg-white/10 mx-2" />

      <select 
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="bg-transparent text-xs text-white outline-none border-none cursor-pointer hover:text-[#D4AF37] transition-colors"
      >
        {languages.map(l => <option key={l} value={l} className="bg-black text-white">{l}</option>)}
      </select>

      <button 
        disabled={status === 'translating'}
        onClick={handleTranslate}
        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg ${
          status === 'done' 
            ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
            : 'bg-[#D4AF37] text-black hover:brightness-110 active:scale-95'
        } flex items-center gap-2`}
      >
        {status === 'translating' ? (
          <Loader2 size={12} className="animate-spin" />
        ) : status === 'done' ? (
          <><Check size={12} /> Translated</>
        ) : (
          'Translate'
        )}
      </button>

      {status === 'done' && (
        <button onClick={handleTranslate} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-[#D4AF37]">
          <RefreshCcw size={14} />
        </button>
      )}

      <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-500">
        <X size={16} />
      </button>
    </div>
  );
};

export default TranslationBar;
