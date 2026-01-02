import { useCallback, useEffect } from 'react';
import { Tab, SidebarMode, WebPanel as WebPanelType, NotebookEntry, InstalledPWA } from '../types';
import { INITIAL_TABS } from '../constants';
import { useSleepingTabs } from './useSleepingTabs';
import { useTabState } from './modules/useTabState';
import { useDataState } from './modules/useDataState';
import { useSystemState } from './modules/useSystemState';
import { useFeatureState } from './modules/useFeatureState';

const INITIAL_PANELS: WebPanelType[] = [
  { id: 'ai', name: 'Cortex AI', url: 'https://aistudio.google.com', icon: 'sparkles', isOpen: false },
  { id: 'wa', name: 'Messages', url: 'https://web.whatsapp.com', icon: 'message-square', isOpen: false },
  { id: 'cal', name: 'Calendar', url: 'https://calendar.google.com', icon: 'calendar', isOpen: false },
  { id: 'meet', name: 'Meet', url: 'https://meet.google.com', icon: 'video', isOpen: false },
  { id: 'drive', name: 'Drive', url: 'https://drive.google.com', icon: 'cloud', isOpen: false },
];

export const useAppLogic = () => {
  // Use Sub-Modules for State
  const tabState = useTabState();
  const dataState = useDataState();
  const systemState = useSystemState();
  const featureState = useFeatureState();

  // Sleeping Tabs Logic
  useSleepingTabs(
    tabState.tabs, 
    tabState.setTabs, 
    tabState.activeTabId, 
    systemState.settings, 
    tabState.isStormMode
  );

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') {
        e.preventDefault();
        featureState.setIsDevToolsOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        featureState.setIsPrintPreviewOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        featureState.setIsFindBarOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [featureState.setIsDevToolsOpen, featureState.setIsPrintPreviewOpen, featureState.setIsFindBarOpen]);

  // --- Actions ---

  const handleNavigate = useCallback((url: string) => {
    if (url.startsWith('mailto:')) {
      window.alert(`System Handler: Opening default mail client for ${url}`);
      return;
    }
    
    // PDF Detection
    if (url.endsWith('.pdf')) {
       featureState.setIsPDFViewerOpen(true);
       return;
    }

    // Shopping Detection Mock
    if (url.includes('amazon') || url.includes('shop') || url.includes('product')) {
      featureState.setShoppingProduct({
        id: 'p1',
        name: 'Quantum Noise Cancelling Headphones',
        currentPrice: 249.99,
        originalPrice: 349.99,
        currency: 'USD',
        coupons: [{ code: 'SAVE20', description: '20% off electronics', discount: '20%' }],
        priceHistory: [
          { date: '2023-10-01', price: 349.99 },
          { date: '2023-10-15', price: 299.99 },
          { date: '2023-11-01', price: 249.99 },
        ]
      });
    } else {
      featureState.setShoppingProduct(undefined);
    }

    tabState.setTabs(prev => prev.map(t => t.id === tabState.activeTabId ? { 
      ...t, 
      url, 
      title: url === 'tvaran://home' ? 'Dashboard' : url.split('//')[1] || url,
      isSleeping: false, 
      isDiscarded: false,
      lastActive: Date.now()
    } : t));
    
    if (url !== 'tvaran://home') {
       dataState.setHistory(prev => [{
         id: Math.random().toString(36),
         title: url,
         url,
         favicon: 'globe',
         timestamp: Date.now()
       }, ...prev].slice(0, 100));
    }
  }, [tabState.activeTabId, tabState.setTabs, dataState.setHistory, featureState.setShoppingProduct]);

  const handleNewTab = useCallback((url: string = 'tvaran://home') => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTab: Tab = {
      id: newId,
      title: 'New Tab',
      url,
      favicon: 'zap',
      isActive: true,
      isSleeping: false,
      isDiscarded: false,
      lastActive: Date.now()
    };
    tabState.setTabs(prev => prev.map(t => ({ ...t, isActive: false })).concat(newTab));
    tabState.setActiveTabId(newId);
  }, [tabState.setTabs, tabState.setActiveTabId]);

  const handleNewGroup = useCallback(() => {
    const newGroup = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Workspace',
      color: '#60A5FA', // Default Blue-ish
      isCollapsed: false,
      icon: 'folder'
    };
    tabState.setGroups(prev => [...prev, newGroup]);
  }, [tabState.setGroups]);

  const handleCloseTab = useCallback((id: string) => {
    tabState.setTabs(prev => {
      if (prev.length === 1) return prev;
      const filtered = prev.filter(t => t.id !== id);
      if (id === tabState.activeTabId) {
        tabState.setActiveTabId(filtered[filtered.length - 1].id);
        filtered[filtered.length - 1].isActive = true;
      }
      return filtered;
    });
  }, [tabState.activeTabId, tabState.setTabs, tabState.setActiveTabId]);

  const handleCommandAction = (action: string) => {
    if (action.startsWith('goto-tab-')) {
      const tabId = action.replace('goto-tab-', '');
      tabState.setActiveTabId(tabId);
      tabState.setTabs(prev => prev.map(t => ({ ...t, isActive: t.id === tabId })));
    } else {
      switch (action) {
        case 'new-tab': handleNewTab(); break;
        case 'new-group': handleNewGroup(); break;
        case 'summarize': tabState.setSidebarMode(SidebarMode.Cortex); break;
        case 'translate': featureState.setIsTranslationBarVisible(true); break;
        case 'print': featureState.setIsPrintPreviewOpen(true); break;
        case 'find': featureState.setIsFindBarOpen(true); break;
        case 'passwords': tabState.setSidebarMode(SidebarMode.Passwords); break;
        case 'history': tabState.setSidebarMode(SidebarMode.History); break;
        case 'downloads': tabState.setSidebarMode(SidebarMode.Downloads); break;
        case 'settings': tabState.setSidebarMode(SidebarMode.Settings); break;
        case 'incognito': tabState.setIsStormMode(!tabState.isStormMode); break;
        case 'fullscreen': document.documentElement.requestFullscreen(); break;
        case 'profiles': tabState.setSidebarMode(SidebarMode.Profiles); break;
        case 'sync': tabState.setSidebarMode(SidebarMode.Sync); break;
        case 'devices': tabState.setSidebarMode(SidebarMode.Devices); break;
        case 'extensions': tabState.setSidebarMode(SidebarMode.Extensions); break;
        default: console.log('Command Action:', action);
      }
    }
  };

  const handleSaveHighlight = (text: string, title: string, url: string) => {
    const newEntry: NotebookEntry = {
      id: Math.random().toString(36),
      text,
      pageTitle: title,
      pageUrl: url,
      timestamp: Date.now()
    };
    dataState.setNotebookEntries(prev => [newEntry, ...prev]);
    tabState.setSidebarMode(SidebarMode.Notebook);
  };

  const handleSwitchProfile = (id: string) => {
    systemState.setProfiles(prev => prev.map(p => ({ ...p, isActive: p.id === id })));
    tabState.setTabs([INITIAL_TABS[0]]);
    handleNavigate('tvaran://home');
  };

  const handleInstallApp = (name: string, url: string) => {
    const newApp: InstalledPWA = {
      id: Math.random().toString(36),
      name: name.split(' - ')[0] || 'New App',
      url,
      icon: 'box',
      installDate: Date.now(),
      notificationsEnabled: true
    };
    featureState.setInstalledApps(prev => [newApp, ...prev]);
    tabState.setSidebarMode(SidebarMode.Extensions);
    alert(`Installed ${newApp.name} as an App.`);
  };

  const handleCreateCollection = (name: string) => {
    featureState.setCollections(prev => [...prev, { id: Math.random().toString(36), name, color: '#D4AF37', items: [] }]);
  };
  
  const handleAddToCollection = (colId: string, item: {title: string, url: string, favicon: string}) => {
    featureState.setCollections(prev => prev.map(c => c.id === colId ? { ...c, items: [...c.items, { id: Math.random().toString(36), ...item, addedAt: Date.now() }] } : c));
  };

  const handleRemoveFromCollection = (colId: string, itemId: string) => {
    featureState.setCollections(prev => prev.map(c => c.id === colId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c));
  };
  
  const handleDeleteCollection = (colId: string) => {
    featureState.setCollections(prev => prev.filter(c => c.id !== colId));
  };

  const handleConnectWallet = () => {
    featureState.setWalletAccount({
      address: '0x71C7...9A21',
      balance: 14.52,
      currency: 'ETH',
      transactions: [
        { id: 'tx1', type: 'receive', amount: 2.5, toFrom: '0x123...abc', date: Date.now() - 10000000, status: 'confirmed' },
        { id: 'tx2', type: 'send', amount: 0.1, toFrom: '0xabc...123', date: Date.now() - 5000000, status: 'confirmed' }
      ]
    });
  };

  const activeTab = tabState.tabs.find(t => t.id === tabState.activeTabId) || tabState.tabs[0];
  const initialPanels = INITIAL_PANELS;

  return {
    state: {
      // Composition
      ...tabState,
      ...dataState,
      ...systemState,
      ...featureState,
      activeTab,
      initialPanels
    },
    actions: {
      ...tabState,
      ...dataState,
      ...systemState,
      ...featureState,
      handleNavigate,
      handleNewTab,
      handleNewGroup,
      handleCloseTab,
      handleCommandAction,
      handleSaveHighlight,
      handleSwitchProfile,
      handleInstallApp,
      handleCreateCollection,
      handleAddToCollection,
      handleRemoveFromCollection,
      handleDeleteCollection,
      handleConnectWallet
    }
  };
};