
import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import ProductCard from './ProductCard';

const ProductCatalog = () => {
  const { productos } = useData();

  return (
    <section id="productos" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black/90 to-black/70">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl md:text-6xl font-tan-nimbus text-milan-cream mb-6">
            NUESTROS PRODUCTOS
          </h2>
          <div className="w-24 h-1 bg-milan-whatsapp mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto, index) => (
            <div
              key={producto.id}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
