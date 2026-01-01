
import React from 'react';

const ElementsPanel: React.FC = () => {
  return (
    <div className="font-mono text-xs text-white/80 p-2 space-y-1 select-text">
      <div className="pl-0 text-blue-400">&lt;!DOCTYPE html&gt;</div>
      <div className="pl-0"><span className="text-blue-400">&lt;html</span> <span className="text-sky-300">lang</span>=<span className="text-amber-300">"en"</span><span className="text-blue-400">&gt;</span></div>
      <div className="pl-4"><span className="text-blue-400">&lt;head&gt;</span>...<span className="text-blue-400">&lt;/head&gt;</span></div>
      <div className="pl-4"><span className="text-blue-400">&lt;body</span> <span className="text-sky-300">class</span>=<span className="text-amber-300">"tvaran-shell"</span><span className="text-blue-400">&gt;</span></div>
      <div className="pl-8 group hover:bg-white/5 cursor-pointer">
        <span className="text-blue-400">&lt;div</span> <span className="text-sky-300">id</span>=<span className="text-amber-300">"root"</span><span className="text-blue-400">&gt;</span>
        <span className="text-gray-500"> == $0</span>
      </div>
      <div className="pl-12 group hover:bg-white/5 cursor-pointer">
        <span className="text-blue-400">&lt;header</span> <span className="text-sky-300">class</span>=<span className="text-amber-300">"main-header"</span><span className="text-blue-400">&gt;</span>
        <span className="text-white">...</span>
        <span className="text-blue-400">&lt;/header&gt;</span>
      </div>
      <div className="pl-12 group hover:bg-white/5 cursor-pointer">
        <span className="text-blue-400">&lt;main&gt;</span>
        <div className="pl-4 text-white">
           &lt;!-- Content rendered here --&gt;
        </div>
        <span className="text-blue-400">&lt;/main&gt;</span>
      </div>
      <div className="pl-8"><span className="text-blue-400">&lt;/div&gt;</span></div>
      <div className="pl-4"><span className="text-blue-400">&lt;/body&gt;</span></div>
      <div className="pl-0"><span className="text-blue-400">&lt;/html&gt;</span></div>
    </div>
  );
};

export default ElementsPanel;
