
import React, { useState } from 'react';
import { Search, Undo2, LayoutList } from 'lucide-react';
import { Tab } from '../types';

interface RecentlyClosedManagerProps {
  closedTabs: Tab[];
  isStormMode: boolean;
  onReopenTab: (tab: Tab) => void;
}

const RecentlyClosedManager: React.FC<RecentlyClosedManagerProps> = ({ closedTabs, isStormMode, onReopenTab }) => {
  const [search, setSearch] = useState('');

  const filteredClosed = closedTabs.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.url.toLowerCase().includes(search.toLowerCase())
  );

  const textSecondary = isStormMode ? 'text-indigo-400' : 'text-slate-500';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className={`p-4 border-b ${isStormMode ? 'border-indigo-900/50' : 'border-slate-200'}`}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isStormMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-500'} focus-within:ring-2 focus-within:ring-indigo-100 transition-all`}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search recently closed..."
            className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredClosed.length === 0 ? (
          <div className="py-12 text-center">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${isStormMode ? 'bg-gray-800 text-gray-600' : 'bg-slate-100 text-slate-300'}`}>
              <Undo2 size={24} />
            </div>
            <p className={`text-sm ${textSecondary}`}>No recently closed tabs</p>
          </div>
        ) : (
          filteredClosed.map((tab) => (
            <div 
              key={tab.id}
              className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all ${isStormMode ? 'bg-gray-800/50 border-transparent hover:border-indigo-500/50' : 'bg-white border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-lg flex-shrink-0">{tab.favicon}</span>
                <div className="flex flex-col overflow-hidden">
                  <span className={`text-sm font-bold truncate ${isStormMode ? 'text-gray-200' : 'text-slate-700'}`}>{tab.title}</span>
                  <span className={`text-[10px] truncate ${isStormMode ? 'text-gray-500' : 'text-slate-400'}`}>{tab.url}</span>
                </div>
              </div>
              <button 
                onClick={() => onReopenTab(tab)}
                className={`p-2 rounded-xl transition-all ${isStormMode ? 'hover:bg-indigo-600/20 text-indigo-400' : 'hover:bg-indigo-50 text-indigo-600'} opacity-0 group-hover:opacity-100`}
                title="Restore Tab"
              >
                <Undo2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentlyClosedManager;
