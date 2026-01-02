import React, { useRef, useEffect } from 'react';
import { Minus, Plus, Printer, Search, History, Download, Settings as SettingsIcon, Code } from 'lucide-react';
import { SidebarMode } from '../types';

interface BrowserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSetSidebarMode: (mode: SidebarMode) => void;
  onToggleDevTools?: () => void;
  onOpenPrint?: () => void;
  onOpenFind?: () => void;
}

const BrowserMenu: React.FC<BrowserMenuProps> = ({ isOpen, onClose, zoom, onZoomIn, onZoomOut, onSetSidebarMode, onToggleDevTools, onOpenPrint, onOpenFind }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="absolute top-16 right-5 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[100] p-2 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-3 border-b border-white/5 flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Options</span>
        <div className="flex items-center gap-3">
          <button onClick={onZoomOut} className="p-1 hover:text-[#D4AF37] text-white"><Minus size={14} /></button>
          <span className="text-[10px] font-bold font-mono text-white">{zoom}%</span>
          <button onClick={onZoomIn} className="p-1 hover:text-[#D4AF37] text-white"><Plus size={14} /></button>
        </div>
      </div>

      <div className="space-y-0.5">
        <button onClick={() => { onOpenPrint?.(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
            <Printer size={16} />
          </div>
          Print Page
        </button>
        <button onClick={() => { onOpenFind?.(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
            <Search size={16} />
          </div>
          Find in Page
        </button>
      </div>

      <div className="my-1 h-px bg-white/5" />

      <div className="space-y-0.5">
        <button onClick={() => { onSetSidebarMode(SidebarMode.History); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
            <History size={16} />
          </div>
          Chronicle (History)
        </button>
        <button onClick={() => { onSetSidebarMode(SidebarMode.Downloads); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
            <Download size={16} />
          </div>
          Transfers (Downloads)
        </button>
        <button onClick={() => { onSetSidebarMode(SidebarMode.Settings); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
            <SettingsIcon size={16} />
          </div>
          Control Deck (Settings)
        </button>
      </div>

      <div className="my-1 h-px bg-white/5" />

      <button onClick={() => { onToggleDevTools?.(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-all text-xs font-medium text-white/60 hover:text-white group">
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
          <Code size={16} />
        </div>
        Developer Tools (F12)
      </button>

      <div className="mt-2 p-2 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Onyx Core Protocol</span>
          </div>
          <p className="text-[8px] text-white/10 uppercase tracking-tighter">Session is currently encrypted and isolated in local memory.</p>
      </div>
    </div>
  );
};

export default BrowserMenu;