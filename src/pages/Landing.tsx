import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import SocialProof from '../components/SocialProof';
import FixedFooter from '../components/FixedFooter';
import CartDrawer from '../components/CartDrawer';
import ProductDetailModal from '../components/ProductDetailModal';
import Location from '../components/Location';
import SectionReveal from '../components/SectionReveal';
import type { Product } from '../types';

const Landing: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-primary selection:text-brand-dark">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        <SectionReveal className="relative">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-dark to-transparent z-10 pointer-events-none" />
          <ProductGrid onProductSelect={(product) => setSelectedProduct(product)} />
        </SectionReveal>

        <SectionReveal className="relative">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-dark to-transparent z-10 pointer-events-none" />
          <SocialProof />
        </SectionReveal>

        <SectionReveal className="relative">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-dark to-transparent z-10 pointer-events-none" />
          <Location />
        </SectionReveal>
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
