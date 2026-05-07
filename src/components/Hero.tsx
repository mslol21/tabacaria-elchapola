import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid md:grid-items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 text-brand-primary text-sm font-medium">
            <Sparkles size={16} />
            <span>O MELHOR DA TABACARIA & ADEGA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none">
            EXPERIÊNCIA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary/50">
              EXCLUSIVA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Descubra uma curadoria premium de charutos, acessórios, bebidas finas e itens exclusivos para quem não abre mão do melhor.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              href="https://wa.me/5500000000000"
              className="w-full sm:w-auto glass hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all"
            >
              FALAR NO WHATSAPP
            </motion.a>
          </div>
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
