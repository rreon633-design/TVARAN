
import { useState } from 'react';
import { Tab, TabGroup, SidebarMode } from '../../types';
import { INITIAL_TABS, INITIAL_GROUPS } from '../../constants';

export const useTabState = () => {
  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
  const [groups, setGroups] = useState<TabGroup[]>(INITIAL_GROUPS);
  const [activeTabId, setActiveTabId] = useState<string>(INITIAL_TABS[0].id);
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(SidebarMode.None);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [isStormMode, setIsStormMode] = useState(false);

  return {
    tabs, setTabs,
    groups, setGroups,
    activeTabId, setActiveTabId,
    sidebarMode, setSidebarMode,
    activePanelId, setActivePanelId,
    isCommandOpen, setIsCommandOpen,
    isSplitView, setIsSplitView,
    isStormMode, setIsStormMode
  };
};
