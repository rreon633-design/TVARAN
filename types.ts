
export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string; 
  isActive: boolean;
  isSleeping: boolean;
  isDiscarded: boolean; 
  isPinned?: boolean;
  isMuted?: boolean;
  isPlaying?: boolean;
  groupId?: string;
  lastActive?: number; 
  thumbnail?: string; // Data URL or placeholder
  memoryUsage?: number;
  cpuUsage?: number;
}

export interface WebPanel {
  id: string;
  name: string;
  url: string;
  icon: string;
  isOpen: boolean;
}

export interface BrowserSettings {
  startupUrl: string;
  continueWhereLeftOff: boolean;
  sleepThreshold: number; 
  discardThreshold: number; 
  searchEngine: SearchEngine;
  spellcheckEnabled: boolean;
  httpsOnly: boolean;
  phishingProtection: boolean;
  sandboxIsolation: boolean;
  doNotTrack: boolean;
  trackingProtection: boolean;
  blockThirdPartyCookies: boolean;
  sameSiteStrict: boolean;
  popupBlocking: boolean;
  autoplayControl: AutoplayControl;
  blockMixedContent: boolean;
  breachAlerts: boolean;
  adBlocking: boolean;
  fingerprintingProtection: boolean;
  cookieConsentAuto: boolean;
  dohProvider: DohProvider;
  vpnEnabled: boolean;
  vpnLocation: VpnLocation;
  cspReporting: boolean;
  referrerPolicy: ReferrerPolicy;
  safeDownloadCheck: boolean;
  gpuCompositing: boolean;
  entropyReduction: boolean;
  backgroundThrottling: boolean;
  preloadingEnabled: boolean;
  dnsPrefetching: boolean;
  efficiencyMode: boolean;
  lazyLoading: boolean;
  bfCacheEnabled: boolean;
  hwMediaDecoding: boolean;
  energySaver: boolean;
  webrtcOptimized: boolean;
  // UI Customization
  showHomeButton: boolean;
  toolbarLayout: string[];
  experimentalFlags: ExperimentalFlag[];
  backgroundImage?: string;
  miniSidebar: boolean;
  autoHideSidebar: boolean;
  showTabPreviews: boolean;
}

export enum SidebarMode {
  None = 'NONE',
  Search = 'SEARCH',
  Cortex = 'CORTEX',
  Notebook = 'NOTEBOOK',
  Settings = 'SETTINGS',
  History = 'HISTORY',
  RecentlyClosed = 'RECENTLY_CLOSED',
  Downloads = 'DOWNLOADS',
  Passwords = 'PASSWORDS',
  Payments = 'PAYMENTS',
  Autofill = 'AUTOFILL',
  SiteData = 'SITE_DATA',
  Tasks = 'TASKS',
  Flags = 'FLAGS',
  Profiles = 'PROFILES',
  Sync = 'SYNC',
  Devices = 'DEVICES',
  Enterprise = 'ENTERPRISE',
  Extensions = 'EXTENSIONS',
  Collections = 'COLLECTIONS',
  Shopping = 'SHOPPING',
  Wallet = 'WALLET'
}

// Rest of existing types...
export interface TabGroup { id: string; name: string; color: string; isCollapsed: boolean; icon?: string; }
export interface Bookmark { id: string; title: string; url: string; favicon: string; }
export interface HistoryItem { id: string; title: string; url: string; favicon: string; timestamp: number; }
export interface DownloadItem { 
  id: string; 
  name: string; 
  size: string; 
  progress: number; 
  status: 'completed' | 'downloading' | 'failed' | 'scanning' | 'paused' | 'cancelled'; 
  reputation?: 'safe' | 'suspicious' | 'unknown'; 
  timestamp: number; 
}
export type SearchEngine = 'Google' | 'Bing' | 'DuckDuckGo' | 'Brave' | 'Ecosia';
export type AutoplayControl = 'allow' | 'block' | 'limit';
export type DohProvider = 'Off' | 'Cloudflare' | 'Google' | 'Quad9' | 'Custom';
export type VpnLocation = 'Auto' | 'US East' | 'US West' | 'London' | 'Tokyo' | 'Frankfurt';
export type ReferrerPolicy = 'no-referrer' | 'strict-origin-when-cross-origin' | 'same-origin';
export interface SiteStorageEntry { origin: string; cookies: number; localStorage: string; lastAccessed: number; }
export interface ExperimentalFlag { id: string; name: string; description: string; enabled: boolean; }
export type PermissionType = 'location' | 'camera' | 'microphone' | 'notifications' | 'clipboard' | 'usb' | 'serial' | 'midi';
export type PermissionState = 'prompt' | 'allow' | 'block';
export interface SitePermission { origin: string; permissions: Partial<Record<PermissionType, PermissionState>>; }
export interface NotebookEntry { id: string; text: string; pageTitle: string; pageUrl: string; timestamp: number; }
export interface PasswordCredential { id: string; site: string; username: string; password: string; lastUsed: number; isBreached?: boolean; }
export interface AutofillProfile { id: string; name: string; email: string; phone: string; address: string; city: string; country: string; }
export interface PaymentMethod { id: string; cardholderName: string; cardNumber: string; expiry: string; brand: 'Visa' | 'Mastercard' | 'Amex'; }

// Identity & Ecosystem
export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // URL or Initials
  type: 'personal' | 'work' | 'guest' | 'child';
  isActive: boolean;
  themeColor: string;
  biometricEnabled: boolean;
}

export interface SyncConfig {
  autofill: boolean;
  payments: boolean;
  history: boolean;
  passwords: boolean;
  bookmarks: boolean;
  extensions: boolean;
  openTabs: boolean;
  lastSynced: number;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  lastActive: number;
  isCurrent: boolean;
}

export interface EnterprisePolicy {
  id: string;
  name: string;
  value: string;
  level: 'mandatory' | 'recommended';
  source: 'platform' | 'cloud_policy';
  status: 'active' | 'error';
}

// Extensions & PWAs
export interface Extension {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string; // Lucide icon name or URL
  enabled: boolean;
  isDev: boolean; // Unpacked/Dev mode
  permissions: string[];
  accessLevel: 'site_access' | 'click_only' | 'all_urls';
}

export interface InstalledPWA {
  id: string;
  name: string;
  url: string;
  icon: string;
  installDate: number;
  notificationsEnabled: boolean;
}

// New Features
export interface Collection {
  id: string;
  name: string;
  items: CollectionItem[];
  color: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  url: string;
  favicon: string;
  addedAt: number;
}

export interface ShoppingProduct {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  currency: string;
  coupons: Coupon[];
  priceHistory: { date: string; price: number }[];
}

export interface Coupon {
  code: string;
  description: string;
  discount: string;
}

export interface WalletAccount {
  address: string;
  balance: number;
  currency: 'ETH' | 'SOL' | 'BTC';
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  toFrom: string;
  date: number;
  status: 'confirmed' | 'pending';
}
