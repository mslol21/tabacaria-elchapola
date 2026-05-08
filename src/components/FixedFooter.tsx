import React from 'react';
import { ShoppingBag, MessageCircle, Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

interface FixedFooterProps {
  onOpenCart: () => void;
}

const FixedFooter: React.FC<FixedFooterProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();
  const { settings } = useData();

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-[90]">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass-dark rounded-3xl p-3 flex justify-between items-center border border-white/10 shadow-2xl"
      >
        <button 
          onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 flex-1 text-white/50 hover:text-white transition-colors"
        >
          <Search size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Buscar</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 flex-1 text-brand-primary relative"
        >
          <div className="bg-brand-primary text-brand-dark p-3 rounded-2xl -mt-10 shadow-lg shadow-brand-primary/40 active:scale-95 transition-transform">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-1">Sacola</span>
        </button>

        <a 
          href={`https://wa.me/55${settings?.whatsapp?.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 flex-1 text-white/50 hover:text-white transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Whats</span>
        </a>
      </motion.div>
    </div>
  );
};

export default FixedFooter;
