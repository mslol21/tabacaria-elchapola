import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Ricardo Silva",
    text: "Atendimento impecável e produtos de altíssima qualidade. Os charutos sempre bem conservados.",
    rating: 5
  },
  {
    name: "Juliana Oliveira",
    text: "Melhor adega da região. Variedade incrível de bebidas e acessórios para presente.",
    rating: 5
  },
  {
    name: "Marcos Paulo",
    text: "O sistema de pedido pelo WhatsApp é muito prático. Entrega rápida e segura.",
    rating: 5
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5">
        <Quote size={200} className="text-white" />
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            O QUE NOSSOS <span className="text-brand-primary">CLIENTES DIZEM</span>
          </h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-brand-primary text-brand-primary" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[32px] border border-white/5 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-primary text-brand-primary" />
                ))}
              </div>
              <p className="text-white/70 italic mb-6 leading-relaxed">"{t.text}"</p>
              <h4 className="text-white font-bold">{t.name}</h4>
              <span className="text-brand-primary text-xs uppercase font-black tracking-widest">Cliente Verificado</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
