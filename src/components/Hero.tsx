
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="hero-gradient absolute inset-0"></div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-tan-nimbus font-bold text-milan-cream mb-4 tracking-wider">
          Milan
        </h1>
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-perandory font-light text-milan-cream mb-8 tracking-widest">
          Vapes
        </h2>
        
        <p className="text-xl md:text-2xl  text-milan-beige mb-12 max-w-2xl mx-auto leading-relaxed">
          Los mejores vapes originales de Baradero. Calidad garantizada, mejor presentacion y atención personalizada.
        </p>
        
        <button
          onClick={scrollToProducts}
          className="bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige px-12 py-5 rounded-full text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-float"
        >
          Ver nuestros productos
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-milan-cream opacity-70" />
      </div>
    </section>
  );
};

export default Hero;
