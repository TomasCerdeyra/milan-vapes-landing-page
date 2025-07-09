
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import Benefits from '@/components/Benefits';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BackToTop from '@/components/BackToTop';
import { useData } from '@/contexts/DataContext';

const HomePage = () => {
  const { loading } = useData();
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Función para animar elementos al hacer scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Ejecutar una vez al cargar
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, [showElements]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mushroom-pattern">
        <div className="hero-gradient absolute inset-0"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-milan-whatsapp border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-milan-cream text-xl font-perandory">Cargando Milan Vapes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-smooth">
      <Hero />
      <ProductCatalog />
      <Benefits />
      <FAQ />
      <Footer />
      
      {showElements && (
        <>
          <FloatingWhatsApp />
          <BackToTop />
        </>
      )}
    </div>
  );
};

export default HomePage;
