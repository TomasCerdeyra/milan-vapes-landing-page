
import React from 'react';
import { useData } from '@/contexts/DataContext';

const Benefits = () => {
  const { beneficios } = useData();

  return (
    <section className="min-h-screen py-20 px-4 mushroom-pattern">
      <div className="hero-gradient absolute inset-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl md:text-6xl font-tan-nimbus text-milan-lightGray mb-6">
            ¿POR QUÉ ELEGIR MILAN VAPES?
          </h2>
          <div className="w-24 h-1 bg-milan-whatsapp mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-milan-cardBg backdrop-blur-sm rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl h-full">
                <div className="text-center">
                  <div className="text-6xl mb-6">{beneficio.icon}</div>
                  <h3 className="text-2xl font-bold text-milan-beige mb-4">
                    {beneficio.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {beneficio.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
