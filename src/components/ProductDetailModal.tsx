import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product, CartItem } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [customName, setCustomName] = useState('');

  if (!product) return null;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedVariations,
      customName: product.has_name_option ? customName : undefined
    };
    addToCart(cartItem);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl glass-dark rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black text-white/70 hover:text-white rounded-full transition-all"
          >
            <X size={24} />
          </button>

          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-white/5">
            <img 
              src={product.image || '/logo.png'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <span className="text-brand-primary text-xs font-black uppercase tracking-[0.2em] mb-4 block">
              {product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{product.name}</h2>
            <p className="text-white/60 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-8">
              {/* Price Display */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-white">
                  R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {product.wholesale_price && (
                  <span className="text-brand-primary font-bold text-sm">
                    Atacado: R$ {Number(product.wholesale_price).toFixed(2)} (mín. {product.wholesale_min_quantity})
                  </span>
                )}
              </div>

              {/* Variations */}
              {product.variations && product.variations.length > 0 && (
                <div className="space-y-6">
                  {product.variations.map((v) => (
                    <div key={v.name}>
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">{v.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedVariations((prev: Record<string, string>) => ({ ...prev, [v.name]: opt }))}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                              selectedVariations[v.name] === opt
                                ? 'bg-brand-primary border-brand-primary text-brand-dark'
                                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Name Customization */}
              {product.has_name_option && (
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-3">
                    Personalizar Nome (+R$ {product.name_price?.toFixed(2)})
                  </h4>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Digite o nome aqui..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-primary outline-none transition-all"
                  />
                </div>
              )}

              {/* Quantity and Add Button */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/10">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-black text-white w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-brand-primary hover:bg-brand-primary/90 text-brand-dark font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-brand-primary/20"
                >
                  <ShoppingCart size={20} />
                  ADICIONAR AO CARRINHO
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
