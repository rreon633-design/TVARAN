
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ConsolePanelProps {
  pageTitle: string;
  pageUrl: string;
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ pageTitle, pageUrl }) => {
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<{type: 'log'|'warn'|'error', msg: string, time: string}[]>([
    {type: 'log', msg: 'Navigated to ' + pageUrl, time: new Date().toLocaleTimeString()},
    {type: 'warn', msg: '[Deprecation] SharedArrayBuffer will require cross-origin isolation.', time: new Date().toLocaleTimeString()},
    {type: 'log', msg: 'HMR: Hot Module Replacement Enabled', time: new Date().toLocaleTimeString()},
  ]);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!consoleInput.trim()) return;
    setConsoleLogs(prev => [...prev, {type: 'log', msg: `> ${consoleInput}`, time: new Date().toLocaleTimeString()}]);
    // Simulate evaluation response
    setTimeout(() => {
      let response = "undefined";
      try {
         // Safe eval simulation
         if (consoleInput.startsWith('1+1')) response = "2";
         else if (consoleInput === 'window.title') response = `"${pageTitle}"`;
         else if (consoleInput === 'window.location.href') response = `"${pageUrl}"`;
         else response = `ReferenceError: ${consoleInput.split(' ')[0]} is not defined`;
      } catch (e) {}
      
      const type = response.startsWith("ReferenceError") ? 'error' : 'log';
      setConsoleLogs(prev => [...prev, {type, msg: response, time: new Date().toLocaleTimeString()}]);
    }, 50);
    setConsoleInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
        {consoleLogs.map((log, i) => (
          <div key={i} className={`flex gap-2 border-b border-white/5 py-1 ${log.type === 'error' ? 'text-red-400 bg-red-900/10' : log.type === 'warn' ? 'text-amber-400 bg-amber-900/10' : 'text-white/80'}`}>
            <span className="text-white/30 select-none min-w-[60px]">{log.time}</span>
            <span className="whitespace-pre-wrap">{log.msg}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleConsoleSubmit} className="flex items-center gap-2 p-2 border-t border-white/10 bg-white/5">
        <ChevronRight size={14} className="text-[#D4AF37]" />
        <input 
          value={consoleInput}
          onChange={(e) => setConsoleInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder:text-white/20"
          placeholder="Run JavaScript..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default ConsolePanel;
