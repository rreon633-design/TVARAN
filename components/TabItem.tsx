
import React, { useState } from 'react';
import { X, Volume2, VolumeX, Pin, GripVertical, Wind, Snowflake, AlertCircle } from 'lucide-react';
import { Tab } from '../types';
import IconRenderer from './IconRenderer';
import TabPreview from './TabPreview';

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  isStormMode: boolean;
  mini?: boolean;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onToggleMute: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, mini, onSelect, onClose, onToggleMute, onTogglePin }) => {
  const [showPreview, setShowPreview] = useState(false);
  const isSleeping = tab.isSleeping && !tab.isDiscarded;
  const isDiscarded = tab.isDiscarded;

  const handleMouseEnter = () => !isActive && setShowPreview(true);
  const handleMouseLeave = () => setShowPreview(false);

  if (tab.isPinned) {
    return (
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          onClick={() => onSelect(tab.id)}
          className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 relative group
            ${isActive 
              ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] scale-105' 
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:scale-105 border border-transparent hover:border-white/10'}
            ${isDiscarded ? 'opacity-40 grayscale' : isSleeping ? 'opacity-70' : ''}`}
        >
          <IconRenderer name={tab.favicon} size={20} />
          {tab.isPlaying && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center border-2 border-[#0c0c0c] z-10 animate-pulse">
              <Volume2 size={8} className="text-black" />
            </div>
          )}
        </div>
        {showPreview && <TabPreview tab={tab} position="right" />}
      </div>
    );
  }

  return (
    <div className="relative px-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        onClick={() => onSelect(tab.id)}
        className={`group flex items-center gap-3 ${mini ? 'justify-center p-3' : 'px-3 py-3'} rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden mb-1
          ${isActive 
            ? 'bg-[#D4AF37]/10 text-[#D4AF37] shadow-[inset_0_0_0_1px_rgba(212,175,55,0.2)]' 
            : 'hover:bg-white/5 text-white/50 hover:text-white border border-transparent hover:border-white/5'}
          ${isDiscarded ? 'opacity-40' : isSleeping ? 'opacity-60' : ''}`}
      >
        {!mini && isActive && (
          <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
        )}
        
        <div className={`flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : isDiscarded ? 'text-white/20' : 'text-white/40 group-hover:text-white'} transition-colors`}>
          <IconRenderer name={tab.favicon} size={mini ? 20 : 16} />
        </div>
        
        {!mini && (
          <>
            <div className="flex flex-col overflow-hidden flex-1">
              <span className={`truncate text-[13px] font-medium leading-tight ${isActive ? 'text-white' : ''}`}>{tab.title}</span>
              {isDiscarded && <span className="text-[9px] uppercase tracking-wider text-white/20 mt-0.5 flex items-center gap-1"><Wind size={8}/> Discarded</span>}
              {isSleeping && !isDiscarded && <span className="text-[9px] uppercase tracking-wider text-blue-300/40 mt-0.5 flex items-center gap-1"><Snowflake size={8}/> Sleeping</span>}
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onTogglePin(tab.id); }} 
                className="p-1.5 hover:bg-white/10 rounded-md hover:text-[#D4AF37]"
                title="Pin Tab"
              >
                <Pin size={12} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(tab.id); }} 
                className="p-1.5 hover:bg-red-500/20 rounded-md hover:text-red-400"
                title="Close Tab"
              >
                <X size={12} />
              </button>
            </div>
          </>
        )}
      </div>
      {showPreview && <TabPreview tab={tab} position={mini ? 'right' : 'left'} />}
    </div>
  );
};

export default TabItem;
