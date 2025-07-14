
import React from 'react';

const Footer = () => {
  const whatsappLink = "https://wa.me/5493329684724?text=Hola!%20Quiero%20hacer%20una%20consulta";

  return (
    <footer className="bg-milan-darkGray py-16 px-4">
      <div className="max-w-4xl mx-auto text-center animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-perandory tracking-wider text-milan-lightGray mb-8">
          ¿LISTO PARA HACER TU PEDIDO?
        </h2>
        
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-milan-whatsappGreen hover:bg-milan-whatsappGreen/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-12"
        >
          Contactanos por WhatsApp
        </a>
        
        <div className="border-t border-gray-600 pt-8">
          <p className="text-gray-400 text-sm">
            © 2025 Milan Vapes - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
