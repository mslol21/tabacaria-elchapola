import React from 'react';
import { ShoppingCart, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <img src="/logo.png" alt="Tabacaria Gabi Logo" className="h-10 md:h-12 w-auto" />
        <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">
          EL <span className="text-brand-primary">CHAPOLA</span>
        </span>
      </motion.div>

      <div className="flex items-center gap-4 md:gap-6">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/70 hover:text-brand-primary transition-colors hidden md:block"
        >
          <Camera size={24} />
        </a>
        
        <button 
          onClick={onOpenCart}
          className="relative p-2 text-white/90 hover:text-brand-primary transition-colors"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark">
              {totalItems}
            </span>
          )}
        </button>

        <a 
          href="#contact"
          className="bg-brand-primary hover:bg-brand-primary/90 text-brand-dark font-bold py-2 px-4 rounded-full text-sm md:flex items-center gap-2 hidden transition-all shadow-lg shadow-brand-primary/20"
        >
          <MessageCircle size={18} />
          CONTATO
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
