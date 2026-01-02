import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, X, Home, Lock, ShieldAlert, ShieldCheck, Ghost, Save, SplitSquareHorizontal, MoreHorizontal, Download, Share2, BookmarkPlus, Menu } from 'lucide-react';
import { BrowserSettings, ConnectedDevice } from '../types';
import ShareSheet from './ShareSheet';

interface AddressBarProps {
  url: string;
  title: string;
  isLoading: boolean;
  progress: number;
  isStormMode: boolean;
  isSplit: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  settings: BrowserSettings;
  selectedText: string;
  devices: ConnectedDevice[];
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onGoHome: () => void;
  onToggleSplit: () => void;
  onSaveSnippet: () => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  onInstallApp?: () => void;
  onAddToCollections?: () => void;
  onSendToDevice?: (deviceId: string) => void;
  onTogglePageInfo: () => void;
  onToggleMobileMenu?: () => void;
}

const AddressBar: React.FC<AddressBarProps> = ({
  url, title, isLoading, progress, isStormMode, isSplit, canGoBack, canGoForward, settings,
  selectedText, devices, onNavigate, onBack, onForward, onGoHome, onToggleSplit, onSaveSnippet, onToggleMenu, isMenuOpen, onInstallApp, onAddToCollections, onSendToDevice, onTogglePageInfo, onToggleMobileMenu
}) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [showShareSheet, setShowShareSheet] = useState(false);
  
  const isInstallable = !url.startsWith('tvaran://') && (url.includes('app') || url.includes('chat') || url.includes('studio') || url.includes('discord') || url.includes('spotify'));

  useEffect(() => {
    setCurrentUrl(url);
  }, [url]);

  const isHome = url === 'tvaran://home';
  const isSecure = url.startsWith('https://') || isHome;

  return (
    <>
      <div className="bg-black px-3 md:px-5 py-2.5 flex items-center gap-3 md:gap-6 select-none border-b border-white/5 relative">
        {isLoading && (
          <div 
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-[60] transition-all duration-300 shadow-[0_0_15px_#D4AF37]" 
            style={{ width: `${progress}%` }} 
          />
        )}

        {/* Mobile Menu Button */}
        <button onClick={onToggleMobileMenu} className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-[#D4AF37]">
           <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl">
          <button disabled={!canGoBack} onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-[#D4AF37] disabled:opacity-10"><ChevronLeft size={18} /></button>
          <button disabled={!canGoForward} onClick={onForward} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-[#D4AF37] disabled:opacity-10"><ChevronRight size={18} /></button>
          <button onClick={() => onNavigate(currentUrl)} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-[#D4AF37]">
            {isLoading ? <X size={16} className="text-red-500" /> : <RotateCw size={16} />}
          </button>
          {settings.showHomeButton && <button onClick={onGoHome} className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-[#D4AF37]"><Home size={16} /></button>}
        </div>
        
        <div className="flex-1 max-w-2xl mx-auto flex items-center gap-3 px-3 md:px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 focus-within:border-[#D4AF37]/60 transition-all relative">
          <button onClick={onTogglePageInfo}>
             {isStormMode ? <Ghost size={14} className="text-purple-400 animate-pulse" /> : isSecure ? <Lock size={14} className="text-[#D4AF37]" /> : <ShieldAlert size={14} className="text-red-500" />}
          </button>
          <input 
            type="text" 
            value={currentUrl} 
            onChange={(e) => setCurrentUrl(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && onNavigate(currentUrl)} 
            className="bg-transparent border-none outline-none text-xs text-white/90 w-full font-medium" 
            placeholder="Engage address..." 
          />
          <div className="flex items-center gap-3">
            {isInstallable && (
              <button 
                onClick={onInstallApp}
                className="hidden md:flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-all text-[10px] font-bold uppercase tracking-wider text-white/60 animate-in fade-in zoom-in"
                title="Install App"
              >
                <Download size={12} /> Install
              </button>
            )}
            <button onClick={onTogglePageInfo} className={`transition-all ${isSecure ? 'text-[#D4AF37]' : 'text-red-500'} hover:brightness-150`}><ShieldCheck size={16} /></button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 relative">
          {selectedText && (
            <button onClick={onSaveSnippet} className="hidden md:flex px-4 py-2 bg-[#D4AF37] text-black rounded-xl text-[10px] font-bold uppercase tracking-widest items-center gap-2 animate-in slide-in-from-right-4">
              <Save size={14} /> Save Snippet
            </button>
          )}
          
          <button onClick={() => setShowShareSheet(true)} className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-white/10 text-white/40 hover:text-[#D4AF37]" title="Share & Cast">
             <Share2 size={20} />
          </button>
          
          <button onClick={onAddToCollections} className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-white/10 text-white/40 hover:text-[#D4AF37]" title="Add to Collection">
             <BookmarkPlus size={20} />
          </button>

          <button onClick={onToggleSplit} className={`hidden md:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-white/10 ${isSplit ? 'text-[#D4AF37]' : 'text-white/40'}`} title="Split View"><SplitSquareHorizontal size={20} /></button>
          
          <button onClick={onToggleMenu} className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl hover:bg-white/10 ${isMenuOpen ? 'text-[#D4AF37]' : 'text-white/40'}`} title="Menu"><MoreHorizontal size={20} /></button>
        </div>
      </div>
      
      <ShareSheet 
        isOpen={showShareSheet} 
        onClose={() => setShowShareSheet(false)} 
        title={title} 
        url={url} 
        devices={devices}
        onSendToDevice={onSendToDevice || (() => {})}
      />
    </>
  );
};

export default AddressBar;