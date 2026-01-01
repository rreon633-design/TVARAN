
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityPanel: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
         <Shield size={48} className="text-emerald-500" />
         <div>
            <h2 className="text-xl font-bold text-white">This page is secure (valid HTTPS).</h2>
            <p className="text-white/40 text-xs mt-1">Certificate valid. Connection encrypted (TLS 1.3, X25519, AES_128_GCM).</p>
         </div>
      </div>
      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded text-xs text-white hover:bg-white/10">View Certificate</button>
    </div>
  );
};

export default SecurityPanel;
