
import React from 'react';
import { Sparkles, X, Settings as SettingsIcon, History as HistoryIcon, LayoutList, Download, User, CreditCard, Key, UserCheck, Activity, Database, BookMarked, Smartphone, Cloud, Building2, Puzzle, Layers, ShoppingBag, Wallet, Search } from 'lucide-react';
import { SidebarMode, SearchEngine, Tab, HistoryItem, DownloadItem, AutofillProfile, PaymentMethod, PasswordCredential, BrowserSettings, NotebookEntry, SiteStorageEntry, UserProfile, SyncConfig, ConnectedDevice, EnterprisePolicy, Extension, InstalledPWA, Collection, ShoppingProduct, WalletAccount } from '../types';
import HistoryManager from './HistoryManager';
import DownloadManager from './DownloadManager';
import RecentlyClosedManager from './RecentlyClosedManager';
import PasswordVaultManager from './PasswordVaultManager';
import PaymentManager from './PaymentManager';
import AutofillManager from './AutofillManager';
import NotebookManager from './NotebookManager';
import SiteDataManager from './SiteDataManager';
import TaskManager from './TaskManager';
import SettingsManager from './SettingsManager';
import ProfileManager from './ProfileManager';
import SyncManager from './SyncManager';
import DeviceManager from './DeviceManager';
import EnterpriseManager from './EnterpriseManager';
import ExtensionManager from './ExtensionManager';
import CollectionsManager from './CollectionsManager';
import ShoppingManager from './ShoppingManager';
import WalletManager from './WalletManager';
import SidebarSearch from './SidebarSearch';
import CortexChat from './CortexChat';

interface AISidebarProps {
  mode: SidebarMode;
  isStormMode: boolean;
  onClose: () => void;
  currentPageTitle: string;
  currentPageUrl: string;
  searchEngine: SearchEngine;
  onSetSearchEngine: (engine: SearchEngine) => void;
  closedTabs?: Tab[];
  onReopenTab?: (tab: Tab) => void;
  history?: HistoryItem[];
  downloads?: DownloadItem[];
  notebookEntries?: NotebookEntry[];
  onSetNotebookEntries?: (entries: NotebookEntry[]) => void;
  siteStorage?: SiteStorageEntry[];
  onClearSiteData?: (origin: string) => void;
  tabs?: Tab[];
  onCloseTab?: (id: string) => void;
  onNavigate: (url: string) => void;
  settings?: BrowserSettings;
  onToggleHttpsOnly: () => void;
  onTogglePhishing: () => void;
  onToggleBgThrottling: () => void;
  onTogglePreloading: () => void;
  onToggleDnsPrefetch: () => void;
  onToggleEfficiency: () => void;
  onToggleLazyLoading: () => void;
  onToggleBfCache: () => void;
  onToggleHwMedia: () => void;
  onToggleEnergySaver: () => void;
  onToggleWebRtc: () => void;
  onToggleHomeButton: () => void;
  onSetSleepThreshold: (v: number) => void;
  onSetDiscardThreshold: (v: number) => void;
  onClearData: () => void;
  onToggleMiniSidebar: () => void;
  onSetBackgroundImage: (url: string) => void;
  autofillProfiles?: AutofillProfile[];
  onSetAutofillProfiles?: (profiles: AutofillProfile[]) => void;
  paymentMethods?: PaymentMethod[];
  onSetPaymentMethods?: (methods: PaymentMethod[]) => void;
  passwords?: PasswordCredential[];
  onSetPasswords?: (passwords: PasswordCredential[]) => void;
  onPauseDownload?: (id: string) => void;
  onResumeDownload?: (id: string) => void;
  onCancelDownload?: (id: string) => void;
  onRemoveDownload?: (id: string) => void;
  userProfiles?: UserProfile[];
  onSwitchProfile: (id: string) => void;
  onAddProfile: () => void;
  onToggleBiometric: (id: string) => void;
  syncConfig?: SyncConfig;
  onToggleSync: (key: any) => void;
  onSyncNow: () => void;
  connectedDevices?: ConnectedDevice[];
  onSendTab: (deviceId: string) => void;
  onUnlinkDevice: (deviceId: string) => void;
  enterprisePolicies?: EnterprisePolicy[];
  extensions?: Extension[];
  installedApps?: InstalledPWA[];
  onToggleExtension: (id: string) => void;
  onRemoveExtension: (id: string) => void;
  onLoadUnpacked: () => void;
  onRemoveApp: (id: string) => void;
  collections?: Collection[];
  onCreateCollection: (name: string) => void;
  onAddToCollection: (collectionId: string, item: { title: string; url: string; favicon: string }) => void;
  onRemoveFromCollection: (collectionId: string, itemId: string) => void;
  onDeleteCollection: (collectionId: string) => void;
  shoppingProduct?: ShoppingProduct;
  walletAccount?: WalletAccount;
  onConnectWallet: () => void;
}

const AISidebar: React.FC<AISidebarProps> = (props) => {
    const { mode, isStormMode, onClose, currentPageTitle, currentPageUrl, onNavigate, ...rest } = props;

    const modeConfig = {
      [SidebarMode.Cortex]: { icon: <Sparkles size={20} />, title: "Local Cortex AI" },
      [SidebarMode.Search]: { icon: <Search size={20} />, title: "Quick Search" },
      [SidebarMode.Notebook]: { icon: <BookMarked size={20} />, title: "Notebook" },
      [SidebarMode.Settings]: { icon: <SettingsIcon size={20} />, title: "Settings" },
      [SidebarMode.History]: { icon: <HistoryIcon size={20} />, title: "History" },
      [SidebarMode.Downloads]: { icon: <Download size={20} />, title: "Downloads" },
      [SidebarMode.Passwords]: { icon: <Key size={20} />, title: "Password Vault" },
      [SidebarMode.Payments]: { icon: <CreditCard size={20} />, title: "Payments" },
      [SidebarMode.Autofill]: { icon: <UserCheck size={20} />, title: "Autofill" },
      [SidebarMode.SiteData]: { icon: <Database size={20} />, title: "Site Data" },
      [SidebarMode.Tasks]: { icon: <Activity size={20} />, title: "Task Manager" },
      [SidebarMode.Profiles]: { icon: <User size={20} />, title: "Profiles" },
      [SidebarMode.Sync]: { icon: <Cloud size={20} />, title: "Cloud Sync" },
      [SidebarMode.Devices]: { icon: <Smartphone size={20} />, title: "Connected Devices" },
      [SidebarMode.Enterprise]: { icon: <Building2 size={20} />, title: "Enterprise Policy" },
      [SidebarMode.Extensions]: { icon: <Puzzle size={20} />, title: "Extensions & Apps" },
      [SidebarMode.Collections]: { icon: <Layers size={20} />, title: "Collections" },
      [SidebarMode.Shopping]: { icon: <ShoppingBag size={20} />, title: "Shopping Assistant" },
      [SidebarMode.Wallet]: { icon: <Wallet size={20} />, title: "Web3 Wallet" },
      [SidebarMode.RecentlyClosed]: { icon: <LayoutList size={20} />, title: "Recently Closed" },
    };
    
    const config = modeConfig[mode];
    if (!config) return null;

    const renderContent = () => {
        switch (mode) {
            case SidebarMode.Cortex:
                return <CortexChat initialMessages={[]} />;
            case SidebarMode.Search:
                return <SidebarSearch engine={rest.searchEngine} onNavigate={onNavigate} />;
            case SidebarMode.Notebook:
                return <NotebookManager entries={rest.notebookEntries || []} onSetEntries={rest.onSetNotebookEntries!} onNavigate={onNavigate} />;
            case SidebarMode.History:
                return <HistoryManager history={rest.history || []} isStormMode={isStormMode} onNavigate={onNavigate} />;
            case SidebarMode.Downloads:
                return <DownloadManager downloads={rest.downloads || []} isStormMode={isStormMode} onPause={rest.onPauseDownload} onResume={rest.onResumeDownload} onCancel={rest.onCancelDownload} onRemove={rest.onRemoveDownload} />;
            case SidebarMode.Passwords:
                return <PasswordVaultManager passwords={rest.passwords || []} isStormMode={isStormMode} onSetPasswords={rest.onSetPasswords!} onNavigate={onNavigate} />;
            case SidebarMode.Payments:
                return <PaymentManager payments={rest.paymentMethods || []} onSetPayments={rest.onSetPaymentMethods!} />;
            case SidebarMode.Autofill:
                return <AutofillManager profiles={rest.autofillProfiles || []} onSetProfiles={rest.onSetAutofillProfiles!} />;
            case SidebarMode.SiteData:
                return <SiteDataManager storage={rest.siteStorage || []} onClearSiteData={rest.onClearSiteData!} />;
            case SidebarMode.Tasks:
                return <TaskManager tabs={rest.tabs || []} onCloseTab={rest.onCloseTab!} />;
            case SidebarMode.Settings:
                return <SettingsManager {...rest} settings={props.settings} onNavigate={onNavigate} />;
            case SidebarMode.Profiles:
                return <ProfileManager profiles={rest.userProfiles || []} onSwitchProfile={rest.onSwitchProfile} onAddProfile={rest.onAddProfile} onToggleBiometric={rest.onToggleBiometric} />;
            case SidebarMode.Sync:
                return <SyncManager config={rest.syncConfig!} onToggleSync={rest.onToggleSync} onSyncNow={rest.onSyncNow} />;
            case SidebarMode.Devices:
                return <DeviceManager devices={rest.connectedDevices || []} currentUrl={currentPageUrl} onSendTab={rest.onSendTab} onUnlinkDevice={rest.onUnlinkDevice} />;
            case SidebarMode.Enterprise:
                return <EnterpriseManager policies={rest.enterprisePolicies || []} />;
            case SidebarMode.Extensions:
                return <ExtensionManager extensions={rest.extensions || []} installedApps={rest.installedApps || []} onToggleExtension={rest.onToggleExtension} onRemoveExtension={rest.onRemoveExtension} onLoadUnpacked={rest.onLoadUnpacked} onRemoveApp={rest.onRemoveApp} />;
            case SidebarMode.Collections:
                const activeTab = props.tabs?.find(t => t.isActive);
                return <CollectionsManager collections={rest.collections || []} currentTitle={currentPageTitle} currentUrl={currentPageUrl} currentFavicon={activeTab?.favicon || 'globe'} onCreateCollection={rest.onCreateCollection} onAddToCollection={rest.onAddToCollection} onRemoveFromCollection={rest.onRemoveFromCollection} onDeleteCollection={rest.onDeleteCollection} onNavigate={onNavigate} />;
            case SidebarMode.Shopping:
                return <ShoppingManager product={rest.shoppingProduct} />;
            case SidebarMode.Wallet:
                return <WalletManager account={rest.walletAccount} onConnect={rest.onConnectWallet} />;
            default:
                return null;
        }
    };

    return (
        <aside className="w-96 h-full bg-black border-l border-white/5 flex flex-col shadow-2xl z-40 animate-in slide-in-from-right-8 duration-300">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0c0c0c]/80 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                        {config.icon}
                    </div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">{config.title}</h2>
                </div>
                <button onClick={onClose} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                    <X size={18} />
                </button>
            </div>
            {renderContent()}
        </aside>
    );
};

export default AISidebar;
