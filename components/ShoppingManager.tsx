
import React from 'react';
import { ShoppingBag, Tag, TrendingDown, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';
import { ShoppingProduct } from '../types';

interface ShoppingManagerProps {
  product?: ShoppingProduct;
}

const ShoppingManager: React.FC<ShoppingManagerProps> = ({ product }) => {
  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#050505]">
         <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/10">
            <ShoppingBag size={32} />
         </div>
         <p className="text-sm font-bold text-white/40 uppercase tracking-widest">No Product Detected</p>
         <p className="text-[10px] text-white/20 mt-2 max-w-[200px]">Visit a product page to see price insights and coupons.</p>
      </div>
    );
  }

  const isPriceDrop = product.currentPrice < product.originalPrice;
  const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold clash text-white">Shopping Assistant</h2>
          <Tag size={20} className="text-[#D4AF37]" />
        </div>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-sm font-bold text-white mb-1 leading-tight">{product.name}</h3>
          <div className="flex items-center gap-3 mt-3">
             <span className="text-2xl font-bold text-[#D4AF37]">${product.currentPrice}</span>
             {isPriceDrop && (
               <div className="flex flex-col leading-none">
                  <span className="text-xs text-white/40 line-through">${product.originalPrice}</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Save {discount}%</span>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <section>
           <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Price History</h4>
           <div className="h-32 bg-white/5 rounded-xl border border-white/5 flex items-end justify-between p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
              {product.priceHistory.map((point, i) => {
                 const height = (point.price / Math.max(...product.priceHistory.map(p => p.price))) * 100;
                 return (
                   <div key={i} className="flex flex-col items-center gap-1 group w-full">
                      <div 
                        className="w-full bg-[#D4AF37]/40 rounded-t-sm hover:bg-[#D4AF37] transition-all relative" 
                        style={{ height: `${height}%` }}
                      >
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded border border-white/10 text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            ${point.price}
                         </div>
                      </div>
                   </div>
                 );
              })}
           </div>
           <div className="flex items-center gap-2 mt-2 text-[10px] text-white/40">
              <TrendingDown size={12} className="text-emerald-500" />
              Lowest price in 30 days
           </div>
        </section>

        <section>
           <div className="flex items-center justify-between mb-3">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Available Coupons</h4>
              <span className="text-[10px] font-bold text-white bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">{product.coupons.length}</span>
           </div>
           <div className="space-y-3">
              {product.coupons.map(coupon => (
                 <div key={coupon.code} className="p-4 rounded-xl border border-dashed border-[#D4AF37]/40 bg-[#D4AF37]/5 flex items-center justify-between group">
                    <div>
                       <p className="text-xs font-bold text-white mb-1">{coupon.description}</p>
                       <p className="text-[10px] text-[#D4AF37] font-bold uppercase">{coupon.discount}</p>
                    </div>
                    <button 
                       className="px-3 py-1.5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
                       onClick={() => navigator.clipboard.writeText(coupon.code)}
                    >
                       {coupon.code}
                    </button>
                 </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default ShoppingManager;
