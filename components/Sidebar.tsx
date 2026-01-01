
import React from 'react';
import { Plus, ChevronDown, Monitor, Search, Zap, Settings, Download, History, User, Puzzle, Layers, ShoppingBag, Wallet, LayoutGrid } from 'lucide-react';
import { Tab, TabGroup, SidebarMode, WebPanel } from '../types';
import TabItem from './TabItem';
import IconRenderer from './IconRenderer';

interface SidebarProps {
  tabs: Tab[];
  groups: TabGroup[];
  activeTabId: string;
  isStormMode: boolean;
  miniSidebar: boolean;
  webPanels: WebPanel[];
  activePanelId: string | null;
  onTogglePanel: (id: string) => void;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  onOpenCommand: () => void;
  onToggleMute: (tabId: string) => void;
  onTogglePin: (tabId: string) => void;
  onSetSidebarMode: (mode: SidebarMode) => void;
  onToggleGroupCollapse: (groupId: string) => void;
  onReorderTabs: (draggedTabId: string, targetGroupId: string | undefined, targetTabId: string | undefined) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tabs, groups, activeTabId, isStormMode, miniSidebar, webPanels, activePanelId, onTogglePanel,
  onSelectTab, onCloseTab, onNewTab, onOpenCommand, onToggleMute, onTogglePin, onSetSidebarMode, onToggleGroupCollapse, onReorderTabs
}) => {
  const pinnedTabs = tabs.filter(t => t.isPinned);
  const unpinnedTabs = tabs.filter(t => !t.isPinned);

  const NavButton = ({ icon: Icon, onClick, title, active = false }: { icon: any, onClick: () => void, title: string, active?: boolean }) => (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all duration-200 group relative ${
        active 
          ? 'text-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
          : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
      title={title}
    >
      <Icon size={20} strokeWidth={1.5} />
      {active && <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-[#D4AF37] rounded-r-full" />}
    </button>
  );

  return (
    <div className="flex h-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] z-50">
      {/* App Strip (Mini vertical bar for panels) */}
      <div className="w-16 bg-[#080808] border-r border-white/5 flex flex-col items-center py-6 gap-3 z-50 shadow-xl">
        <div className="mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8B735B] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <Zap size={20} className="text-black fill-current" />
          </div>
        </div>
        
        {/* Web Panels */}
        <div className="flex flex-col gap-2 w-full px-2">
          {webPanels.map(panel => (
            <button 
              key={panel.id}
              onClick={() => onTogglePanel(panel.id)}
              className={`p-3 rounded-xl transition-all duration-200 flex justify-center ${
                activePanelId === panel.id 
                  ? 'text-[#D4AF37] bg-[#D4AF37]/10' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
              title={panel.name}
            >
              <IconRenderer name={panel.icon} size={20} />
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-white/5 my-2" />

        {/* Browser Utilities */}
        <div className="flex flex-col gap-2 w-full px-2">
          <NavButton icon={Search} onClick={() => onSetSidebarMode(SidebarMode.Search)} title="Search" />
          <NavButton icon={History} onClick={() => onSetSidebarMode(SidebarMode.History)} title="History" />
          <NavButton icon={Layers} onClick={() => onSetSidebarMode(SidebarMode.Collections)} title="Collections" />
          <NavButton icon={ShoppingBag} onClick={() => onSetSidebarMode(SidebarMode.Shopping)} title="Shopping" />
          <NavButton icon={Wallet} onClick={() => onSetSidebarMode(SidebarMode.Wallet)} title="Wallet" />
          <NavButton icon={Puzzle} onClick={() => onSetSidebarMode(SidebarMode.Extensions)} title="Extensions" />
        </div>
        
        {/* Bottom Section */}
        <div className="mt-auto flex flex-col gap-3 w-full px-2 pb-2">
           <NavButton icon={User} onClick={() => onSetSidebarMode(SidebarMode.Profiles)} title="Profiles" />
           <NavButton icon={Settings} onClick={() => onSetSidebarMode(SidebarMode.Settings)} title="Settings" />
        </div>
      </div>

      {/* Main Tab Sidebar */}
      <div className={`${miniSidebar ? 'w-20' : 'w-72'} bg-[#0c0c0c]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col h-full select-none transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] overflow-hidden relative`}>
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="p-5 relative z-10">
          {!miniSidebar ? (
            <button 
              onClick={onOpenCommand}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/5 text-white/40 rounded-2xl text-xs font-medium transition-all hover:bg-white/10 hover:border-white/10 group shadow-sm"
            >
              <Search size={14} className="group-hover:text-[#D4AF37] transition-colors" />
              <span className="group-hover:text-white/70 transition-colors">Command Center...</span>
              <span className="ml-auto text-[10px] opacity-40 bg-black/20 px-1.5 py-0.5 rounded">⌘K</span>
            </button>
          ) : (
             <button onClick={onOpenCommand} className="w-full flex justify-center p-3 rounded-2xl bg-white/5 hover:text-[#D4AF37] transition-all shadow-sm">
                <Search size={20} />
             </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-6 scrollbar-hide pb-20 relative z-10">
          {pinnedTabs.length > 0 && (
            <div className={`grid ${miniSidebar ? 'grid-cols-1' : 'grid-cols-4'} gap-2`}>
              {pinnedTabs.map(tab => (
                <TabItem key={tab.id} tab={tab} isActive={tab.id === activeTabId} isStormMode={isStormMode} onSelect={onSelectTab} onClose={onCloseTab} onToggleMute={onToggleMute} onTogglePin={onTogglePin} mini={miniSidebar} />
              ))}
            </div>
          )}

          <div className="space-y-6">
            {!miniSidebar && (
              <div className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  <Monitor size={12} /> <span>Workspaces</span>
                </div>
                <button onClick={onNewTab} className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-1.5 rounded-lg transition-all"><Plus size={14} /></button>
              </div>
            )}

            <div className="space-y-2">
              {groups.map(group => {
                const groupTabs = unpinnedTabs.filter(t => t.groupId === group.id);
                if (groupTabs.length === 0) return null;
                
                return (
                  <div key={group.id} className="space-y-1">
                    {!miniSidebar && (
                      <div onClick={() => onToggleGroupCollapse(group.id)} className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase cursor-pointer hover:bg-white/5 rounded-lg transition-colors group/header select-none">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ring-2 ring-opacity-20 ring-${group.color}`} style={{ backgroundColor: group.color }} />
                          <span className="text-white/40 group-hover/header:text-white transition-colors">{group.name}</span>
                        </div>
                        <ChevronDown size={12} className={`transition-transform duration-300 text-white/20 group-hover/header:text-white/60 ${group.isCollapsed ? '-rotate-90' : ''}`} />
                      </div>
                    )}
                    <div className={`${group.isCollapsed && !miniSidebar ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'} overflow-hidden transition-all duration-300 space-y-1`}>
                      {groupTabs.map(tab => <TabItem key={tab.id} tab={tab} isActive={tab.id === activeTabId} isStormMode={isStormMode} onSelect={onSelectTab} onClose={onCloseTab} onToggleMute={onToggleMute} onTogglePin={onTogglePin} mini={miniSidebar} />)}
                    </div>
                  </div>
                );
              })}
              
              <div className="mt-6 pt-4 border-t border-white/5">
                {!miniSidebar && <div className="px-2 mb-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Unsorted</div>}
                <div className="space-y-1">
                  {unpinnedTabs.filter(t => !t.groupId).map(tab => <TabItem key={tab.id} tab={tab} isActive={tab.id === activeTabId} isStormMode={isStormMode} onSelect={onSelectTab} onClose={onCloseTab} onToggleMute={onToggleMute} onTogglePin={onTogglePin} mini={miniSidebar} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
