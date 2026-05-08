import React from 'react';
import { Home, Search, ShoppingBag, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  onOpenCart: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="glass-dark border border-white/10 rounded-3xl p-2 flex justify-around items-center pointer-events-auto shadow-2xl shadow-black"
      >
        <button 
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 p-3 text-white/50 hover:text-brand-primary transition-colors"
        >
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Início</span>
        </button>

        <button 
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-1 p-3 text-white/50 hover:text-brand-primary transition-colors"
        >
          <Search size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Buscar</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 p-3 text-white/50 hover:text-brand-primary transition-colors"
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute top-2 right-4 bg-brand-primary text-brand-dark text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black">
              {totalItems}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-tighter">Sacola</span>
        </button>

        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-3 text-white/50 hover:text-brand-primary transition-colors"
        >
          <Camera size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Insta</span>
        </a>
      </motion.div>
    </div>
  );
};

export default MobileNav;
