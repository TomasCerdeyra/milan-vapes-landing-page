import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappLink = "https://wa.me/5493329684724?text=Hola!%20Quiero%20hacer%20una%20consulta";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-milan-darkGray text-milan-beige px-4 py-2 rounded-lg shadow-lg animate-fade-in mb-2 min-w-48 z-50">
          <div className="flex justify-between items-center">
            <span className="text-sm">¡Hola! ¿Te ayudamos?</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-milan-darkGray"></div>
        </div>
      )}
      
      {/* WhatsApp Button Container - Added relative and z-index */}
      <div className="relative">
        {/* Pulse animation - Moved before the button and adjusted z-index */}
        <div className="absolute inset-0 rounded-full bg-milan-whatsappGreen/30 animate-ping z-0"></div>
        
        {/* WhatsApp Button - Increased z-index */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-milan-whatsappGreen hover:bg-milan-whatsappGreen/90 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-float z-10"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </a>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;