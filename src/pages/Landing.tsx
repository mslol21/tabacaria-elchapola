import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import SocialProof from '../components/SocialProof';
import FixedFooter from '../components/FixedFooter';
import CartDrawer from '../components/CartDrawer';
import ProductDetailModal from '../components/ProductDetailModal';
import type { Product } from '../types';

const Landing: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-brand-dark">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <ProductGrid onProductSelect={(product) => setSelectedProduct(product)} />
        <SocialProof />
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-white/5 text-center">
        <img src="/logo.png" alt="Logo" className="h-16 mx-auto mb-6 opacity-50 grayscale" />
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} Tabacaria El Chapola. Todos os direitos reservados.
        </p>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <FixedFooter onOpenCart={() => setIsCartOpen(true)} />
    </div>
  );
};

export default Landing;
