import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className="glass-dark rounded-3xl overflow-hidden flex flex-col group h-full border border-white/5"
    >
      <div className="relative aspect-square overflow-hidden bg-white/5">
        <img 
          src={product.image || '/logo.png'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-accent/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-white/50 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">A partir de</span>
              <span className="text-2xl font-black text-brand-primary">
                R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            {product.wholesale_price && (
              <div className="text-right">
                <span className="text-[10px] text-brand-accent uppercase font-bold tracking-widest block">Atacado</span>
                <span className="text-lg font-bold text-white/90">
                  R$ {Number(product.wholesale_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelect(product)}
            className="w-full bg-white/5 hover:bg-brand-primary hover:text-brand-dark text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
            VER DETALHES
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
