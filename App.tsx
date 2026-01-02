import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BrowserWindow from './components/BrowserWindow';
import AISidebar from './components/AISidebar';
import CommandPalette from './components/CommandPalette';
import StatusBar from './components/StatusBar';
import WebPanel from './components/WebPanel';
import { SidebarMode } from './types';
import { useAppLogic } from './hooks/useAppLogic';

const App: React.FC = () => {
  const { state, actions } = useAppLogic();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className={`flex h-screen overflow-hidden font-sans relative transition-colors duration-500 ${state.isStormMode ? 'bg-[#0a0514] text-purple-100' : 'bg-[#050505] text-[#F5F5F5]'}`}>
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        tabs={state.tabs} groups={state.groups} activeTabId={state.activeTabId} isStormMode={state.isStormMode}
        miniSidebar={state.settings.miniSidebar}
        webPanels={state.initialPanels}
        activePanelId={state.activePanelId}
        onTogglePanel={(id) => actions.setActivePanelId(prev => prev === id ? null : id)}
        onSelectTab={(id) => { 
          actions.setActiveTabId(id); 
          actions.setTabs(prev => prev.map(t => t.id === id ? {...t, isActive: true, isSleeping: false, isDiscarded: false} : {...t, isActive: false}));
          setIsMobileMenuOpen(false); // Close mobile menu on selection
        }} 
        onCloseTab={actions.handleCloseTab} 
        onNewTab={() => { actions.handleNewTab(); setIsMobileMenuOpen(false); }} 
        onNewGroup={actions.handleNewGroup}
        onOpenCommand={() => { actions.setIsCommandOpen(true); setIsMobileMenuOpen(false); }} 
        onToggleMute={(id) => actions.setTabs(p => p.map(t => t.id === id ? { ...t, isMuted: !t.isMuted } : t))}
        onTogglePin={(id) => actions.setTabs(p => p.map(t => t.id === id ? { ...t, isPinned: !t.isPinned } : t))} 
        onSetSidebarMode={(mode) => { actions.setSidebarMode(mode); setIsMobileMenuOpen(false); }} 
        onToggleGroupCollapse={(id) => actions.setGroups(p => p.map(g => g.id === id ? { ...g, isCollapsed: !g.isCollapsed } : g))}
        onReorderTabs={() => {}}
        isMobileOpen={isMobileMenuOpen}
      />

      <main className="flex-1 flex flex-row overflow-hidden border-r border-white/5 relative">
        <BrowserWindow 
          url={state.activeTab.url} title={state.activeTab.title} isSplit={state.isSplitView} isStormMode={state.isStormMode}
          searchEngine={state.settings.searchEngine} bookmarks={state.bookmarks} closedTabs={[]}
          canGoBack={true} canGoForward={false} 
          onToggleSplit={() => actions.setIsSplitView(!state.isSplitView)} 
          onNavigate={actions.handleNavigate}
          onNewTab={() => actions.handleNewTab()} onBack={() => {}} onForward={() => {}}
          onToggleBookmark={() => {}} onGoHome={() => actions.handleNavigate('tvaran://home')} onReopenTab={() => {}}
          passwords={state.passwords} onSavePassword={(p) => actions.setPasswords(prev => [...prev, p])}
          onSetSidebarMode={actions.setSidebarMode} settings={state.settings} tabs={state.tabs} sitePermissions={{}}
          onUpdatePermission={() => {}} 
          onSaveHighlight={actions.handleSaveHighlight} 
          onUpdateFlag={(id) => actions.setSettings(s => ({...s, experimentalFlags: s.experimentalFlags.map(f => f.id === id ? {...f, enabled: !f.enabled} : f)}))}
          onInstallApp={actions.handleInstallApp}
          devices={state.devices}
          onSendToDevice={(id) => alert(`Sent tab to device ${id}`)}
          
          isDevToolsOpen={state.isDevToolsOpen}
          onToggleDevTools={() => actions.setIsDevToolsOpen(!state.isDevToolsOpen)}
          isTranslationBarVisible={state.isTranslationBarVisible}
          onCloseTranslationBar={() => actions.setIsTranslationBarVisible(false)}
          
          isPrintPreviewOpen={state.isPrintPreviewOpen}
          onClosePrintPreview={() => actions.setIsPrintPreviewOpen(false)}
          onOpenPrint={() => actions.setIsPrintPreviewOpen(true)}
          
          isPDFViewerOpen={state.isPDFViewerOpen}
          onClosePDFViewer={() => actions.setIsPDFViewerOpen(false)}
          
          isFindBarOpen={state.isFindBarOpen}
          onCloseFindBar={() => actions.setIsFindBarOpen(false)}
          onOpenFind={() => actions.setIsFindBarOpen(true)}

          isPageInfoOpen={state.isPageInfoOpen}
          onTogglePageInfo={() => actions.setIsPageInfoOpen(!state.isPageInfoOpen)}
          
          // Mobile Handling
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        {state.activePanelId && (
          <WebPanel 
            panel={state.initialPanels.find(p => p.id === state.activePanelId)!} 
            onClose={() => actions.setActivePanelId(null)} 
          />
        )}
      </main>

      {state.sidebarMode !== SidebarMode.None && (
        <AISidebar 
          mode={state.sidebarMode} isStormMode={state.isStormMode} onClose={() => actions.setSidebarMode(SidebarMode.None)}
          currentPageTitle={state.activeTab.title} currentPageUrl={state.activeTab.url} searchEngine={state.settings.searchEngine} 
          onSetSearchEngine={(e) => actions.setSettings(s => ({...s, searchEngine: e}))}
          history={state.history} downloads={state.downloads} onNavigate={actions.handleNavigate} 
          notebookEntries={state.notebookEntries} onSetNotebookEntries={actions.setNotebookEntries}
          siteStorage={state.siteStorage} tabs={state.tabs} onCloseTab={actions.handleCloseTab} settings={state.settings}
          onToggleHttpsOnly={() => actions.setSettings(s => ({...s, httpsOnly: !s.httpsOnly}))}
          onTogglePhishing={() => actions.setSettings(s => ({...s, phishingProtection: !s.phishingProtection}))}
          onToggleBgThrottling={() => actions.setSettings(s => ({...s, backgroundThrottling: !s.backgroundThrottling}))}
          onTogglePreloading={() => actions.setSettings(s => ({...s, preloadingEnabled: !s.preloadingEnabled}))}
          onToggleDnsPrefetch={() => actions.setSettings(s => ({...s, dnsPrefetching: !s.dnsPrefetching}))}
          onToggleEfficiency={() => actions.setSettings(s => ({...s, efficiencyMode: !s.efficiencyMode}))}
          onToggleLazyLoading={() => actions.setSettings(s => ({...s, lazyLoading: !s.lazyLoading}))}
          onToggleBfCache={() => actions.setSettings(s => ({...s, bfCacheEnabled: !s.bfCacheEnabled}))}
          onToggleHwMedia={() => actions.setSettings(s => ({...s, hwMediaDecoding: !s.hwMediaDecoding}))}
          onToggleEnergySaver={() => actions.setSettings(s => ({...s, energySaver: !s.energySaver}))}
          onToggleWebRtc={() => actions.setSettings(s => ({...s, webrtcOptimized: !s.webrtcOptimized}))}
          onToggleHomeButton={() => actions.setSettings(s => ({...s, showHomeButton: !s.showHomeButton}))}
          onSetSleepThreshold={(v) => actions.setSettings(s => ({...s, sleepThreshold: v}))}
          onSetDiscardThreshold={(v) => actions.setSettings(s => ({...s, discardThreshold: v}))}
          onClearData={() => { actions.setHistory([]); actions.setDownloads([]); actions.setNotebookEntries([]); }}
          onToggleMiniSidebar={() => actions.setSettings(s => ({...s, miniSidebar: !s.miniSidebar}))}
          onSetBackgroundImage={(url) => actions.setSettings(s => ({...s, backgroundImage: url}))}
          autofillProfiles={state.autofillProfiles} onSetAutofillProfiles={actions.setAutofillProfiles}
          paymentMethods={state.paymentMethods} onSetPaymentMethods={actions.setPaymentMethods}
          passwords={state.passwords} onSetPasswords={actions.setPasswords}
          
          userProfiles={state.profiles}
          onSwitchProfile={actions.handleSwitchProfile}
          onAddProfile={() => {}}
          onToggleBiometric={(id) => actions.setProfiles(p => p.map(u => u.id === id ? {...u, biometricEnabled: !u.biometricEnabled} : u))}
          syncConfig={state.syncConfig}
          onToggleSync={(key) => actions.setSyncConfig(c => ({...c, [key]: !c[key]}))}
          onSyncNow={() => actions.setSyncConfig(c => ({...c, lastSynced: Date.now()}))}
          connectedDevices={state.devices}
          onSendTab={() => {}}
          onUnlinkDevice={(id) => actions.setDevices(d => d.filter(x => x.id !== id))}
          enterprisePolicies={state.policies}
          
          extensions={state.extensions}
          installedApps={state.installedApps}
          onToggleExtension={(id) => actions.setExtensions(prev => prev.map(e => e.id === id ? {...e, enabled: !e.enabled} : e))}
          onRemoveExtension={(id) => actions.setExtensions(prev => prev.filter(e => e.id !== id))}
          onLoadUnpacked={() => alert('Opening System Dialog to load unpacked extension...')}
          onRemoveApp={(id) => actions.setInstalledApps(prev => prev.filter(a => a.id !== id))}

          collections={state.collections}
          onCreateCollection={actions.handleCreateCollection}
          onAddToCollection={actions.handleAddToCollection}
          onRemoveFromCollection={actions.handleRemoveFromCollection}
          onDeleteCollection={actions.handleDeleteCollection}

          shoppingProduct={state.shoppingProduct}

          walletAccount={state.walletAccount}
          onConnectWallet={actions.handleConnectWallet}
        />
      )}

      {state.isCommandOpen && <CommandPalette isStormMode={state.isStormMode} tabs={state.tabs} bookmarks={state.bookmarks} onClose={() => actions.setIsCommandOpen(false)} onAction={actions.handleCommandAction} />}
      <StatusBar isUpdating={false} energySaver={state.settings.energySaver} isStormMode={state.isStormMode} tabs={state.tabs} version="V1.2.0-STORM" />
    </div>
  );
};

export default App;