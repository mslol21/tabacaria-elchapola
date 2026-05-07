import React from 'react';
import { ShoppingBag, MessageCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface FixedFooterProps {
  onOpenCart: () => void;
}

const FixedFooter: React.FC<FixedFooterProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-[90]">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass-dark rounded-3xl p-3 flex justify-between items-center border border-white/10 shadow-2xl"
      >
        <button className="flex flex-col items-center gap-1 flex-1 text-white/50 hover:text-white transition-colors">
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Início</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 flex-1 text-brand-primary relative"
        >
          <div className="bg-brand-primary text-brand-dark p-3 rounded-2xl -mt-10 shadow-lg shadow-brand-primary/40">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-8 -right-0 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Carrinho</span>
        </button>

        <a 
          href="https://wa.me/5500000000000"
          className="flex flex-col items-center gap-1 flex-1 text-white/50 hover:text-white transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
        </a>
      </motion.div>
    </div>
  );
};

export default FixedFooter;
