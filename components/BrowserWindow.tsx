
import React, { useState, useEffect, useRef } from 'react';
import { SearchEngine, Bookmark, Tab, PasswordCredential, SidebarMode, BrowserSettings, SitePermission, PermissionType, PermissionState, ConnectedDevice } from '../types';
import BookmarkBar from './BookmarkBar';
import HomeScreen from './HomeScreen';
import PerformanceHub from './protocols/PerformanceHub';
import ExperimentalFlags from './protocols/ExperimentalFlags';
import ReaderModeView from './protocols/ReaderModeView';
import AddressBar from './AddressBar';
import BrowserMenu from './BrowserMenu';
import DevTools from './DevTools';
import { Calculator } from 'lucide-react';

interface BrowserWindowProps {
  url: string;
  title: string;
  isSplit: boolean;
  isStormMode: boolean;
  searchEngine: SearchEngine;
  bookmarks: Bookmark[];
  closedTabs: Tab[];
  settings: BrowserSettings;
  canGoBack: boolean;
  canGoForward: boolean;
  onToggleSplit: () => void;
  onNavigate: (newUrl: string) => void;
  onNewTab: () => void;
  onBack: () => void;
  onForward: () => void;
  onToggleBookmark: () => void;
  onGoHome: () => void;
  onReopenTab: (tab: Tab) => void;
  passwords: PasswordCredential[];
  onSavePassword: (p: PasswordCredential) => void;
  onSetSidebarMode: (mode: SidebarMode) => void;
  sitePermissions: Record<string, SitePermission>;
  onUpdatePermission: (origin: string, type: PermissionType, state: PermissionState) => void;
  onSaveHighlight: (text: string, title: string, url: string) => void;
  tabs?: Tab[];
  onUpdateFlag?: (id: string) => void;
  onInstallApp?: (name: string, url: string) => void;
  devices?: ConnectedDevice[];
  onSendToDevice?: (deviceId: string) => void;
  // DevTools props
  isDevToolsOpen: boolean;
  onToggleDevTools: () => void;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({ 
  url, title, isSplit, isStormMode, searchEngine, bookmarks, closedTabs, settings, canGoBack, canGoForward,
  onToggleSplit, onNavigate, onNewTab, onBack, onForward, onToggleBookmark, onGoHome, onReopenTab,
  passwords, onSavePassword, onSetSidebarMode, sitePermissions, onUpdatePermission, onSaveHighlight, tabs = [], onUpdateFlag, onInstallApp, devices = [], onSendToDevice,
  isDevToolsOpen, onToggleDevTools
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [selectedText, setSelectedText] = useState('');
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [isDeviceMode, setIsDeviceMode] = useState(false);
  const [deviceSize, setDeviceSize] = useState({ w: 375, h: 667 }); // iPhone SE default
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true); setProgress(10);
    const interval = setInterval(() => setProgress(p => (p >= 95 ? 95 : p + 10)), 150);
    const timer = setTimeout(() => {
      clearInterval(interval); setProgress(100);
      setTimeout(() => { setIsLoading(false); setProgress(0); }, 300);
    }, 600);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [url]);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const text = selection.toString().trim();
        setSelectedText(text);
        
        if (/^\d+(\.\d+)?\s?(kg|lbs|mi|km|c|f)$/i.test(text)) {
           if (text.toLowerCase().includes('kg')) setConversionResult(`${parseFloat(text) * 2.204} lbs`);
           else if (text.toLowerCase().includes('lbs')) setConversionResult(`${parseFloat(text) / 2.204} kg`);
           else if (text.toLowerCase().includes('mi')) setConversionResult(`${parseFloat(text) * 1.609} km`);
           else if (text.toLowerCase().includes('km')) setConversionResult(`${parseFloat(text) / 1.609} mi`);
           else if (text.toLowerCase().includes('c')) setConversionResult(`${(parseFloat(text) * 9/5) + 32} F`);
           else if (text.toLowerCase().includes('f')) setConversionResult(`${(parseFloat(text) - 32) * 5/9} C`);
        } else if (/^\$\d+/.test(text)) {
           setConversionResult(`~ €${(parseFloat(text.replace('$', '')) * 0.92).toFixed(2)}`);
        } else {
           setConversionResult(null);
        }

      } else {
        setSelectedText('');
        setConversionResult(null);
      }
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleSaveSnippet = () => {
    if (selectedText) {
      onSaveHighlight(selectedText, title, url);
      setSelectedText('');
      setConversionResult(null);
      window.getSelection()?.removeAllRanges();
    }
  };
  
  const handleInstallApp = () => {
    if (onInstallApp) {
      onInstallApp(title, url);
    }
  };

  const isHome = url === 'tvaran://home';
  const isFlags = url === 'tvaran://flags';
  const isPerf = url === 'tvaran://performance';

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  return (
    <div className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
      <AddressBar 
        url={url} 
        title={title} 
        isLoading={isLoading} 
        progress={progress}
        isStormMode={isStormMode}
        isSplit={isSplit}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        settings={settings}
        selectedText={selectedText}
        devices={devices}
        onNavigate={onNavigate}
        onBack={onBack}
        onForward={onForward}
        onGoHome={onGoHome}
        onToggleSplit={onToggleSplit}
        onSaveSnippet={handleSaveSnippet}
        onToggleMenu={() => setShowMoreMenu(!showMoreMenu)}
        isMenuOpen={showMoreMenu}
        onInstallApp={handleInstallApp}
        onAddToCollections={() => onSetSidebarMode(SidebarMode.Collections)}
        onSendToDevice={onSendToDevice}
      />
      
      {selectedText && conversionResult && (
         <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[80] bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 px-4 py-2 rounded-xl text-white flex items-center gap-3 shadow-2xl animate-in slide-in-from-top-2">
            <Calculator size={16} className="text-[#D4AF37]" />
            <div className="flex flex-col">
               <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider">Conversion</span>
               <span className="text-sm font-bold">{selectedText} = <span className="text-[#D4AF37]">{conversionResult}</span></span>
            </div>
         </div>
      )}
      
      <BrowserMenu 
        isOpen={showMoreMenu}
        onClose={() => setShowMoreMenu(false)}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onSetSidebarMode={onSetSidebarMode}
        onToggleDevTools={onToggleDevTools}
      />

      <BookmarkBar bookmarks={bookmarks} isStormMode={isStormMode} onNavigate={onNavigate} />

      {/* Main Content Area + DevTools Split */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className={`flex-1 relative bg-black overflow-hidden ${isDeviceMode ? 'flex items-center justify-center bg-[#1a1a1a]' : ''}`} ref={contentRef}>
          {isDeviceMode && (
             <div className="absolute top-4 flex gap-4 bg-black/50 p-2 rounded-xl border border-white/10 z-50">
                <button onClick={() => setDeviceSize({w: 375, h: 667})} className="text-xs text-white/60 hover:text-white px-2">iPhone SE</button>
                <button onClick={() => setDeviceSize({w: 390, h: 844})} className="text-xs text-white/60 hover:text-white px-2">iPhone 12</button>
                <button onClick={() => setDeviceSize({w: 820, h: 1180})} className="text-xs text-white/60 hover:text-white px-2">iPad Air</button>
                <button onClick={() => setDeviceSize({w: 1920, h: 1080})} className="text-xs text-white/60 hover:text-white px-2">Desktop</button>
             </div>
          )}
          
          <div 
            className={`transition-transform duration-300 origin-top ${isDeviceMode ? 'border border-white/20 shadow-2xl overflow-hidden bg-black' : 'w-full h-full'}`}
            style={{ 
               transform: isDeviceMode ? 'scale(1)' : `scale(${zoom / 100})`,
               width: isDeviceMode ? `${deviceSize.w}px` : '100%',
               height: isDeviceMode ? `${deviceSize.h}px` : '100%'
            }}
          >
            {isHome && <HomeScreen isStormMode={isStormMode} onNavigate={onNavigate} backgroundImage={settings.backgroundImage} />}
            {isFlags && <ExperimentalFlags settings={settings} onUpdateFlag={onUpdateFlag || (() => {})} onNavigate={onNavigate} />}
            {isPerf && <PerformanceHub tabs={tabs} settings={settings} onNavigate={onNavigate} />}
            {!isHome && !isFlags && !isPerf && <ReaderModeView title={title} />}
          </div>
        </div>

        {isDevToolsOpen && (
          <div className="h-[40%] min-h-[300px] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 relative">
             <DevTools 
               onClose={onToggleDevTools} 
               pageTitle={title} 
               pageUrl={url} 
               onToggleDeviceMode={() => setIsDeviceMode(!isDeviceMode)}
               isDeviceMode={isDeviceMode}
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserWindow;
