
import React, { useState } from 'react';
import { Code, FileJson, X } from 'lucide-react';

const NetworkPanel: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  
  const [networkRequests] = useState([
    {name: 'document', status: 200, type: 'document', size: '14.2 KB', time: '120ms', protocol: 'h3'},
    {name: 'styles.css', status: 200, type: 'stylesheet', size: '24.5 KB', time: '45ms', protocol: 'h2'},
    {name: 'main.js', status: 200, type: 'script', size: '104 KB', time: '320ms', protocol: 'h2'},
    {name: 'api/user.json', status: 200, type: 'xhr', size: '1.2 KB', time: '210ms', protocol: 'h3', isJson: true},
    {name: 'logo.png', status: 200, type: 'png', size: '12 KB', time: '80ms', protocol: 'h2'},
    {name: 'socket', status: 101, type: 'websocket', size: '0 B', time: 'Pending', protocol: 'ws'},
  ]);

  const mockJson = {
    id: "usr_123",
    name: "Architect",
    preferences: {
      theme: "storm",
      notifications: true
    },
    flags: ["beta", "developer"]
  };

  return (
    <div className="flex h-full text-xs">
      <div className={`${selectedRequest ? 'w-2/3' : 'w-full'} flex flex-col border-r border-white/10 transition-all`}>
        <div className="flex items-center gap-4 p-2 border-b border-white/10 bg-white/5 text-white/60 font-bold uppercase tracking-wider">
          <div className="w-1/4">Name</div>
          <div className="w-12">Status</div>
          <div className="w-12">Proto</div>
          <div className="w-16">Type</div>
          <div className="w-16">Size</div>
          <div className="flex-1">Time</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {networkRequests.map((req, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedRequest(req)}
              className={`flex items-center gap-4 p-2 border-b border-white/5 cursor-pointer font-mono ${selectedRequest === req ? 'bg-[#D4AF37]/20 text-white' : 'hover:bg-white/5 text-white/80'}`}
            >
              <div className="w-1/4 truncate text-[#D4AF37]">{req.name}</div>
              <div className={`w-12 ${req.status >= 400 ? 'text-red-400' : req.status === 101 ? 'text-purple-400' : 'text-emerald-400'}`}>{req.status}</div>
              <div className="w-12 text-white/40">{req.protocol}</div>
              <div className="w-16 text-white/40">{req.type}</div>
              <div className="w-16 text-white/60">{req.size}</div>
              <div className="flex-1 flex items-center gap-2">
                 <span className="text-white/40">{req.time}</span>
                 <div className="h-1.5 bg-white/10 rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{width: `${Math.random() * 80 + 20}%`}} />
                 </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-white/10 flex justify-between text-white/40 bg-white/5">
           <span>{networkRequests.length} requests</span>
           <span>156 KB transferred</span>
           <span>Finish: 1.2s</span>
        </div>
      </div>

      {selectedRequest && (
        <div className="w-1/3 flex flex-col bg-[#0f0f0f]">
          <div className="flex items-center justify-between p-2 border-b border-white/10 bg-white/5">
            <span className="font-bold text-white">{selectedRequest.name}</span>
            <button onClick={() => setSelectedRequest(null)} className="text-white/40 hover:text-white"><X size={14} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Headers</h4>
              <div className="font-mono text-white/60 space-y-1">
                <p>Request URL: https://api.tvaran.io/{selectedRequest.name}</p>
                <p>Request Method: GET</p>
                <p>Status Code: {selectedRequest.status}</p>
                <p>Protocol: {selectedRequest.protocol.toUpperCase()}</p>
              </div>
            </div>
            
            {selectedRequest.isJson && (
              <div>
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                  <FileJson size={12} /> JSON Response
                </h4>
                <div className="bg-black/40 p-3 rounded-xl border border-white/10 font-mono text-emerald-400 whitespace-pre-wrap">
                  {JSON.stringify(mockJson, null, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkPanel;
