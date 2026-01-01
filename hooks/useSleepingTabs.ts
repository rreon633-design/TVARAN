
import { useEffect } from 'react';
import { Tab, BrowserSettings } from '../types';

export function useSleepingTabs(
  tabs: Tab[],
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>,
  activeTabId: string,
  settings: BrowserSettings,
  isStormMode: boolean
) {
  useEffect(() => {
    // Basic check for valid thresholds
    if (settings.sleepThreshold <= 0 && settings.discardThreshold <= 0) return;

    const interval = setInterval(() => {
      setTabs(prev => {
        let changed = false;
        const next = prev.map(tab => {
          // Never optimize the active tab
          if (tab.id === activeTabId) {
            return tab;
          }

          // Active playback protection
          if (tab.isPlaying && !tab.isMuted) {
            return tab;
          }

          const lastActive = tab.lastActive || Date.now();
          const idleTime = Date.now() - lastActive;

          // Stage 2: Discarding (Memory purge)
          if (settings.discardThreshold > 0 && idleTime > settings.discardThreshold && !tab.isDiscarded) {
            changed = true;
            return { ...tab, isSleeping: true, isDiscarded: true };
          }

          // Stage 1: Sleeping (CPU freeze)
          if (settings.sleepThreshold > 0 && idleTime > settings.sleepThreshold && !tab.isSleeping && !tab.isDiscarded) {
            changed = true;
            return { ...tab, isSleeping: true };
          }

          return tab;
        });

        return changed ? next : prev;
      });
    }, 15000); // Check cycle every 15 seconds

    return () => clearInterval(interval);
  }, [activeTabId, settings.sleepThreshold, settings.discardThreshold, setTabs, isStormMode]);
}
