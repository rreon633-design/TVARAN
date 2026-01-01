
import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, History, CreditCard, RefreshCw } from 'lucide-react';
import { WalletAccount } from '../types';

interface WalletManagerProps {
  account?: WalletAccount;
  onConnect: () => void;
}

const WalletManager: React.FC<WalletManagerProps> = ({ account, onConnect }) => {
  if (!account) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#050505]">
         <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
            <Wallet size={32} className="text-indigo-400" />
         </div>
         <h2 className="text-lg font-bold text-white mb-2">Web3 Wallet</h2>
         <p className="text-xs text-white/40 mb-8 max-w-[240px] leading-relaxed">Connect your crypto wallet to manage assets, sign transactions, and explore decentralized apps.</p>
         <button 
           onClick={onConnect}
           className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/20"
         >
           Connect Wallet
         </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold clash text-white">Wallet</h2>
            <div className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
               {account.currency} Mainnet
            </div>
          </div>
          <button className="text-white/20 hover:text-white transition-colors">
             <RefreshCw size={16} />
          </button>
        </div>

        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard size={100} />
           </div>
           <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Total Balance</p>
           <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{account.balance.toFixed(4)} {account.currency}</h1>
           
           <div className="flex items-center gap-2 bg-black/30 w-fit px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/20 cursor-pointer transition-colors" onClick={() => navigator.clipboard.writeText(account.address)}>
              <span className="text-[10px] font-mono text-white/60">{account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}</span>
              <Copy size={10} className="text-white/40" />
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
           <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center gap-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-full">
                 <ArrowDownLeft size={16} />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Receive</span>
           </button>
           <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center gap-2">
              <div className="p-2 bg-rose-500/10 text-rose-500 rounded-full">
                 <ArrowUpRight size={16} />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Send</span>
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
         <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
            <History size={12} /> Recent Activity
         </h3>
         
         {account.transactions.map(tx => (
            <div key={tx.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full border border-white/5 ${tx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                     {tx.type === 'receive' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div>
                     <p className="text-xs font-bold text-white">{tx.type === 'receive' ? 'Received' : 'Sent'} {tx.amount} {account.currency}</p>
                     <p className="text-[10px] text-white/30 font-mono">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
               </div>
               <div className="text-right">
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${tx.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                     {tx.status}
                  </span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default WalletManager;
