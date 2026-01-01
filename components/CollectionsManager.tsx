
import React, { useState } from 'react';
import { Layers, Plus, FolderOpen, ExternalLink, Trash2, Globe, BookmarkPlus } from 'lucide-react';
import { Collection } from '../types';

interface CollectionsManagerProps {
  collections: Collection[];
  currentTitle: string;
  currentUrl: string;
  currentFavicon: string;
  onCreateCollection: (name: string) => void;
  onAddToCollection: (collectionId: string, item: { title: string; url: string; favicon: string }) => void;
  onRemoveFromCollection: (collectionId: string, itemId: string) => void;
  onDeleteCollection: (collectionId: string) => void;
  onNavigate: (url: string) => void;
}

const CollectionsManager: React.FC<CollectionsManagerProps> = ({ 
  collections, currentTitle, currentUrl, currentFavicon,
  onCreateCollection, onAddToCollection, onRemoveFromCollection, onDeleteCollection, onNavigate 
}) => {
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (newCollectionName.trim()) {
      onCreateCollection(newCollectionName);
      setNewCollectionName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
             <h2 className="text-xl font-bold clash text-white">Collections</h2>
             <Layers size={20} className="text-[#D4AF37]" />
           </div>
           <button 
             onClick={() => setIsCreating(true)}
             className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 text-[#D4AF37] transition-all"
           >
             <Plus size={16} />
           </button>
        </div>
        
        {isCreating && (
          <div className="mb-4 animate-in slide-in-from-top-2">
            <input 
              type="text" 
              placeholder="Collection Name..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] outline-none"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {collections.map(collection => (
          <div key={collection.id} className="space-y-3">
            <div className="flex items-center justify-between group">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderOpen size={14} className="text-[#D4AF37]" />
                {collection.name}
              </h3>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onAddToCollection(collection.id, { title: currentTitle, url: currentUrl, favicon: currentFavicon })}
                  className="p-1.5 text-white/40 hover:text-[#D4AF37]" 
                  title="Add Current Tab"
                >
                  <BookmarkPlus size={14} />
                </button>
                <button 
                  onClick={() => onDeleteCollection(collection.id)}
                  className="p-1.5 text-white/40 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {collection.items.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-white/10 text-center">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">Empty Collection</span>
                </div>
              ) : (
                collection.items.map(item => (
                  <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-3 overflow-hidden" onClick={() => onNavigate(item.url)}>
                      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white/20 flex-shrink-0">
                         {item.favicon === 'globe' ? <Globe size={14} /> : <span className="text-xs">{item.favicon}</span>}
                      </div>
                      <div className="truncate cursor-pointer">
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[9px] text-white/40 truncate">{new URL(item.url).hostname}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                       <button onClick={() => onNavigate(item.url)} className="p-1.5 text-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={12} />
                       </button>
                       <button onClick={() => onRemoveFromCollection(collection.id, item.id)} className="p-1.5 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={12} />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsManager;
