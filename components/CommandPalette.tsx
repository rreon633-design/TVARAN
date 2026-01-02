import React, { useState, useEffect, useMemo } from 'react';
import { Search, Zap, Globe, MessageSquare, History, Bookmark as BookmarkIcon, Settings, LayoutList, Download, Printer, Maximize, ZoomIn, ZoomOut, Key, Monitor, Languages, FolderPlus } from 'lucide-react';
import { Tab, Bookmark } from '../types';

interface CommandPaletteProps {
  isStormMode: boolean;
  tabs: Tab[];
  bookmarks: Bookmark[];
  onClose: () => void;
  onAction: (action: string) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isStormMode, tabs, bookmarks, onClose, onAction }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const ACTIONS = [
    { id: 'new-tab', icon: <Zap size={18} />, title: 'New Tab', shortcut: '⌘T', category: 'General' },
    { id: 'new-group', icon: <FolderPlus size={18} />, title: 'New Tab Group', shortcut: '', category: 'General' },
    { id: 'summarize', icon: <MessageSquare size={18} />, title: 'Summarize Page', shortcut: '⌘S', category: 'AI' },
    { id: 'translate', icon: <Languages size={18} />, title: 'Translate Page', shortcut: '⇧⌘X', category: 'AI' },
    { id: 'find', icon: <Search size={18} />, title: 'Find in Page', shortcut: '⌘F', category: 'General' },
    { id: 'passwords', icon: <Key size={18} />, title: 'Manage Vault (Passwords)', shortcut: '⌘L', category: 'Security' },
    { id: 'print', icon: <Printer size={18} />, title: 'Print Page', shortcut: '⌘P', category: 'General' },
    { id: 'fullscreen', icon: <Maximize size={18} />, title: 'Toggle Fullscreen', shortcut: 'F11', category: 'View' },
    { id: 'zoom-in', icon: <ZoomIn size={18} />, title: 'Zoom In', shortcut: '⌘+', category: 'View' },
    { id: 'zoom-out', icon: <ZoomOut size={18} />, title: 'Zoom Out', shortcut: '⌘-', category: 'View' },
    { id: 'incognito', icon: <Globe size={18} />, title: 'Storm Mode (Private)', shortcut: '⇧⌘N', category: 'Privacy' },
    { id: 'recently-closed', icon: <LayoutList size={18} />, title: 'Recently Closed Tabs', shortcut: '⇧⌘T', category: 'History' },
    { id: 'downloads', icon: <Download size={18} />, title: 'Download Manager', shortcut: '⌘D', category: 'General' },
    { id: 'history', icon: <History size={18} />, title: 'Search History', shortcut: '⌘H', category: 'History' },
    { id: 'settings', icon: <Settings size={18} />, title: 'Settings', shortcut: '⌘,', category: 'General' },
  ];

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    
    const matchedActions = ACTIONS.filter(a => a.title.toLowerCase().includes(q));
    const matchedTabs = tabs.filter(t => t.title.toLowerCase().includes(q) || t.url.toLowerCase().includes(q))
      .map(t => ({
        id: `goto-tab-${t.id}`,
        icon: <Monitor size={18} />,
        title: t.title,
        shortcut: 'Tab',
        category: 'Open Tabs',
        subtext: t.url
      }));

    const matchedBookmarks = bookmarks.filter(b => b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q))
      .map(b => ({
        id: `goto-bookmark-${b.id}`,
        icon: <BookmarkIcon size={18} />,
        title: b.title,
        shortcut: 'Bookmark',
        category: 'Bookmarks',
        subtext: b.url
      }));

    return [...matchedActions, ...matchedTabs, ...matchedBookmarks];
  }, [query, tabs, bookmarks]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
      if (e.key === 'Enter') {
        if (filteredItems[selectedIndex]) {
          onAction(filteredItems[selectedIndex].id);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [onClose, filteredItems, selectedIndex, onAction]);

  const paletteBg = 'bg-black/90 backdrop-blur-2xl border-white/10';
  const inputColor = 'text-white';
  const itemHover = 'hover:bg-[#D4AF37]/10';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className={`w-[640px] ${paletteBg} border rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-8 py-6 border-b border-white/5">
          <Search className="text-[#D4AF37] mr-4 opacity-50" size={24} />
          <input 
            autoFocus
            type="text"
            placeholder="Search tabs, bookmarks, or summon directive..."
            className={`bg-transparent border-none outline-none ${inputColor} text-xl w-full font-medium placeholder:text-white/10`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[440px] overflow-y-auto p-4 space-y-1">
          {filteredItems.map((item, idx) => {
            const isFirstInCategory = idx === 0 || filteredItems[idx-1].category !== item.category;
            
            return (
              <React.Fragment key={item.id}>
                {isFirstInCategory && (
                  <div className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/40">
                    {item.category}
                  </div>
                )}
                <div 
                  onClick={() => { onAction(item.id); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl ${selectedIndex === idx ? 'bg-[#D4AF37]/20 text-white' : itemHover + ' text-white/70'} cursor-pointer transition-all group`}
                >
                  <div className={`p-2.5 rounded-xl ${selectedIndex === idx ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/20 group-hover:text-[#D4AF37]'} transition-colors`}>
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                  </div>
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <span className={`font-bold group-hover:text-white transition-colors tracking-tight truncate`}>{item.title}</span>
                    {(item as any).subtext && (
                      <span className="text-[10px] opacity-40 truncate">{(item as any).subtext}</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded bg-black text-[#D4AF37]/40 uppercase tracking-widest border border-white/5`}>{item.shortcut}</span>
                </div>
              </React.Fragment>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center text-white/10 font-bold uppercase tracking-widest text-xs">
              Directives not found for "<span className="text-[#D4AF37]">{query}</span>"
            </div>
          )}
        </div>
        <div className="bg-black/40 p-4 px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/30 border-t border-white/5">
          <div className="flex gap-6">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Esc to Close Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;