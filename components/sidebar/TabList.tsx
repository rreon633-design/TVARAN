import React from 'react';
import { Monitor, Plus, FolderPlus, ChevronDown } from 'lucide-react';
import { Tab, TabGroup } from '../../types';
import TabItem from '../TabItem';

interface TabListProps {
  pinnedTabs: Tab[];
  groups: TabGroup[];
  unpinnedTabs: Tab[];
  activeTabId: string;
  isStormMode: boolean;
  miniSidebar: boolean;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onToggleMute: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleGroupCollapse: (id: string) => void;
  onNewTab: () => void;
  onNewGroup: () => void;
}

const TabList: React.FC<TabListProps> = ({
  pinnedTabs, groups, unpinnedTabs, activeTabId, isStormMode, miniSidebar,
  onSelectTab, onCloseTab, onToggleMute, onTogglePin, onToggleGroupCollapse, onNewTab, onNewGroup
}) => {
  return (
    <div className="space-y-6">
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
            <div className="flex gap-1">
              <button onClick={onNewGroup} className="text-white/40 hover:text-[#D4AF37] hover:bg-white/5 p-1.5 rounded-lg transition-all" title="New Group"><FolderPlus size={14} /></button>
              <button onClick={onNewTab} className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-1.5 rounded-lg transition-all" title="New Tab"><Plus size={14} /></button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {groups.map(group => {
            const groupTabs = unpinnedTabs.filter(t => t.groupId === group.id);
            if (groupTabs.length === 0 && !group.name) return null;
            
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
                  {groupTabs.length > 0 ? (
                    groupTabs.map(tab => <TabItem key={tab.id} tab={tab} isActive={tab.id === activeTabId} isStormMode={isStormMode} onSelect={onSelectTab} onClose={onCloseTab} onToggleMute={onToggleMute} onTogglePin={onTogglePin} mini={miniSidebar} />)
                  ) : (
                    <div className="px-4 py-2 text-[9px] text-white/20 italic ml-4 border-l border-white/5">Empty Workspace</div>
                  )}
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
  );
};

export default TabList;