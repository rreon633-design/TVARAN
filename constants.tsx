
import React from 'react';
import { 
  Settings, 
  Cpu, 
  BookMarked
} from 'lucide-react';
import { Tab, TabGroup } from './types';

export const COLORS = {
  black: '#050505',
  onyx: '#121212',
  gold: '#D4AF37',
  brightGold: '#FFD700',
  accent: '#D4AF37'
};

const now = Date.now();

export const INITIAL_GROUPS: TabGroup[] = [
  { id: 'g1', name: 'Development', color: '#D4AF37', isCollapsed: false, icon: 'code' },
  { id: 'g2', name: 'Social', color: '#B8860B', isCollapsed: false, icon: 'users' },
];

export const INITIAL_TABS: Tab[] = [
  // Fix: Added missing 'isDiscarded' property to match Tab interface
  { id: 'home', title: 'Dashboard', url: 'tvaran://home', favicon: 'layout', isActive: true, isSleeping: false, isDiscarded: false, lastActive: now },
  // Fix: Added missing 'isDiscarded' property to match Tab interface
  { id: '1', title: 'Tvaran Home', url: 'https://tvaran.io', favicon: 'zap', isActive: false, isSleeping: false, isDiscarded: false, lastActive: now },
  // Fix: Added missing 'isDiscarded' property to match Tab interface
  { id: '2', title: 'Gemini AI Hub', url: 'https://aistudio.google.com', favicon: 'sparkles', isActive: false, isSleeping: false, isDiscarded: false, groupId: 'g1', lastActive: now },
  // Fix: Added missing 'isDiscarded' property to match Tab interface
  { id: '3', title: 'GitHub - Tvaran/browser', url: 'https://github.com/tvaran', favicon: 'github', isActive: false, isSleeping: true, isDiscarded: false, groupId: 'g1', lastActive: now },
  // Fix: Added missing 'isDiscarded' property to match Tab interface
  { id: '4', title: 'Discord', url: 'https://discord.com', favicon: 'message-square', isActive: false, isSleeping: false, isDiscarded: false, groupId: 'g2', isPlaying: true, lastActive: now },
];

export const NAV_ITEMS = [
  { id: 'cortex', icon: <Cpu size={20} />, label: 'AI Cortex' },
  { id: 'notebook', icon: <BookMarked size={20} />, label: 'Notebook' },
  { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
];
