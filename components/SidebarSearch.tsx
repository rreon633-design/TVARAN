
import React, { useState } from 'react';
import { Search, ArrowRight, X, ExternalLink } from 'lucide-react';
import { SearchEngine } from '../types';

interface SidebarSearchProps {
  engine: SearchEngine;
  onNavigate: (url: string) => void;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ engine, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{title: string, desc: string, url: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Mock Search Results
    setTimeout(() => {
      setResults([
        { title: `${query} - Wikipedia`, desc: `Information about ${query} from the free encyclopedia.`, url: `https://en.wikipedia.org/wiki/${query}` },
        { title: `${query} | Official Site`, desc: `The official source for ${query}. Latest news and updates.`, url: `https://example.com/${query}` },
        { title: `Latest news on ${query}`, desc: `Breaking news and top stories regarding ${query}.`, url: `https://news.google.com/search?q=${query}` },
        { title: `Images for ${query}`, desc: `View high resolution images.`, url: `https://google.com/images?q=${query}` },
      ]);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold clash text-white">Quick Search</h2>
          <Search size={20} className="text-[#D4AF37]" />
        </div>
        
        <form onSubmit={handleSearch} className="relative">
           <input 
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D4AF37] outline-none pr-10"
             placeholder={`Search ${engine}...`}
             autoFocus
           />
           <button type="submit" className="absolute right-3 top-3 text-white/40 hover:text-[#D4AF37]">
              <ArrowRight size={16} />
           </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
         {isSearching ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
               <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
               <p className="text-xs text-white/40 uppercase tracking-widest">Scanning Web...</p>
            </div>
         ) : results.length > 0 ? (
            results.map((res, i) => (
               <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-[#D4AF37]/20 group transition-all cursor-pointer" onClick={() => onNavigate(res.url)}>
                  <h3 className="text-sm font-bold text-[#D4AF37] mb-1 group-hover:underline decoration-1 underline-offset-2">{res.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-2">{res.desc}</p>
                  <div className="flex items-center gap-1 text-[9px] text-white/20">
                     <ExternalLink size={8} /> {new URL(res.url).hostname}
                  </div>
               </div>
            ))
         ) : (
            <div className="text-center py-20 text-white/20 text-xs">
               Enter a query to search via {engine} side panel.
            </div>
         )}
      </div>
    </div>
  );
};

export default SidebarSearch;
