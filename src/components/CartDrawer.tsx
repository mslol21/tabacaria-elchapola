import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { settings } = useData();

  const handleCheckout = () => {
    if (!settings?.whatsapp) return;

    let message = `*Novo Pedido - ${settings.name}*\n\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name}`;
      if (item.selectedVariations) {
        Object.entries(item.selectedVariations).forEach(([key, val]) => {
          message += ` (${key}: ${val})`;
        });
      }
      if (item.customName) message += ` [Nome: ${item.customName}]`;
      message += ` - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total: R$ ${totalPrice.toFixed(2)}*`;
    
    const whatsappUrl = `https://wa.me/55${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-dark z-[101] border-l border-white/5 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary p-2 rounded-lg">
                  <ShoppingBag size={20} className="text-brand-dark" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'} selecionados
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-white/20" />
                  </div>
                  <p className="text-white/40 font-medium">Seu carrinho está vazio</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-brand-primary font-bold hover:underline"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      <img src={item.image || '/logo.png'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/20 hover:text-brand-accent transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-white/5 rounded-lg px-2 py-1 border border-white/5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white/50 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white/50 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-brand-primary font-bold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-white/5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-white">R$ {totalPrice.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/20 transition-all"
                >
                  <Send size={20} />
                  FINALIZAR NO WHATSAPP
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full text-white/30 hover:text-white/50 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
