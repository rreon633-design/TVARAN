import React, { useState } from 'react';
import { X, Printer, Layout, FileText, Check } from 'lucide-react';

interface PrintPreviewProps {
  onClose: () => void;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({ onClose }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex bg-[#0c0c0c]">
      {/* Sidebar Controls */}
      <div className="w-80 bg-[#121212] border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold clash text-white mb-6 flex items-center gap-2">
          <Printer size={24} className="text-[#D4AF37]" /> Print
        </h2>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Destination</label>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
              <Printer size={16} className="text-white" />
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Canon MF642Cdw</div>
                <div className="text-[10px] text-white/40">Ready</div>
              </div>
              <button className="text-[#D4AF37] text-xs font-bold">Change</button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Pages</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]">
              <option>All</option>
              <option>Current</option>
              <option>Custom</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Layout</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-xl flex flex-col items-center gap-2 text-[#D4AF37]">
                <Layout size={16} />
                <span className="text-xs font-bold">Portrait</span>
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col items-center gap-2 text-white/40 hover:text-white">
                <Layout size={16} className="rotate-90" />
                <span className="text-xs font-bold">Landscape</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
             <input type="checkbox" className="w-4 h-4 bg-black border-white/20 rounded accent-[#D4AF37]" defaultChecked />
             <span className="text-sm text-white">Background graphics</span>
          </div>
          <div className="flex items-center gap-3">
             <input type="checkbox" className="w-4 h-4 bg-black border-white/20 rounded accent-[#D4AF37]" />
             <span className="text-sm text-white">Headers and footers</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#FFD700] text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            {isPrinting ? 'Printing...' : 'Print'}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-[#2a2a2a] p-8 overflow-y-auto flex justify-center">
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-12 text-black">
          {/* Simulated Content */}
          <h1 className="text-3xl font-bold mb-4">TVARAN Browser Shell</h1>
          <p className="mb-4">
             This is a simulated print preview of the current page. The browser engine captures the DOM state and renders it onto a canvas or generates a PDF stream for the printer driver.
          </p>
          <div className="h-64 bg-gray-100 rounded border border-gray-300 mb-4 flex items-center justify-center text-gray-400">
             Image Placeholder
          </div>
          <p className="text-sm leading-relaxed">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="mt-8 text-xs text-gray-500 border-t pt-4">
             Printed via TVARAN Onyx Engine • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintPreview;