
import React, { useState } from 'react';
import { X, Smartphone, Zap, Layout } from 'lucide-react';
import ElementsPanel from './devtools/ElementsPanel';
import ConsolePanel from './devtools/ConsolePanel';
import NetworkPanel from './devtools/NetworkPanel';
import PerformancePanel from './devtools/PerformancePanel';
import ApplicationPanel from './devtools/ApplicationPanel';
import SecurityPanel from './devtools/SecurityPanel';
import LighthousePanel from './devtools/LighthousePanel';
import SourcesPanel from './devtools/SourcesPanel';
import RemoteDebugPanel from './devtools/RemoteDebugPanel';
import WebRTCPanel from './devtools/WebRTCPanel';

interface DevToolsProps {
  onClose: () => void;
  pageTitle: string;
  pageUrl: string;
  onToggleDeviceMode: () => void;
  isDeviceMode: boolean;
}

type Tab = 'Elements' | 'Console' | 'Sources' | 'Network' | 'Performance' | 'Application' | 'Security' | 'WebRTC' | 'Remote' | 'Lighthouse';

const DevTools: React.FC<DevToolsProps> = ({ onClose, pageTitle, pageUrl, onToggleDeviceMode, isDeviceMode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Elements');

  return (
    <div className="h-full flex flex-col bg-[#0c0c0c] border-t border-white/10">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-2 h-9 bg-[#1a1a1a] border-b border-white/10 select-none">
        <div className="flex items-center h-full overflow-x-auto no-scrollbar">
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded mr-2 flex-shrink-0">
            <X size={14} />
          </button>
          
          <button 
            onClick={onToggleDeviceMode}
            className={`p-1.5 rounded mr-2 transition-colors flex-shrink-0 ${isDeviceMode ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white/40 hover:text-white'}`}
            title="Toggle Device Toolbar (Ctrl+Shift+M)"
          >
            <Smartphone size={14} />
          </button>

          <div className="h-4 w-px bg-white/10 mx-2 flex-shrink-0" />

          {['Elements', 'Console', 'Sources', 'Network', 'Performance', 'Application', 'Security', 'WebRTC', 'Remote', 'Lighthouse'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-3 h-full text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-[#D4AF37] text-white' 
                  : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pr-2 pl-4 flex-shrink-0 bg-[#1a1a1a]">
           <button className="text-white/40 hover:text-white"><Zap size={12} /></button>
           <button className="text-white/40 hover:text-white"><Layout size={12} /></button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'Elements' && <ElementsPanel />}
        {activeTab === 'Console' && <ConsolePanel pageTitle={pageTitle} pageUrl={pageUrl} />}
        {activeTab === 'Sources' && <SourcesPanel />}
        {activeTab === 'Network' && <NetworkPanel />}
        {activeTab === 'Performance' && <PerformancePanel />}
        {activeTab === 'Application' && <ApplicationPanel />}
        {activeTab === 'Security' && <SecurityPanel />}
        {activeTab === 'WebRTC' && <WebRTCPanel />}
        {activeTab === 'Remote' && <RemoteDebugPanel />}
        {activeTab === 'Lighthouse' && <LighthousePanel />}
      </div>
    </div>
  );
};

export default DevTools;
