
import React from 'react';
import { Bookmark } from '../types';

interface BookmarkBarProps {
  bookmarks: Bookmark[];
  isStormMode: boolean;
  onNavigate: (url: string) => void;
}

const BookmarkBar: React.FC<BookmarkBarProps> = ({ bookmarks, isStormMode, onNavigate }) => {
  if (bookmarks.length === 0) return null;

  return (
    <div className={`px-4 py-1.5 flex items-center gap-4 text-xs ${isStormMode ? 'bg-indigo-950/20 text-indigo-300' : 'bg-slate-50 text-slate-500'} border-b ${isStormMode ? 'border-white/5' : 'border-slate-200'} overflow-x-auto no-scrollbar select-none`}>
      {bookmarks.map(b => (
        <button 
          key={b.id} 
          onClick={() => onNavigate(b.url)}
          className={`flex items-center gap-2 hover:text-indigo-600 transition-all whitespace-nowrap px-2 py-1 rounded-md ${isStormMode ? 'hover:bg-white/5' : 'hover:bg-white shadow-sm border border-transparent hover:border-slate-200'}`}
        >
          <span className="text-sm">{b.favicon}</span>
          <span className="max-w-[140px] truncate font-medium">{b.title}</span>
        </button>
      ))}
    </div>
  );
};

export default BookmarkBar;
