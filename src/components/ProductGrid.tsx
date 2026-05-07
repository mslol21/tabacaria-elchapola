import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import ProductCard from './ProductCard';
import type { Product } from '../types';
import { Search, Filter } from 'lucide-react';

interface ProductGridProps {
  onProductSelect: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductSelect }) => {
  const { products, categories, loading } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && p.is_active;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <section id="products" className="py-20 px-6 md:px-12 bg-brand-dark">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              NOSSO <span className="text-brand-primary">CATÁLOGO</span>
            </h2>
            <p className="text-white/50 max-w-md">
              Selecione uma categoria abaixo ou busque pelo seu item preferido.
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input
              type="text"
              placeholder="O que você procura?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar mb-10">
          <button
            onClick={() => setSelectedCategory('Todas')}
            className={`whitespace-nowrap px-8 py-3 rounded-xl font-bold transition-all ${
              selectedCategory === 'Todas' 
              ? 'bg-brand-primary text-brand-dark' 
              : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`whitespace-nowrap px-8 py-3 rounded-xl font-bold transition-all ${
                selectedCategory === cat.name 
                ? 'bg-brand-primary text-brand-dark' 
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={onProductSelect}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl">
            <Filter className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/60 text-lg">Nenhum produto encontrado nesta seleção.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
