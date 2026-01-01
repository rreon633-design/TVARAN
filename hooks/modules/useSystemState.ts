
import { useState } from 'react';
import { BrowserSettings, UserProfile, SyncConfig, ConnectedDevice, EnterprisePolicy } from '../../types';

const INITIAL_FLAGS = [
  { id: 'smooth-scrolling', name: 'Smooth Scrolling', description: 'Enable buttery smooth animations.', enabled: true },
  { id: 'web-gpu', name: 'WebGPU Pipeline', description: 'Next-gen hardware acceleration.', enabled: false },
  { id: 'parabolic-cache', name: 'Parabolic BFCache', description: 'Aggressive history caching.', enabled: true },
];

export const useSystemState = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([
    { id: 'p1', name: 'Architect', avatar: '', type: 'personal', isActive: true, themeColor: '#D4AF37', biometricEnabled: true },
    { id: 'p2', name: 'Work', avatar: '', type: 'work', isActive: false, themeColor: '#4F46E5', biometricEnabled: true },
    { id: 'p3', name: 'Guest', avatar: '', type: 'guest', isActive: false, themeColor: '#10B981', biometricEnabled: false }
  ]);
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({
    autofill: true, payments: true, history: true, passwords: true, bookmarks: true, extensions: true, openTabs: true, lastSynced: Date.now()
  });
  const [devices, setDevices] = useState<ConnectedDevice[]>([
    { id: 'd1', name: 'Tvaran Desktop', type: 'desktop', os: 'macOS 15', lastActive: Date.now(), isCurrent: true },
    { id: 'd2', name: 'Pixel 8 Pro', type: 'mobile', os: 'Android 15', lastActive: Date.now() - 120000, isCurrent: false },
    { id: 'd3', name: 'iPad Pro', type: 'tablet', os: 'iPadOS 18', lastActive: Date.now() - 3600000, isCurrent: false }
  ]);
  const [policies, setPolicies] = useState<EnterprisePolicy[]>([
    { id: 'pol1', name: 'ExtensionInstallBlocklist', value: '["*"]', level: 'mandatory', source: 'platform', status: 'active' },
    { id: 'pol2', name: 'PasswordManagerEnabled', value: 'true', level: 'recommended', source: 'cloud_policy', status: 'active' }
  ]);
  
  const [settings, setSettings] = useState<BrowserSettings>({
    startupUrl: 'tvaran://home', continueWhereLeftOff: false, sleepThreshold: 300000, discardThreshold: 600000,
    searchEngine: 'Google', spellcheckEnabled: true, httpsOnly: true, phishingProtection: true,
    sandboxIsolation: true, doNotTrack: true, trackingProtection: true, blockThirdPartyCookies: true,
    sameSiteStrict: true, popupBlocking: true, autoplayControl: 'limit', blockMixedContent: true,
    breachAlerts: true, adBlocking: true, fingerprintingProtection: true, cookieConsentAuto: true,
    dohProvider: 'Cloudflare', vpnEnabled: false, vpnLocation: 'Auto', cspReporting: true,
    referrerPolicy: 'strict-origin-when-cross-origin', safeDownloadCheck: true, gpuCompositing: true,
    entropyReduction: true, backgroundThrottling: true, preloadingEnabled: true, dnsPrefetching: true,
    efficiencyMode: false, lazyLoading: true, bfCacheEnabled: true, hwMediaDecoding: true,
    energySaver: false, webrtcOptimized: true, showHomeButton: true,
    toolbarLayout: ['back', 'forward', 'reload', 'home'], experimentalFlags: INITIAL_FLAGS,
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    miniSidebar: false, autoHideSidebar: false, showTabPreviews: true
  });

  return {
    profiles, setProfiles,
    syncConfig, setSyncConfig,
    devices, setDevices,
    policies, setPolicies,
    settings, setSettings
  };
};
