import React from 'react';
import { X, ZoomIn, ZoomOut, Download, Printer, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface PDFViewerProps {
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-[#1a1a1a] flex flex-col animate-in fade-in duration-200">
      {/* PDF Toolbar */}
      <div className="h-14 bg-[#121212] border-b border-white/10 flex items-center justify-between px-4 shadow-lg z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <FileText size={20} className="text-red-500" />
            <span className="font-bold text-sm">document.pdf</span>
          </div>
          <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-white/60">Read-Only</span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
           <button className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10"><ZoomOut size={18} /></button>
           <span className="text-xs font-mono text-white w-12 text-center">100%</span>
           <button className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10"><ZoomIn size={18} /></button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-white/60 hover:text-white rounded hover:bg-white/10" title="Download">
            <Download size={20} />
          </button>
          <button className="p-2 text-white/60 hover:text-white rounded hover:bg-white/10" title="Print">
            <Printer size={20} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-1" />
          <button onClick={onClose} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#2a2a2a] p-8 flex justify-center">
         <div className="w-[800px] bg-white min-h-[1000px] shadow-2xl relative">
            {/* Mock Page Content */}
            <div className="p-16 text-black">
               <h1 className="text-4xl font-bold mb-8 text-black">Feature Specification</h1>
               <div className="space-y-4 text-justify leading-relaxed text-gray-800">
                  <p>This component simulates the native PDF viewing capabilities of the browser shell. In a production environment, this would render using PDF.js or the native PDF plugin.</p>
                  <p>TVARAN supports annotation, filling forms, and digital signatures within this view.</p>
                  <div className="h-40 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-400 font-mono text-sm my-8">
                     [Chart / Diagram Area]
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
               </div>
               <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400">
                  Page 1 of 12
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PDFViewer;