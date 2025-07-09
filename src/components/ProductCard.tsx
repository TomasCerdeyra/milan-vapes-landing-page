import React, { useState } from 'react';
import { Producto } from '@/contexts/DataContext';

interface ProductCardProps {
  producto: Producto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
  const [selectedSabor, setSelectedSabor] = useState<string>('');

  const generateWhatsAppLink = (sabor?: string) => {
    const baseMessage = `Hola! Quiero comprar el vape ${producto.nombre}`;
    const saborMessage = sabor ? ` sabor ${sabor}` : '';
    const fullMessage = encodeURIComponent(baseMessage + saborMessage);
    return `https://wa.me/5493329684724?text=${fullMessage}`;
  };

  return (
    <div className="bg-milan-productBg rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl h-full flex flex-col overflow-hidden">
      <div className="relative">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-64 object-contain bg-white"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400/4A4A4A/FFFFFF?text=' + encodeURIComponent(producto.nombre);
          }}
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-milan-beige mb-2">{producto.nombre}</h3>
          <p className="text-2xl font-bold text-milan-whatsapp mb-3">${producto.precio.toLocaleString()}</p>
          
          {/* Stock Badge debajo del precio */}
          <div className="mb-4">
            {producto.stock > 0 ? (
              <span className="bg-milan-stockAlert text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 ¡Quedan solo {producto.stock} en stock!
              </span>
            ) : (
              <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                No queda stock
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          {producto.sabores && producto.sabores.length > 0 && (
            <div className="mb-6">
              <p className="text-milan-beige mb-3 font-semibold">Sabores disponibles:</p>
              <div className="flex flex-wrap gap-2 mb-4 h-16">
                {producto.sabores.map((sabor, index) => (
                  <button
                    key={index}
                    onClick={() => producto.stock > 0 && sabor.disponible ? setSelectedSabor(sabor.nombre) : null}
                    disabled={producto.stock === 0 || !sabor.disponible}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 h-8 ${
                      producto.stock > 0 && sabor.disponible
                        ? selectedSabor === sabor.nombre
                          ? 'bg-milan-whatsapp text-milan-darkGray'
                          : 'bg-milan-beige text-milan-darkGray hover:bg-milan-whatsapp'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {sabor.nombre}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Botón de WhatsApp siempre en la misma posición */}
          <div className="mt-auto">
            <a
              href={generateWhatsAppLink(selectedSabor)}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                producto.stock > 0
                  ? 'bg-milan-whatsapp hover:bg-milan-whatsapp/90 text-milan-beige hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              onClick={producto.stock === 0 ? (e) => e.preventDefault() : undefined}
            >
              {producto.stock > 0 ? 'Pedir por WhatsApp' : 'Sin stock disponible'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;