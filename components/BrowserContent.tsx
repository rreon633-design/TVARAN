import React from 'react';
import HomeScreen from './HomeScreen';
import PerformanceHub from './protocols/PerformanceHub';
import ExperimentalFlags from './protocols/ExperimentalFlags';
import ReaderModeView from './protocols/ReaderModeView';
import { BrowserSettings, Tab } from '../types';

interface BrowserContentProps {
  url: string;
  title: string;
  isStormMode: boolean;
  settings: BrowserSettings;
  tabs: Tab[];
  zoom: number;
  isSplit: boolean;
  isDeviceMode: boolean;
  deviceSize: { w: number, h: number };
  onNavigate: (newUrl: string) => void;
  onUpdateFlag?: (id: string) => void;
}

const ContentFrame: React.FC<BrowserContentProps> = ({ 
  url, title, isStormMode, settings, tabs, onNavigate, onUpdateFlag 
}) => {
  const isHome = url === 'tvaran://home';
  const isFlags = url === 'tvaran://flags';
  const isPerf = url === 'tvaran://performance';

  if (isHome) return <HomeScreen isStormMode={isStormMode} onNavigate={onNavigate} backgroundImage={settings.backgroundImage} />;
  if (isFlags) return <ExperimentalFlags settings={settings} onUpdateFlag={onUpdateFlag || (() => {})} onNavigate={onNavigate} />;
  if (isPerf) return <PerformanceHub tabs={tabs} settings={settings} onNavigate={onNavigate} />;
  
  return <ReaderModeView title={title} />;
};

const BrowserContent: React.FC<BrowserContentProps> = (props) => {
  const { zoom, isSplit, isDeviceMode, deviceSize } = props;

  const frameStyle = {
    transform: isDeviceMode ? 'scale(1)' : `scale(${zoom / 100})`,
    width: isDeviceMode ? `${deviceSize.w}px` : '100%',
    height: isDeviceMode ? `${deviceSize.h}px` : '100%'
  };

  const containerClass = `transition-transform duration-300 origin-top ${isDeviceMode ? 'border border-white/20 shadow-2xl overflow-hidden bg-black' : 'w-full h-full'}`;

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 relative overflow-hidden bg-black">
        <div className={`w-full h-full flex ${isDeviceMode ? 'items-center justify-center' : ''}`}>
           <div className={containerClass} style={frameStyle}>
             <ContentFrame {...props} />
           </div>
        </div>
      </div>
      
      {isSplit && (
        <div className="flex-1 relative overflow-hidden bg-black border-l border-white/10">
           <div className="absolute inset-0 flex flex-col">
              <div className="h-8 bg-black/40 border-b border-white/10 flex items-center px-4">
                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Split View Instance</div>
              </div>
              <div className="flex-1">
                 <ContentFrame {...props} url="tvaran://home" />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default BrowserContent;