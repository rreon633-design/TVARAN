
import React, { useState } from 'react';
import { Folder, FileCode, Play, Pause, ChevronRight, ToggleRight, ToggleLeft } from 'lucide-react';

const SourcesPanel: React.FC = () => {
  const [sourceMapEnabled, setSourceMapEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const code = `import { useState } from 'react';

// Tvaran Core Component
function BrowserShell() {
  const [state, setState] = useState('idle');

  // Initialize Storm Engine
  const init = async () => {
    console.log('Booting Onyx...');
    await loadWasmModule('onyx_core.wasm');
    setState('ready');
  };

  return (
    <div className="shell">
      <h1>Tvaran</h1>
    </div>
  );
}`;

  return (
    <div className="flex h-full">
      {/* File Tree */}
      <div className="w-48 bg-black/20 border-r border-white/10 p-2 text-xs font-mono text-white/60">
        <div className="flex items-center gap-1 mb-2 text-white/40 font-bold uppercase tracking-widest px-2">Page</div>
        <div className="pl-2">
          <div className="flex items-center gap-1 hover:text-white cursor-pointer mb-1"><Folder size={12} className="text-[#D4AF37]" /> top</div>
          <div className="pl-4">
             <div className="flex items-center gap-1 hover:text-white cursor-pointer mb-1"><Folder size={12} className="text-blue-400" /> static</div>
             <div className="pl-4">
                <div className="flex items-center gap-1 hover:text-white cursor-pointer text-[#D4AF37] bg-white/5 rounded px-1 -ml-1"><FileCode size={12} /> main.js</div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer"><FileCode size={12} /> styles.css</div>
             </div>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-8 border-b border-white/10 flex items-center justify-between px-2 bg-white/5">
           <div className="text-xs text-white/60 flex items-center gap-2">
              <span className="text-[#D4AF37]">main.js</span>
              {sourceMapEnabled && <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1 rounded border border-emerald-500/20">Source Map Detected</span>}
           </div>
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`p-1 rounded hover:bg-white/10 ${isPaused ? 'text-blue-400' : 'text-white/40'}`}
                title={isPaused ? "Resume script execution" : "Pause script execution"}
              >
                 {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <button 
                onClick={() => setSourceMapEnabled(!sourceMapEnabled)}
                className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white"
                title="Toggle Source Maps"
              >
                 {sourceMapEnabled ? <ToggleRight size={16} className="text-[#D4AF37]" /> : <ToggleLeft size={16} />}
                 <span>Maps</span>
              </button>
           </div>
        </div>
        <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-[#0c0c0c] text-blue-100">
           <pre>{code.split('\n').map((line, i) => (
              <div key={i} className="flex group">
                 <span className="w-8 text-right pr-3 text-white/20 select-none group-hover:text-white/40 border-r border-transparent group-hover:border-white/10">{i + 1}</span>
                 <span className="pl-4">{line}</span>
              </div>
           ))}</pre>
        </div>
      </div>
      
      {/* Debug Sidebar */}
      <div className="w-48 border-l border-white/10 bg-black/20 p-2 text-xs">
         <div className="mb-4">
            <div className="flex items-center justify-between bg-white/5 px-2 py-1 rounded text-white/60 mb-1 cursor-pointer">
               <span>Watch</span> <ChevronRight size={12} />
            </div>
            <div className="px-2 text-white/40 italic">No watch expressions</div>
         </div>
         <div className="mb-4">
            <div className="flex items-center justify-between bg-white/5 px-2 py-1 rounded text-white/60 mb-1 cursor-pointer">
               <span>Call Stack</span> <ChevronRight size={12} />
            </div>
            {isPaused ? (
               <div className="px-2 text-white/80 space-y-1">
                  <div className="truncate text-[#D4AF37]">init (main.js:7)</div>
                  <div className="truncate text-white/40">onClick (main.js:15)</div>
               </div>
            ) : (
               <div className="px-2 text-white/40 italic">Not paused</div>
            )}
         </div>
      </div>
    </div>
  );
};

export default SourcesPanel;
