
import { useState } from 'react';
import { Extension, InstalledPWA, Collection, ShoppingProduct, WalletAccount } from '../../types';

export const useFeatureState = () => {
  const [extensions, setExtensions] = useState<Extension[]>([
    { id: 'e1', name: 'UBlock Origin', version: '1.52.0', description: 'Finally, an efficient blocker. Easy on CPU and memory.', icon: 'shield', enabled: true, isDev: false, permissions: ['webRequest', 'storage', 'tabs'], accessLevel: 'all_urls' },
    { id: 'e2', name: 'React Developer Tools', version: '4.28.0', description: 'Adds React debugging tools to the Chrome Developer Tools.', icon: 'code', enabled: true, isDev: false, permissions: ['clipboardWrite'], accessLevel: 'site_access' },
    { id: 'e3', name: 'Tvaran Dev Kit', version: '0.1.0-alpha', description: 'Internal testing suite for browser APIs.', icon: 'box', enabled: false, isDev: true, permissions: ['activeTab', 'nativeMessaging'], accessLevel: 'click_only' }
  ]);
  
  const [installedApps, setInstalledApps] = useState<InstalledPWA[]>([
    { id: 'a1', name: 'YouTube', url: 'https://youtube.com', icon: 'youtube', installDate: Date.now() - 10000000, notificationsEnabled: true },
    { id: 'a2', name: 'Spotify', url: 'https://spotify.com', icon: 'music', installDate: Date.now() - 5000000, notificationsEnabled: false }
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    { id: 'c1', name: 'Read Later', color: '#D4AF37', items: [{ id: 'i1', title: 'Rust Programming', url: 'https://rust-lang.org', favicon: 'globe', addedAt: Date.now() }] },
    { id: 'c2', name: 'Work Research', color: '#4F46E5', items: [] }
  ]);

  const [shoppingProduct, setShoppingProduct] = useState<ShoppingProduct | undefined>(undefined);
  const [walletAccount, setWalletAccount] = useState<WalletAccount | undefined>(undefined);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  return {
    extensions, setExtensions,
    installedApps, setInstalledApps,
    collections, setCollections,
    shoppingProduct, setShoppingProduct,
    walletAccount, setWalletAccount,
    isDevToolsOpen, setIsDevToolsOpen
  };
};
