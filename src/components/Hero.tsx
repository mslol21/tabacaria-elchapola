import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { settings } = useData();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-brand-dark" />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
        
        {/* Large Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none overflow-hidden">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/logo.png" 
            alt="" 
            className="w-[120%] md:w-[80%] max-w-none grayscale brightness-0 invert" 
          />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 text-brand-primary text-sm font-medium">
            <Sparkles size={16} />
            <span>O MELHOR DA TABACARIA & ADEGA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight">
            EXPERIÊNCIA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary/50">
              EXCLUSIVA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
            Descubra uma curadoria premium de charutos, acessórios, bebidas finas e itens exclusivos para quem não abre mão do melhor.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#products"
              className="w-full sm:w-auto bg-brand-primary text-brand-dark font-black py-4 px-10 rounded-xl flex items-center justify-center gap-2 shadow-2xl shadow-brand-primary/30 transition-all"
            >
              VER CATÁLOGO
              <ChevronRight size={20} />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/55${settings?.whatsapp?.replace(/\D/g, '') || '0000000000000'}`}
              className="w-full sm:w-auto glass hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center justify-center"
            >
              FALAR NO WHATSAPP
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
          
          <img 
            src="/hero-product.png" 
            alt="Cigar and Drink" 
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(209,178,110,0.2)] mix-blend-screen contrast-125" 
          />
        </motion.div>
      </div>

      {/* Floating Elements Animation */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 md:right-40 opacity-20 hidden lg:block"
      >
        <img src="/logo.png" alt="" className="w-32 h-auto grayscale blur-[2px]" />
      </motion.div>
    </section>
  );
};

export default Hero;
