
import React, { useState } from 'react';
import { Search, CreditCard, ShieldCheck, Trash2, Plus, Copy, Shield } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentManagerProps {
  payments: PaymentMethod[];
  onSetPayments: (payments: PaymentMethod[]) => void;
}

const PaymentManager: React.FC<PaymentManagerProps> = ({ payments, onSetPayments }) => {
  const [search, setSearch] = useState('');

  const filtered = payments.filter(p => 
    p.cardholderName.toLowerCase().includes(search.toLowerCase()) || 
    p.cardNumber.includes(search)
  );

  const deleteEntry = (id: string) => {
    onSetPayments(payments.filter(p => p.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 focus-within:border-[#D4AF37]/40 transition-all mb-3">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search wallet..."
            className="bg-transparent border-none outline-none text-xs w-full text-white font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between px-1">
           <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/40">
            <Shield size={10} /> Onyx Encrypted
          </div>
          <button className="text-[10px] font-bold uppercase text-[#D4AF37] hover:brightness-125 flex items-center gap-1">
            <Plus size={12} /> Add Card
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-[#D4AF37]/20">
              <CreditCard size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm text-[#D4AF37]/40 font-medium uppercase tracking-widest">Wallet is Empty</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div key={entry.id} className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 group hover:border-[#D4AF37]/20 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-black border border-white/5">
                  <CreditCard size={16} className="text-[#D4AF37]" />
                </div>
                <button onClick={() => deleteEntry(entry.id)} className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Card Number</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono tracking-widest text-white/80">{entry.cardNumber}</span>
                    <button className="text-white/20 hover:text-[#D4AF37]"><Copy size={12} /></button>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Holder</span>
                    <span className="text-xs font-bold text-white">{entry.cardholderName}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Expires</span>
                    <span className="text-xs font-bold text-white">{entry.expiry}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentManager;
